import type { Faq } from "@/lib/faqs";
import { contactEmail, priceIncGst, siteName, siteUrl } from "@/lib/site";

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
        logo: `${siteUrl}/mark.svg`,
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
        image: `${siteUrl}/mark.svg`,
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
          "ReviewBuddy asks customers for a Google review by text or email and shows those reviews on your website. For Australian trade businesses. $75 + GST ($82.50) a month.",
        brand: {
          "@type": "Brand",
          name: siteName,
        },
        image: `${siteUrl}/mark.svg`,
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/pricing`,
          price: priceIncGst.replace("$", ""),
          priceCurrency: "AUD",
          availability: "https://schema.org/InStock",
          description:
            "$75 + GST ($82.50 a month). 7 days free. Card taken at signup. Billing starts on day 8.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: priceIncGst.replace("$", ""),
            priceCurrency: "AUD",
            unitText: "MONTH",
            valueAddedTaxIncluded: true,
          },
        },
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
