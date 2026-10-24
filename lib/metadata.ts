import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  // A page that sets its own openGraph or twitter block drops the file-based
  // share images from the app root, so name them here for every page.
  const shareImage = {
    url: `${siteUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Review Buddy. Show your Google reviews on your website.",
  };

  return {
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    title: { absolute: title },
    description,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_AU",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image`],
    },
  };
}
