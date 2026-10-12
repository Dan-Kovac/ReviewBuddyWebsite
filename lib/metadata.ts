import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
