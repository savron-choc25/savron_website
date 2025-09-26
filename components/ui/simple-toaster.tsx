"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/contexts/ToastContext"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-16 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all animate-in slide-in-from-right-full duration-300",
            "data-[dismissing]:animate-out data-[dismissing]:fade-out-0 data-[dismissing]:slide-out-to-left-full data-[dismissing]:duration-300",
            toast.variant === "success" && "border-green-500 bg-green-50 text-green-900",
            toast.variant === "destructive" && "border-red-500 bg-red-50 text-red-900",
            toast.variant === "default" && "border bg-white text-gray-900"
          )}
        >
          <div className="grid gap-1">
            <div className="text-sm font-semibold">{toast.title}</div>
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
