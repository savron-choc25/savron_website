"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/Navbar"
import { useCart } from "@/contexts/CartContext"
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  Truck,
  Shield,
  Clock,
  Gift
} from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { state } = useCart()
  
  // Redirect to cart if empty
  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart')
    }
  }, [state.items.length, router])

  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    
    // Shipping Method
    shippingMethod: "standard",
    
    // Billing Information
    sameAsShipping: true,
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    
    // Payment Method
    paymentMethod: "card",
    
    // Gift Options
    isGift: false,
    giftMessage: "",
    giftWrap: false
  })

  const orderItems = state.items

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = formData.shippingMethod === "express" ? 15.99 : formData.shippingMethod === "overnight" ? 25.99 : 8.99
  const giftWrap = formData.giftWrap ? 5.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + giftWrap + tax

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const shippingMethods = [
    { id: "standard", name: "Standard Shipping", price: 8.99, days: "5-7 business days" },
    { id: "express", name: "Express Shipping", price: 15.99, days: "2-3 business days" },
    { id: "overnight", name: "Overnight Shipping", price: 25.99, days: "Next business day" }
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">
              Checkout
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Complete your order for premium artisan chocolates
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-primary font-medium">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-primary font-medium">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-primary font-medium">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="border-primary/20 focus:border-primary"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apartment" className="text-primary font-medium">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange("apartment", e.target.value)}
                    className="border-primary/20 focus:border-primary"
                    placeholder="Apt 4B"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-primary font-medium">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-primary font-medium">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-primary font-medium">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <Truck className="w-6 h-6" />
                  Shipping Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {shippingMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.shippingMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => handleInputChange("shippingMethod", method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={() => handleInputChange("shippingMethod", method.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <h4 className="font-semibold text-primary">{method.name}</h4>
                          <p className="text-sm text-primary/70">{method.days}</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary">${method.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gift Options */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <Gift className="w-6 h-6" />
                  Gift Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isGift"
                    checked={formData.isGift}
                    onCheckedChange={(checked) => handleInputChange("isGift", checked as boolean)}
                  />
                  <Label htmlFor="isGift" className="text-primary font-medium">
                    This is a gift
                  </Label>
                </div>

                {formData.isGift && (
                  <div className="space-y-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="giftMessage" className="text-primary font-medium">Gift Message</Label>
                      <Textarea
                        id="giftMessage"
                        value={formData.giftMessage}
                        onChange={(e) => handleInputChange("giftMessage", e.target.value)}
                        className="border-primary/20 focus:border-primary"
                        placeholder="Write a special message for the recipient..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="giftWrap"
                        checked={formData.giftWrap}
                        onCheckedChange={(checked) => handleInputChange("giftWrap", checked as boolean)}
                      />
                      <Label htmlFor="giftWrap" className="text-primary font-medium">
                        Add premium gift wrapping (+$5.99)
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Link href="/cart">
                <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                  <span className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cart
                  </span>
                </Button>
              </Link>
              <Link href="/payment">
                <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white">
                  <span className="flex items-center">
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[#f7f1be] border-0 shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary text-sm">{item.name}</h4>
                        <p className="text-primary/70 text-sm">Qty: {item.quantity}</p>
                        <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 pt-4 border-t border-primary/20">
                  <div className="flex justify-between text-primary">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {giftWrap > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Gift Wrapping</span>
                      <span>${giftWrap.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-primary">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-primary/20">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Shield className="w-4 h-4" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Clock className="w-4 h-4" />
                    <span>Order processed within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
