import Link from "next/link";
import { preload } from "react-dom";
import { ArtImage } from "@/components/art-image";
import { FaqAccordion } from "@/components/faq-accordion";
import { FounderNote } from "@/components/founder-note";
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
    detail: "New reviews show in a widget on your website, boosting the conversion rate of your website traffic.",
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

function SectionCta({ location, quiet = false }: { location: string; quiet?: boolean }) {
  return (
    <div className="section-cta">
      <TrialButton variant="gold" location={location} className="w-full lg:w-auto">
        {CTA_LABEL}
      </TrialButton>
      {quiet ? (
        <p className="how-quiet">
          See where you stand first with a <Link href="/free-review-breakdown">free review breakdown</Link>
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
  preload("/img/reviewbuddy-key-image-mobile-hero-800-v3.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 1023px)",
    type: "image/webp",
    imageSrcSet:
      "/img/reviewbuddy-key-image-mobile-hero-800-v3.webp 800w, /img/reviewbuddy-key-image-mobile-hero-v3.webp 1080w",
    imageSizes: "calc(100vw - 60px)",
  });
  preload("/img/reviewbuddy-key-image-desktop-2400-v3.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 1024px)",
    type: "image/webp",
  });

  return (
    <>
      <section className="site-hero">
        <div className="wrap mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)]">
          <p className="eyebrow text-[var(--rb-accent)]">Google reviews for Australian tradies</p>
          <h1 className="display mx-auto mt-4 max-w-[18em] text-balance">
            Win your customers&apos;{" "}
            <span className="trust-word">
              trust
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
            </span>{" "}
            before they even call you (and stop competing on price)
          </h1>
          <p className="lead mx-auto mt-5 max-w-[34rem] text-[var(--rb-on-brand-muted)]">
            ReviewBuddy ensures you generate reviews after every job you complete, ensuring you get more and more quality leads into your business.
          </p>
          <div className="hero-actions">
            <div data-hero-cta="" className="w-full lg:w-auto">
              <TrialButton variant="gold" location="hero" className="w-full lg:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
          </div>
          <p className="trial-line mx-auto mt-3 max-w-[34rem] text-sm leading-5 text-[var(--rb-on-brand-muted)]">{TRIAL_LINE}</p>
          <p className="hero-quiet">
            See where you stand first with a{" "}
            <Link href="/free-review-breakdown">free review breakdown</Link>
          </p>
          <ul className="trust-bar" aria-label="What you get">
            {TRUST_BAR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="stage">
            <KeyImage priority />
          </div>
          <p className="hero-demo lg:hidden">Demo data for illustration. Not real customers or reviews.</p>
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

      <section id="s-how" className="bg-[var(--rb-surface-alt)]">
        <div className="shell how-shell">
          <div className="how3-head">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3">Three steps, all set up for you</h2>
          </div>
          <div className="how-row">
            <div className="how-copy">
              <span className="how-num step-num">01</span>
              <h3>{howSteps[0].title}</h3>
              <p>{howSteps[0].detail}</p>
            </div>
            <figure className="art demo-shot">
              <div className="shot-frame">
                <ArtImage
                  desktop={{
                    webp: "/img/screens/reviewbuddy-send-review-request-desktop-v2.webp",
                    png: "/img/screens/reviewbuddy-send-review-request-desktop-v2.png",
                    width: 1520,
                    height: 1314,
                  }}
                  mobile={{
                    webp: "/img/screens/reviewbuddy-send-review-request-mobile-v2.webp",
                    png: "/img/screens/reviewbuddy-send-review-request-mobile-v2.png",
                    width: 440,
                    height: 590,
                  }}
                  alt="The ReviewBuddy Send Review Request screen, with empty fields for a customer name and contact, and buttons for sending by email or copying the link. No customer is filled in."
                />
              </div>
              <figcaption>Sending a request from the app.</figcaption>
            </figure>
          </div>
          <div className="how-row flip">
            <div className="how-copy">
              <span className="how-num step-num">02</span>
              <h3>{howSteps[1].title}</h3>
              <p>{howSteps[1].detail}</p>
            </div>
            <div className="follow-panel" aria-hidden="false">
              <p className="follow-line">After the job: review request sent</p>
              <div className="follow-rule" aria-hidden="true" />
              <p className="follow-line">Later: one polite reminder, only if they haven&apos;t reviewed yet</p>
            </div>
          </div>
          <div className="how-row">
            <div className="how-copy">
              <span className="how-num step-num">03</span>
              <h3>{howSteps[2].title}</h3>
              <p>{howSteps[2].detail}</p>
            </div>
            <figure className="art demo-shot">
              <div className="shot-frame">
                <ArtImage
                  desktop={{
                    webp: "/img/screens/reviewbuddy-widget-on-website-desktop-v2.webp",
                    png: "/img/screens/reviewbuddy-widget-on-website-desktop-v2.png",
                    width: 2400,
                    height: 1210,
                  }}
                  mobile={{
                    webp: "/img/screens/reviewbuddy-widget-on-website-mobile-v2.webp",
                    png: "/img/screens/reviewbuddy-widget-on-website-mobile-v2.png",
                    width: 1080,
                    height: 1044,
                  }}
                  alt="The ReviewBuddy widget on a website, showing a rating, a review count and demo reviews. The reviewer names and review text are demo data."
                />
              </div>
              <figcaption>The widget on a website. Demo data for illustration. Not real customers or reviews.</figcaption>
            </figure>
          </div>
          <p className="rules-line">
            Everyone gets the same link and the same choice of sites, happy or not. That&apos;s Google&apos;s rules.
          </p>
          <SectionCta location="how-it-works" quiet />
        </div>
      </section>

      <ProofBlock />

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
                Build the{" "}
                <span className="trust-word">
                  trust
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
              </span>
              <span className="close-line">before they call</span>
            </h2>
            <p className="lead">{CLOSING_LINE}</p>
            <TrialButton variant="gold" location="home-final" className="close-cta px-8">
              {CTA_LABEL}
            </TrialButton>
            <p className="hero-quiet">
              See where you stand first with a <Link href="/free-review-breakdown">free review breakdown</Link>
            </p>
          </div>
        </div>
      </section>
      <StickyTrialBar />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
