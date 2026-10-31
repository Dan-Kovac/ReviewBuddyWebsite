import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { TrialTimeline } from "@/components/trial-timeline";
import { pricingFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { pricingIntro, pricingPageTitle } from "@/lib/gst";
import { BILLING_LINE, CLOSING_LINE, CTA_LABEL, TRIAL_LINE, contactEmail, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: pricingPageTitle(),
  description: `Two plans for Australian tradies, both set up for you. ${TRIAL_LINE} No contract, no notice period.`,
  path: "/pricing",
});

const comparisonRows = [
  ["Review link where customers pick the site", "Included", "Included"],
  ["QR code", "Included", "Included"],
  ["Review widget on your website", "Included", "Included"],
  ["Free setup", "Included", "Included"],
  ["Weekly email with one thing to do", "Included", "Included"],
  ["Automatic review request after each job", "Not included", "Included"],
  ["One polite reminder", "Not included", "Included"],
  ["Past customers asked", "Not included", "Included"],
  ["Private feedback box for every customer", "Included", "Included"],
] as const;

function Comparison({ starter: starterPrice, growth: growthPrice }: { starter: string; growth: string }) {
  const rows = [["Price", starterPrice, growthPrice], ...comparisonRows] as const;

  return (
    <>
      <div className="mt-8 grid gap-4 sm:hidden">
        {(
          [
            ["Starter", 1],
            ["Growth", 2],
          ] as const
        ).map(([name, column]) => (
          <section key={name} className="rounded-[10px] border border-line bg-white p-4">
            <h3 className="text-lg font-semibold text-ink">
              {name}
              {name === "Growth" ? (
                <span className="ml-2 rounded-full bg-[var(--rb-accent)] px-2 py-0.5 text-xs font-semibold text-[var(--rb-on-accent)]">
                  Recommended
                </span>
              ) : null}
            </h3>
            <dl className="mt-3 grid gap-3">
              {rows.map((row) => (
                <div key={row[0]} className="border-t border-line pt-3">
                  <dt className="text-sm font-semibold text-ink">{row[0]}</dt>
                  <dd className={`mt-1 text-base ${row[column] === "Not included" ? "text-muted" : "text-ink"}`}>
                    {row[column]}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <div className="mt-8 hidden rounded-[10px] border border-line bg-white sm:block">
        <table className="w-full border-collapse text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-line bg-soft">
              <th scope="col" className="px-4 py-4 font-semibold text-ink">
                Plan
              </th>
              <th scope="col" className="px-4 py-4 font-semibold text-ink">
                Starter
              </th>
              <th scope="col" className="px-4 py-4 font-semibold text-ink">
                Growth{" "}
                <span className="ml-1 rounded-full bg-[var(--rb-accent)] px-2 py-0.5 text-xs font-semibold text-[var(--rb-on-accent)]">
                  Recommended
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row" className="px-4 py-4 font-semibold text-ink">
                  {row[0]}
                </th>
                <td className={`px-4 py-4 ${row[1] === "Not included" ? "text-muted" : "text-ink"}`}>{row[1]}</td>
                <td className={`px-4 py-4 ${row[2] === "Not included" ? "text-muted" : "text-ink"}`}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function PricingPage() {
  const starter = plans.find((plan) => plan.id === "starter")!;
  const growth = plans.find((plan) => plan.id === "growth")!;

  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <article>
        <header className="bg-[var(--rb-surface)]">
          <div className="page-shell py-14 lg:py-20" data-hero-cta="">
            <div className="max-w-[var(--rb-text-max)]">
              <p className="eyebrow">Pricing</p>
              <h1 className="display mt-4 text-balance">Two plans, both set up for you</h1>
              <p className="lead mt-5 text-[var(--rb-text-muted)]">{pricingIntro()}</p>
              <p className="mt-4 text-base font-semibold leading-7">{TRIAL_LINE}</p>
              <p className="mt-2 text-base font-semibold leading-7">{BILLING_LINE}</p>
            </div>
          </div>
        </header>

        <div id="pricing" className="scroll-mt-24 bg-[var(--rb-surface-alt)]">
          <div className="page-shell py-14 lg:py-20">
            <PlanPair location="pricing-plans" />
          </div>
        </div>

        <section>
          <div className="page-shell py-14 lg:py-20">
            <h2>Compare the plans</h2>
            <Comparison starter={starter.priceLabel} growth={growth.priceLabel} />
          </div>
        </section>

        <section className="bg-soft">
          <div className="page-shell py-14 lg:py-20">
            <h2>How the 7-day free trial works</h2>
            <TrialTimeline />
          </div>
        </section>

        <section className="border-t border-line bg-soft">
          <div className="page-shell py-14 lg:py-20">
            <div className="max-w-[var(--rb-text-max)]">
              <h2>What it works out to</h2>
              <p className="mt-4 text-lg leading-8 text-ink">
                About $1.60 a day for Starter, or about $2.50 a day for Growth.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="page-shell py-14 lg:py-20">
            <div className="max-w-[var(--rb-text-max)]">
              <h2>More than one location</h2>
              <p className="mt-3 text-base leading-7 text-muted">
                Email{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-ink underline">
                  {contactEmail}
                </a>{" "}
                and we&apos;ll work out what suits.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-soft">
          <div className="page-shell py-14 lg:py-20">
            <h2>Fair questions</h2>
            <div className="mt-8 max-w-3xl">
              <FaqList faqs={pricingFaqs} />
            </div>
            <p className="mt-8 text-base text-muted">
              Plumbing business?{" "}
              <Link href="/google-reviews-for-plumbers" className="font-semibold text-ink underline">
                Google reviews for plumbers
              </Link>
              .
            </p>
          </div>
        </section>
      </article>
      <section className="band">
        <div className="mx-auto flex w-full max-w-[var(--rb-max-width)] flex-col gap-8 px-[var(--rb-gutter)] py-[var(--rb-section-y)] md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl text-[var(--rb-on-brand)]">Build the trust before they call</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--rb-on-brand-muted)]">
              {CLOSING_LINE}
            </p>
          </div>
          <TrialButton variant="ink" location="pricing-band" className="px-8">
            {CTA_LABEL}
          </TrialButton>
        </div>
      </section>
      <StickyTrialBar />
    </>
  );
}
