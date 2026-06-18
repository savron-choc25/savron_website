import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Filter, Grid, List, Crown, Loader2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart, cartUtils } from "@/contexts/CartContext"
import { useToast } from "@/contexts/ToastContext"
import { getOptimizedImageUrl } from "@/lib/image-utils"

export default function ShopPage() {
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
      if (response.ok) {
        const data = await response.json()
        setProducts(
          data.map((product: any) => ({
            id: product._id,
            name: product.name,
            collection: product.category,
            price: product.price,
            originalPrice: null,
            image: product.images?.[0] || '/placeholder.svg',
            rating: 4.8,
            reviews: 0,
            bestseller: false,
            premium: product.premium,
            description: product.description,
            inStock: product.inStock,
          }))
        )
      } else {
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: any) => {
    cartUtils.addToCart(dispatch, {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      inStock: product.inStock ?? true
    })
    toast({
      title: "Product successfully added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-primary">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-serif font-bold text-primary mb-2">No products available</p>
              <p className="text-gray-600">Products added from the admin dashboard will appear here.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={getOptimizedImageUrl(product.image || "/placeholder.svg", {
                      width: 800,
                      height: 800,
                      fit: 'contain',
                    })}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />

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
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:bg-white/80"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Quick Add Button */}
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
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
          )}
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
