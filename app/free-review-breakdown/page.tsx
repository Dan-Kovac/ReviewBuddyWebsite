import Link from "next/link";
import { BreakdownForm } from "@/components/breakdown-form";
import { JsonLd } from "@/components/json-ld";
import { TrialButton } from "@/components/trial-button";
import { pageMetadata } from "@/lib/metadata";
import { TRIAL_LINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Google Review Breakdown for Your Business | ReviewBuddy",
  description:
    "See where your business stands on Google. Get a free review breakdown with no sign-up and nothing to pay. Then try ReviewBuddy free for 7 days if you like it.",
  path: "/free-review-breakdown",
});

const covers = [
  "Your Google rating and review count today",
  "How you compare with nearby businesses in the same search",
  "What your website does or does not show about your reviews",
  "A simple idea of how many new reviews it would take to move up",
];

export default function FreeReviewBreakdownPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Free Google review breakdown",
          description:
            "A free breakdown of where a business stands on Google reviews.",
        }}
      />
      <article>
        <header className="hero-wash border-b border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:py-20">
            <p className="text-sm font-semibold tracking-wide text-muted">Free for Australian tradies</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
              Get a free review breakdown
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Customers check your Google reviews before they call. Find out
              where you stand, for free, with nothing to sign up for.
            </p>
          </div>
        </header>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1100px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                What the breakdown covers
              </h2>
              <ul className="mt-6 grid gap-3">
                {covers.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-text text-xs font-bold text-white"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h2 className="mt-12 text-3xl font-semibold tracking-tight text-ink">
                If you like it
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {TRIAL_LINE} We set up your Google review link and QR code and
                put a live reviews widget on your website. It is your call, and
                the breakdown is yours to keep either way.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrialButton variant="ink">Start free trial</TrialButton>
                <Link href="/pricing" className="font-semibold text-ink underline">
                  See plans and pricing
                </Link>
              </div>
            </div>
            <div
              id="request"
              className="scroll-mt-24 rounded-[24px] border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgba(11,15,20,0.4)] sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                Request your breakdown
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                It takes a minute. We email it to you.
              </p>
              <div className="mt-6">
                <BreakdownForm />
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
