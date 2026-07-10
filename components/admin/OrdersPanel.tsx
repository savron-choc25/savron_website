"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/contexts/ToastContext"
import {
  Download,
  Eye,
  Loader2,
  Package,
  RefreshCw,
  ShoppingBag,
} from "lucide-react"

interface OrderItem {
  id: string | number
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  _id: string
  orderNumber: string
  status: string
  createdAt: string
  paidAt?: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  items: OrderItem[]
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    apartment?: string
    city: string
    state: string
    pincode: string
    country?: string
  }
  shipping?: {
    method?: string
    methodId?: string
    price?: number
    estimatedDays?: string
  }
  giftOptions?: {
    isGift?: boolean
    message?: string
    selectedGiftIds?: string[]
  } | null
  totals: {
    subtotal: number
    shipping: number
    giftWrap: number
    gst: number
    total: number
    gstPercentage?: number
  }
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
}

function formatDate(value?: string) {
  if (!value) return "—"
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function escapeCsv(value: string | number | undefined | null) {
  const text = String(value ?? "")
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

export default function OrdersPanel() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (fromDate) params.set("from", fromDate)
      if (toDate) params.set("to", toDate)
      if (statusFilter !== "all") params.set("status", statusFilter)

      const res = await fetch(`/api/orders?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to load orders")
      const data = await res.json()
      setOrders(data)
    } catch {
      toast({ title: "Error", description: "Failed to load orders", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const paidCount = useMemo(
    () => orders.filter((o) => o.status === "paid" || o.status === "processing" || o.status === "shipped" || o.status === "delivered").length,
    [orders]
  )
  const revenue = useMemo(
    () =>
      orders
        .filter((o) => o.status !== "cancelled" && o.status !== "pending")
        .reduce((sum, o) => sum + (o.totals?.total || 0), 0),
    [orders]
  )

  const openOrder = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      if (!res.ok) throw new Error("Failed to load order")
      const data = await res.json()
      setSelectedOrder(data)
      setViewOpen(true)
    } catch {
      toast({ title: "Error", description: "Could not open order details", variant: "destructive" })
    }
  }

  const updateStatus = async (orderId: string, status: string) => {
    try {
      setUpdatingStatus(true)
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Update failed")
      const updated = await res.json()
      setOrders((prev) => prev.map((o) => (o._id === orderId ? updated : o)))
      setSelectedOrder(updated)
      toast({ title: "Updated", description: `Order marked as ${status}`, variant: "success" })
    } catch {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" })
    } finally {
      setUpdatingStatus(false)
    }
  }

  const downloadReport = () => {
    if (orders.length === 0) {
      toast({ title: "No orders", description: "No orders found for the selected dates", variant: "destructive" })
      return
    }

    const headers = [
      "Order Number",
      "Date",
      "Status",
      "Customer Name",
      "Email",
      "Phone",
      "Address",
      "City",
      "State",
      "Pincode",
      "Items",
      "Shipping Method",
      "Subtotal",
      "Shipping",
      "Gift Add-ons",
      "GST",
      "Total",
      "Payment ID",
      "Gift Message",
    ]

    const rows = orders.map((order) => {
      const itemsText = (order.items || [])
        .map((item) => `${item.name} x${item.quantity} (₹${item.price})`)
        .join(" | ")
      const address = [
        order.customer?.address,
        order.customer?.apartment,
        order.customer?.city,
        order.customer?.state,
        order.customer?.pincode,
      ]
        .filter(Boolean)
        .join(", ")

      return [
        order.orderNumber,
        formatDate(order.createdAt),
        order.status,
        `${order.customer?.firstName || ""} ${order.customer?.lastName || ""}`.trim(),
        order.customer?.email || "",
        order.customer?.phone || "",
        address,
        order.customer?.city || "",
        order.customer?.state || "",
        order.customer?.pincode || "",
        itemsText,
        order.shipping?.method || "",
        order.totals?.subtotal ?? 0,
        order.totals?.shipping ?? 0,
        order.totals?.giftWrap ?? 0,
        order.totals?.gst ?? 0,
        order.totals?.total ?? 0,
        order.razorpayPaymentId || "",
        order.giftOptions?.message || "",
      ]
        .map(escapeCsv)
        .join(",")
    })

    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    const fromLabel = fromDate || "all"
    const toLabel = toDate || "all"
    link.href = url
    link.download = `savron-orders-${fromLabel}-to-${toLabel}.csv`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Report downloaded",
      description: `${orders.length} order(s) exported to CSV`,
      variant: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white/80">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Orders shown</p>
            <p className="text-2xl font-bold text-primary">{orders.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Paid / Active</p>
            <p className="text-2xl font-bold text-green-700">{paidCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Revenue (filtered)</p>
            <p className="text-2xl font-bold text-accent">₹{revenue.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">From date</Label>
              <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">To date</Label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
              <Button onClick={fetchOrders} variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Apply Filter
              </Button>
              <Button onClick={downloadReport} className="flex-1 bg-primary text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No orders found for this filter</p>
              <p className="text-sm mt-1">Orders appear here after customers complete checkout</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-200 rounded-xl bg-white/70"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-primary">{order.orderNumber}</p>
                      <Badge className={STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      {order.customer?.firstName} {order.customer?.lastName} · {order.customer?.phone}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {(order.items || []).map((i) => i.name).join(", ") || "No items"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="font-bold text-primary">
                      ₹{(order.totals?.total || 0).toLocaleString("en-IN")}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => openOrder(order._id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2">
                  Order {selectedOrder.orderNumber}
                  <Badge className={STATUS_COLORS[selectedOrder.status] || "bg-gray-100 text-gray-800"}>
                    {selectedOrder.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 text-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-primary mb-1">Customer</p>
                    <p>
                      {selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}
                    </p>
                    <p>{selectedOrder.customer?.email}</p>
                    <p>{selectedOrder.customer?.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Delivery Address</p>
                    <p>{selectedOrder.customer?.address}</p>
                    {selectedOrder.customer?.apartment && <p>{selectedOrder.customer.apartment}</p>}
                    <p>
                      {selectedOrder.customer?.city}, {selectedOrder.customer?.state}{" "}
                      {selectedOrder.customer?.pincode}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-primary mb-2">Items</p>
                  <div className="space-y-2">
                    {(selectedOrder.items || []).map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex justify-between gap-3 border-b border-gray-100 pb-2">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-primary mb-1">Shipping</p>
                    <p>{selectedOrder.shipping?.method || "—"}</p>
                    <p className="text-gray-500">{selectedOrder.shipping?.estimatedDays || ""}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Payment</p>
                    <p>Razorpay</p>
                    <p className="text-xs text-gray-500 break-all">
                      {selectedOrder.razorpayPaymentId || "Not paid yet"}
                    </p>
                    <p className="text-xs text-gray-500">Paid: {formatDate(selectedOrder.paidAt)}</p>
                  </div>
                </div>

                {selectedOrder.giftOptions?.message && (
                  <div>
                    <p className="font-semibold text-primary mb-1">Gift Message</p>
                    <p className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      {selectedOrder.giftOptions.message}
                    </p>
                  </div>
                )}

                <div className="space-y-1 border-t pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{(selectedOrder.totals?.subtotal || 0).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{(selectedOrder.totals?.shipping || 0).toLocaleString("en-IN")}</span>
                  </div>
                  {(selectedOrder.totals?.giftWrap || 0) > 0 && (
                    <div className="flex justify-between">
                      <span>Gift Add-ons</span>
                      <span>₹{selectedOrder.totals.giftWrap.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST</span>
                    <span>₹{(selectedOrder.totals?.gst || 0).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>₹{(selectedOrder.totals?.total || 0).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Update status</Label>
                  <div className="flex flex-wrap gap-2">
                    {["paid", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedOrder.status === status ? "default" : "outline"}
                        disabled={updatingStatus}
                        onClick={() => updateStatus(selectedOrder._id, status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
