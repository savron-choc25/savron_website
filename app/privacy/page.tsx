import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { BUSINESS } from "@/lib/checkout-constants"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">Last updated: July 2025</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              {BUSINESS.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates {BUSINESS.website}. This
              Privacy Policy explains how we collect, use, and protect your personal information when you visit our
              website or place an order.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, and delivery address when you place an order</li>
              <li>Order history and product preferences</li>
              <li>Payment transaction references processed through Razorpay (we do not store card or UPI details)</li>
              <li>Technical data such as browser type and IP address for website security</li>
            </ul>

            <h2 className="text-xl font-semibold text-maroon-800">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver your orders</li>
              <li>To send order confirmations and delivery updates</li>
              <li>To respond to customer support enquiries</li>
              <li>To improve our website and product offerings</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold text-maroon-800">Payment Processing</h2>
            <p>
              All online payments are processed securely by{" "}
              <a href="https://razorpay.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Razorpay
              </a>
              . Your payment information is handled directly by Razorpay in accordance with their privacy policy and
              PCI-DSS standards. We only receive payment confirmation and transaction references.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share information with delivery partners and payment processors
              solely to fulfil your order. We may disclose information if required by law.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Data Retention</h2>
            <p>
              We retain order and contact information for as long as necessary to fulfil orders, handle returns, and
              comply with applicable tax and business regulations.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data by contacting us at{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a>.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Contact Us</h2>
            <p>
              {BUSINESS.name}<br />
              {BUSINESS.address}<br />
              Phone: {BUSINESS.phone}<br />
              Email: <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a>
            </p>

            <p>
              See also our{" "}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
              <Link href="/returns" className="text-primary hover:underline">Refund Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
