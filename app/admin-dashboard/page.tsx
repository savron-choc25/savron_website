"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useToast } from "@/contexts/ToastContext"
import { 
  Plus, 
  Package, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Save,
  X,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Loader2
} from "lucide-react"

interface Product {
  _id?: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  images: string[]
  ingredients: string[]
  allergens: string[]
  features?: string[]
  weight: string
  origin: string
  premium: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("add-product")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inStock: true,
    premium: false,
    images: [] as File[],
    ingredients: [""],
    allergens: [""],
    features: [""],
    weight: "",
    origin: ""
  })
  
  // Form state for adding new product
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inStock: true,
    premium: false,
    images: [] as File[],
    ingredients: [""],
    allergens: [""],
    features: [""],
    weight: "",
    origin: ""
  })
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    const adminSession = localStorage.getItem("adminSession")
    
    if (adminLoggedIn === "true" && adminSession) {
      // Check if session is not expired (24 hours)
      const sessionTime = parseInt(adminSession)
      const currentTime = Date.now()
      const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours
      
      if (currentTime - sessionTime < sessionDuration) {
        setIsAuthenticated(true)
        fetchProducts()
      } else {
        // Session expired
        localStorage.removeItem("adminLoggedIn")
        localStorage.removeItem("adminSession")
        router.push("/admin-login")
      }
    } else {
      router.push("/admin-login")
    }
    setCheckingAuth(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminSession")
    router.push("/admin-login")
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
          variant: "success"
        })
        // Refresh the products list
        fetchProducts()
      } else {
        throw new Error('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      })
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        throw new Error('Failed to fetch products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }))
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    try {
      setUploadingImages(true)
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        return data.imageUrl
      })

      const urls = await Promise.all(uploadPromises)
      setUploadedImageUrls(prev => [...prev, ...urls])
      
      toast({
        title: "Images Uploaded Successfully",
        description: `${files.length} image(s) uploaded to Cloudinary`,
        variant: "success",
      })
    } catch (error) {
      console.error('Error uploading images:', error)
      toast({
        title: "Upload Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  const addArrayField = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""]
    }))
  }

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: string, i: number) => i !== index)
    }))
  }

  // Edit functions
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      inStock: product.inStock,
      premium: product.premium,
      images: [],
      ingredients: product.ingredients && product.ingredients.length > 0 ? product.ingredients : [""],
      allergens: product.allergens && product.allergens.length > 0 ? product.allergens : [""],
      features: product.features && product.features.length > 0 ? product.features : [""],
      weight: product.weight || "",
      origin: product.origin || ""
    })
    setActiveTab("add-product")
  }

  const handleEditInputChange = (field: string, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditArrayFieldChange = (field: string, index: number, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }))
  }

  const addEditArrayField = (field: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""]
    }))
  }

  const removeEditArrayField = (field: string, index: number) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: string, i: number) => i !== index)
    }))
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingProduct) return

    // Validation
    if (!editFormData.name.trim() || !editFormData.description.trim() || !editFormData.price || !editFormData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      setSubmitting(true)

      const productData = {
        name: editFormData.name,
        description: editFormData.description,
        price: parseFloat(editFormData.price),
        category: editFormData.category,
        inStock: editFormData.inStock,
        premium: editFormData.premium,
        images: editingProduct.images, // Keep existing images for now
        ingredients: editFormData.ingredients.filter(ing => ing.trim() !== ""),
        allergens: editFormData.allergens.filter(all => all.trim() !== ""),
        features: editFormData.features.filter(feat => feat.trim() !== ""),
        weight: editFormData.weight,
        origin: editFormData.origin,
        updatedAt: new Date().toISOString()
      }

      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "default"
        })
        
        // Reset form and fetch updated products
        setEditingProduct(null)
        setEditFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          inStock: true,
          premium: false,
          images: [],
          ingredients: [""],
          allergens: [""],
          features: [""],
          weight: "",
          origin: ""
        })
        fetchProducts()
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: errorData.error || "Failed to update product",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setEditFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      inStock: true,
      premium: false,
      images: [],
      ingredients: [""],
      allergens: [""],
      features: [""],
      weight: "",
      origin: ""
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      setSubmitting(true)
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        inStock: formData.inStock,
        premium: formData.premium,
        images: uploadedImageUrls, // Use uploaded Cloudinary URLs
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ""),
        allergens: formData.allergens.filter(all => all.trim() !== ""),
        features: formData.features.filter(feat => feat.trim() !== ""),
        weight: formData.weight,
        origin: formData.origin,
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          inStock: true,
          premium: false,
          images: [],
          ingredients: [""],
          allergens: [""],
          weight: "",
          origin: ""
        })
        setUploadedImageUrls([]) // Clear uploaded images

        toast({
          title: "Product Added Successfully",
          description: `${productData.name} has been added to the product catalog`,
          variant: "success"
        })

        // Refresh products list
        await fetchProducts()
        setActiveTab("products")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create product",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "Dark Chocolate", "Milk Chocolate", "White Chocolate", "Truffles", "Gift Sets"]

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#fff5d6] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your chocolate products and track inventory
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-primary">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">{products.filter(p => p.inStock).length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-blue-600">{new Set(products.map(p => p.category)).size}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                  <p className="text-2xl font-bold text-purple-600">₹{(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0)}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-product" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Manage Products
            </TabsTrigger>
          </TabsList>

          {/* Add Product Tab */}
          <TabsContent value="add-product">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingProduct ? (
                    <>
                      <Edit className="h-5 w-5" />
                      Edit Product: {editingProduct.name}
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Add New Product
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingProduct ? handleEditSubmit : handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={editingProduct ? editFormData.name : formData.name}
                        onChange={(e) => editingProduct ? handleEditInputChange("name", e.target.value) : handleInputChange("name", e.target.value)}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={editingProduct ? editFormData.price : formData.price}
                        onChange={(e) => editingProduct ? handleEditInputChange("price", e.target.value) : handleInputChange("price", e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={editingProduct ? editFormData.description : formData.description}
                      onChange={(e) => editingProduct ? handleEditInputChange("description", e.target.value) : handleInputChange("description", e.target.value)}
                      placeholder="Enter product description"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={editingProduct ? editFormData.category : formData.category} onValueChange={(value) => editingProduct ? handleEditInputChange("category", value) : handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dark Chocolate">Dark Chocolate</SelectItem>
                          <SelectItem value="Milk Chocolate">Milk Chocolate</SelectItem>
                          <SelectItem value="White Chocolate">White Chocolate</SelectItem>
                          <SelectItem value="Truffles">Truffles</SelectItem>
                          <SelectItem value="Gift Sets">Gift Sets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="premium"
                          checked={editingProduct ? editFormData.premium : formData.premium}
                          onChange={(e) => editingProduct ? handleEditInputChange("premium", e.target.checked) : handleInputChange("premium", e.target.checked)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="premium" className="text-sm font-medium">
                          Premium Product
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500">Premium products will be featured in the Savron Premium section</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={editingProduct ? editFormData.weight : formData.weight}
                        onChange={(e) => editingProduct ? handleEditInputChange("weight", e.target.value) : handleInputChange("weight", e.target.value)}
                        placeholder="e.g., 250g"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        id="origin"
                        value={editingProduct ? editFormData.origin : formData.origin}
                        onChange={(e) => editingProduct ? handleEditInputChange("origin", e.target.value) : handleInputChange("origin", e.target.value)}
                        placeholder="e.g., Belgium"
                      />
                    </div>
                  </div>

                  {/* Images Upload */}
                  <div className="space-y-4">
                    <Label>Product Images & Videos</Label>
                    
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="image-upload"
                        disabled={uploadingImages}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {uploadingImages ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                            <p className="text-sm text-gray-600">Uploading to Cloudinary...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-600">
                              Click to upload images or videos
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supports: JPG, PNG, GIF, MP4, MOV (Max 5MB each)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Uploaded Images Preview */}
                    {uploadedImageUrls.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Media ({uploadedImageUrls.length})</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border">
                                {url.includes('video') ? (
                                  <video
                                    src={url}
                                    className="w-full h-full object-cover"
                                    controls
                                  />
                                ) : (
                                  <img
                                    src={url}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-2">
                    <Label>Ingredients</Label>
                    {editingProduct ? editFormData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={ingredient}
                          onChange={(e) => handleEditArrayFieldChange("ingredients", index, e.target.value)}
                          placeholder="Ingredient"
                        />
                        {editFormData.ingredients.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEditArrayField("ingredients", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )) : formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={ingredient}
                          onChange={(e) => handleArrayFieldChange("ingredients", index, e.target.value)}
                          placeholder="Ingredient"
                        />
                        {formData.ingredients.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField("ingredients", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editingProduct ? addEditArrayField("ingredients") : addArrayField("ingredients")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Ingredient
                    </Button>
                  </div>

                  {/* Allergens */}
                  <div className="space-y-2">
                    <Label>Allergens</Label>
                    {editingProduct ? editFormData.allergens.map((allergen, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={allergen}
                          onChange={(e) => handleEditArrayFieldChange("allergens", index, e.target.value)}
                          placeholder="Allergen"
                        />
                        {editFormData.allergens.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEditArrayField("allergens", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )) : formData.allergens.map((allergen, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={allergen}
                          onChange={(e) => handleArrayFieldChange("allergens", index, e.target.value)}
                          placeholder="Allergen"
                        />
                        {formData.allergens.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField("allergens", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editingProduct ? addEditArrayField("allergens") : addArrayField("allergens")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Allergen
                    </Button>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <Label>Key Features</Label>
                    {editingProduct ? editFormData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleEditArrayFieldChange("features", index, e.target.value)}
                          placeholder="Key feature"
                        />
                        {editFormData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEditArrayField("features", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )) : formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleArrayFieldChange("features", index, e.target.value)}
                          placeholder="Key feature"
                        />
                        {formData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField("features", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editingProduct ? addEditArrayField("features") : addArrayField("features")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={editingProduct ? editFormData.inStock : formData.inStock}
                      onChange={(e) => editingProduct ? handleEditInputChange("inStock", e.target.checked) : handleInputChange("inStock", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {editingProduct ? "Updating Product..." : "Adding Product..."}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingProduct ? "Update Product" : "Add Product"}
                        </>
                      )}
                    </Button>
                    {editingProduct && (
                      <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                        <X className="h-4 w-4 mr-2" />
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Management Tab */}
          <TabsContent value="products">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Management
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading products...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{product.name}</h3>
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                              <Badge variant="outline">{product.category}</Badge>
                              {product.premium && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold">
                                  PREMIUM
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Price: ₹{product.price.toLocaleString('en-IN')}</span>
                              {product.weight && <span>Weight: {product.weight}</span>}
                              {product.origin && <span>Origin: {product.origin}</span>}
                              <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                            </div>
                            {product.ingredients && product.ingredients.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium">Ingredients:</p>
                                <p className="text-sm text-gray-600">{product.ingredients.join(", ")}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteProduct(product._id!)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredProducts.length === 0 && !loading && (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No products found matching your criteria</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  )
}
