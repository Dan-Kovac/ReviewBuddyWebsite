import Link from "next/link";
import { BreakdownForm } from "@/components/breakdown-form";
import { JsonLd } from "@/components/json-ld";
import { TrialButton } from "@/components/trial-button";
import { pageMetadata } from "@/lib/metadata";
import { CTA_LABEL, TRIAL_LINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Google Review Breakdown for Tradies | ReviewBuddy",
  description:
    "See how your Google reviews stack up against other tradies near you. Free, nothing to sign up for.",
  path: "/free-review-breakdown",
});

const covers = [
  "Your rating and review count, and how recent your reviews are",
  "How you compare with other businesses in the same search near you",
  "Whether your website shows your reviews",
  "Roughly how many more reviews it would take to catch the leaders",
];

export default function FreeReviewBreakdownPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Free Google review breakdown",
          description: "A free look at where a business stands on Google reviews.",
        }}
      />
      <article>
        <header className="hero-wash border-b border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:py-20">
            <p className="eyebrow">Free, for Australian tradies</p>
            <h1 className="display mt-4 max-w-3xl text-balance">
              See how your reviews stack up
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Tell me your business and I&apos;ll send you a short, plain-English breakdown of where you stand on Google next to the tradies people compare you with, and what it would take to move up.
            </p>
          </div>
        </header>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1100px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">What you&apos;ll get</h2>
              <ul className="mt-6 grid gap-3">
                {covers.map((item) => (
                  <li key={item} className="text-base leading-7 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-base font-semibold text-ink">Dan</p>
              <h2 className="mt-12 text-3xl font-semibold tracking-tight text-ink">If you like what you see</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                If it&apos;s useful, try ReviewBuddy free for 7 days, no card needed. The breakdown&apos;s yours either way.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{TRIAL_LINE}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrialButton variant="ink" location="breakdown-aside">
                  {CTA_LABEL}
                </TrialButton>
                <Link href="/pricing" className="font-semibold text-ink underline">
                  Compare plans
                </Link>
              </div>
            </div>
            <div id="request" className="scroll-mt-24 rounded-[10px] border border-line bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Request your breakdown</h2>
              {/* TODO(Dan): confirm the turnaround before promising a number of days. */}
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
