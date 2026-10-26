import { notFound } from "next/navigation";
import { GuideCards } from "@/components/guide-cards";
import { publishedGuides } from "@/content/guides/registry";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Guides | ReviewBuddy",
  description:
    "Practical guides for Australian tradies on getting Google reviews and showing them on your website.",
  path: "/guides",
});

export default function GuidesPage() {
  const articles = publishedGuides();
  // The index stays unpublished while the guide list is empty.
  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <p className="text-sm font-semibold tracking-wide text-muted">Guides</p>
      <h1 className="display mt-4 max-w-3xl text-balance">
        Guides
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        How to ask for a Google review after a job, and how to show those
        reviews on your website. Plain steps.
      </p>
      <GuideCards guides={articles} />
    </div>
  );
}
