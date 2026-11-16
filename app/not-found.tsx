import Link from "next/link";
import { homeMetaDescription } from "@/lib/gst";
import { pageMetadata } from "@/lib/metadata";

// Absolute share-image URLs. A title-only metadata object lets Next fill
// opengraph-image from the file convention, which on a preview deployment
// uses the deployment host instead of metadataBase.
export const metadata = pageMetadata({
  title: "Page not found | ReviewBuddy",
  description: homeMetaDescription(),
  path: "/",
});

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-3xl px-[var(--rb-gutter)] py-20">
      <h1>That page isn&apos;t here</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        It may have moved, or the link may be wrong. The home page is a good place to start.
      </p>
      <div className="mt-8 flex flex-col items-start gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--rb-accent)] px-6 font-semibold text-[var(--rb-on-accent)]"
        >
          Home
        </Link>
        <Link href="/pricing" className="font-semibold text-ink underline">
          Pricing
        </Link>
      </div>
    </article>
  );
}