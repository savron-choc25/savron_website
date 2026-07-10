import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { verifyRazorpaySignature } from "@/lib/razorpay"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dbOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!dbOrderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification data" }, { status: 400 })
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    const ordersCollection = await getCollection("orders")
    const order = await ordersCollection.findOne({ _id: new ObjectId(dbOrderId) })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.razorpayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "Order mismatch" }, { status: 400 })
    }

    await ordersCollection.updateOne(
      { _id: new ObjectId(dbOrderId) },
      {
        $set: {
          status: "paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paidAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }
    )

    return NextResponse.json({
      success: true,
      orderId: dbOrderId,
      orderNumber: `SAV-${dbOrderId.slice(-8).toUpperCase()}`,
    })
  } catch (error) {
    console.error("Payment verification failed:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
