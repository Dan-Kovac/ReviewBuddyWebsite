import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { PromiseStrip } from "@/components/promise-strip";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { ProductShot } from "@/components/product-shot";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { ProofBlock } from "@/components/proof-block";
import { PlatformScreen } from "@/components/platform-screen";
import { BOTH_PLANS_LINE, CTA_LABEL, SETUP_LINE, TRIAL_LINE, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get More Google Reviews | ReviewBuddy for Tradies",
  description:
    "One view of your review sites. 7-day free trial, card taken up front. Starter A$49/month incl GST. Growth A$75/month incl GST.",
  path: "/",
});

const steps = [
  {
    title: "Ask after the job",
    detail:
      "Share your direct Google review link or QR code when the job is done. On Growth, automatic review-request emails ask for you, with one polite reminder.",
  },
  {
    title: "Reviews come in",
    detail: "On Google from the customers you asked, and on the other review sites you connect, like Service Seeking or hipages.",
  },
  {
    title: "One view on your site",
    detail:
      "One widget shows them together, matched to your site's look. It updates when a new Google review comes in.",
  },
];

const platformNames = ["Google", "Facebook", "Service Seeking", "hipages", "Airtasker", "Houzz", "and more"];

const wrap = "mx-auto w-full max-w-[1200px]";
const pad = "px-4 sm:px-6";
const starterPlan = plans.find((plan) => plan.id === "starter")!;
const growthPlan = plans.find((plan) => plan.id === "growth")!;
const finalBandLine = `${TRIAL_LINE} Then Starter is ${starterPlan.priceLabel} or Growth is ${growthPlan.priceLabel}.`;

const facts = [
  "Updates when a new review comes in",
  "Matches your site",
  "Works on phones",
];

const pastCustomerSteps = [
  "Send us a spreadsheet of past customers you have actually done work for.",
  "We load the list for you.",
  "Automatic review-request emails go out, with one polite reminder.",
];

