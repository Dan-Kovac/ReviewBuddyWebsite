import Link from "next/link";
import { DashboardAnnotations } from "@/components/dashboard-annotations";
import { ExampleFrame, GoogleChip, WireBar, WireCard, exampleCaption } from "@/components/example";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { PromiseStrip } from "@/components/promise-strip";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { WidgetDemo } from "@/components/widget-demo";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { CTA_LABEL, SETUP_LINE, lowestPrice, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get More Google Reviews and Show Them on Your Website | ReviewBuddy for Tradies",
  description:
    "Get chosen on trust, not price. Ask for Google reviews after every job and show them live on your website. Plans from $49 a month inc. GST. Cancel anytime.",
  path: "/",
});

const steps = [
  {
    title: "Ask after the job",
    detail:
      "Share your Google review link or QR code when the job is done. On Growth, email follow ups keep asking for you.",
  },
  {
    title: "Reviews come in",
    detail: "On Google, from the customers you asked.",
  },
  {
    title: "They show on your site",
    detail: "The widget updates when a new review comes in.",
  },
];

const section = "px-4 py-[72px] sm:px-6 lg:py-32";
const wrap = "mx-auto w-full max-w-[1200px]";
const starterPlan = plans.find((plan) => plan.id === "starter")!;
const growthPlan = plans.find((plan) => plan.id === "growth")!;
const finalBandLine = `Starter from $${starterPlan.price} a month, Growth $${growthPlan.price}. Including GST. Cancel anytime.`;

