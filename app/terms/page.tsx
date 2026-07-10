import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { BUSINESS } from "@/lib/checkout-constants"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#fff5d6]">
      <Navbar />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/10 to-amber-900/10" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-primary via-accent to-amber-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">Last updated: July 2025</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              Welcome to {BUSINESS.name}. By accessing our website ({BUSINESS.website}) or placing an order, you agree
              to these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Products &amp; Pricing</h2>
            <p>
              All products are subject to availability. Prices are listed in Indian Rupees (INR) and include applicable
              taxes unless stated otherwise. We reserve the right to modify prices without prior notice. Orders are
              confirmed only after successful payment.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Orders &amp; Payment</h2>
            <p>
              Payments are accepted via Razorpay (UPI, credit/debit cards, net banking, and other methods as
              available). By placing an order, you confirm that the payment information provided is accurate and that
              you are authorised to use the payment method.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Shipping &amp; Delivery</h2>
            <p>
              Delivery timelines vary by location and shipping method selected at checkout. We are not responsible for
              delays caused by courier partners or circumstances beyond our control. See our{" "}
              <Link href="/shipping-info" className="text-primary hover:underline">Shipping Info</Link> page for details.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Cancellation Policy</h2>
            <p>
              Orders may be cancelled before dispatch by contacting us at {BUSINESS.phone} or {BUSINESS.email}. Once an
              order has been shipped, cancellation is not possible — please refer to our{" "}
              <Link href="/returns" className="text-primary hover:underline">Refund &amp; Returns Policy</Link>.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Refunds &amp; Returns</h2>
            <p>
              Due to the perishable nature of chocolates, returns are accepted only for damaged, incorrect, or
              quality-related issues reported within 7 days of delivery. See our full{" "}
              <Link href="/returns" className="text-primary hover:underline">Returns Policy</Link>.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Intellectual Property</h2>
            <p>
              All content on this website — including logos, images, text, and product designs — is the property of
              {BUSINESS.name} and may not be reproduced without written permission.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Limitation of Liability</h2>
            <p>
              {BUSINESS.name} shall not be liable for any indirect, incidental, or consequential damages arising from
              the use of our website or products, to the fullest extent permitted by applicable law.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts
              in Mumbai, Maharashtra.
            </p>

            <h2 className="text-xl font-semibold text-maroon-800">Contact</h2>
            <p>
              {BUSINESS.name}<br />
              {BUSINESS.address}<br />
              Phone: {BUSINESS.phone}<br />
              Email: <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a>
            </p>

            <p>
              See also our{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
