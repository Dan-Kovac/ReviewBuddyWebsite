import { BreakdownForm } from "@/components/breakdown-form";
import { JsonLd } from "@/components/json-ld";
import { TrialButton } from "@/components/trial-button";
import { pageMetadata } from "@/lib/metadata";
import { CTA_LABEL, TRIAL_LINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Google Review Breakdown for Tradies | ReviewBuddy",
  description:
    "See how your Google reviews compare with other tradies near you. It's free, and there's nothing to sign up for.",
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
          <div className="page-shell py-14 lg:py-20">
            <div className="max-w-[var(--rb-text-max)]">
              <p className="eyebrow">Free, for Australian tradies</p>
              <h1 className="display mt-4 text-balance">
                See how your reviews stack up
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">
                Tell me your business and I&apos;ll send you a short, plain-English breakdown of where you stand on Google next to the tradies people compare you with, and what it would take to move up.
              </p>
            </div>
          </div>
        </header>

        <section>
          <div className="page-shell grid gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:py-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">What you&apos;ll get</h2>
              <ul className="mt-6 grid gap-3">
                {covers.map((item) => (
                  <li key={item} className="text-base leading-7 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="founder-sign">Dan</p>
              <h2 className="mt-12 text-3xl font-semibold tracking-tight text-ink">If you like what you see</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                If it&apos;s useful, try ReviewBuddy. The breakdown&apos;s yours either way.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{TRIAL_LINE}</p>
              <div className="mt-6">
                <TrialButton variant="ink" location="breakdown-aside">
                  {CTA_LABEL}
                </TrialButton>
              </div>
            </div>
            <div id="request" className="scroll-mt-24 rounded-[10px] border border-line bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Request your breakdown</h2>
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
