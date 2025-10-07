"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Filter, Grid, List, Crown } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart, cartUtils } from "@/contexts/CartContext"
import { useToast } from "@/contexts/ToastContext"

export default function ShopPage() {
  const { dispatch } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: any) => {
    cartUtils.addToCart(dispatch, {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      inStock: true
    })
    toast({
      title: "Product successfully added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const products = [
    {
      id: 1,
      name: "Dark Elegance Truffle Box",
      collection: "Dark Elegance",
      price: 3749,
      originalPrice: null,
      image: "/dark-chocolate-collection-luxury-packaging.jpg",
      rating: 4.9,
      reviews: 127,
      bestseller: true,
      premium: false,
      description: "12 handcrafted dark chocolate truffles with 70-90% cocoa content",
    },
    {
      id: 2,
      name: "Milk Harmony Selection",
      collection: "Milk Harmony",
      price: 3199,
      originalPrice: 3499,
      image: "/milk-chocolate-truffles-with-gold-accents.jpg",
      rating: 4.8,
      reviews: 89,
      bestseller: false,
      premium: false,
      description: "8 premium milk chocolate pieces with smooth, creamy textures",
    },
    {
      id: 3,
      name: "White Luxury Bonbons",
      collection: "White Luxury",
      price: 3499,
      originalPrice: null,
      image: "/white-chocolate-bonbons-with-berry-decorations.jpg",
      rating: 4.9,
      reviews: 156,
      bestseller: true,
      description: "10 white chocolate bonbons infused with exotic flavors",
    },
    {
      id: 4,
      name: "Artisan Truffle Collection",
      collection: "Artisan Truffles",
      price: 4599,
      originalPrice: null,
      image: "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
      rating: 5.0,
      reviews: 203,
      bestseller: true,
      description: "15 unique handcrafted truffles with innovative flavor combinations",
    },
    {
      id: 5,
      name: "Dark Chocolate Bar Set",
      collection: "Dark Elegance",
      price: 2349,
      originalPrice: 2699,
      image: "/dark-chocolate-collection-luxury-packaging.jpg",
      rating: 4.7,
      reviews: 74,
      bestseller: false,
      description: "3 premium dark chocolate bars with different cocoa percentages",
    },
    {
      id: 6,
      name: "Seasonal Berry Collection",
      collection: "White Luxury",
      price: 3999,
      originalPrice: null,
      image: "/white-chocolate-bonbons-with-berry-decorations.jpg",
      rating: 4.8,
      reviews: 92,
      bestseller: false,
      premium: false,
      description: "Limited edition white chocolates with seasonal berry infusions",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Shop Premium Chocolates
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our complete collection of handcrafted artisan chocolates, each piece a testament to our commitment
            to excellence and flavor.
          </p>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" className="border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-maroon-200">
                  <SelectValue placeholder="Collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Collections</SelectItem>
                  <SelectItem value="dark">Dark Elegance</SelectItem>
                  <SelectItem value="milk">Milk Harmony</SelectItem>
                  <SelectItem value="white">White Luxury</SelectItem>
                  <SelectItem value="artisan">Artisan Truffles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-maroon-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-maroon-200 rounded-md w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="text-maroon-700 hover:bg-maroon-50 flex-1 sm:flex-none">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-maroon-700 hover:bg-maroon-50 flex-1 sm:flex-none">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.bestseller && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold">
                        <Star className="h-3 w-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                    {product.originalPrice && <Badge className="bg-red-500 text-white font-semibold">Sale</Badge>}
                    {product.premium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold">
                        <Crown className="w-3 h-3 mr-1" />
                        PREMIUM
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-4 right-4 text-white hover:text-red-400 hover:bg-white/20"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Quick Add Button */}
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-maroon-800 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Quick Add
                  </Button>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs text-maroon-600 border-maroon-200">
                      {product.collection}
                    </Badge>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-maroon-800 mb-2 group-hover:text-maroon-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl font-bold text-maroon-800">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="text-sm sm:text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-maroon-700 to-maroon-600 hover:from-maroon-800 hover:to-maroon-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-maroon-200 text-maroon-700 hover:bg-maroon-50 px-8 bg-transparent"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-maroon-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Free Shipping",
                description: "On orders over ₹6,249 worldwide",
                icon: "🚚",
              },
              {
                title: "Premium Quality",
                description: "Handcrafted with finest ingredients",
                icon: "⭐",
              },
              {
                title: "Gift Wrapping",
                description: "Beautiful packaging for every occasion",
                icon: "🎁",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-maroon-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Our chocolate experts are here to help you find the perfect selection for any occasion.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Contact Our Experts
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
