"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  description: string
  inStock: boolean
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        return {
          ...state,
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      } else {
        const newItems = [...state.items, action.payload]
        return {
          ...state,
          items: newItems,
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id })
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      }
    
    case 'LOAD_CART': {
      return {
        items: action.payload,
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        total: action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Cart utility functions
export const cartUtils = {
  addToCart: (dispatch: React.Dispatch<CartAction>, item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 }
    })
  },
  
  removeFromCart: (dispatch: React.Dispatch<CartAction>, id: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    })
  },
  
  updateQuantity: (dispatch: React.Dispatch<CartAction>, id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    })
  },
  
  clearCart: (dispatch: React.Dispatch<CartAction>) => {
    dispatch({
      type: 'CLEAR_CART'
    })
  }
}
