import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { SpotsLeft } from "@/components/spots-left";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { TrialTimeline } from "@/components/trial-timeline";
import { pricingFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { pricingIntro, pricingPageTitle } from "@/lib/gst";
import { BILLING_LINE, CTA_LABEL, TRIAL_LINE, contactEmail, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: pricingPageTitle(),
  description:
    "Two plans for Australian tradies, both set up for you. Free for 7 days with no card needed. No contract, no notice period.",
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
                <span className="ml-2 rounded-[10px] bg-brand px-2 py-0.5 text-xs font-semibold text-ink">
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
                <span className="ml-1 rounded-[10px] bg-brand px-2 py-0.5 text-xs font-semibold text-ink">
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
        <header className="hero-wash border-b border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:py-20" data-hero-cta="">
            <p className="text-sm font-semibold text-muted">Pricing</p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-extrabold text-ink sm:text-6xl sm:leading-[1.05]">
              Two plans. Both set up for you.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {pricingIntro()}
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-ink">{TRIAL_LINE}</p>
            <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-ink">{BILLING_LINE}</p>
            <SpotsLeft />
          </div>
        </header>

        <div id="pricing" className="scroll-mt-24 bg-brand-tint px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[1100px]">
            <PlanPair location="pricing-plans" />
          </div>
        </div>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[1100px]">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Compare the plans</h2>
            <Comparison starter={starter.priceLabel} growth={growth.priceLabel} />
          </div>
        </section>

        <section className="bg-soft">
          <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">How the free week works</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              You register in the app. No card needed. You get 7 days of full access.
            </p>
          </div>
          <TrialTimeline />
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[720px]">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Stop any time</h2>
            <p className="mt-4 text-lg leading-8 text-ink">
              No contract and no notice period. Cancel any time from the billing page in your account, and you keep access until the end of your billing period. Your reviews stay on Google and the other sites, because they&apos;re yours.
            </p>
          </div>
        </section>

        <section className="bg-soft px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[720px]">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">What does $49 a month actually buy?</h2>
            <p className="mt-4 text-lg leading-8 text-ink">
              About $1.60 a day for Starter, or about $2.50 a day for Growth.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">More than one location</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                Email{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-ink underline">
                  {contactEmail}
                </a>{" "}
                and we&apos;ll work out what suits.
              </p>
            </div>
            <TrialButton variant="ink" location="pricing-locations">
              {CTA_LABEL}
            </TrialButton>
          </div>
        </section>

        <section className="bg-soft px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Fair questions</h2>
            <div className="mt-8">
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
      <section className="bg-brand">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between md:py-24">
          <div>
            <h2 className="max-w-2xl text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Build the trust before they call.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink">
              Free for 7 days. No card needed. I&apos;ll set it up for you.
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
