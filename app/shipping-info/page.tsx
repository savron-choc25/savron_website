import { Card, CardContent } from "@/components/ui/card"
import { Truck, Package, MapPin, Clock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ShippingInfoPage() {
  const sections = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Delivery Areas",
      content:
        "We deliver across Mumbai, Thane, and Navi Mumbai. Pan-India shipping is also available for select orders. Contact us for bulk or corporate delivery requirements.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Processing Time",
      content:
        "Orders are typically processed within 1–2 business days. During festive seasons, processing may take an additional 1–2 days. You will receive a confirmation once your order is dispatched.",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Packaging",
      content:
        "All Savron chocolates are packed in insulated, temperature-aware packaging to protect freshness and quality during transit, especially in warmer weather.",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Shipping Charges",
      content:
        "Local delivery charges vary by location and order size. Shipping fees for outstation orders are calculated at checkout. Free delivery may apply on qualifying orders — check our shop for current offers.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Shipping Info
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about how we deliver Savron chocolates to your door.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-maroon-800 mb-2">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
