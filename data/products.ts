export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  category: string
  brand: string
  description: string
  longDescription: string
  features: string[]
  ingredients: string[]
  nutrition: {
    servingSize: string
    calories: number
    fat: string
    saturatedFat: string
    carbohydrates: string
    sugar: string
    protein: string
    sodium: string
  }
  images: string[]
  video: string
  badges: string[]
  premium: boolean
  shipping: {
    standard: string
    express: string
    overnight: string
  }
  reviews: {
    id: number
    name: string
    rating: number
    date: string
    comment: string
  }[]
}

// Products are loaded from MongoDB via /api/products (admin dashboard)
export const products: Product[] = []
