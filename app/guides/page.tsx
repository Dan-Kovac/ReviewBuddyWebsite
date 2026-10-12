import Link from "next/link";
import { guidePath, guides } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Guides | ReviewBuddy",
  description:
    "Practical guides for Australian tradies on getting Google reviews and showing them on your website.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-sm font-semibold tracking-wide text-muted">Guides</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
        Guides
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        How to ask for a Google review after a job, and how to show those
        reviews on your website. Plain steps. No invented numbers.
      </p>
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={guidePath(guide.slug)}
              className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-colors hover:bg-soft"
            >
              <span className="block h-28 rounded-2xl bg-brand/20" aria-hidden="true" />
              <p className="mt-5 text-sm text-muted">{guide.dateLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{guide.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted">{guide.description}</p>
              <p className="mt-6 text-sm font-semibold text-ink">Read the guide</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
