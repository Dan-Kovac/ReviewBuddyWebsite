import type { MetadataRoute } from "next";
import { publishedGuides } from "@/content/guides/registry";
import { guidePath } from "@/lib/guides";
import { getPublishedPosts } from "@/lib/cms";
import { siteUrl } from "@/lib/site";

const paths = [
  "",
  "/pricing",
  "/free-review-breakdown",
  "/google-reviews-for-plumbers",
  "/guides",
  "/blog",
  "/help",
  "/privacy",
  "/terms",
];

const staticLastModified = new Date("2026-10-23");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guidePaths = publishedGuides().map((guide) => guidePath(guide.slug));

  // The CMS reads are cached with a five minute revalidate, so the sitemap
  // picks up new posts without a redeploy.
  const [blogPosts, helpDocs] = await Promise.all([
    getPublishedPosts("blog"),
    getPublishedPosts("doc"),
  ]);

  const staticEntries = paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: staticLastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const guideEntries = guidePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: staticLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postEntries = [
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...helpDocs.map((doc) => ({
      url: `${siteUrl}/help/${doc.slug}`,
      lastModified: doc.updated_at ? new Date(doc.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticEntries, ...guideEntries, ...postEntries];
}
