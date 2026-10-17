export const guideTopics = ["trust", "value", "found"] as const;

export type GuideTopic = (typeof guideTopics)[number];

export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  topic?: GuideTopic;
};

// Published guides. Each slug needs a matching MDX component in content/guides/registry.tsx.
export const guides: Guide[] = [];

export function guidePath(slug: string) {
  return `/guides/${slug}`;
}

export function guideBySlug(slug: string) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) {
    throw new Error(`Unknown guide: ${slug}`);
  }
  return guide;
}

export function pillarGuideLink(articles: readonly Guide[], topic: GuideTopic) {
  const match = articles.find((guide) => guide.topic === topic);
  if (!match) {
    return { href: "/guides", label: "Guides" };
  }
  return { href: guidePath(match.slug), label: "Read the guide" };
}
