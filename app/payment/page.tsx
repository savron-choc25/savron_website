"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/Navbar"
import { useCart } from "@/contexts/CartContext"
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Shield,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const { state } = useCart()
  
  // Redirect to cart if empty
  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart')
    }
  }, [state.items.length, router])

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    saveCard: false,
    termsAccepted: false
  })

  const [showCvv, setShowCvv] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const orderItems = state.items

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (field: string, value: string | boolean) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsProcessing(false)
    // Redirect to confirmation page
    router.push('/order-confirmation')
  }

  const isFormValid = () => {
    return (
      paymentData.cardNumber.length >= 19 &&
      paymentData.expiryDate.length === 5 &&
      paymentData.cvv.length >= 3 &&
      paymentData.cardholderName.length > 0 &&
      paymentData.termsAccepted
    )
  }

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">
              Payment
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Secure payment for your premium chocolate order
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Selection */}
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Options */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentData.paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => handleInputChange("paymentMethod", "card")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentData.paymentMethod === "card"}
                        onChange={() => handleInputChange("paymentMethod", "card")}
                        className="w-4 h-4 text-primary"
                      />
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-primary">Credit/Debit Card</span>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentData.paymentMethod === "paypal"
                        ? "border-primary bg-primary/5"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => handleInputChange("paymentMethod", "paypal")}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentData.paymentMethod === "paypal"}
                        onChange={() => handleInputChange("paymentMethod", "paypal")}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                        PP
                      </div>
                      <span className="font-semibold text-primary">PayPal</span>
                    </div>
                  </div>
                </div>

                {paymentData.paymentMethod === "card" && (
                  <>
                    {/* Card Information */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-primary font-medium">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                          className="border-primary/20 focus:border-primary"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate" className="text-primary font-medium">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                            className="border-primary/20 focus:border-primary"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-primary font-medium">CVV *</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              type={showCvv ? "text" : "password"}
                              value={paymentData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ''))}
                              className="border-primary/20 focus:border-primary pr-10"
                              placeholder="123"
                              maxLength={4}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCvv(!showCvv)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/50 hover:text-primary"
                            >
                              {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholderName" className="text-primary font-medium">Cardholder Name *</Label>
                        <Input
                          id="cardholderName"
                          value={paymentData.cardholderName}
                          onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                          className="border-primary/20 focus:border-primary"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4 pt-4 border-t border-primary/20">
                      <h4 className="text-lg font-semibold text-primary">Billing Address</h4>
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress" className="text-primary font-medium">Address *</Label>
                        <Input
                          id="billingAddress"
                          value={paymentData.billingAddress}
                          onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                          className="border-primary/20 focus:border-primary"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingCity" className="text-primary font-medium">City *</Label>
                          <Input
                            id="billingCity"
                            value={paymentData.billingCity}
                            onChange={(e) => handleInputChange("billingCity", e.target.value)}
                            className="border-primary/20 focus:border-primary"
                            placeholder="New York"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingState" className="text-primary font-medium">State *</Label>
                          <Select value={paymentData.billingState} onValueChange={(value) => handleInputChange("billingState", value)}>
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
                          <Label htmlFor="billingZipCode" className="text-primary font-medium">ZIP Code *</Label>
                          <Input
                            id="billingZipCode"
                            value={paymentData.billingZipCode}
                            onChange={(e) => handleInputChange("billingZipCode", e.target.value)}
                            className="border-primary/20 focus:border-primary"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Card Option */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveCard"
                        checked={paymentData.saveCard}
                        onCheckedChange={(checked) => handleInputChange("saveCard", checked as boolean)}
                      />
                      <Label htmlFor="saveCard" className="text-primary font-medium">
                        Save this card for future purchases
                      </Label>
                    </div>
                  </>
                )}

                {paymentData.paymentMethod === "paypal" && (
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">PP</span>
                      </div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Pay with PayPal</h4>
                      <p className="text-primary/70 mb-4">
                        You'll be redirected to PayPal to complete your payment securely
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Continue with PayPal
                      </Button>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2 pt-4 border-t border-primary/20">
                  <Checkbox
                    id="termsAccepted"
                    checked={paymentData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="termsAccepted" className="text-primary font-medium text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">Secure Payment</h4>
                    <p className="text-green-700 text-sm">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                <a href="/checkout" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Checkout
                </a>
              </Button>
              <Button 
                className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white"
                onClick={handlePlaceOrder}
                disabled={!isFormValid() || isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Place Order - ₹{total.toLocaleString('en-IN')}
                  </div>
                )}
              </Button>
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
                        <p className="font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 pt-4 border-t border-primary/20">
                  <div className="flex justify-between text-primary">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Shipping</span>
                    <span>₹{shipping.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Tax</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-primary/20">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Lock className="w-4 h-4 text-green-500" />
                    <span>Secure payment processing</span>
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
