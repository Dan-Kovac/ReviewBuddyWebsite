import type { Faq } from "@/lib/faqs";
import { contactEmail, plans, siteName, siteUrl } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        email: contactEmail,
        logo: `${siteUrl}/logo.svg`,
        areaServed: {
          "@type": "Country",
          name: "Australia",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: siteName,
        url: siteUrl,
        email: contactEmail,
        image: `${siteUrl}/logo.svg`,
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Australia",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "AU",
        },
      },
      {
        "@type": "Product",
        "@id": `${siteUrl}/#product`,
        name: siteName,
        description:
          "ReviewBuddy helps Australian tradies get more Google reviews and shows them live on their website.",
        brand: {
          "@type": "Brand",
          name: siteName,
        },
        image: `${siteUrl}/logo.svg`,
        offers: plans.map((plan) => ({
          "@type": "Offer",
          url: `${siteUrl}/pricing`,
          name: `ReviewBuddy ${plan.name}`,
          price: plan.price.toFixed(2),
          priceCurrency: "AUD",
          availability: "https://schema.org/InStock",
          description: plan.offerDescription,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price.toFixed(2),
            priceCurrency: "AUD",
            unitText: "MONTH",
            valueAddedTaxIncluded: true,
          },
        })),
      },
    ],
  };
}

export function faqJsonLd(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
