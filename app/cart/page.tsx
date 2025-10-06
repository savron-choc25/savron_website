"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import { useCart, cartUtils } from "@/contexts/CartContext"
import Link from "next/link"
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck,
  Shield,
  RotateCcw
} from "lucide-react"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const cartItems = state.items

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    cartUtils.updateQuantity(dispatch, id, newQuantity)
  }

  const removeItem = (id: number) => {
    cartUtils.removeFromCart(dispatch, id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">
              Your Chocolate Cart
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Review your selection of premium artisan chocolates
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <Card className="bg-[#f7f1be] border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-primary/70 mb-6">
                    Discover our premium chocolate collections
                  </p>
                  <Link href="/collections">
                    <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white">
                      <span className="flex items-center">
                        Start Shopping
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item) => (
                <Card key={item.id} className="bg-[#f7f1be] border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-1">
                              {item.name}
                            </h3>
                            <p className="text-primary/70 text-sm mb-2">
                              {item.description}
                            </p>
                            {!item.inStock && (
                              <Badge variant="destructive" className="mb-2">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-primary/50 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 p-0 border-primary/20 hover:bg-primary/10"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-lg font-semibold text-primary w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 border-primary/20 hover:bg-primary/10"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </p>
                            <p className="text-sm text-primary/70">
                              ₹{item.price.toLocaleString('en-IN')} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[#f7f1be] border-0 shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-primary">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Promo Code</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter code" 
                      className="border-primary/20 focus:border-primary"
                    />
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 pt-4 border-t border-primary/20">
                  <div className="flex justify-between text-primary">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
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

                {/* Trust Badges */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on orders over ₹4,199</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-primary/70">
                    <RotateCcw className="w-4 h-4" />
                    <span>30-day return policy</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button 
                    className="w-full bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={cartItems.length === 0 || cartItems.some(item => !item.inStock)}
                  >
                    <span className="flex items-center justify-center">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </span>
                  </Button>
                </Link>

                {cartItems.some(item => !item.inStock) && (
                  <p className="text-sm text-red-500 text-center">
                    Please remove out-of-stock items to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
