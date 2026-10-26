import { JsonLd } from "@/components/json-ld";
import { siteName, siteUrl } from "@/lib/site";

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished,
        dateModified: datePublished,
        mainEntityOfPage: `${siteUrl}${path}`,
        author: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.svg`,
          },
        },
      }}
    />
  );
}