export default function HomePage() {
  return (
    <>
      <RevealOnScroll />
      <section className="hero-wash overflow-hidden">
        <div className={`${wrap} ${pad} grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-24`}>
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-brand" />
              Google reviews for tradies
            </p>
            <h1 className="mt-4 text-balance text-[clamp(2.6rem,9.5vw,5.25rem)] font-extrabold leading-[1] text-ink">
              Get chosen before they <span className="text-brand-text">call.</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-8 text-muted">
              More Google reviews from your real customers, shown with your other review sites in one widget on your website.
            </p>
            <div className="mt-7 w-full sm:w-auto" data-hero-cta="">
              <TrialButton variant="ink" className="w-full px-8 sm:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
            <p className="mt-4 text-base font-semibold leading-6 text-ink">{TRIAL_LINE}</p>
            <p className="mt-6 text-sm leading-6 text-muted">
              After your trial, Starter is {starterPlan.priceLabel} and Growth is {growthPlan.priceLabel}.{" "}
              <Link href="/pricing" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                See plans and pricing
              </Link>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Not ready to start?{" "}
              <Link href="/free-review-breakdown" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                Get a free review breakdown first
              </Link>
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 hidden size-40 rounded-full bg-brand/30 blur-2xl lg:block"
            />
            <ProductShot
              src="/images/hero.png"
              alt="Review Buddy sample: a five star Google review card, a rating request and a 4.5 average rating breakdown"
              width={1116}
              height={1130}
              priority
              sizes="(min-width: 1024px) 520px, 92vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="platform-screen" className={`bg-soft ${pad} py-14 lg:py-20`}>
        <div className={wrap}>
          <div data-reveal="" className="max-w-3xl">
            <h2 id="platform-screen" className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Your review sites, together in one view.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Google, Service Seeking, hipages and more. Reviews from the sites you connect sit together in one widget on your website. This is the review platform we build on, with notes on what it does.
            </p>
          </div>
          <div data-reveal="" className="mt-8 lg:mt-10">
            <PlatformScreen />
          </div>
          <div data-reveal="" className="mt-6">
            <p className="text-sm font-semibold text-ink">Review sites you can bring together</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-base leading-7 text-muted">
              {platformNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-5 text-muted">
              Names show where reviews can come from. They do not mean any of these sites endorses Review Buddy.
            </p>
          </div>
        </div>
      </section>

      <PromiseStrip />

      <ProofBlock />

      <section className={`${pad} py-20 lg:py-32`}>
        <div className={wrap}>
          <div data-reveal="" className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
            <div>
              <h2 className="text-balance text-[clamp(2.25rem,7vw,4.75rem)] font-extrabold leading-[1.02] text-ink">
                Win the job on <span className="text-brand-text">trust,</span> not price.
              </h2>
              <p className="mt-8 max-w-xl border-l-4 border-brand pl-5 text-lg leading-8 text-muted">
                Before someone calls, they check your Google reviews, then they look at your website. Reviews copied in by hand go stale the day you stop updating them. With ReviewBuddy the widget on your site updates when a new Google review comes in, so the next customer sees how you really work.
              </p>
            </div>
            <ProductShot
              src="/images/find-the-best.png"
              alt="Review Buddy sample: a Google review card with a rating request and Google, Facebook and review site badges"
              width={995}
              height={868}
              tone="soft"
              sizes="(min-width: 1024px) 420px, 92vw"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 bg-soft ${pad} py-20 lg:py-32`}>
        <div className={`${wrap} grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`}>
          <div data-reveal="" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              All your reviews in one place, on your site.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">
              We set it up and add the widget to your site.
            </p>
            <div className="mt-8 max-w-[320px]">
              <ProductShot
                src="/images/request-review.png"
                alt="Review Buddy sample: a feedback request form that sends a rating request to a customer"
                width={474}
                height={578}
                tone="tint"
                sizes="320px"
              />
            </div>
          </div>
          <ol className="grid">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal=""
                className="step-row grid grid-cols-[4.5rem_1fr] gap-x-4 border-t-2 border-ink py-8 sm:grid-cols-[6rem_1fr] sm:gap-x-6 lg:grid-cols-[8.5rem_1fr] lg:gap-x-8"
              >
                <span className="step-num text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none text-brand-text">
                  0{index + 1}
                </span>
                <div className="pt-1 lg:pt-3">
                  <h3 className="text-2xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`bg-ink ${pad} py-20 text-white lg:py-32`}>
        <div className={wrap}>
          <div data-reveal="" className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="text-balance text-[clamp(2rem,6vw,3.75rem)] font-extrabold leading-[1.04]">
              Every review, one screen.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-muted-on-dark">
              Search your reviews, see where each one came from and keep track of every location from one dashboard.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-white/15 sm:grid-cols-3">
            {facts.map((fact) => (
              <li key={fact} className="bg-ink px-6 py-6 text-lg font-semibold leading-7 text-white">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${pad} py-20 lg:py-32`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20`}>
          <div data-reveal="">
            <h2 className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              You have already done the hard part.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Your past customers already know your work. On Growth, send us a spreadsheet of people you have actually done work for. We load the list, then automatic review-request emails ask them for a review, with one polite reminder.
            </p>
            <div className="mt-8">
              <Link
                href="/pricing#growth"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink bg-white px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                See the Growth plan
              </Link>
            </div>
          </div>
          <ol data-reveal="" className="grid content-center">
            {pastCustomerSteps.map((item, index) => (
              <li key={item} className="flex items-baseline gap-5 border-t border-line py-6 last:border-b">
                <span className="text-sm font-bold text-brand-text">0{index + 1}</span>
                <span className="text-xl font-semibold leading-8 text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className={`scroll-mt-24 bg-brand-tint ${pad} py-20 lg:py-32`}>
        <div className={wrap}>
          <div data-reveal="" className="max-w-2xl">
            <h2 className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Two plans. Pick the one that fits.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              {BOTH_PLANS_LINE} {SETUP_LINE}
            </p>
          </div>
          <div data-reveal="" className="mt-14">
            <PlanPair />
          </div>
          <p className="mt-10 text-base text-muted">
            <Link href="/pricing" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
              Compare the plans in full
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="questions" className={`${pad} py-20 lg:py-32`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20`}>
          <div data-reveal="">
            <h2 id="questions" className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Questions
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-8 text-muted">
              Plans, setup and how it works.
            </p>
          </div>
          <div data-reveal="">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </section>

      <section className={`bg-brand ${pad} py-16 lg:py-24`}>
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:items-end md:justify-between`}>
          <div>
            <h2 className="max-w-2xl text-balance text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.02] text-ink">
              Start your 7-day free trial.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink">{finalBandLine}</p>
          </div>
          <TrialButton variant="ink" className="px-8">
            {CTA_LABEL}
          </TrialButton>
        </div>
      </section>
      <StickyTrialBar />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
