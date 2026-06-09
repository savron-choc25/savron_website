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
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Our Boutique",
      details: ["Unit No.13, Shrikant Industrial Estate Rd No.21", "Sathe Nagar, Thane - Mumbai-400604"],
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      details: ["+91 8879555533", ],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: ["savron1785@gmail.com", ],
    },
    {
      icon: <Clock className="h-5 w-5" />,
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
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm w-full py-0 gap-0 h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-serif font-bold mb-1 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Fill in the form and our team will get back to you shortly.
                </p>
                <form className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      rows={3}
                      className="border-maroon-200 focus:border-maroon-500 focus:ring-maroon-500 min-h-[72px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-maroon-700 to-maroon-600 hover:from-maroon-800 hover:to-maroon-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-9"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="flex flex-col gap-5 h-full">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-1 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
                  Contact Information
                </h2>
                <p className="text-sm text-gray-500">
                  Visit our boutique in Thane or reach out through any channel below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className={`border border-maroon-100/60 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm py-0 gap-0 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-maroon-700 to-amber-600 text-white rounded-full flex items-center justify-center">
                          {info.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-maroon-800 mb-1">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-sm text-gray-600 leading-snug">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm py-0 gap-0 mt-auto">
                <CardContent className="p-0">
                  <div className="h-36 sm:h-40 bg-gradient-to-br from-maroon-100 to-amber-100 rounded-xl flex items-center justify-center">
                    <div className="text-center px-4">
                      <MapPin className="h-8 w-8 text-maroon-600 mx-auto mb-2" />
                      <p className="text-maroon-700 font-semibold text-sm">Find Our Boutique</p>
                      <p className="text-gray-600 text-xs mt-1">Thane, Mumbai — 400604</p>
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
