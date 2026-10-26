import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { plumberFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { thenFromPriceLine } from "@/lib/gst";
import { CTA_LABEL, TRIAL_LINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Google Reviews for Plumbers | ReviewBuddy",
  description:
    "More Google reviews after every plumbing job, shown on your website too. Set up for you. Free for 7 days, no card needed.",
  path: "/google-reviews-for-plumbers",
});

const steps = [
  {
    title: "The job's done.",
    body: "A burst pipe, a blocked drain, a new hot water unit.",
  },
  {
    title: "They get the link.",
    body: "On the invoice, by email after the job, or the QR code on the van. On Growth, the email sends itself with one reminder.",
  },
  {
    title: "They pick where to review.",
    body: "Google, Facebook, or your other sites.",
  },
  {
    title: "It shows on your website.",
    body: "The next person who finds you sees it there as well as on Google.",
  },
];

export default function PlumbersPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(plumberFaqs)} />
      <article>
        <header className="bg-[var(--rb-surface)]">
          <div className="mx-auto w-full max-w-[var(--rb-text-max)] px-[var(--rb-gutter)] py-14 lg:py-20">
            <p className="eyebrow">For plumbers</p>
            <h1 className="display mt-4 text-balance">When the hot water dies, they ring the plumber they trust.</h1>
            <p className="lead mt-5 text-[var(--rb-text-muted)]">
              At 7am with a cold shower, nobody reads ten websites. They look at the reviews and ring the plumber who looks reliable. ReviewBuddy helps that be you.
            </p>
            <div className="mt-8" data-hero-cta="">
              <TrialButton variant="gold" location="plumbers-hero">
                {CTA_LABEL}
              </TrialButton>
            </div>
            <p className="mt-4 text-sm font-semibold leading-6">
              {TRIAL_LINE} {thenFromPriceLine()}
            </p>
          </div>
        </header>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Ask while they&apos;re still relieved
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            The best time to ask is when the water&apos;s back on and they&apos;re grateful. The worst time is a week later when they&apos;ve moved on. Most plumbers mean to ask, then the next job starts.
          </p>
          <ol className="mt-12 grid gap-0 lg:grid-cols-2 lg:gap-x-8">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink py-7">
                <span className="text-sm font-bold text-brand-text">{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-line bg-soft">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Last year&apos;s customers count too</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Hot water jobs, blocked drains, bathroom renos. Most of those customers were happy and never got asked. On Growth, send me a list and they&apos;ll get asked too.
            </p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 bg-[var(--rb-surface-alt)]">
          <div className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Two plans. Both set up for you.</h2>
            <div className="mt-10">
              <PlanPair location="plumbers-plans" />
            </div>
            <p className="mt-8">
              <Link href="/pricing" className="font-semibold text-ink underline">
                Full pricing
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Fair questions</h2>
            <div className="mt-8 max-w-3xl">
              <FaqList faqs={plumberFaqs} />
            </div>
          </div>
        </section>
      </article>
      <section className="band">
        <div className="mx-auto flex w-full max-w-[var(--rb-max-width)] flex-col gap-8 px-[var(--rb-gutter)] py-[var(--rb-section-y)] md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl text-[var(--rb-on-brand)]">Build the trust before they call.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--rb-on-brand-muted)]">
              Free for 7 days. No card needed. I&apos;ll set it up for you.
            </p>
          </div>
          <TrialButton variant="ink" location="plumbers-band" className="px-8">
            {CTA_LABEL}
          </TrialButton>
        </div>
      </section>
      <StickyTrialBar />
    </>
  );
}
