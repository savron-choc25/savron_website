import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Our Boutique",
      details: ["Unit No.13, Shrikant Industrial Estate Rd No.21", "Sathe Nagar, Thane - Mumbai-400604"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+91 8879555533", ],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["savron1785@gmail.com", ],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 9AM - 9PM", ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have questions about our chocolates, need help with an order, or
            want to discuss custom creations, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3 pb-3">
                <h2 className="text-2xl font-serif font-bold mb-2 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">Send us a Message</h2>
                <form className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="firstName" className="text-maroon-700 font-semibold text-sm">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                        className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500 h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName" className="text-maroon-700 font-semibold text-sm">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                        className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500 h-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-maroon-700 font-semibold text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500 h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-maroon-700 font-semibold text-sm">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500 h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="subject" className="text-maroon-700 font-semibold text-sm">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500 h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-maroon-700 font-semibold text-sm">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={2}
                      className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-maroon-700 to-maroon-600 hover:from-maroon-800 hover:to-maroon-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-8 mb-0"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">Contact Information</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Visit our boutique in the heart of Paris or reach out to us through any of the channels below. Our
                  team is always ready to assist you with your chocolate needs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-maroon-700 to-amber-600 text-white rounded-full flex items-center justify-center">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-maroon-800 mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-maroon-100 to-amber-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-maroon-600 mx-auto mb-4" />
                      <p className="text-maroon-700 font-semibold">Interactive Map</p>
                      <p className="text-gray-600 text-sm">Find us in the heart of Paris</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Quick answers to common questions about our chocolates and services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Do you offer international shipping?",
                answer:
                  "Yes, we ship worldwide! We use temperature-controlled packaging to ensure your chocolates arrive in perfect condition.",
              },
              {
                question: "Can I create custom chocolate gifts?",
                answer:
                  "We offer custom packaging, personalized messages, and bespoke chocolate selections for special occasions.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We stand behind our quality. If you're not completely satisfied, contact us within 7 days for a full refund or replacement.",
              },
              {
                question: "Do you accommodate dietary restrictions?",
                answer:
                  "Yes, we offer sugar-free, vegan, and gluten-free options. Please check product descriptions or contact us for specific needs.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-maroon-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Browse our collections and discover your new favorite chocolates today.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Shop Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
