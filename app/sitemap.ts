import type { MetadataRoute } from "next";
import { publishedGuides } from "@/content/guides/registry";
import { LEGAL_DRAFT } from "@/lib/flags";
import { guidePath } from "@/lib/guides";
import { getPublishedPosts } from "@/lib/cms";
import { siteUrl } from "@/lib/site";

const paths = [
  "",
  "/pricing",
  "/free-review-breakdown",
  "/google-reviews-for-plumbers",
  "/help",
  "/help/cancelling",
  ...(LEGAL_DRAFT ? [] : ["/privacy", "/terms"]),
];

const staticLastModified = new Date("2026-10-25");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guidePaths = publishedGuides().map((guide) => guidePath(guide.slug));
  const [blogPosts, helpDocs] = await Promise.all([
    getPublishedPosts("blog"),
    getPublishedPosts("doc"),
  ]);

  const indexPaths = [
    ...paths,
    ...(blogPosts.length > 0 ? ["/blog"] : []),
  ];

  const staticEntries = [...indexPaths, ...guidePaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: staticLastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const postEntries = [
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...helpDocs.map((doc) => ({
      url: `${siteUrl}/help/${doc.slug}`,
      lastModified: doc.updated_at ? new Date(doc.updated_at) : staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticEntries, ...postEntries];
}
