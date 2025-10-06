"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart, cartUtils } from "@/contexts/CartContext"
import { useToast } from "@/contexts/ToastContext"
import {
  Star,
  Award,
  Heart,
  Gift,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Crown,
  Loader2,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { products as defaultProducts } from "@/data/products"

export default function SavronHomepage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      let adminProducts = []
      
      if (response.ok) {
        adminProducts = await response.json()
      } else {
        console.error('Failed to fetch admin products')
      }

      // Convert default products to match the database format
      const convertedDefaultProducts = defaultProducts.map(product => ({
        _id: `default-${product.id}`,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        images: product.images,
        inStock: product.inStock,
        weight: "100g",
        origin: "Belgium",
        ingredients: product.ingredients,
        allergens: ["Milk", "Soy"],
        features: product.features || [],
        badges: product.badges,
        rating: product.rating,
        reviews: product.reviews.length
      }))

      // Combine admin products with default products (newest first)
      const allProducts = [...adminProducts, ...convertedDefaultProducts]
      setProducts(allProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      // If there's an error, still show default products
      const convertedDefaultProducts = defaultProducts.map(product => ({
        _id: `default-${product.id}`,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        images: product.images,
        inStock: product.inStock,
        weight: "100g",
        origin: "Belgium",
        ingredients: product.ingredients,
        allergens: ["Milk", "Soy"],
        features: product.features || [],
        badges: product.badges,
        rating: product.rating,
        reviews: product.reviews.length
      }))
      setProducts(convertedDefaultProducts)
      toast({
        title: "Warning",
        description: "Showing default products only. Admin products unavailable.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: any) => {
    cartUtils.addToCart(dispatch, {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.jpg',
      description: product.description,
      inStock: product.inStock
    })
    toast({
      title: "Product successfully added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // Width of one card + gap
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // Width of one card + gap
        behavior: 'smooth'
      })
    }
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Complete Banner from Top */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg"
            alt="Premium Savron chocolate truffles"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        

        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
            <div className="space-y-8">
                
                <div className="space-y-6">
                  <h1 className="text-6xl lg:text-8xl font-serif font-bold text-balance leading-[0.9]">
                    <span className="block text-white">Artisan</span>
                    <span className="bg-gradient-to-r from-accent via-amber-300 to-orange-400 bg-clip-text text-transparent block">
                      Chocolates
                    </span>
                    <span className="block text-white text-5xl lg:text-6xl font-light">
                    Crafted with Passion
                  </span>
                </h1>
                  <p className="text-2xl text-white/90 text-pretty max-w-2xl leading-relaxed font-light">
                  Experience the finest handcrafted chocolates made with premium ingredients and traditional techniques
                    passed down through generations of master chocolatiers.
                </p>
              </div>
                
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button
                  size="lg"
                    className="bg-gradient-to-r from-accent via-amber-500 to-orange-500 hover:from-accent/90 hover:via-amber-400 hover:to-orange-400 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 text-xl px-10 py-8 font-bold text-primary"
                >
                    <a href="/collections" className="flex items-center text-primary">
                    Explore Collections
                      <ChevronRight className="w-6 h-6 ml-3" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                    className="border-2 border-white/70 hover:bg-white/10 transform hover:scale-105 transition-all duration-500 bg-transparent text-white hover:text-white text-xl px-10 py-8 font-bold shadow-xl hover:shadow-2xl backdrop-blur-sm"
                >
                    <Gift className="w-6 h-6 mr-3" />
                  Gift Sets
                </Button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Featured Collections */}
      <section id="collections" className="py-24 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge
              variant="secondary"
              className="w-fit bg-white/20 backdrop-blur-sm border-white/30 text-white font-semibold px-4 py-2 mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Signature Collections
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-accent to-amber-300 bg-clip-text text-transparent">
              Artisan Chocolate Collections
            </h2>
            <p className="text-white/90 text-xl max-w-3xl mx-auto text-pretty leading-relaxed font-light">
              Each collection tells a story of craftsmanship, featuring unique flavor profiles and premium ingredients
              sourced from the finest cocoa regions around the world.
            </p>
          </div>

          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
            
            {/* Horizontal Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" 
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            >
            {[
              // Newly added non-premium products first
              ...products.filter(product => !product.premium).map(product => ({
                id: product._id || product.id,
                name: product.name,
                description: product.description,
                image: product.images?.[0] || "/placeholder.svg",
                price: `From ₹${product.price.toLocaleString('en-IN')}`,
                badge: "New",
                gradient: "from-green-600 to-emerald-600",
                features: ["New Arrival", "Fresh"],
                isNewProduct: true
              })),
              // Existing static collections - mapped to default product IDs
              {
                id: 1, // Maps to Premium Dark Chocolate Truffles Collection
                name: "Dark Elegance",
                description: "Rich 70% dark chocolate with exotic spices",
                image: "/dark-chocolate-collection-luxury-packaging.jpg",
                price: "From ₹3,749",
                badge: "Bestseller",
                gradient: "from-slate-900 to-primary",
                features: ["Single Origin", "Award Winning"],
                isNewProduct: false,
              },
              {
                id: 2, // Maps to Artisan Milk Chocolate Collection
                name: "Milk Harmony",
                description: "Creamy milk chocolate with caramelized nuts",
                image: "/milk-chocolate-truffles-with-gold-accents.jpg",
                price: "From ₹3,199",
                badge: "Classic",
                gradient: "from-accent to-amber-600",
                features: ["Premium Quality", "Handcrafted"],
                isNewProduct: false,
              },
              {
                id: 3, // Maps to White Chocolate Delights
                name: "White Bliss",
                description: "Premium white chocolate with berry infusions",
                image: "/white-chocolate-bonbons-with-berry-decorations.jpg",
                price: "From ₹3,499",
                badge: "Limited",
                gradient: "from-red-200 to-primary/50",
                features: ["Artisan Made", "Exclusive"],
                isNewProduct: false,
              },
              {
                id: 4, // Maps to Gourmet Chocolate Bars Collection
                name: "Espresso Delight",
                description: "Dark chocolate infused with rich espresso",
                image: "/dark-chocolate-collection-luxury-packaging.jpg",
                price: "From ₹2,999",
                badge: "Popular",
                gradient: "from-amber-800 to-orange-600",
                features: ["Coffee Infused", "Rich Flavor"],
                isNewProduct: false,
              },
              {
                id: 1, // Maps to Premium Dark Chocolate Truffles Collection
                name: "Sea Salt Caramel",
                description: "Smooth caramel with Himalayan sea salt",
                image: "/milk-chocolate-truffles-with-gold-accents.jpg",
                price: "From ₹3,299",
                badge: "Classic",
                gradient: "from-amber-400 to-yellow-500",
                features: ["Sea Salt", "Smooth Caramel"],
                isNewProduct: false,
              },
              {
                id: 3, // Maps to White Chocolate Delights
                name: "Raspberry Dream",
                description: "White chocolate with fresh raspberry swirls",
                image: "/white-chocolate-bonbons-with-berry-decorations.jpg",
                price: "From ₹3,199",
                badge: "Seasonal",
                gradient: "from-pink-400 to-red-400",
                features: ["Fresh Berries", "Seasonal"],
                isNewProduct: false,
              },
              {
                id: 2, // Maps to Artisan Milk Chocolate Collection
                name: "Hazelnut Crunch",
                description: "Milk chocolate with roasted hazelnuts",
                image: "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
                price: "From ₹2,999",
                badge: "Nutty",
                gradient: "from-amber-600 to-brown-600",
                features: ["Roasted Nuts", "Crunchy"],
                isNewProduct: false,
              },
            ].map((collection, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-[#f7f1be] rounded-2xl p-0 flex-shrink-0 w-80"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Product Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant={collection.badge === "Bestseller" ? "default" : "secondary"}
                      className={
                        collection.badge === "Bestseller"
                          ? "bg-gradient-to-r from-primary to-red-800 text-white shadow-xl font-semibold px-3 py-1"
                          : collection.badge === "New" && collection.isNewProduct
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl font-semibold px-3 py-1"
                          : collection.badge === "New"
                          ? "bg-gradient-to-r from-accent to-amber-600 text-white shadow-xl font-semibold px-3 py-1"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl font-semibold px-3 py-1"
                      }
                    >
                      {collection.badge === "New" && <Zap className="w-3 h-3 mr-1" />}
                      {collection.badge === "Bestseller" && <Crown className="w-3 h-3 mr-1" />}
                      {collection.badge === "Limited" && <Sparkles className="w-3 h-3 mr-1" />}
                      {collection.badge}
                    </Badge>
                  </div>
                  
                </div>
                
                <CardContent className="p-4 relative mt-0">
                  <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed font-light">
                    {collection.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {collection.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-accent/30 text-accent bg-accent/5 px-2 py-1"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:border-transparent transition-all duration-500 transform group-hover:scale-105 shadow-md hover:shadow-lg bg-transparent border-accent/40 text-accent hover:text-white font-semibold py-2 text-sm"
                  >
                    <a href={`/view-details?id=${collection.id}`} className="text-inherit flex items-center justify-center">
                      {collection.isNewProduct ? "View Product" : "View Collection"}
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Dark Chocolate Section 1 */}
      <section className="pb-0 relative overflow-hidden">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Panel - Dark Background with Premium Products */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 to-purple-800/30"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-6">
                {/* New Look Banner */}
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-2 rounded-lg shadow-lg">
                  <span className="text-black font-bold text-sm tracking-wide">NEW LOOK</span>
                </div>
                
                {/* Main Title */}
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {products.filter(product => product.premium)[0]?.name || "SAVRON"}
                  <span className="block text-yellow-300">PREMIUM</span>
                </h2>
                
                {/* CTA Button */}
                <Link href={`/view-details?id=${products.filter(product => product.premium)[0]?._id || products.filter(product => product.premium)[0]?.id || 'default-1'}`}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    DISCOVER PREMIUM
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Panel - Single Premium Product Image */}
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-700/60"></div>
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              
              {/* Single Premium Product Image */}
              <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700">
                <div className="relative">
                  {/* Premium Product Image */}
                  <img
                    src={products.filter(product => product.premium)[0]?.images?.[0] || "/dark-chocolate-collection-luxury-packaging.jpg"}
                    alt="Savron Premium Chocolate"
                    className="w-80 h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Product Details Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <span className="text-red-600 font-bold text-sm">180g</span>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg px-3 py-1 shadow-lg">
                    <span className="text-black font-bold text-xs">PREMIUM</span>
                  </div>
                </div>
                
                {/* Chocolate Piece Detail */}
                <div className="absolute -bottom-8 -right-8 transform rotate-45">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg shadow-xl flex items-center justify-center">
                    <span className="text-yellow-300 font-bold text-lg">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Dark Chocolate Section 2 - Inverted Layout */}
      <section className="pb-0 relative overflow-hidden">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Panel - Single Premium Product Image */}
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-700/60"></div>
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              
              {/* Single Premium Product Image */}
              <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700">
                <div className="relative">
                  {/* Premium Product Image */}
                  <img
                    src={products.filter(product => product.premium)[1]?.images?.[0] || "/dark-chocolate-collection-luxury-packaging.jpg"}
                    alt="Savron Premium Chocolate"
                    className="w-80 h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Product Details Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <span className="text-red-600 font-bold text-sm">180g</span>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg px-3 py-1 shadow-lg">
                    <span className="text-black font-bold text-xs">PREMIUM</span>
                  </div>
                </div>
                
                {/* Chocolate Piece Detail */}
                <div className="absolute -bottom-8 -right-8 transform rotate-45">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg shadow-xl flex items-center justify-center">
                    <span className="text-yellow-300 font-bold text-lg">S</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Dark Background with Premium Product Name */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 to-purple-800/30"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-8">
                {/* New Look Banner */}
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-2 rounded-lg shadow-lg">
                  <span className="text-black font-bold text-sm tracking-wide">NEW LOOK</span>
                </div>
                
                {/* Main Title */}
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {products.filter(product => product.premium)[1]?.name || "SAVRON"}
                  <span className="block text-yellow-300">PREMIUM</span>
                </h2>
                
                {/* CTA Button */}
                <Link href={`/view-details?id=${products.filter(product => product.premium)[1]?._id || products.filter(product => product.premium)[1]?.id || 'default-2'}`}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    DISCOVER PREMIUM
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Dark Chocolate Section 3 */}
      <section className="pb-0 relative overflow-hidden">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Panel - Dark Background with Premium Product Name */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 to-purple-800/30"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-8">
                {/* New Look Banner */}
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-2 rounded-lg shadow-lg">
                  <span className="text-black font-bold text-sm tracking-wide">NEW LOOK</span>
                </div>
                
                {/* Main Title */}
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {products.filter(product => product.premium)[2]?.name || "SAVRON"}
                  <span className="block text-yellow-300">PREMIUM</span>
                </h2>
                
                {/* CTA Button */}
                <Link href={`/view-details?id=${products.filter(product => product.premium)[2]?._id || products.filter(product => product.premium)[2]?.id || 'default-3'}`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    DISCOVER PREMIUM
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Panel - Single Premium Product Image */}
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/80 to-red-700/60"></div>
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              
              {/* Single Premium Product Image */}
              <div className="relative z-10 transform rotate-12 hover:rotate-6 transition-transform duration-700">
                <div className="relative">
                  {/* Premium Product Image */}
                  <img
                    src={products.filter(product => product.premium)[2]?.images?.[0] || "/dark-chocolate-collection-luxury-packaging.jpg"}
                    alt="Savron Premium Chocolate"
                    className="w-80 h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Product Details Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <span className="text-red-600 font-bold text-sm">180g</span>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg px-3 py-1 shadow-lg">
                    <span className="text-black font-bold text-xs">PREMIUM</span>
                  </div>
                </div>
                
                {/* Chocolate Piece Detail */}
                <div className="absolute -bottom-8 -right-8 transform rotate-45">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg shadow-xl flex items-center justify-center">
                    <span className="text-yellow-300 font-bold text-lg">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
        <section className="py-24 relative overflow-hidden" style={{backgroundColor: '#f0eab7'}}>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge
              variant="secondary"
              className="w-fit bg-gradient-to-r from-primary/15 to-accent/15 border-primary/30 text-primary font-semibold px-4 py-2 mb-6 shadow-lg"
            >
              <Star className="w-4 h-4 mr-2" />
              Customer Reviews
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto text-pretty leading-relaxed font-light">
              Don't just take our word for it. Here's what our valued customers have to say about their Savron experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                quote: "The most exquisite chocolates I've ever tasted. Each piece is a work of art that melts perfectly on the tongue.",
                author: "Sarah Mitchell",
                role: "Food Critic",
                rating: 5,
              },
              {
                quote: "Savron's attention to detail and quality is unmatched. Simply divine craftsmanship in every bite.",
                author: "James Chen",
                role: "Michelin Star Chef",
                rating: 5,
              },
              {
                quote: "Perfect for special occasions. The packaging alone is worth the price, and the chocolates are heavenly.",
                author: "Emma Rodriguez",
                role: "Event Planner",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                  className="border-0 shadow-2xl bg-primary transform hover:scale-105 transition-all duration-500 hover:shadow-3xl rounded-3xl"
                >
                  <CardContent className="p-10 text-center">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-sm" />
                    ))}
                  </div>
                    <blockquote className="text-white/90 mb-8 text-pretty leading-relaxed italic text-lg font-light">
                    "{testimonial.quote}"
                  </blockquote>
                    <div className="border-t border-white/20 pt-6">
                      <div className="font-bold text-xl text-white">{testimonial.author}</div>
                      <div className="text-sm text-amber-300 font-semibold mt-1">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/8 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge
              variant="secondary"
              className="w-fit bg-white/20 backdrop-blur-sm border-white/30 text-white font-semibold px-4 py-2 mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Limited Time Offer
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-balance drop-shadow-2xl leading-tight">
              Ready to Experience
              <span className="block text-white/90">Luxury Chocolate?</span>
            </h2>
            <p className="text-xl opacity-90 text-pretty leading-relaxed max-w-2xl mx-auto font-light">
              Join thousands of chocolate lovers who have discovered the Savron difference. Order now and taste the
              passion in every bite of our artisan creations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg px-10 py-6"
              >
                <a href="/shop" className="flex items-center text-inherit">
                  Shop Collections
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg px-10 py-6"
              >
                <Gift className="w-5 h-5 mr-2" />
                Corporate Gifts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden" style={{backgroundColor: '#f0eab7'}}>
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-amber-50/30 to-orange-50/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/12 to-accent/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge
                variant="secondary"
                className="w-fit bg-gradient-to-r from-primary/15 to-accent/15 border-primary/30 text-primary font-semibold px-4 py-2 shadow-lg"
              >
                <Crown className="w-4 h-4 mr-2" />
                Since 1952
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-balance leading-tight">
                Three Generations of
                <span className="bg-gradient-to-r from-primary via-accent to-orange-600 bg-clip-text text-transparent block">
                  Chocolate Mastery
                </span>
              </h2>
              <p className="text-muted-foreground text-xl text-pretty leading-relaxed font-light max-w-lg">
                Founded in 1952, Savron has been perfecting the art of chocolate making for over seven decades. Our
                master chocolatiers combine traditional European techniques with innovative flavor combinations to
                create truly exceptional chocolates that have won international acclaim.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-8 bg-gradient-to-br from-primary/8 to-accent/8 rounded-2xl border border-primary/20 transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
                  <div className="text-4xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    70+
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold">Years of Excellence</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-accent/8 to-primary/8 rounded-2xl border border-accent/20 transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
                  <div className="text-4xl font-serif font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold">Unique Flavors</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-accent/70 hover:bg-gradient-to-r hover:from-accent/15 hover:to-primary/15 transform hover:scale-105 transition-all duration-500 bg-transparent text-accent hover:text-primary text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl"
              >
                <Heart className="w-5 h-5 mr-2 text-accent" />
                <a href="/about" className="text-inherit">
                  Our Story
                </a>
              </Button>
            </div>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-card to-amber-50/50 shadow-3xl transform hover:scale-105 transition-transform duration-700 border-4 border-primary/20">
                  <img
                    src="/chocolate-master-craftsman-working-with-cocoa-bean.jpg"
                    alt="Master chocolatier at work"
                    className="w-full h-full object-cover"
                  />
            </div>

                {/* Floating Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full animate-bounce shadow-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse shadow-xl"></div>
                <div className="absolute top-1/3 -left-3 w-8 h-8 bg-gradient-to-br from-accent/80 to-primary/80 rounded-full animate-pulse delay-300 shadow-lg"></div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
