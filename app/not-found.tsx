import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        That page is not on ReviewBuddy. Head back to the home page or the pricing.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-hi-vis px-5 font-semibold text-ink"
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-paper px-5 font-semibold text-ink"
        >
          Pricing
        </Link>
      </div>
    </article>
  );
}
