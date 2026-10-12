export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
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
