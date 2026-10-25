import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">That page isn&apos;t here</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        It may have moved, or the link may be wrong. Try the home page or pricing.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 font-semibold text-ink"
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