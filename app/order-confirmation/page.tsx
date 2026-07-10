"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle, Package, MapPin, CreditCard } from "lucide-react"

interface OrderData {
  orderId: string
  orderNumber: string
  items: { id: number; name: string; price: number; quantity: number; image: string }[]
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
  }
  shipping: { method: string; estimatedDays: string }
  totals: { subtotal: number; shipping: number; giftWrap: number; gst: number; total: number }
  payment: { method: string; paymentId: string; amount: number }
  orderDate: string
}

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("savron_last_order")
    if (stored) {
      try {
        setOrderData(JSON.parse(stored))
      } catch {
        setOrderData(null)
      }
    }
  }, [])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#fff5d6]">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-8">If you just placed an order, please check your email for confirmation.</p>
          <Link href="/shop">
            <Button className="bg-gradient-to-r from-accent to-amber-500 text-white">Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const deliveryAddress = [
    orderData.customer.address,
    orderData.customer.apartment,
    `${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.pincode}`,
    "India",
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Thank you for your order. Your premium chocolates are being prepared with care.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-white font-semibold text-lg">Order #{orderData.orderNumber}</p>
            <p className="text-white/80">Placed on {orderData.orderDate}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-[#f7f1be] border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-serif font-bold text-primary flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary text-sm">{item.name}</p>
                    <p className="text-primary/70 text-sm">Qty: {item.quantity}</p>
                    <p className="font-bold text-primary text-sm">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-primary/20 space-y-2 text-primary text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderData.totals.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {orderData.totals.shipping === 0
                      ? "Free"
                      : `₹${orderData.totals.shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
                {orderData.totals.giftWrap > 0 && (
                  <div className="flex justify-between">
                    <span>Gift Wrapping</span>
                    <span>₹{orderData.totals.giftWrap.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{orderData.totals.gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-primary/20">
                  <span>Total Paid</span>
                  <span>₹{orderData.totals.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-primary flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-primary/80 text-sm space-y-2">
                <p className="font-semibold text-primary">
                  {orderData.customer.firstName} {orderData.customer.lastName}
                </p>
                <p>{deliveryAddress}</p>
                <p>Phone: {orderData.customer.phone}</p>
                <p>Email: {orderData.customer.email}</p>
                <p className="pt-2">
                  <span className="font-medium text-primary">Delivery:</span> {orderData.shipping.method} (
                  {orderData.shipping.estimatedDays})
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-primary flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-primary/80 text-sm space-y-1">
                <p>
                  <span className="font-medium text-primary">Method:</span> {orderData.payment.method}
                </p>
                <p>
                  <span className="font-medium text-primary">Payment ID:</span> {orderData.payment.paymentId}
                </p>
                <p>
                  <span className="font-medium text-primary">Amount:</span> ₹
                  {orderData.payment.amount.toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>

            <Link href="/shop">
              <Button className="w-full bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
