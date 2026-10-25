import type { Faq } from "@/lib/faqs";
import { abn, legalEntityName } from "@/lib/abn";
import { contactEmail, contactPhone, plans, siteName, siteUrl } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        legalName: legalEntityName,
        taxID: abn.replace(/\s/g, ""),
        url: siteUrl,
        email: contactEmail,
        telephone: contactPhone,
        logo: `${siteUrl}/logo.svg`,
        areaServed: {
          "@type": "Country",
          name: "Australia",
        },
      },
      {
        "@type": "Product",
        "@id": `${siteUrl}/#product`,
        name: siteName,
        description:
          "ReviewBuddy helps Australian tradies get more Google reviews and shows them on their website. Free for 7 days, no card needed.",
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
