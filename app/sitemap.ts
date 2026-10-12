import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = [
  "",
  "/pricing",
  "/google-reviews-for-plumbers",
  "/guides",
  "/guides/how-to-get-more-google-reviews-as-a-tradie",
  "/guides/how-to-show-google-reviews-on-your-website",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-12");

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
