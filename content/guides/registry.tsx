import type { ComponentType } from "react";
import { guides, type Guide } from "@/lib/guides";

// Drop in the first article by importing its MDX file and adding the slug here,
// with the same slug in lib/guides.ts:
// import FirstGuide from "@/content/guides/your-slug.mdx";
// export const guideArticles = { "your-slug": FirstGuide };
export const guideArticles: Record<string, ComponentType> = {};

export function publishedGuides(): Guide[] {
  return guides
    .filter((guide) => guide.slug in guideArticles)
    .sort((a, b) => b.date.localeCompare(a.date));
}
