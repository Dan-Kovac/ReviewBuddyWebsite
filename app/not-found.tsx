import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | ReviewBuddy" },
};

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <h1>That page isn&apos;t here</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        It may have moved, or the link may be wrong. Try the home page or pricing.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--rb-accent)] px-6 font-semibold text-[var(--rb-on-accent)]"
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 font-semibold text-ink"
        >
          Pricing
        </Link>
      </div>
    </article>
  );
}