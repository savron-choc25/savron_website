import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ReturnsPage() {
  const steps = [
    "Contact us within 7 days of receiving your order if you are not satisfied with your purchase.",
    "Share your order details and the reason for the return or replacement request.",
    "Our team will review your request and guide you through the next steps.",
    "Eligible returns may receive a full refund or replacement, depending on the situation.",
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Returns
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We stand behind the quality of every Savron chocolate. Here is how our return policy works.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shrink-0">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-maroon-800 mb-3">Our Promise</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you are not completely satisfied with your order, contact us within 7 days of delivery.
                    We will work with you to resolve the issue with a refund or replacement where applicable.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Because chocolates are perishable, returns are accepted only for damaged, incorrect, or
                    quality-related issues reported within the 7-day window.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-maroon-800 mb-4">How to Request a Return</h2>
              <ol className="space-y-3">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-gray-600 leading-relaxed">
                    <span className="font-semibold text-accent shrink-0">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-maroon-800 mb-4">Need Help?</h2>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <a href="tel:+919820578037" className="hover:text-primary transition-colors">
                    +91 9820578037 / 9821030195
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href="mailto:savron1785@gmail.com" className="hover:text-primary transition-colors">
                    savron1785@gmail.com
                  </a>
                </p>
                <p>
                  Or visit our{" "}
                  <Link href="/contact" className="text-primary font-medium hover:underline">
                    contact page
                  </Link>{" "}
                  for more ways to reach us.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
