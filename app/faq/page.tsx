import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const faqs = [
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
      "We stand behind our quality. If you're not completely satisfied, contact us within 7 days for a full refund or replacement. See our Returns page for full details.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "Yes, we offer sugar-free, vegan, and gluten-free options. Please check product descriptions or contact us for specific needs.",
  },
  {
    question: "How long do Savron chocolates stay fresh?",
    answer:
      "Our chocolates are best enjoyed within the shelf life printed on each product. Store in a cool, dry place away from direct sunlight for optimal freshness.",
  },
  {
    question: "Do you take bulk or corporate orders?",
    answer:
      "Yes! We accept bulk orders for events, weddings, and corporate gifting. Contact us with your requirements and we will prepare a custom quote.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            FAQ
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Quick answers to common questions about our chocolates and services.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-maroon-800 mb-3">{faq.question}</h2>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
