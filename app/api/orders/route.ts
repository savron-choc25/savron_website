import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const status = searchParams.get("status")

    const collection = await getCollection("orders")
    const filter: Record<string, unknown> = {}

    if (from || to) {
      const createdAt: Record<string, string> = {}
      if (from) createdAt.$gte = new Date(`${from}T00:00:00.000Z`).toISOString()
      if (to) createdAt.$lte = new Date(`${to}T23:59:59.999Z`).toISOString()
      filter.createdAt = createdAt
    }

    if (status && status !== "all") {
      filter.status = status
    }

    const orders = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      orders.map((order) => ({
        ...order,
        _id: order._id.toString(),
        orderNumber: `SAV-${order._id.toString().slice(-8).toUpperCase()}`,
      }))
    )
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
