import Link from "next/link";
import { ArtImage } from "@/components/art-image";
import { FaqAccordion } from "@/components/faq-accordion";
import { FounderNote } from "@/components/founder-note";
import { HeroStory } from "@/components/hero-story";
import { Tick } from "@/components/tick";
import { JsonLd } from "@/components/json-ld";
import { KeyImage } from "@/components/key-image";
import { PlanPair } from "@/components/plan-pair";
import { ProofBlock } from "@/components/proof-block";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { homeMetaDescription } from "@/lib/gst";
import { CLOSING_LINE, CTA_LABEL, PRICING_SUB, SETUP_LINE, STICKY_TRIAL_TEXT, TRIAL_LINE, TRUST_BAR, contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "More Google Reviews for Tradies | ReviewBuddy",
  description: homeMetaDescription(),
  path: "/",
});

const howSteps = [
  {
    title: "Ask every customer",
    detail: "One link and QR code. Your customer taps it, picks Google or Facebook, and reviews.",
  },
  {
    title: "Follow up once",
    detail: "On Growth it goes out after every job. On Starter, you send the link yourself.",
  },
  {
    title: "Shown on your website",
    detail:
      "New reviews show in a widget on your own website, matched to your colours. The proof sits where the decision happens, not on a profile you don't own.",
  },
] as const;

const weDo = [
  "Connect your Google profile and other review sites",
  "Build your review link and QR code",
  "Put the widget on your website, matched to your colours",
  "Write your review email for you to approve and send to existing clients",
];

const youDo = [
  "Give us access to your Google profile and website (we'll show you how)",
  "Put the link or QR code on your invoices, van or cards",
];

const ghostCta =
  "inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-[1.5px] border-[color-mix(in_srgb,var(--rb-on-brand)_40%,transparent)] bg-transparent px-6 text-center text-base font-semibold text-[var(--rb-on-brand)] hover:bg-[color-mix(in_srgb,var(--rb-on-brand)_8%,transparent)] lg:w-auto";

function SectionCta({ location, quiet = false }: { location: string; quiet?: boolean }) {
  return (
    <div className="section-cta">
      <TrialButton variant="gold" location={location} className="w-full lg:w-auto">
        {CTA_LABEL}
      </TrialButton>
      {quiet ? (
        <p className="how-quiet">
          See how you stack up first with a <Link href="/free-review-breakdown">free review breakdown</Link>
        </p>
      ) : (
        <p className="micro">{STICKY_TRIAL_TEXT}</p>
      )}
    </div>
  );
}

