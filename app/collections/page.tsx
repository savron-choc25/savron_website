"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart, cartUtils } from "@/contexts/CartContext"
import { useToast } from "@/contexts/ToastContext"
import Link from "next/link"
import { products as defaultProducts } from "@/data/products"
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ChevronRight, 
  Crown, 
  Sparkles, 
  Zap,
  Instagram,
  Facebook,
  Twitter,
  Gift,
  Award,
  Filter,
  Search,
  Grid,
  List,
  Loader2
} from "lucide-react"

export default function CollectionsPage() {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
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

      // Combine default products with admin products
      const allProducts = [...convertedDefaultProducts, ...adminProducts]
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

  const filteredProducts = products.filter(product => {
    return selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory
  })

  const categories = [
    { id: 'all', name: 'All Collections', count: products.length },
    { id: 'dark chocolate', name: 'Dark Chocolate', count: products.filter(p => p.category.toLowerCase() === 'dark chocolate').length },
    { id: 'milk chocolate', name: 'Milk Chocolate', count: products.filter(p => p.category.toLowerCase() === 'milk chocolate').length },
    { id: 'white chocolate', name: 'White Chocolate', count: products.filter(p => p.category.toLowerCase() === 'white chocolate').length },
    { id: 'truffles', name: 'Truffles', count: products.filter(p => p.category.toLowerCase() === 'truffles').length },
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-amber-500/5"></div>
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="w-fit bg-gradient-to-r from-primary/15 to-accent/15 border-primary/30 text-primary font-semibold px-6 py-3 mb-8 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Collections
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-amber-600 bg-clip-text text-transparent">
                Chocolate
              </span>
              <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Collections
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Discover our carefully curated chocolate collections, each crafted with passion and precision to deliver an
              extraordinary tasting experience that celebrates the finest ingredients from around the world.
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-primary/20 bg-white/80 backdrop-blur-sm text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and View Controls */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-primary/10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-white/80 text-primary border-primary/20 hover:bg-primary/10"
                  } rounded-full px-6 py-2 transition-all duration-300`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/80 rounded-xl p-1">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-lg"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-lg"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid/List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
              <Card
                key={product._id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/80 backdrop-blur-sm rounded-2xl"
              >
                  <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={product.inStock ? "default" : "destructive"}
                        className={
                          product.inStock
                            ? "bg-gradient-to-r from-green-600 to-green-800 text-white shadow-xl font-semibold px-3 py-1"
                            : "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-xl font-semibold px-3 py-1"
                        }
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    </div>
                    
                    {/* Premium Badge */}
                    {product.premium && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold shadow-lg">
                          <Crown className="w-3 h-3 mr-1" />
                          PREMIUM
                        </Badge>
                      </div>
                    )}
                    
                    {/* Heart Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                      className="absolute top-3 right-3 text-white hover:text-red-400 hover:bg-white/20"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-lg font-semibold text-accent">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-light">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4
                                ? "fill-accent text-accent"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {4.8} (128 reviews)
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                    </div>
                    
                    <Link href={`/view-details?id=${product._id}`}>
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="flex items-center justify-center">
                          Explore Collection
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-square md:aspect-auto overflow-hidden relative">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Stock Status Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={product.inStock ? "default" : "destructive"}
                          className={
                            product.inStock
                              ? "bg-gradient-to-r from-green-600 to-green-800 text-white shadow-xl font-semibold px-3 py-1"
                              : "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-xl font-semibold px-3 py-1"
                          }
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                      
                      {/* Premium Badge */}
                      {product.premium && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold shadow-lg">
                            <Crown className="w-3 h-3 mr-1" />
                            PREMIUM
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-xl font-semibold text-accent">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed font-light">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4
                                  ? "fill-accent text-accent"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {4.8} (128 reviews)
                        </span>
                  </div>
                      
                  <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                        <Link href={`/view-details?id=${product._id}`}>
                          <Button
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          >
                            <span className="flex items-center justify-center">
                      Explore Collection
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </span>
                    </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-amber-50/30 to-orange-50/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/12 to-accent/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="w-fit bg-gradient-to-r from-primary/15 to-accent/15 border-primary/30 text-primary font-semibold px-6 py-3 mb-8 shadow-lg"
            >
              <Gift className="w-4 h-4 mr-2" />
              Special Offer
            </Badge>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-orange-600 bg-clip-text text-transparent">
                Can't Decide?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Try our curated tasting box featuring selections from all our premium collections.
              Perfect for discovering your new favorite flavors.
          </p>
            
          <Button
            size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-lg"
          >
              <Gift className="w-5 h-5 mr-3" />
            Order Tasting Box
              <ChevronRight className="w-5 h-5 ml-3" />
          </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}