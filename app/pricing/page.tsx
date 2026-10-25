import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { TrialButton } from "@/components/trial-button";
import { pricingFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { BOTH_PLANS_LINE, CTA_LABEL, TRIAL_LINE, contactEmail, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "ReviewBuddy Pricing: Starter A$49 and Growth A$75 a month incl GST",
  description:
    "Starter A$49/month incl GST. Growth A$75/month incl GST. 7-day free trial, card taken up front, free done-for-you setup. Cancel any time.",
  path: "/pricing",
});

const billing = [
  "7-day free trial on both plans",
  "Card taken up front",
  "Weekly note with one simple thing to do",
  "Free done-for-you setup",
  "Cancel any time",
];

const comparisonRows = [
  ["Direct Google review link and QR code", "Included", "Included"],
  ["Review widget on your site, matched to its look", "Included", "Included"],
  ["Free done-for-you setup", "Included", "Included"],
  ["Weekly note with one simple thing to do", "Included", "Included"],
  ["7-day free trial, card taken up front", "Included", "Included"],
  ["Cancel any time", "Yes", "Yes"],
  ["Automatic review-request emails with one polite reminder", "Not included", "Included"],
  ["Past-customer list loaded", "Not included", "Included"],
  ["Ongoing coaching", "Not included", "Included"],
] as const;

function Comparison({ starter: starterPrice, growth: growthPrice }: { starter: string; growth: string }) {
  const rows = [
    ["Price", starterPrice, growthPrice],
    ...comparisonRows,
  ] as const;

  return (
    <>
      <div className="mt-8 grid gap-4 sm:hidden">
        {(["Starter", "Growth"] as const).map((name, column) => (
          <section key={name} className="rounded-2xl border border-line bg-white p-4">
            <h3 className="text-lg font-semibold text-ink">
              {name}
              {name === "Growth" ? (
                <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-ink">
                  Recommended
                </span>
              ) : null}
            </h3>
            <dl className="mt-3 grid gap-3">
              {rows.map((row) => (
                <div key={row[0]} className="border-t border-line pt-3">
                  <dt className="text-sm font-semibold text-ink">{row[0]}</dt>
                  <dd className={`mt-1 text-base ${row[column + 1] === "Not included" ? "text-muted" : "text-ink"}`}>
                    {row[column + 1]}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <div className="mt-8 hidden rounded-2xl border border-line bg-white sm:block">
        <table className="w-full border-collapse text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-line bg-soft">
              <th scope="col" className="px-4 py-4 font-semibold text-ink">Plan</th>
              <th scope="col" className="px-4 py-4 font-semibold text-ink">Starter</th>
              <th scope="col" className="px-4 py-4 font-semibold text-ink">
                Growth{" "}
                <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-ink">
                  Recommended
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row" className="px-4 py-4 font-semibold text-ink">{row[0]}</th>
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
          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:py-20">
            <p className="text-sm font-semibold tracking-wide text-muted">Two plans for tradies</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
              ReviewBuddy pricing
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Starter is a direct Google review link, a QR code and a review
              widget matched to your site. Growth adds automatic review-request
              emails with one polite reminder, your past-customer list loaded,
              and ongoing coaching. {BOTH_PLANS_LINE}
            </p>
            <p className="mt-4 inline-flex rounded-full bg-brand px-4 py-2 text-base font-semibold text-ink">
              {TRIAL_LINE}
            </p>
          </div>
        </header>

        <div className="bg-brand-tint px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <PlanPair compact />
            </div>
            <p className="mt-8 text-center text-base text-muted">Cancel any time.</p>
          </div>
        </div>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[1100px]">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Compare the plans</h2>
            <Comparison starter={starter.priceLabel} growth={growth.priceLabel} />
          </div>
        </section>

        <section className="bg-soft px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1100px] gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Not sure which plan?</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Starter is the link, the QR code and the widget. Growth adds
                automatic review-request emails with one polite reminder, your
                past-customer list loaded, and ongoing coaching. Email us if you
                are not sure which plan.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Setup is done for you</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Free done-for-you setup is included on both plans. We match the
                review widget to your site and set up your direct Google review
                link and QR code.
              </p>
              <ul className="mt-6 grid gap-2">
                {billing.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                    <span aria-hidden="true" className="text-ink">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Running more than one location?
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                Email us at{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-ink underline">
                  {contactEmail}
                </a>{" "}
                and we will work out what suits.
              </p>
            </div>
            <TrialButton variant="ink">{CTA_LABEL}</TrialButton>
          </div>
        </section>

        <section className="bg-soft px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Pricing questions</h2>
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
      <CtaBand
        title="Start your 7-day free trial."
        body={`${TRIAL_LINE} Then Starter is ${starter.priceLabel} or Growth is ${growth.priceLabel}.`}
      />
    </>
  );
}
