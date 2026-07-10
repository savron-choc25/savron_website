import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { getRazorpayInstance, getRazorpayKeyId } from "@/lib/razorpay"
import { getStoreSettings } from "@/lib/store-settings.server"
import { calculateOrderTotals } from "@/lib/calculate-order-totals"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customer, shipping, giftOptions } = body

    if (!items?.length || !customer?.email || !customer?.phone || !customer?.address) {
      return NextResponse.json({ error: "Missing required order details" }, { status: 400 })
    }

    const settings = await getStoreSettings()
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    )

    const shippingMethodId = shipping?.methodId || shipping?.method || settings.deliveryMethods[0]?.id
    const selectedGiftIds: string[] = giftOptions?.selectedGiftIds ?? []
    const totals = calculateOrderTotals(subtotal, shippingMethodId, selectedGiftIds, settings)

    if (totals.total < 1) {
      return NextResponse.json({ error: "Invalid order total" }, { status: 400 })
    }

    const razorpay = getRazorpayInstance()
    const keyId = getRazorpayKeyId()

    if (!razorpay || !keyId) {
      return NextResponse.json(
        { error: "Payment gateway is being configured. Please contact us to place your order." },
        { status: 503 }
      )
    }

    const amountInPaise = Math.round(totals.total * 100)

    const orderDoc = {
      items,
      customer,
      shipping: {
        ...shipping,
        method: totals.shippingMethod?.name || shipping?.method,
        methodId: totals.shippingMethod?.id || shippingMethodId,
        price: totals.shipping,
      },
      giftOptions: giftOptions || null,
      totals,
      status: "pending",
      paymentProvider: "razorpay",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const ordersCollection = await getCollection("orders")
    const insertResult = await ordersCollection.insertOne(orderDoc)
    const dbOrderId = insertResult.insertedId.toString()

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `savron_${dbOrderId.slice(-8)}`,
      notes: {
        dbOrderId,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      },
    })

    await ordersCollection.updateOne(
      { _id: new ObjectId(dbOrderId) },
      {
        $set: {
          razorpayOrderId: razorpayOrder.id,
          updatedAt: new Date().toISOString(),
        },
      }
    )

    return NextResponse.json({
      dbOrderId,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      keyId,
      totals,
    })
  } catch (error) {
    console.error("Razorpay order creation failed:", error)
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
