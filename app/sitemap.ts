import type { MetadataRoute } from "next";
import { publishedGuides } from "@/content/guides/registry";
import { guidePath } from "@/lib/guides";
import { siteUrl } from "@/lib/site";

const paths = [
  "",
  "/pricing",
  "/google-reviews-for-plumbers",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-23");
  const guidePaths = publishedGuides().map((guide) => guidePath(guide.slug));

  return [...paths, ...guidePaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
