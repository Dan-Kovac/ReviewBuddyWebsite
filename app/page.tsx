import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { FounderNote } from "@/components/founder-note";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { PlatformScreen } from "@/components/platform-screen";
import { ProductShot } from "@/components/product-shot";
import { ProofBlock } from "@/components/proof-block";
import { SpotsLeft } from "@/components/spots-left";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { TrialTimeline } from "@/components/trial-timeline";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { BOTH_PLANS_LINE, CTA_LABEL, TRIAL_LINE, contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get More Google Reviews | ReviewBuddy for Tradies",
  description:
    "We help tradies get more Google reviews, then put them on their website. Plans from $49 a month, GST included.",
  path: "/",
});

const steps = [
  {
    title: "Ask after the job",
    detail: "Share your Google review link or QR code when the job's done. On Growth, we email them for you.",
  },
  {
    title: "Reviews come in",
    detail: "They land on Google, and on the other sites you already use.",
  },
  {
    title: "They show on your website",
    detail: "Your best Google reviews show on your website. They update when a new one comes in.",
  },
];

const platformNames = ["Google", "Facebook", "Service Seeking", "hipages", "Airtasker", "Houzz"];

const wrap = "mx-auto w-full max-w-[1200px]";
const pad = "px-4 sm:px-6";

export default function HomePage() {
  return (
    <>
      <section className="hero-wash">
        <div className={`${wrap} ${pad} grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-20`}>
          <div>
            <p className="text-sm font-semibold text-ink">Google reviews for tradies</p>
            <h1 className="mt-4 text-balance text-[clamp(2.6rem,9.5vw,5.25rem)] font-extrabold leading-[1] text-ink">
              Get chosen before they <span className="text-brand-text">call</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-8 text-muted">
              We help you get more Google reviews from happy customers, then put them on your website. You do the work, we do the asking.
            </p>
            <div className="mt-7 w-full sm:w-auto" data-hero-cta="">
              <TrialButton variant="ink" location="hero" className="w-full px-8 sm:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
            <SpotsLeft />
            <p className="mt-4 text-base font-semibold leading-6 text-ink">{TRIAL_LINE}</p>
            <p className="mt-2 text-base leading-7 text-ink">
              Questions first? Email{" "}
              <a href={`mailto:${contactEmail}`} className="font-semibold underline decoration-brand decoration-2 underline-offset-4">
                {contactEmail}
              </a>
              .
            </p>
            <p className="mt-6 text-sm leading-6 text-muted">
              Plans from $49 a month, GST included.{" "}
              <Link href="/pricing" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                Compare plans
              </Link>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              <Link href="/free-review-breakdown" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                Get a free review breakdown first
              </Link>
            </p>
          </div>
          <ProductShot
            src="/images/hero.png"
            alt="Sample Google review card and a rating request"
            width={1116}
            height={1130}
            priority
            sizes="(min-width: 1024px) 520px, 92vw"
          />
        </div>
      </section>

      <TrialTimeline />

      <section aria-labelledby="platform-screen" className={`bg-soft ${pad} py-14 lg:py-20`}>
        <div className={wrap}>
          <div className="max-w-3xl">
            <h2 id="platform-screen" className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Google, hipages, Service Seeking. All on your website.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Connect the sites you already get reviews on. They show up together in one box on your site, and it updates itself.
            </p>
          </div>
          <div className="mt-8 lg:mt-10">
            <PlatformScreen />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">Review sites you can bring together</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-base leading-7 text-muted">
              {platformNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProofBlock />

      <section className={`${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
            <div>
              <h2 className="text-balance text-[clamp(2.25rem,7vw,4.25rem)] font-extrabold leading-[1.02] text-ink">
                The tradie with the reviews gets the call
              </h2>
              <div className="mt-8 max-w-xl border-l-4 border-brand pl-5 text-lg leading-8 text-muted">
                <p>People check your Google reviews before they ring. Then they check your website.</p>
                <p className="mt-4">If your site still shows three reviews from 2022, that&apos;s what they judge you on.</p>
              </div>
            </div>
            <ProductShot
              src="/images/find-the-best.png"
              alt="Sample review cards from Google and other sites"
              width={995}
              height={868}
              tone="soft"
              sizes="(min-width: 1024px) 420px, 92vw"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 bg-soft ${pad} py-16 lg:py-24`}>
        <div className={`${wrap} grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              How it works
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">We set it up and put your reviews on your site.</p>
            <div className="mt-8 max-w-[320px]">
              <ProductShot
                src="/images/request-review.png"
                alt="Sample review request sent to a customer"
                width={474}
                height={578}
                tone="tint"
                sizes="320px"
              />
            </div>
          </div>
          <ol className="grid">
            {steps.map((step, index) => (
              <li key={step.title} className="grid gap-2 border-t-2 border-ink py-6">
                <span className="text-sm font-bold text-brand-text">{index + 1}</span>
                <h3 className="text-2xl font-bold text-ink">{step.title}</h3>
                <p className="text-base leading-7 text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FounderNote />

      <section className={`${pad} py-16 lg:py-24`}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
            You&apos;ve already done the hard part
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Send us a list of past customers. We&apos;ll load it and ask them for you, with one reminder.
          </p>
          <div className="mt-8">
            <Link
              href="/pricing#growth"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink bg-white px-6 font-semibold text-ink hover:bg-ink hover:text-white"
            >
              See the Growth plan
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className={`scroll-mt-24 bg-brand-tint ${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <div className="max-w-2xl">
            <h2 className="text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Most tradies start on Growth
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">{BOTH_PLANS_LINE}</p>
            <SpotsLeft />
          </div>
          <div className="mt-14">
            <PlanPair location="home-plans" />
          </div>
          <p className="mt-10 text-base text-muted">
            <Link href="/pricing" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
              Compare the plans in full
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="questions" className={`${pad} py-16 lg:py-24`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20`}>
          <div>
            <h2 id="questions" className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
              Fair questions
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-8 text-muted">
              Ask me anything else at{" "}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                {contactEmail}
              </a>
              .
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <section className={`bg-brand ${pad} py-16 lg:py-24`}>
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:items-end md:justify-between`}>
          <div>
            <h2 className="max-w-2xl text-balance text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.02] text-ink">
              Try it free for 7 days
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink">
              Then Starter is $49 a month or Growth is $75 a month.
            </p>
          </div>
          <TrialButton variant="ink" location="home-final" className="px-8">
            {CTA_LABEL}
          </TrialButton>
        </div>
      </section>
      <StickyTrialBar />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