export default function HomePage() {
  return (
    <>
      <section className={`hero-wash px-4 py-10 sm:px-6 lg:py-24`}>
        <div className={wrap}>
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <h1 className="text-balance text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[1.05] text-ink">
              Get chosen before they <span className="underline decoration-brand decoration-[3px] underline-offset-[0.12em]">call.</span>
            </h1>
            <p className="mt-5 max-w-[36rem] text-lg leading-8 text-muted">
              More Google reviews from your real customers, shown live on your website.
            </p>
            <div className="mt-8 w-full sm:w-auto" data-hero-cta="">
              <TrialButton variant="ink" className="w-full px-6 sm:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              <Link href="/pricing" className="font-semibold text-ink underline decoration-brand underline-offset-4">
                See plans and pricing
              </Link>
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Plans from ${lowestPrice} a month, including GST. Cancel anytime.
            </p>
            <article className="mt-8 w-full max-w-sm rounded-[20px] border border-line bg-white p-4 text-left shadow-[0_16px_40px_-28px_rgba(11,15,20,0.28)]">
              <p className="text-xs font-semibold tracking-wide text-muted">Example</p>
              <p className="mt-2 text-sm font-semibold text-ink">Your business name</p>
              <span className="mt-2 inline-flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => (
                  <svg key={star} viewBox="0 0 20 20" className="size-3.5 fill-[#e0a106]">
                    <path d="M10 1.8l2.1 4.5 4.9.7-3.5 3.4.8 4.9L10 13.1 5.7 15.3l.8-4.9L3 7l4.9-.7L10 1.8z" />
                  </svg>
                ))}
              </span>
              <div className="mt-2 grid gap-2">
                <WireBar className="h-3 w-full" />
                <WireBar className="h-3 w-4/5" />
              </div>
              <p className="mt-3 text-xs text-muted">Reviews from your customers appear here</p>
            </article>
          </div>
          <div className="hero-fade relative mt-12 w-full lg:mt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[8%] top-6 h-40 rounded-full bg-brand/25 blur-3xl"
            />
            <div className="relative">
              <DashboardAnnotations />
            </div>
          </div>
        </div>
      </section>

      <PromiseStrip />

      <section className={`bg-soft ${section}`}>
        <div className={wrap}>
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Win the job on trust, not price.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Before someone calls, they check your Google reviews, then they look at your website. Reviews copied in by hand go stale the day you stop updating them. With ReviewBuddy the widget on your site updates when a new Google review comes in, so the next customer sees how you really work.
            </p>
          </div>
          <figure className="mt-16">
            <div className="grid items-start gap-6 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">Without live reviews</p>
                <ExampleFrame url="example.com/reviews">
                  <div className="px-6 py-6 sm:px-8 sm:py-8">
                    <WireBar className="h-4 w-40" />
                    <div className="mt-6 flex flex-wrap gap-2">
                      <WireBar className="h-7 w-24" />
                      <WireBar className="h-7 w-32" />
                    </div>
                    <div className="mt-8 grid gap-2 border-t border-line pt-6">
                      <WireBar className="h-3 w-full" />
                      <WireBar className="h-3 w-11/12" />
                      <WireBar className="h-3 w-8/12" />
                    </div>
                    <p className="mt-6 text-sm text-muted">Newest review: a year ago</p>
                  </div>
                </ExampleFrame>
                <p className="mt-2 text-xs leading-5 text-muted">{exampleCaption}</p>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">With ReviewBuddy</p>
                <ExampleFrame url="example.com">
                  <div className="border-l-[3px] border-brand bg-[linear-gradient(180deg,rgba(56,182,255,0.08),transparent_88px)] px-5 py-6 sm:px-6">
                    <WireBar className="h-4 w-40" />
                    <div className="mt-4 grid gap-2">
                      <div className="flex items-center justify-between rounded-[16px] border border-line bg-white px-3 py-3">
                        <GoogleChip />
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                          Live
                          <span className="pulse-dot size-2 rounded-full bg-brand" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[0, 1].map((index) => (
                        <WireCard key={index}>
                          <div className="flex items-center gap-3">
                            <span className="size-10 shrink-0 rounded-full bg-[#e6e8eb]" aria-hidden="true" />
                            <WireBar className="h-3 w-28" />
                          </div>
                          <div className="mt-3 grid gap-2">
                            <WireBar className="h-3 w-full" />
                            <WireBar className="h-3 w-4/5" />
                          </div>
                        </WireCard>
                      ))}
                    </div>
                  </div>
                </ExampleFrame>
                <p className="mt-2 text-xs leading-5 text-muted">{exampleCaption}</p>
              </div>
            </div>
            <figcaption className="mt-4 text-sm leading-6 text-muted">
              Reviews copied in by hand, and reviews that update live.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 ${section}`}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
            All your reviews in one place, on your site.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            We set it up and add the widget to your site.
          </p>
          <ol className="mt-16 grid gap-14 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="rise flex flex-col gap-5 lg:gap-0">
                <div className="lg:pr-8">
                  <p className="text-[3rem] font-extrabold leading-none text-brand-text">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{step.detail}</p>
                </div>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="step-line hidden w-0.5 self-stretch bg-brand lg:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink px-4 py-20 sm:px-6 lg:py-32">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-white">
              See the widget on your site
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-on-dark">
              List, slider or badge. It matches your site and works on phones.
            </p>
          </div>
          <div className="mt-12">
            <WidgetDemo />
          </div>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              "Updates when a new review comes in",
              "Matches your site",
              "Works on phones",
            ].map((fact) => (
              <li key={fact} className="flex items-center gap-2 text-base text-white">
                <svg viewBox="0 0 20 20" className="size-4 shrink-0 fill-brand" aria-hidden="true">
                  <path d="M10 1.8l2.1 4.5 4.9.7-3.5 3.4.8 4.9L10 13.1 5.7 15.3l.8-4.9L3 7l4.9-.7L10 1.8z" />
                </svg>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`bg-soft ${section}`}>
        <div className={wrap}>
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              You have already done the hard part.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Your past customers already know your work. On Growth, we show you how to export them from the software you already use and import them by CSV. Then email sequences ask them for a review, and bring past leads back into the conversation.
            </p>
            <ul className="mt-8 grid gap-3">
              {[
                "Export your past customers. We show you how.",
                "Import them by CSV.",
                "Email sequences keep asking, so you do not have to.",
              ].map((item) => (
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
            <div className="mt-8">
              <Link
                href="/pricing#growth"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink bg-white px-5 font-semibold text-ink"
              >
                See the Growth plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className={`scroll-mt-24 bg-brand-tint ${section}`}>
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Two plans. Pick the one that fits.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Prices include GST. Monthly. Cancel anytime. {SETUP_LINE}
            </p>
          </div>
          <div className="mt-16">
            <PlanPair />
          </div>
          <p className="mt-8 text-center text-base text-muted">
            <Link href="/pricing" className="font-semibold text-ink underline decoration-brand underline-offset-4">
              Compare the plans in full
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="questions" className={section}>
        <div className={wrap}>
          <h2 id="questions" className="max-w-2xl text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
            Questions
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Plans, setup and how it works.
          </p>
          <div className="rise mt-16 max-w-3xl">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </section>

      <section className="bg-brand px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
            Get your reviews working for you.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-ink">
            {finalBandLine}
          </p>
          <TrialButton variant="ink" className="px-6">
            {CTA_LABEL}
          </TrialButton>
        </div>
      </section>
      <StickyTrialBar />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
