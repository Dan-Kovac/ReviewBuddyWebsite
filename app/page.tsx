import Link from "next/link";
import { preload } from "react-dom";
import { FaqList } from "@/components/faq-list";
import { FeatureBento } from "@/components/feature-bento";
import { FounderNote } from "@/components/founder-note";
import { JsonLd } from "@/components/json-ld";
import { KeyImage } from "@/components/key-image";
import { PlanPair } from "@/components/plan-pair";
import { PlatformLogos } from "@/components/platform-logos";
import { ProofBlock } from "@/components/proof-block";
import { SpotsLeft } from "@/components/spots-left";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { fromPriceLine } from "@/lib/gst";
import { BOTH_PLANS_LINE, CTA_LABEL, PRICING_SUB, SETUP_LINE, TRIAL_LINE, contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "More Google Reviews for Tradies | ReviewBuddy",
  description:
    "Build trust before they call. One link to ask every customer for a review, and your reviews on your website. Set up for you. Free for 7 days, no card needed.",
  path: "/",
});

const howSteps = [
  {
    title: "One link for every customer.",
    detail:
      "Your customer gets one link. It opens a page with your review sites on it, like Google and Facebook, and they pick where to leave it. No searching for your business.",
    slot: "Real screenshot: customer review page",
  },
  {
    title: "Sent the way that suits you.",
    detail:
      "Put it on your invoice, in an email after the job, or on a QR code on the van or your business card. Or your team can mention it at the end of the job. On Growth, if they haven't got to it, they get one polite reminder.",
    slot: "Real photo: QR code on a van or invoice",
  },
  {
    title: "Shown on your website.",
    detail: "New reviews appear on your website automatically, so people who find you there see them as well.",
    slot: "Real screenshot: review widget on a site",
  },
];

const shareWays = [
  {
    title: "On the invoice.",
    detail: "A short line and your link or QR code.",
  },
  {
    title: "By email after the job.",
    detail: "Written for you, approved by you. On Growth it sends itself.",
  },
  {
    title: "On the van or a card.",
    detail: "A QR code they can scan before you've packed up.",
  },
  {
    title: "In person.",
    detail:
      "Your team can say \"If you've got a minute later, we'd really appreciate a review. The link's on your invoice.\" That's it. No standing over them, no pressure.",
  },
];

const iDo = [
  "Connect your Google profile and your other review sites",
  "Build your review link and QR code",
  "Put the widget on your website, matched to your colours",
  "Write your review email, and you approve it before anything goes out",
  "On Growth, load your past customers and send their requests",
];

const youDo = [
  "Give me access to your Google profile and website (I'll show you how)",
  "Put the link or QR code on your invoices, van or cards",
  "Keep doing good work",
];

const shell = "mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)] py-[var(--rb-section-y)]";

