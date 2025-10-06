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

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Dark Chocolate Truffles Collection",
    price: 3849,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    stockCount: 15,
    category: "Dark Chocolate",
    brand: "Savron Artisan",
    description: "Indulge in our signature collection of handcrafted dark chocolate truffles. Each piece is carefully crafted using premium Belgian cocoa and traditional techniques passed down through generations of master chocolatiers.",
    longDescription: "Our Premium Dark Chocolate Truffles Collection represents the pinnacle of chocolate craftsmanship. Made with the finest 70% Belgian dark chocolate, each truffle is hand-rolled and finished with a delicate dusting of premium cocoa powder. The collection features three distinct varieties: Classic Dark, Sea Salt Caramel, and Espresso Infused. Each truffle is individually wrapped in gold foil and presented in an elegant gift box, making it perfect for gifting or personal indulgence.",
    features: [
      "Made with 70% Belgian dark chocolate",
      "Handcrafted by master chocolatiers",
      "Individually wrapped in gold foil",
      "Premium gift box packaging",
      "No artificial preservatives",
      "Suitable for vegetarians"
    ],
    ingredients: [
      "Belgian Dark Chocolate (70% cocoa)",
      "Fresh Cream",
      "Butter",
      "Vanilla Extract",
      "Sea Salt (for Sea Salt Caramel variety)",
      "Espresso (for Espresso Infused variety)",
      "Premium Cocoa Powder"
    ],
    nutrition: {
      servingSize: "1 truffle (15g)",
      calories: 85,
      fat: "6g",
      saturatedFat: "4g",
      carbohydrates: "7g",
      sugar: "5g",
      protein: "1g",
      sodium: "5mg"
    },
    images: [
      "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
      "/dark-chocolate-collection-luxury-packaging.jpg",
      "/milk-chocolate-truffles-with-gold-accents.jpg",
      "/white-chocolate-bonbons-with-berry-decorations.jpg"
    ],
    video: "/chocolate-making-process.mp4",
    badges: ["Premium", "Handcrafted", "Award Winner"],
    premium: true,
    shipping: {
      standard: "5-7 business days",
      express: "2-3 business days",
      overnight: "Next business day"
    },
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2024-01-15",
        comment: "Absolutely divine! The dark chocolate is rich and smooth, and the packaging is beautiful. Perfect for gifting."
      },
      {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        date: "2024-01-10",
        comment: "These truffles are incredible. The sea salt caramel variety is my favorite. Worth every penny!"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        rating: 4,
        date: "2024-01-08",
        comment: "High quality chocolate with excellent presentation. The espresso variety has a perfect coffee flavor."
      }
    ]
  },
  {
    id: 2,
    name: "Artisan Milk Chocolate Collection",
    price: 3199,
    originalPrice: 3749,
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 22,
    category: "Milk Chocolate",
    brand: "Savron Artisan",
    description: "Creamy and smooth milk chocolate collection featuring our finest Belgian milk chocolate. Perfect for those who prefer a milder, creamier chocolate experience.",
    longDescription: "Our Artisan Milk Chocolate Collection showcases the perfect balance of rich cocoa and creamy milk. Made with premium Belgian milk chocolate, this collection includes classic milk chocolate squares, hazelnut pralines, and vanilla cream centers. Each piece is carefully crafted to deliver a smooth, velvety texture that melts perfectly on your tongue.",
    features: [
      "Made with premium Belgian milk chocolate",
      "Creamy and smooth texture",
      "Variety of flavors and fillings",
      "Elegant presentation box",
      "No artificial flavors",
      "Gluten-free options available"
    ],
    ingredients: [
      "Belgian Milk Chocolate (35% cocoa)",
      "Fresh Milk",
      "Sugar",
      "Cocoa Butter",
      "Hazelnuts (for praline variety)",
      "Vanilla Extract",
      "Lecithin"
    ],
    nutrition: {
      servingSize: "1 piece (12g)",
      calories: 65,
      fat: "4g",
      saturatedFat: "2.5g",
      carbohydrates: "6g",
      sugar: "5g",
      protein: "1g",
      sodium: "3mg"
    },
    images: [
      "/milk-chocolate-truffles-with-gold-accents.jpg",
      "/dark-chocolate-collection-luxury-packaging.jpg",
      "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
      "/white-chocolate-bonbons-with-berry-decorations.jpg"
    ],
    video: "/milk-chocolate-process.mp4",
    badges: ["Creamy", "Premium", "Artisan"],
    premium: false,
    shipping: {
      standard: "5-7 business days",
      express: "2-3 business days",
      overnight: "Next business day"
    },
    reviews: [
      {
        id: 1,
        name: "David Wilson",
        rating: 5,
        date: "2024-01-12",
        comment: "The milk chocolate is so creamy and smooth. The hazelnut pralines are my absolute favorite!"
      },
      {
        id: 2,
        name: "Lisa Thompson",
        rating: 4,
        date: "2024-01-09",
        comment: "Great quality milk chocolate. Perfect for sharing with family and friends."
      }
    ]
  },
  {
    id: 3,
    name: "White Chocolate Delights",
    price: 3499,
    originalPrice: 3999,
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockCount: 18,
    category: "White Chocolate",
    brand: "Savron Artisan",
    description: "Luxurious white chocolate selection with delicate flavors and premium ingredients. A sophisticated choice for white chocolate connoisseurs.",
    longDescription: "Our White Chocolate Delights collection features the finest white chocolate made with premium cocoa butter and vanilla. This collection includes classic white chocolate bars, raspberry-filled bonbons, and coconut truffles. Each piece is crafted with attention to detail, offering a rich, creamy texture and sophisticated flavor profile.",
    features: [
      "Premium white chocolate with vanilla",
      "Delicate and sophisticated flavors",
      "Hand-decorated pieces",
      "Luxury gift packaging",
      "No artificial colors",
      "Kosher certified"
    ],
    ingredients: [
      "Cocoa Butter",
      "Sugar",
      "Milk Powder",
      "Vanilla Extract",
      "Raspberry Puree (for raspberry variety)",
      "Coconut (for coconut variety)",
      "Natural Flavoring"
    ],
    nutrition: {
      servingSize: "1 piece (10g)",
      calories: 55,
      fat: "3.5g",
      saturatedFat: "2g",
      carbohydrates: "5g",
      sugar: "4g",
      protein: "0.5g",
      sodium: "2mg"
    },
    images: [
      "/white-chocolate-bonbons-with-berry-decorations.jpg",
      "/milk-chocolate-truffles-with-gold-accents.jpg",
      "/dark-chocolate-collection-luxury-packaging.jpg",
      "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg"
    ],
    video: "/white-chocolate-process.mp4",
    badges: ["Luxury", "Hand-decorated", "Premium"],
    premium: true,
    shipping: {
      standard: "5-7 business days",
      express: "2-3 business days",
      overnight: "Next business day"
    },
    reviews: [
      {
        id: 1,
        name: "Jennifer Martinez",
        rating: 5,
        date: "2024-01-14",
        comment: "The white chocolate is absolutely divine. The raspberry filling is the perfect complement."
      },
      {
        id: 2,
        name: "Robert Brown",
        rating: 4,
        date: "2024-01-11",
        comment: "Beautiful presentation and excellent quality. The coconut truffles are amazing."
      }
    ]
  },
  {
    id: 4,
    name: "Gourmet Chocolate Bars Collection",
    price: 2999,
    originalPrice: 3499,
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
    stockCount: 25,
    category: "Chocolate Bars",
    brand: "Savron Artisan",
    description: "Premium chocolate bars with unique flavor combinations and artisanal craftsmanship. Perfect for chocolate enthusiasts who appreciate quality and innovation.",
    longDescription: "Our Gourmet Chocolate Bars Collection features innovative flavor combinations and premium ingredients. Each bar is carefully crafted with attention to texture and taste, offering a unique chocolate experience. The collection includes sea salt caramel, espresso bean, and orange zest varieties, each with its own distinct character and flavor profile.",
    features: [
      "Unique flavor combinations",
      "Artisanal craftsmanship",
      "Premium ingredients",
      "Eco-friendly packaging",
      "Fair trade certified",
      "Hand-wrapped bars"
    ],
    ingredients: [
      "Belgian Dark Chocolate (60% cocoa)",
      "Sea Salt",
      "Caramel",
      "Espresso Beans",
      "Orange Zest",
      "Cocoa Butter",
      "Natural Flavoring"
    ],
    nutrition: {
      servingSize: "1 bar (25g)",
      calories: 140,
      fat: "9g",
      saturatedFat: "5g",
      carbohydrates: "12g",
      sugar: "8g",
      protein: "2g",
      sodium: "15mg"
    },
    images: [
      "/dark-chocolate-collection-luxury-packaging.jpg",
      "/milk-chocolate-truffles-with-gold-accents.jpg",
      "/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg",
      "/white-chocolate-bonbons-with-berry-decorations.jpg"
    ],
    video: "/chocolate-bars-process.mp4",
    badges: ["Gourmet", "Artisanal", "Fair Trade"],
    premium: false,
    shipping: {
      standard: "5-7 business days",
      express: "2-3 business days",
      overnight: "Next business day"
    },
    reviews: [
      {
        id: 1,
        name: "Amanda Davis",
        rating: 5,
        date: "2024-01-13",
        comment: "The sea salt caramel bar is incredible! Perfect balance of sweet and salty."
      },
      {
        id: 2,
        name: "Christopher Lee",
        rating: 4,
        date: "2024-01-10",
        comment: "Great variety of flavors. The espresso bean bar has a wonderful coffee kick."
      }
    ]
  }
]

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id)
}
