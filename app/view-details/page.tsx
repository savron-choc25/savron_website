"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/Navbar"
import { useCart, cartUtils } from "@/contexts/CartContext"
import { useToast } from "@/contexts/ToastContext"
import { getProductById, Product } from "@/data/products"
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Leaf,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  ZoomIn
} from "lucide-react"

export default function ProductDetailsPage() {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Get product ID from URL parameters
  const productId = searchParams.get('id')
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        let foundProduct = null
        
        // Check if it's a default product ID (format: default-X)
        if (productId.startsWith('default-')) {
          const numericId = parseInt(productId.replace('default-', ''))
          foundProduct = getProductById(numericId)
        } else {
          // Try to fetch from admin products API first
          try {
            const response = await fetch('/api/products')
            if (response.ok) {
              const adminProducts = await response.json()
              foundProduct = adminProducts.find((p: any) => p._id === productId)
            }
          } catch (error) {
            console.error('Failed to fetch admin products:', error)
          }
          
          // If not found in admin products, try default products
          if (!foundProduct) {
            const numericId = parseInt(productId)
            if (!isNaN(numericId)) {
              foundProduct = getProductById(numericId)
            }
          }
        }
        
        setProduct(foundProduct || null)
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  // Use the found product or default to first product
  const currentProduct = product || getProductById(1)!

  const handleAddToCart = () => {
    cartUtils.addToCart(dispatch, {
      id: currentProduct._id || currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.images?.[0] || "/placeholder.svg",
      description: currentProduct.description,
      inStock: currentProduct.inStock
    })
    
    toast({
      title: "Product successfully added to cart",
      description: `${currentProduct.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % currentProduct.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff5d6]">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-primary">Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if product not found
  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-[#fff5d6]">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
                <p className="text-primary/70 mb-6">The product you're looking for doesn't exist.</p>
                <a href="/collections" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Back to Collections
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-[#fff5d6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-primary/70">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="/collections" className="hover:text-primary">Collections</a>
            <span>/</span>
            <span className="text-primary">{currentProduct.category}</span>
            <span>/</span>
            <span className="text-primary font-medium">{currentProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
              <img 
                src={currentProduct.images[selectedImage]} 
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {currentProduct.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {currentProduct.premium && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    PREMIUM
                  </Badge>
                )}
                {currentProduct.badges && currentProduct.badges.map((badge, index) => (
                  <Badge key={index} className="bg-accent text-white shadow-lg">
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Zoom Button */}
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300">
                <ZoomIn className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? "border-primary shadow-lg" 
                      : "border-primary/20 hover:border-primary/50"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Our Artisan Process
              </h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                  <p className="text-primary/70">Video: Chocolate Making Process</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {currentProduct.category && (
                  <Badge variant="outline" className="border-primary/20 text-primary">
                    {currentProduct.category}
                  </Badge>
                )}
                {currentProduct.brand && (
                  <Badge variant="outline" className="border-primary/20 text-primary">
                    {currentProduct.brand}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
                {currentProduct.name}
              </h1>
              
              {/* Rating */}
              {currentProduct.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(currentProduct.rating) 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-primary font-semibold">{currentProduct.rating}</span>
                  {currentProduct.reviewCount && (
                    <span className="text-primary/70">({currentProduct.reviewCount} reviews)</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">₹{currentProduct.price.toLocaleString('en-IN')}</span>
                {currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price && (
                  <>
                    <span className="text-xl text-primary/50 line-through">₹{currentProduct.originalPrice.toLocaleString('en-IN')}</span>
                    <Badge className="bg-green-100 text-green-800">
                      Save ₹{(currentProduct.originalPrice - currentProduct.price).toLocaleString('en-IN')}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {currentProduct.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">
                    In Stock ({currentProduct.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-primary font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 p-0 border-primary/20 hover:bg-primary/10"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-lg font-semibold text-primary w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 p-0 border-primary/20 hover:bg-primary/10"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={handleAddToCart}
                  disabled={!currentProduct.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{(currentProduct.price * quantity).toLocaleString('en-IN')}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-primary/20 px-4 ${
                    isWishlisted 
                      ? "bg-red-50 border-red-200 text-red-600" 
                      : "text-primary hover:bg-primary/10"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 text-primary hover:bg-primary/10 px-4"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-primary/20">
              <div className="text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-primary/70">Free Shipping</p>
                <p className="text-xs text-primary/50">Over ₹4,199</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-primary/70">Secure Payment</p>
                <p className="text-xs text-primary/50">SSL Encrypted</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-primary/70">30-Day Returns</p>
                <p className="text-xs text-primary/50">No Questions</p>
              </div>
            </div>

            {/* Product Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-primary/20">
                <TabsTrigger value="description" className="text-primary data-[state=active]:bg-primary/10">
                  Description
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="text-primary data-[state=active]:bg-primary/10">
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="text-primary data-[state=active]:bg-primary/10">
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-primary data-[state=active]:bg-primary/10">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-6">
                    <p className="text-primary/80 leading-relaxed mb-4">
                      {currentProduct.longDescription}
                    </p>
                    <Separator className="my-4" />
                    <h4 className="font-semibold text-primary mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {currentProduct.features && currentProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-primary/80">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {(!currentProduct.features || currentProduct.features.length === 0) && (
                        <li className="text-primary/60 italic">No features listed</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-primary mb-4">Ingredients:</h4>
                    <ul className="space-y-2">
                      {currentProduct.ingredients && currentProduct.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-primary/80">
                          <Leaf className="w-4 h-4 text-green-500" />
                          {ingredient}
                        </li>
                      ))}
                      {(!currentProduct.ingredients || currentProduct.ingredients.length === 0) && (
                        <li className="text-primary/60 italic">No ingredients listed</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-primary mb-4">Nutritional Information:</h4>
                    {currentProduct.nutrition ? (
                      <div className="space-y-3">
                        {currentProduct.nutrition.servingSize && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Serving Size:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.servingSize}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.calories && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Calories:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.calories}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.fat && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Total Fat:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.fat}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.saturatedFat && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Saturated Fat:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.saturatedFat}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.carbohydrates && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Carbohydrates:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.carbohydrates}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.sugar && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Sugar:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.sugar}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.protein && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Protein:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.protein}</span>
                          </div>
                        )}
                        {currentProduct.nutrition.sodium && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Sodium:</span>
                            <span className="text-primary font-medium">{currentProduct.nutrition.sodium}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-primary/60 italic">No nutritional information available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
                        currentProduct.reviews.map((review) => (
                        <div key={review.id} className="border-b border-primary/10 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-primary">{review.name}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < review.rating 
                                        ? "fill-amber-400 text-amber-400" 
                                        : "text-gray-300"
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-primary/50 text-sm">{review.date}</span>
                          </div>
                          <p className="text-primary/80">{review.comment}</p>
                        </div>
                        ))
                      ) : (
                        <p className="text-primary/60 italic text-center py-8">No reviews available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