export default function HomePage() {
  preload("/img/reviewbuddy-key-image-mobile-hero-800.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 1023px)",
    type: "image/webp",
    imageSrcSet:
      "/img/reviewbuddy-key-image-mobile-hero-800.webp 800w, /img/reviewbuddy-key-image-mobile-hero.webp 1080w",
    imageSizes: "calc(100vw - 60px)",
  });
  preload("/img/reviewbuddy-key-image-desktop-2400.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 1024px)",
    type: "image/webp",
  });

  return (
    <>
      <section className="site-hero">
        <div className="wrap mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)]">
          <p className="eyebrow text-[var(--rb-accent)]">Reviews for Australian tradies</p>
          <h1 className="display mx-auto mt-4 max-w-[19ch] text-balance">
            Win their{" "}
            <span className="trust-word">
              trust
              <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M2 8 C 25 3, 55 2, 98 5 M8 11 C 35 7, 70 7, 94 9"
                  fill="none"
                  stroke="currentColor"
                  className="text-[var(--rb-accent)]"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            before they pick up the phone.
          </h1>
          <p className="lead mx-auto mt-5 max-w-[34rem] text-[var(--rb-on-brand-muted)]">
            Before anyone calls, they check your reviews, see you&apos;re reputable, and see you&apos;ve got more of them than the next business. ReviewBuddy makes asking for reviews part of every job and shows them on your website. I set it all up for you.
          </p>
          <div className="hero-actions">
            <div data-hero-cta="" className="w-full lg:w-auto">
              <TrialButton variant="gold" location="hero" className="w-full lg:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
            <Link
              href="/free-review-breakdown"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-[1.5px] border-[color-mix(in_srgb,var(--rb-on-brand)_40%,transparent)] px-6 text-center text-base font-semibold whitespace-normal text-[var(--rb-on-brand)] lg:w-auto"
            >
              Not ready? Get a free review breakdown first.
            </Link>
          </div>
          <p className="micro-claims">
            <span>No card needed</span>
            <span>Set up for you</span>
            <span>{fromPriceLine()}</span>
          </p>
          <p className="mx-auto mt-3 max-w-[34rem] text-sm leading-5 text-[var(--rb-on-brand-muted)]">{TRIAL_LINE}</p>
          <div className="stage">
            <KeyImage priority />
          </div>
        </div>
      </section>

      <PlatformLogos />
      <p className="bg-[var(--rb-surface)] pb-6 text-center text-sm leading-5 text-[var(--rb-text-muted)]">
        Demo data for illustration. Not real customers or reviews.
      </p>

      <section id="how-it-works" className="scroll-mt-24 bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3">One link. Every customer. Shown on your site.</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">
              ReviewBuddy is a simple system that takes the friction out of asking, following up and showing your reviews. Here&apos;s what happens. One link, every customer asked the same way.
            </p>
          </div>
          <ol className="steps">
            {howSteps.map((step, index) => (
              <li key={step.title} className="step">
                <span className="step-num">{index + 1}</span>
                <h3>{step.title}</h3>
                <p className="text-base leading-6 text-[var(--rb-text-muted)]">{step.detail}</p>
                <div className="placeholder">{step.slot}</div>
              </li>
            ))}
          </ol>
          <div className="fair">
            <svg width="20" height="20" viewBox="0 0 20 20" className="mt-px shrink-0" aria-hidden="true">
              <path d="M10 2l6 2.5v5c0 4-2.7 7-6 8.5-3.3-1.5-6-4.5-6-8.5v-5z" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="M7 10l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <p>
              Everyone gets the same link, whatever they thought. There&apos;s also a private box if they&apos;d rather tell you something directly, so you hear about problems early. Every review comes from a real customer. We never write reviews, offer incentives, or filter out unhappy customers. Those are Google&apos;s rules and Australian consumer law.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <p className="eyebrow">Inside ReviewBuddy</p>
            <h2 className="mt-3">All your reviews, in one place.</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">
              Every crop below is the real Reviews screen, not a mock-up of features we don&apos;t have.
            </p>
          </div>
          <FeatureBento />
        </div>
      </section>

      <section className="bg-[var(--rb-surface-alt)]">
        <div className={`${shell} max-w-none`}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2>Win the job on trust, not price.</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                People used to pick a tradie because someone over the back fence said &quot;use this one&quot;. That recommendation still decides who gets the job. It just happens on Google now.
              </p>
              <p>
                They search, they look at the stars and the number of reviews, and they ring the one that looks trusted. If that&apos;s you, you&apos;re the safe pick. And the safe pick doesn&apos;t have to be the cheapest quote.
              </p>
              <p>
                That&apos;s the whole idea. More reviews build trust. Trust wins the job. And winning on trust instead of price is where the profit is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2>It&apos;s a tough year to be competing on price.</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                You don&apos;t need me to tell you it&apos;s hard out there. Trades prices rose 6.6% in the year to September, the fastest in four years (HIA, October 2026). And a quarter of households say they&apos;re putting repairs off because of the cost of living (Finder, July 2026).
              </p>
              <p>
                So when someone does spend, they&apos;re careful about who they let in the house. They check first. 86% of homeowners on hipages check reviews before they hire, and 87% look at the star rating (hipages survey, March 2025).
              </p>
              <p>If your reviews are thin, the job goes to someone else before you knew it was there.</p>
            </div>
            <p className="mt-6 text-sm leading-6 text-[var(--rb-text-muted)]">
              Sources: HIA Trades Report, 22 Oct 2026. Finder via realestate.com.au, 20 Jul 2026. hipages homeowner survey, March 2025.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2>Happy customers don&apos;t leave reviews on their own.</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                Most of your customers are happy. Hardly any of them leave a review unless someone asks, and asking is where it falls over.
              </p>
              <p>
                It feels awkward. You forget when the next job&apos;s waiting. And when you do ask, the customer has to find your business on Google, find the review button, and remember to do it later. Most don&apos;t.
              </p>
              <p>The unhappy ones never need asking. That&apos;s how a good business ends up with 12 reviews while an average one has 80.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <h2>However you finish a job, there&apos;s a way to ask.</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {shareWays.map((way) => (
              <li key={way.title} className="rounded-[var(--rb-radius-lg)] bg-[var(--rb-surface-raised)] p-7 shadow-[var(--rb-shadow-card)]">
                <h3>{way.title}</h3>
                <p className="mt-2 text-base leading-7 text-[var(--rb-text-muted)]">{way.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2>Be the tradie with the reviews.</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                Picture someone comparing three tradies. One has 9 reviews from 2022. One has 30. You&apos;ve got 80, and the latest is from last week.
              </p>
              <p>
                They don&apos;t know any of you. But they know who looks busy, trusted and still doing good work right now. That&apos;s who gets the call.
              </p>
              <p>And it&apos;s not only on Google. When they click through to your website, your reviews are there too.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="widget" className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2 id="widget">Your reviews, right where your ads and SEO send people.</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>You pay for ads and SEO to get people to your website. When they land, most are still deciding.</p>
              <p>
                The ReviewBuddy widget shows your latest reviews on your site, from Google and your other review sites, with your rating and review count. It updates on its own, so it never goes stale. It&apos;s there to turn more of those visits into calls.
              </p>
            </div>
            <p className="mt-6 text-sm leading-6 text-[var(--rb-text-muted)]">
              More than half of people (54%) visit a business&apos;s website after reading positive reviews (BrightLocal, 2026, US survey). Local search experts rank a high Google rating as the number one thing that turns a search into a customer (Whitespark, 2026).
            </p>
          </div>
          <div className="placeholder mt-10 max-w-xl">Real screenshot: review widget on a site</div>
        </div>
      </section>

      <ProofBlock />

      <section className="bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <h2>I do the setup. You keep doing the work.</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3>What I do</h3>
              <ul className="mt-4 grid gap-3">
                {iDo.map((item) => (
                  <li key={item} className="text-base leading-7 text-[var(--rb-text-muted)]">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>What you do</h3>
              <ul className="mt-4 grid gap-3">
                {youDo.map((item) => (
                  <li key={item} className="text-base leading-7 text-[var(--rb-text-muted)]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-base font-semibold">{SETUP_LINE}</p>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2>You&apos;ve probably got dozens of reviews you never asked for.</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>Think about last year&apos;s jobs. Most of those customers were happy, and most were never asked.</p>
              <p>
                On Growth, send me a list of people you&apos;ve actually done work for. They get the same friendly request, with one reminder.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/pricing#growth"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-[var(--rb-line-strong)] bg-[var(--rb-surface-raised)] px-6 font-semibold text-[var(--rb-brand)]"
              >
                See the Growth plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FounderNote />

      <section id="pricing" className="scroll-mt-24 bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="mx-auto max-w-[var(--rb-text-max)] text-center">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3">Two plans. Both set up for you.</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">{PRICING_SUB}</p>
            <p className="mt-3 text-base leading-7 text-[var(--rb-text-muted)]">{BOTH_PLANS_LINE}</p>
            <SpotsLeft />
          </div>
          <div className="mx-auto mt-10 max-w-[880px]">
            <PlanPair location="home-plans" />
          </div>
          <p className="mt-8 text-center text-base">
            <Link href="/pricing" className="font-semibold underline decoration-[var(--rb-brand)] decoration-2 underline-offset-4">
              Compare the plans in full
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="questions" className="bg-[var(--rb-surface)]">
        <div className={`${shell} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20`}>
          <div>
            <h2 id="questions">Fair questions</h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-[var(--rb-text-muted)]">
              Ask me anything else at{" "}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-[var(--rb-text)] underline decoration-[var(--rb-brand)] decoration-2 underline-offset-4">
                {contactEmail}
              </a>
              .
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <section className="band">
        <div className="mx-auto flex w-full max-w-[var(--rb-max-width)] flex-col gap-8 px-[var(--rb-gutter)] py-[var(--rb-section-y)] md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl text-[var(--rb-on-brand)]">Build the trust before they call.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--rb-on-brand-muted)]">
              Free for 7 days. No card needed. I&apos;ll set it up for you.
            </p>
            <p className="mt-3 text-sm leading-6">
              <Link href="/free-review-breakdown" className="font-semibold text-[var(--rb-on-brand)] underline decoration-[var(--rb-accent)] decoration-2 underline-offset-4">
                Or get a free review breakdown first
              </Link>
            </p>
          </div>
          <TrialButton variant="gold" location="home-final" className="px-8">
            {CTA_LABEL}
          </TrialButton>
        </div>
      </section>
      <StickyTrialBar />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