function HelpGuidesLink({ className }: { className: string }) {
  return (
    <Link href="/help" className={className}>
      Help guides
      <svg className="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

const shell = "mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)] py-[var(--rb-section-y)]";

export default function HomePage() {
  return (
    <>
      <section className="site-hero">
        <div className="wrap mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)]">
          <p className="eyebrow text-[var(--rb-accent)]">Google reviews for Australian tradies</p>
          <h1 className="display mx-auto mt-4 max-w-[18em] text-balance">
            Get to{" "}
            <span className="trust-word">
              50 Google reviews
              <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M2 8 C 25 3, 55 2, 98 5 M8 11 C 35 7, 70 7, 94 9"
                  fill="none"
                  stroke="currentColor"
                  className="text-[var(--rb-accent)]"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            . We&apos;ll get you there in 90 days.
          </h1>
          <p className="lead mx-auto mt-5 max-w-[34rem] text-[var(--rb-on-brand-muted)]">
            The typical Aussie trade business has 52. Get past 50 and you jump most of the tradies customers compare
            you with - your rating does the selling before they call.
          </p>
          <div className="hero-actions">
            <div data-hero-cta="" className="w-full lg:w-auto">
              <TrialButton variant="gold" location="hero" className="w-full lg:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
            <div className="w-full lg:w-auto">
              <Link href="/free-review-breakdown" className={ghostCta}>
                See how you stack up - free report
              </Link>
            </div>
          </div>
          <p className="trial-line mx-auto mt-3 max-w-[34rem] text-sm leading-5 text-[var(--rb-on-brand-muted)]">{TRIAL_LINE}</p>
          <ul className="trust-bar" aria-label="What you get">
            {TRUST_BAR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <HeroStory />
        </div>
      </section>

      <section id="s-problem" className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="problem">
            <div>
              <h2>Happy customers don&apos;t leave reviews on their own</h2>
              <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
                <p>Most of your customers are happy, but hardly any leave a review unless someone asks. It feels awkward, and you forget when the next job&apos;s waiting.</p>
                <p>86% of homeowners on hipages check reviews before they hire (hipages survey, March 2025).</p>
                <p>Picture someone choosing between two tradies. One has 9 reviews, and the latest is from 2022. You&apos;ve got 80, and the latest is from last week. You get the call.</p>
              </div>
            </div>
            <figure className="art baked-at-lg">
              <ArtImage
                desktop={{
                  webp: "/img/sections/reviewbuddy-be-the-tradie-desktop-v2.webp",
                  png: "/img/sections/reviewbuddy-be-the-tradie-desktop-v2.png",
                  width: 1440,
                  height: 940,
                }}
                mobile={{
                  webp: "/img/sections/reviewbuddy-be-the-tradie-mobile-v2.webp",
                  png: "/img/sections/reviewbuddy-be-the-tradie-mobile-v2.png",
                  width: 1080,
                  height: 2310,
                }}
                alt="An illustration of someone comparing two tradies. One has 9 reviews, latest from 2022. The other has 80 reviews, latest from last week, and those reviews are also shown on a website. Not real businesses."
              />
              <figcaption>Illustration of the example above. Not real businesses or reviews.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="s-fit" className="bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="mx-auto max-w-[var(--rb-text-max)]">
            <p className="eyebrow">Who it&apos;s for</p>
            <h2 className="mt-3">Built for tradies who win or lose jobs on Google</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                ReviewBuddy is for you if customers compare you online before they call. Plumbers, sparkies, builders,
                landscapers - if your next job starts with a Google search, your reviews decide whether the phone rings.
              </p>
              <p>
                It&apos;s not for you if you&apos;re booked solid on word of mouth and don&apos;t want more calls.
                We&apos;d rather tell you that now than take your money.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="s-how" className="bg-[var(--rb-surface)]">
        <div className="shell how-shell">
          <div className="how3-head">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3">Three steps, all set up for you</h2>
          </div>
          <figure className="how-look">
            <KeyImage />
            <figcaption>
              <ol className="how-steps">
                {howSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="how-num step-num">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </figcaption>
          </figure>
          <p className="rules-line">
            Everyone gets the same link and the same choice of sites, happy or not. That&apos;s Google&apos;s rules.
          </p>
          <p className="rules-line">
            Most clients see their first new reviews within a couple of weeks of the link going out.
          </p>
          <SectionCta location="how-it-works" quiet />
        </div>
      </section>

      <ProofBlock />

      <section id="s-proof" className="bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="mx-auto max-w-[var(--rb-text-max)] text-center">
            <p className="eyebrow">The proof</p>
            <h2 className="mt-3">We&apos;re new, and we&apos;d rather earn it than fake it</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">
              Our first customers are climbing to 50 reviews right now. Their words - with name, trade and suburb -
              will sit on this page, and only ever their words.
            </p>
            <p className="mt-6 text-lg font-semibold">One extra job pays for a year of ReviewBuddy.</p>
          </div>
        </div>
      </section>

      <section id="s2" className="sec s2 bg-[var(--rb-surface)]">
        <div className="shell">
          <h2>We set it up for you, so the system works for you before you even pay a cent</h2>
          <div className="g12 s2-grid">
            <div className="card-do">
              <h3>What we do</h3>
              <ul className="list">
                {weDo.map((item) => (
                  <li key={item}>
                    <Tick />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-you">
              <h3>What you do</h3>
              <ol className="nlist">
                {youDo.map((item, index) => (
                  <li key={item}>
                    <span className="num">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="fair-strip">
                <Tick />
                <span>It takes about 2 business days. By then your account is connected and your widget is on your website.</span>
              </p>
              <p className="setup-time">{SETUP_LINE}</p>
            </div>
          </div>
          <SectionCta location="home-setup" />
        </div>
      </section>

      <FounderNote />

      <section id="pricing" className="scroll-mt-24 bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="mx-auto max-w-[var(--rb-text-max)] text-center">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3">Two plans, both set up for you</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">{PRICING_SUB}</p>
          </div>
          <div className="mx-auto mt-10 max-w-[880px]">
            <PlanPair location="home-plans" />
          </div>
          <p className="per-day">About $1.60 a day for Starter, or about $2.50 a day for Growth.</p>
          <p className="mt-4 text-center text-base font-semibold">One extra job pays for a year of ReviewBuddy.</p>
          <p className="mt-8 text-center text-base">
            <Link href="/pricing" className="font-semibold underline decoration-[var(--rb-brand)] decoration-2 underline-offset-4">
              Compare the plans
            </Link>
          </p>
        </div>
      </section>

      <section id="s6" aria-labelledby="questions" className="sec">
        <div className="shell g12">
          <div className="faq-l">
            <div className="stick">
              <h2 id="questions">Fair questions</h2>
              <p className="muted">
                Ask us anything else at{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
                .
              </p>
              <HelpGuidesLink className="link help d-only" />
            </div>
          </div>
          <div className="faq-r">
            <FaqAccordion faqs={homeFaqs} />
            <HelpGuidesLink className="link help m-only" />
          </div>
        </div>
      </section>
      <section id="s7" className="close-sec">
        <div className="shell">
          <div className="cl">
            <h2>
              <span className="close-line">
                Get to{" "}
                <span className="trust-word">
                  50 reviews
                  <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M2 8 C 25 3, 55 2, 98 5 M8 11 C 35 7, 70 7, 94 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </span>
              <span className="close-line">We&apos;ll get you there.</span>
            </h2>
            <p className="lead">{CLOSING_LINE}</p>
            <TrialButton variant="gold" location="home-final" className="close-cta px-8">
              {CTA_LABEL}
            </TrialButton>
            <p className="hero-quiet">
              See how you stack up first with a <Link href="/free-review-breakdown">free review breakdown</Link>
            </p>
          </div>
        </div>
      </section>
      <StickyTrialBar />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
