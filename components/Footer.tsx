import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-foreground via-slate-800 to-slate-900 text-background py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative w-100 h-80 -mt-28 -ml-6">
                <Image
                  src="/savron_logo22.png"
                  alt="Savron Chocolate Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-base opacity-90 text-pretty leading-relaxed font-light -mt-18">
              Crafting exceptional chocolates since 1952. Experience luxury in every bite of our artisan creations.
            </p>
            <div className="flex space-x-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Instagram className="w-5 h-5 text-accent" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Facebook className="w-5 h-5 text-accent" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Twitter className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-accent">Collections</h4>
            <ul className="space-y-3 text-base opacity-90">
              <li>
                <Link href="/collections" className="hover:text-accent transition-colors duration-300 font-light">
                  Dark Elegance
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-accent transition-colors duration-300 font-light">
                  Milk Harmony
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-accent transition-colors duration-300 font-light">
                  White Bliss
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-accent transition-colors duration-300 font-light">
                  Seasonal Specials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-accent">Company</h4>
            <ul className="space-y-3 text-base opacity-90">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300 font-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300 font-light">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-accent transition-colors duration-300 font-light">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-accent transition-colors duration-300 font-light">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-accent">Support</h4>
            <ul className="space-y-3 text-base opacity-90">
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors duration-300 font-light">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="hover:text-accent transition-colors duration-300 font-light">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-accent transition-colors duration-300 font-light">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors duration-300 font-light">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-16 pt-8 text-center">
          <p className="text-sm opacity-70 font-light">
            © 2025 Savron Chocolates. All Rights Reserved.
          </p>
          <p className="text-xs opacity-60 font-light mt-2">
            Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
