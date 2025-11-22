import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Award, Heart, Users, Leaf } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We source only the finest cacao beans from sustainable farms worldwide, ensuring every chocolate meets our exacting standards.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion",
      description:
        "Our master chocolatiers pour their heart into every creation, blending traditional techniques with innovative flavors.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description:
        "We're committed to ethical sourcing and environmental responsibility, supporting farming communities and protecting ecosystems.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description:
        "Building lasting relationships with our customers, suppliers, and the communities where our cacao is grown.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
                Our Story 
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Savron Chocolate began with a simple belief — every woman deserves a moment that is hers alone.
A moment to breathe.
A moment to celebrate.
A moment to feel seen.

Our founder grew up watching the women around her — mothers, sisters, friends — balancing dreams, responsibilities, and endless to-do lists. They gave their best to everyone, yet rarely paused for themselves. One day, while sharing homemade chocolate with a friend after a long, exhausting day, she realized something powerful:

Chocolate isn’t just a treat — it’s comfort, confidence, and self-love wrapped in sweetness.

And so, Savron Chocolate was born.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
              Crafted in small batches, Savron isn’t just about flavors; it’s about feelings. Each bar is made to remind women that they are strong, soft, fierce, gentle, bold, and beautiful — all at once. Whether it’s a quick break between meetings, a midnight craving, or a celebration of personal victories, Savron is here to make every moment richer.

We partner with women artisans, empower female-led supply chains, and design our brand with the modern woman in mind. Savron represents more than chocolate — it’s a community, a celebration, and a piece of joy that women can call their own.

Savron Chocolate — made for her moments.
              </p>
            </div>
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Young Female Chef Making Chocolate Truffles.jpg"
                alt="Master chocolatier at work"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every decision we make is guided by our core values, ensuring that our chocolates not only taste
              exceptional but also contribute to a better world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-maroon-700 to-amber-600 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-maroon-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-maroon-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/luxury-chocolate-truffles-arranged-elegantly-on-ma.jpg"
                alt="Artisan chocolate making process"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/20 to-transparent rounded-2xl"></div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
                Crafted Heritage
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our chocolates are created using time-honored techniques passed down through generations. Each piece is
                hand-crafted in small batches, ensuring attention to every detail and maintaining the artisanal quality
                that defines Savron.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                From bean selection to final packaging, we control every step of the process, guaranteeing that each
                chocolate meets our uncompromising standards for taste, texture, and presentation.
              </p>
              <Button className="bg-gradient-to-r from-maroon-700 to-maroon-600 hover:from-maroon-800 hover:to-maroon-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Learn About Our Process
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-16">
            Behind every exceptional chocolate is a team of passionate artisans dedicated to perfection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "", role: "Master Chocolatier", image: "/choclate_lady.avif" },
              { name: "", role: "Head of Innovation", image: "/female-chocolate-chef-portrait.jpg" },
              { name: "", role: "Quality Director", image: "/quality-director-portrait.jpg" },
            ].map((member, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-bold text-maroon-800 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-semibold">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
