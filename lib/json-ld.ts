import type { Faq } from "@/lib/faqs";
import { abn, legalEntityName } from "@/lib/abn";
import { valueAddedTaxIncluded as pricesIncludeGst } from "@/lib/gst";
import { TRIAL_LINE, contactEmail, plans, siteName, siteUrl } from "@/lib/site";

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
          `ReviewBuddy helps Australian tradies get more Google reviews and shows them on their website. ${TRIAL_LINE}`,
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
            valueAddedTaxIncluded: pricesIncludeGst(),
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
