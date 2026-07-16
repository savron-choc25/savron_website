import { BUSINESS } from "@/lib/checkout-constants"

/** Organization schema so Google Merchant / Search can read the business email. */
export default function BusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    url: `https://${BUSINESS.website.replace(/^www\./, "")}`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address,
      addressLocality: "Thane",
      addressRegion: "Maharashtra",
      postalCode: "400606",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: BUSINESS.email,
      telephone: BUSINESS.phone,
      availableLanguage: ["English", "Hindi"],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
