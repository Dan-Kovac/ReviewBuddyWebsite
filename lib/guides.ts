export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
};

export const guides: Guide[] = [
  {
    slug: "how-to-get-more-google-reviews-as-a-tradie",
    title: "How to get more Google reviews as a tradie",
    description:
      "Ask after the job, send your Google review link, and ask every customer. No incentives, and no filtering who gets asked.",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
  },
  {
    slug: "how-to-show-google-reviews-on-your-website",
    title: "How to show Google reviews on your website",
    description:
      "Put a Google review widget on the site so the reviews are there when someone opens your page, not only on Google.",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
  },
];

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
