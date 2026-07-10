import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid order id" }, { status: 400 })
    }

    const collection = await getCollection("orders")
    const order = await collection.findOne({ _id: new ObjectId(id) })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...order,
      _id: order._id.toString(),
      orderNumber: `SAV-${order._id.toString().slice(-8).toUpperCase()}`,
    })
  } catch (error) {
    console.error("Failed to fetch order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid order id" }, { status: 400 })
    }

    const body = await request.json()
    const allowedStatuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"]
    if (body.status && !allowedStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const collection = await getCollection("orders")
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(body.status ? { status: body.status } : {}),
          updatedAt: new Date().toISOString(),
        },
      },
      { returnDocument: "after" }
    )

    if (!result) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...result,
      _id: result._id.toString(),
      orderNumber: `SAV-${result._id.toString().slice(-8).toUpperCase()}`,
    })
  } catch (error) {
    console.error("Failed to update order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
