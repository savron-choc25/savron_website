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
import { getOptimizedImageUrl } from "@/lib/image-utils"
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
        const response = await fetch(`/api/products/${productId}`)

        if (response.ok) {
          const foundProduct = await response.json()
          setProduct(foundProduct)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    cartUtils.addToCart(dispatch, {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      description: product.description,
      inStock: product.inStock,
      quantity: quantity,
    })

    toast({
      title: "Product successfully added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const nextImage = () => {
    if (!product?.images?.length) return
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    if (!product?.images?.length) return
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

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

  if (!product) {
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
            <span className="text-primary">{product.category}</span>
            <span>/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-2xl">
              <img 
                src={getOptimizedImageUrl(product.images[selectedImage], {
                  width: 1200,
                  height: 1200,
                  fit: 'contain',
                })} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
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
                {product.premium && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    PREMIUM
                  </Badge>
                )}
                {product.badges && product.badges.map((badge, index) => (
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
              {product.images.map((image, index) => (
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
                    src={getOptimizedImageUrl(image, { width: 200, height: 200, fit: 'contain' })} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50 p-1"
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
                {product.category && (
                  <Badge variant="outline" className="border-primary/20 text-primary">
                    {product.category}
                  </Badge>
                )}
                {product.brand && (
                  <Badge variant="outline" className="border-primary/20 text-primary">
                    {product.brand}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-primary font-semibold">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-primary/70">({product.reviewCount} reviews)</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-primary/50 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <Badge className="bg-green-100 text-green-800">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">
                    In Stock ({product.stockCount} available)
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
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{(product.price * quantity).toLocaleString('en-IN')}
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
                      {product.longDescription}
                    </p>
                    <Separator className="my-4" />
                    <h4 className="font-semibold text-primary mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features && product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-primary/80">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {(!product.features || product.features.length === 0) && (
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
                      {product.ingredients && product.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-primary/80">
                          <Leaf className="w-4 h-4 text-green-500" />
                          {ingredient}
                        </li>
                      ))}
                      {(!product.ingredients || product.ingredients.length === 0) && (
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
                    {product.nutrition ? (
                      <div className="space-y-3">
                        {product.nutrition.servingSize && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Serving Size:</span>
                            <span className="text-primary font-medium">{product.nutrition.servingSize}</span>
                          </div>
                        )}
                        {product.nutrition.calories && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Calories:</span>
                            <span className="text-primary font-medium">{product.nutrition.calories}</span>
                          </div>
                        )}
                        {product.nutrition.fat && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Total Fat:</span>
                            <span className="text-primary font-medium">{product.nutrition.fat}</span>
                          </div>
                        )}
                        {product.nutrition.saturatedFat && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Saturated Fat:</span>
                            <span className="text-primary font-medium">{product.nutrition.saturatedFat}</span>
                          </div>
                        )}
                        {product.nutrition.carbohydrates && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Carbohydrates:</span>
                            <span className="text-primary font-medium">{product.nutrition.carbohydrates}</span>
                          </div>
                        )}
                        {product.nutrition.sugar && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Sugar:</span>
                            <span className="text-primary font-medium">{product.nutrition.sugar}</span>
                          </div>
                        )}
                        {product.nutrition.protein && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Protein:</span>
                            <span className="text-primary font-medium">{product.nutrition.protein}</span>
                          </div>
                        )}
                        {product.nutrition.sodium && (
                          <div className="flex justify-between">
                            <span className="text-primary/80">Sodium:</span>
                            <span className="text-primary font-medium">{product.nutrition.sodium}</span>
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
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review) => (
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
