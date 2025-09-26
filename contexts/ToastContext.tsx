"use client"

import * as React from "react"

type Toast = {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

type ToastAction = 
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string }

const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast]
    case "REMOVE_TOAST":
      return state.filter(toast => toast.id !== action.id)
    default:
      return state
  }
}

const ToastContext = React.createContext<{
  toasts: Toast[]
  toast: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = React.useReducer(toastReducer, [])

  const toast = React.useCallback((toastData: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    dispatch({ type: "ADD_TOAST", toast: { ...toastData, id } })
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id })
    }, 3000)
  }, [])

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE_TOAST", id })
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
