"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { useCart } from "@/contexts/CartContext"
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  Download,
  Share2,
  Heart,
  Star,
  Clock,
  MapPin,
  CreditCard,
  Gift,
  Phone
} from "lucide-react"

export default function OrderConfirmationPage() {
  const { state } = useCart()
  
  const [orderData] = useState({
    orderNumber: "SAV-2024-001234",
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: "confirmed",
    total: state.total + 8.99 + (state.total * 0.08),
    items: state.items,
    shipping: {
      method: "Standard Shipping",
      address: "123 Main Street, Apt 4B, New York, NY 10001",
      trackingNumber: "1Z999AA1234567890"
    },
    payment: {
      method: "Credit Card ending in 1234",
      amount: 124.47
    }
  })

  const [showTracking, setShowTracking] = useState(false)

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />
      
      {/* Success Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
              Thank you for your order. Your premium chocolates are being prepared with care.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-white font-semibold text-lg">Order #{orderData.orderNumber}</p>
              <p className="text-white/80">Placed on {orderData.orderDate}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <Package className="w-6 h-6" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Status Timeline */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Order Confirmed</h4>
                        <p className="text-sm text-primary/70">Your order has been received and confirmed</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Preparing Your Order</h4>
                        <p className="text-sm text-primary/70">Our chocolatiers are crafting your premium chocolates</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Shipped</h4>
                        <p className="text-sm text-primary/70">Your order is on its way to you</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Delivered</h4>
                        <p className="text-sm text-primary/70">Estimated delivery: {orderData.estimatedDelivery}</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary">
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/50 rounded-xl">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary text-lg">{item.name}</h4>
                      <p className="text-primary/70 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary/70">Quantity: {item.quantity}</span>
                        <span className="font-bold text-primary text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Shipping Method</h4>
                    <p className="text-primary/70">{orderData.shipping.method}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Estimated Delivery</h4>
                    <p className="text-primary/70">{orderData.estimatedDelivery}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Shipping Address</h4>
                  <p className="text-primary/70">{orderData.shipping.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Tracking Number</h4>
                  <div className="flex items-center gap-3">
                    <code className="bg-white/50 px-3 py-1 rounded text-primary font-mono">
                      {orderData.shipping.trackingNumber}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTracking(!showTracking)}
                      className="border-primary/20 text-primary hover:bg-primary/10"
                    >
                      Track Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/collections">
                <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white">
                  <span className="flex items-center justify-center">
                    Continue Shopping
                  </span>
                </Button>
              </Link>
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-primary">
                    <span>Subtotal</span>
                    <span>${(orderData.total - 8.99 - (orderData.total * 0.08)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Shipping</span>
                    <span>$8.99</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Tax</span>
                    <span>${(orderData.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-primary/20">
                    <span>Total</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-primary flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/70">{orderData.payment.method}</p>
                <p className="font-semibold text-primary mt-2">${orderData.payment.amount.toFixed(2)}</p>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0 shadow-xl">
              <CardContent className="p-6">
                <h4 className="font-semibold text-primary mb-3">Need Help?</h4>
                <p className="text-primary/70 text-sm mb-4">
                  Our customer service team is here to help with any questions about your order.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Review Request */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h4 className="font-semibold text-primary mb-2">Love Your Chocolates?</h4>
                <p className="text-primary/70 text-sm mb-4">
                  Share your experience and help others discover our premium chocolates.
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
