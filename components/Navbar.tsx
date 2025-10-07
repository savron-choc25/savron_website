"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Gift, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const { state } = useCart()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-primary/90 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-120 h-34  transition-all duration-300 -ml-28 -mt-2 -mb-1">
              <Image
                src="/savron_logo22.png"
                alt="Savron Chocolate Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className={`transition-colors duration-300 relative group ${
              pathname === "/" ? "text-[#e0ac10]" : "text-[#f9d6b1] hover:text-[#e0ac10]"
            }`}>
              <span className="relative">
                Home
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e0ac10] transition-all duration-300 ${
                  pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </span>
            </Link>
            <Link href="/collections" className={`transition-colors duration-300 relative group ${
              pathname === "/collections" ? "text-[#e0ac10]" : "text-[#f9d6b1] hover:text-[#e0ac10]"
            }`}>
              <span className="relative">
                Collections
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e0ac10] transition-all duration-300 ${
                  pathname === "/collections" ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </span>
            </Link>
            <Link href="/shop" className={`transition-colors duration-300 relative group ${
              pathname === "/shop" ? "text-[#e0ac10]" : "text-[#f9d6b1] hover:text-[#e0ac10]"
            }`}>
              <span className="relative">
                Shop
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e0ac10] transition-all duration-300 ${
                  pathname === "/shop" ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </span>
            </Link>
            <Link href="/about" className={`transition-colors duration-300 relative group ${
              pathname === "/about" ? "text-[#e0ac10]" : "text-[#f9d6b1] hover:text-[#e0ac10]"
            }`}>
              <span className="relative">
                About
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e0ac10] transition-all duration-300 ${
                  pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </span>
            </Link>
            <Link href="/contact" className={`transition-colors duration-300 relative group ${
              pathname === "/contact" ? "text-[#e0ac10]" : "text-[#f9d6b1] hover:text-[#e0ac10]"
            }`}>
              <span className="relative">
                Contact
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e0ac10] transition-all duration-300 ${
                  pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </span>
            </Link>
          </div>

          {/* Cart and CTA Buttons */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 relative">
                <ShoppingCart className="w-5 h-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Shop Now Button */}
            <Link href="/collections">
              <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Gift className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
