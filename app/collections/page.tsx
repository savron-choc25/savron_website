"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart, cartUtils } from "@/contexts/CartContext"
import Link from "next/link"
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
  List
} from "lucide-react"
import { useState } from "react"

export default function CollectionsPage() {
  const { dispatch } = useCart()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleAddToCart = (collection: any) => {
    cartUtils.addToCart(dispatch, {
      id: collection.id,
      name: collection.name,
      price: collection.price || 45,
      image: collection.image,
      description: collection.description,
      inStock: true
    })
    alert(`${collection.name} added to cart!`)
  }

  const collections = [
    {
      id: 1,
      name: "Dark Elegance",
      description: "Rich, intense dark chocolates with cocoa content ranging from 70% to 90%",
      image: "/dark-chocolate-collection-luxury-packaging.jpg",
      products: 12,
      price: "From $45",
      featured: true,
      badge: "Bestseller",
      category: "dark",
      rating: 4.9,
      reviews: 128,
    },
    {
      id: 2,
      name: "Milk Harmony",
      description: "Smooth and creamy milk chocolates with delicate flavor profiles",
      image: "/milk-chocolate-truffles-with-gold-accents.jpg",
      products: 8,
      price: "From $38",
      featured: false,
      badge: "New",
      category: "milk",
      rating: 4.8,
      reviews: 95,
    },
    {
      id: 3,
      name: "White Luxury",
      description: "Premium white chocolates infused with exotic flavors and botanicals",
      image: "/white-chocolate-bonbons-with-berry-decorations.jpg",
      products: 10,
      price: "From $42",
      featured: true,
      badge: "Limited",
      category: "white",
      rating: 4.7,
      reviews: 87,
    },
    {
      id: 4,
      name: "Artisan Truffles",
      description: "Hand-crafted truffles with unique flavor combinations and textures",
      image: "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
      products: 15,
      price: "From $55",
      featured: true,
      badge: "Premium",
      category: "truffles",
      rating: 5.0,
      reviews: 156,
    },
    {
      id: 5,
      name: "Espresso Delight",
      description: "Dark chocolate infused with rich espresso",
      image: "/dark-chocolate-collection-luxury-packaging.jpg",
      products: 6,
      price: "From $35",
      featured: false,
      badge: "Popular",
      category: "dark",
      rating: 4.6,
      reviews: 73,
    },
    {
      id: 6,
      name: "Sea Salt Caramel",
      description: "Smooth caramel with Himalayan sea salt",
      image: "/milk-chocolate-truffles-with-gold-accents.jpg",
      products: 9,
      price: "From $40",
      featured: false,
      badge: "Classic",
      category: "milk",
      rating: 4.8,
      reviews: 112,
    },
    {
      id: 7,
      name: "Raspberry Dream",
      description: "White chocolate with fresh raspberry swirls",
      image: "/white-chocolate-bonbons-with-berry-decorations.jpg",
      products: 7,
      price: "From $38",
      featured: false,
      badge: "Seasonal",
      category: "white",
      rating: 4.5,
      reviews: 64,
    },
    {
      id: 8,
      name: "Hazelnut Crunch",
      description: "Milk chocolate with roasted hazelnuts",
      image: "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
      products: 11,
      price: "From $36",
      featured: false,
      badge: "Nutty",
      category: "milk",
      rating: 4.7,
      reviews: 89,
    },
  ]

  const categories = [
    { id: 'all', name: 'All Collections', count: collections.length },
    { id: 'dark', name: 'Dark Chocolate', count: collections.filter(c => c.category === 'dark').length },
    { id: 'milk', name: 'Milk Chocolate', count: collections.filter(c => c.category === 'milk').length },
    { id: 'white', name: 'White Chocolate', count: collections.filter(c => c.category === 'white').length },
    { id: 'truffles', name: 'Truffles', count: collections.filter(c => c.category === 'truffles').length },
  ]

  const filteredCollections = selectedCategory === 'all' 
    ? collections 
    : collections.filter(c => c.category === selectedCategory)

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
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/80 backdrop-blur-sm rounded-2xl"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Premium Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={collection.badge === "Bestseller" ? "default" : "secondary"}
                        className={
                          collection.badge === "Bestseller"
                            ? "bg-gradient-to-r from-primary to-red-800 text-white shadow-xl font-semibold px-3 py-1"
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
                        {collection.name}
                      </h3>
                      <span className="text-lg font-semibold text-accent">{collection.price}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-light">
                      {collection.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(collection.rating)
                                ? "fill-accent text-accent"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {collection.rating} ({collection.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">{collection.products} products</span>
                    </div>
                    
                    <Link href={`/view-details?id=${collection.id}`}>
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
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-square md:aspect-auto overflow-hidden relative">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Premium Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={collection.badge === "Bestseller" ? "default" : "secondary"}
                          className={
                            collection.badge === "Bestseller"
                              ? "bg-gradient-to-r from-primary to-red-800 text-white shadow-xl font-semibold px-3 py-1"
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
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                          {collection.name}
                        </h3>
                        <span className="text-xl font-semibold text-accent">{collection.price}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed font-light">
                        {collection.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(collection.rating)
                                  ? "fill-accent text-accent"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {collection.rating} ({collection.reviews} reviews)
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{collection.products} products</span>
                        <Link href={`/view-details?id=${collection.id}`}>
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