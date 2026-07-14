"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart, cartUtils } from "@/contexts/CartContext"
import {
  ArrowLeft,
  MapPin,
  Truck,
  Shield,
  Clock,
  Gift,
  Lock,
} from "lucide-react"
import { INDIAN_STATES } from "@/lib/checkout-constants"
import type { StoreSettings } from "@/lib/store-settings.shared"
import { DEFAULT_STORE_SETTINGS } from "@/lib/store-settings.shared"
import { calculateOrderTotals } from "@/lib/calculate-order-totals"

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()

  const [isPaying, setIsPaying] = useState(false)
  const [razorpayReady, setRazorpayReady] = useState(false)
  const [error, setError] = useState("")
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS)
  const [settingsLoading, setSettingsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: StoreSettings) => {
        setStoreSettings(data)
        const firstMethod = data.deliveryMethods.find((m) => m.enabled)
        if (firstMethod) {
          setFormData((prev) => ({ ...prev, shippingMethod: firstMethod.id }))
        }
      })
      .catch(() => setStoreSettings(DEFAULT_STORE_SETTINGS))
      .finally(() => setSettingsLoading(false))
  }, [])

  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/cart")
    }
  }, [state.items.length, router])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    shippingMethod: "standard",
    isGift: false,
    giftMessage: "",
    selectedGiftIds: [] as string[],
    termsAccepted: false,
  })

  const orderItems = state.items
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const enabledShippingMethods = storeSettings.deliveryMethods.filter((m) => m.enabled)
  const orderTotals = calculateOrderTotals(
    subtotal,
    formData.shippingMethod,
    formData.selectedGiftIds,
    storeSettings
  )
  const { shipping, giftWrap, gst, total, shippingMethod: selectedShipping } = orderTotals
  const enabledGiftItems = storeSettings.giftOptions.items.filter((item) => item.enabled)
  const selectedGiftItems = enabledGiftItems.filter((item) =>
    formData.selectedGiftIds.includes(item.id)
  )

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleGiftItem = (giftId: string, checked: boolean) => {
    setFormData((prev) => {
      const selectedGiftIds = checked
        ? [...prev.selectedGiftIds, giftId]
        : prev.selectedGiftIds.filter((id) => id !== giftId)

      return {
        ...prev,
        selectedGiftIds,
        isGift: selectedGiftIds.length > 0,
        giftMessage: selectedGiftIds.length > 0 ? prev.giftMessage : "",
      }
    })
  }

  const isFormValid = () =>
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.phone.trim().length >= 10 &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.state &&
    formData.pincode.trim().length === 6 &&
    formData.termsAccepted

  const getPayBlockReason = () => {
    if (settingsLoading) return "Loading checkout settings…"
    if (!formData.firstName.trim() || !formData.lastName.trim()) return "Enter your full name above"
    if (!formData.email.trim()) return "Enter your email above"
    if (formData.phone.trim().length < 10) return "Enter a valid 10-digit phone number"
    if (!formData.address.trim() || !formData.city.trim() || formData.pincode.trim().length !== 6) {
      return "Complete your delivery address (including 6-digit PIN)"
    }
    if (!formData.termsAccepted) return "Tick “I agree to the Terms…” checkbox above to unlock Pay"
    return ""
  }

  const payBlockReason = getPayBlockReason()
  const canPay = isFormValid() && !settingsLoading

  const handlePayWithRazorpay = useCallback(async () => {
    if (!isFormValid()) {
      setError("Please fill all required fields and accept the terms.")
      return
    }

    if (!razorpayReady || typeof window.Razorpay === "undefined") {
      setError("Payment gateway is loading. Please try again in a moment.")
      return
    }

    setError("")
    setIsPaying(true)

    try {
      const customer = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        apartment: formData.apartment.trim(),
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode.trim(),
        country: "India",
      }

      const shippingInfo = {
        method: selectedShipping?.name || "Standard Delivery",
        methodId: formData.shippingMethod,
        price: shipping,
        estimatedDays: selectedShipping?.days || "5–7 business days",
      }

      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          customer,
          shipping: shippingInfo,
          giftOptions: {
            isGift: formData.selectedGiftIds.length > 0,
            message: formData.giftMessage,
            selectedGiftIds: formData.selectedGiftIds,
          },
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        setError(orderData.error || "Could not start payment. Please try again.")
        setIsPaying(false)
        return
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Savron Chocolate Co.",
        description: "Premium Luxury Chocolate Order",
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          contact: customer.phone,
        },
        notes: { orderId: orderData.dbOrderId },
        theme: { color: "#7f1d1d" },
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                dbOrderId: orderData.dbOrderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              setError(verifyData.error || "Payment verification failed.")
              setIsPaying(false)
              return
            }

            sessionStorage.setItem(
              "savron_last_order",
              JSON.stringify({
                orderId: verifyData.orderId,
                orderNumber: verifyData.orderNumber,
                items: orderItems,
                customer,
                shipping: shippingInfo,
                totals: orderData.totals || { subtotal, shipping, giftWrap, gst, total },
                payment: {
                  method: "Razorpay",
                  paymentId: response.razorpay_payment_id,
                  amount: orderData.totals?.total ?? total,
                },
                orderDate: new Date().toLocaleDateString("en-IN"),
              })
            )

            cartUtils.clearCart(dispatch)
            router.push(`/order-confirmation?order=${verifyData.orderId}`)
          } catch {
            setError("Payment received but verification failed. Please contact us with your payment ID.")
            setIsPaying(false)
          }
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (res: { error: { description: string } }) => {
        setError(res.error?.description || "Payment failed. Please try again.")
        setIsPaying(false)
      })
      rzp.open()
    } catch {
      setError("Something went wrong. Please try again.")
      setIsPaying(false)
    }
  }, [
    dispatch,
    formData,
    orderItems,
    orderItems.length,
    razorpayReady,
    router,
    storeSettings,
    selectedShipping?.name,
    shipping,
    subtotal,
    formData.selectedGiftIds,
    giftWrap,
    gst,
    total,
  ])

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayReady(true)}
      />
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">Checkout</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Enter your delivery details and pay securely via Razorpay
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  Delivery Details
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
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-primary font-medium">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-primary/20 focus:border-primary"
                      placeholder="Last name"
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
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="border-primary/20 focus:border-primary"
                      placeholder="10-digit mobile number"
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
                    placeholder="House no., building, street"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apartment" className="text-primary font-medium">Landmark / Apartment (optional)</Label>
                  <Input
                    id="apartment"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange("apartment", e.target.value)}
                    className="border-primary/20 focus:border-primary"
                    placeholder="Near landmark, floor, etc."
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
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-primary font-medium">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-primary font-medium">PIN Code *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="border-primary/20 focus:border-primary"
                      placeholder="400606"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <Truck className="w-6 h-6" />
                  Delivery Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subtotal >= storeSettings.freeShippingMin && (
                  <p className="text-sm text-green-700 font-medium bg-green-50 rounded-lg px-3 py-2">
                    Free shipping applied on orders above ₹{storeSettings.freeShippingMin.toLocaleString("en-IN")}!
                  </p>
                )}
                {enabledShippingMethods.map((method) => (
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
                          checked={formData.shippingMethod === method.id}
                          onChange={() => handleInputChange("shippingMethod", method.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <h4 className="font-semibold text-primary">{method.name}</h4>
                          <p className="text-sm text-primary/70">{method.days}</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary">
                        {subtotal >= storeSettings.freeShippingMin
                          ? "Free"
                          : `₹${method.price.toLocaleString("en-IN")}`}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {storeSettings.giftOptions.enabled && (
            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                  <Gift className="w-6 h-6" />
                  Gift Options
                </CardTitle>
                <p className="text-sm text-primary/70 mt-1">
                  Select an add-on to include gift wrapping. A message box will appear after you choose.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {enabledGiftItems.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-primary">Select gift add-ons</p>
                    {enabledGiftItems.map((item) => {
                      const isSelected = formData.selectedGiftIds.includes(item.id)
                      return (
                        <div
                          key={item.id}
                          role="button"
                          tabIndex={0}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-primary/20 hover:border-primary/40"
                          }`}
                          onClick={() => toggleGiftItem(item.id, !isSelected)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              toggleGiftItem(item.id, !isSelected)
                            }
                          }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id={`gift-${item.id}`}
                                checked={isSelected}
                                onCheckedChange={(checked) =>
                                  toggleGiftItem(item.id, checked as boolean)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div>
                                <Label
                                  htmlFor={`gift-${item.id}`}
                                  className="text-primary font-semibold cursor-pointer"
                                >
                                  {item.name}
                                </Label>
                                <p className="text-xs text-primary/60 mt-0.5">
                                  Tap to {isSelected ? "remove" : "add"} this option
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-primary shrink-0">
                              +₹{item.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-primary/60 italic">
                    No gift add-ons available right now.
                  </p>
                )}

                {formData.selectedGiftIds.length > 0 && storeSettings.giftOptions.allowGiftMessage && (
                  <div className="pt-4 border-t border-primary/15 space-y-2">
                    <Label htmlFor="giftMessage" className="text-primary font-semibold">
                      Gift message (optional)
                    </Label>
                    <p className="text-xs text-primary/60">
                      Add a personal note to include with your gift
                    </p>
                    <Textarea
                      id="giftMessage"
                      value={formData.giftMessage}
                      onChange={(e) => handleInputChange("giftMessage", e.target.value)}
                      className="border-primary/20 focus:border-primary bg-white"
                      placeholder="e.g. Happy Birthday! Enjoy these chocolates..."
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            )}

            <Card className="bg-[#f7f1be] border-0 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl border border-primary/30 bg-white">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                    className="mt-0.5 h-6 w-6 shrink-0 border-2 border-[#7f1d1d] bg-white data-[state=checked]:bg-[#7f1d1d] data-[state=checked]:border-[#7f1d1d] data-[state=checked]:text-white shadow-sm"
                  />
                  <label htmlFor="termsAccepted" className="block flex-1 min-w-0 text-primary font-medium text-sm leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-accent hover:underline inline" target="_blank" onClick={(e) => e.stopPropagation()}>
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="/privacy" className="text-accent hover:underline inline" target="_blank" onClick={(e) => e.stopPropagation()}>
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link href="/returns" className="text-accent hover:underline inline" target="_blank" onClick={(e) => e.stopPropagation()}>
                      Refund Policy
                    </Link>
                    .
                    <span className="block text-xs text-primary/60 mt-1 font-normal">Required to unlock payment</span>
                  </label>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                  <Shield className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="text-sm text-green-800">
                    Payments are processed securely by Razorpay. We never store your card or UPI details.
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                )}

                {!canPay && !isPaying && payBlockReason && (
                  <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    {payBlockReason}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                  <Link href="/cart">
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 w-full sm:w-auto">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </Button>
                  </Link>
                  <Button
                    className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white w-full sm:w-auto disabled:opacity-60"
                    onClick={handlePayWithRazorpay}
                    disabled={!canPay || isPaying}
                  >
                    {isPaying ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        {canPay ? <Shield className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                        Pay ₹{total.toLocaleString("en-IN")} via Razorpay
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-[#f7f1be] border-0 shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary text-sm">{item.name}</h4>
                        <p className="text-primary/70 text-sm">Qty: {item.quantity}</p>
                        <p className="font-bold text-primary">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-primary/20">
                  <div className="flex justify-between text-primary">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
                  </div>
                  {selectedGiftItems.map((gift) => (
                    <div key={gift.id} className="flex justify-between text-primary text-sm">
                      <span className="text-primary/80">{gift.name}</span>
                      <span>₹{gift.price.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  {formData.selectedGiftIds.length > 0 && (
                    <div className="flex justify-between text-primary text-sm">
                      <span className="text-primary/80">Gift order</span>
                      <span className="text-green-700">Included</span>
                    </div>
                  )}
                  <div className="flex justify-between text-primary">
                    <span>GST ({storeSettings.gstPercentage}%)</span>
                    <span>₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-primary/20">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Shield className="w-4 h-4" />
                    <span>Secured by Razorpay</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Clock className="w-4 h-4" />
                    <span>UPI, Cards, Netbanking accepted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
