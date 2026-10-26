import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { FounderNote } from "@/components/founder-note";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { ProductShot } from "@/components/product-shot";
import { PlatformScreen } from "@/components/platform-screen";
import { WebsiteFrame } from "@/components/product-visual";
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
  },
  {
    title: "Sent the way that suits you.",
    detail:
      "Put it on your invoice, in an email after the job, or on a QR code on the van or your business card. Or your team can mention it at the end of the job.",
  },
  {
    title: "A friendly reminder.",
    detail: "On Growth, if they haven't got to it, they get one polite reminder.",
  },
  {
    title: "The same link, whatever they thought.",
    detail:
      "Everyone gets the same choice of review sites. There's also a private box if they'd rather tell you something directly, so you hear about problems early.",
  },
  {
    title: "Shown on your website.",
    detail: "New reviews appear on your website automatically, so people who find you there see them as well.",
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

const trustItems = [
  "Set up for you",
  "One link, every customer asked the same way",
  "No card to start, no contract",
  fromPriceLine(),
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

const wrap = "mx-auto w-full max-w-[1200px]";
const pad = "px-4 sm:px-6";
const h2 = "text-balance text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink";

export default function HomePage() {
  return (
    <>
      <section className="hero-wash">
        <div className={`${wrap} ${pad} py-10 lg:pt-20 lg:pb-10`}>
          <p className="text-sm font-semibold text-ink">Reviews for Australian tradies</p>
          <h1 className="mt-4 max-w-4xl text-balance text-[clamp(2.4rem,7vw,4.6rem)] font-extrabold leading-[1.02] text-ink">
            Win their trust before they pick up the phone.
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-8 text-muted">
            Before anyone calls, they check your reviews, see you&apos;re reputable, and see you&apos;ve got more of them than the next business. ReviewBuddy makes asking for reviews part of every job and shows them on your website. I set it all up for you.
          </p>
          <div className="mt-7 w-full sm:w-auto" data-hero-cta="">
            <TrialButton variant="ink" location="hero" className="w-full px-8 sm:w-auto">
              {CTA_LABEL}
            </TrialButton>
          </div>
          <p className="mt-4 text-base font-semibold leading-6 text-ink">
            {TRIAL_LINE} {fromPriceLine()}.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            <Link href="/free-review-breakdown" className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
              Not ready? Get a free review breakdown first.
            </Link>
          </p>
        </div>
        <div className={`${wrap} ${pad} pb-12 lg:pb-20`}>
          <PlatformScreen />
        </div>
      </section>

      <section aria-label="What you get" className="border-b border-line bg-white">
        <ul className={`${wrap} ${pad} grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4`}>
          {trustItems.map((item) => (
            <li key={item} className="text-base font-semibold leading-6 text-ink">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${pad} py-16 lg:py-24`}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 className={h2}>Win the job on trust, not price.</h2>
          <div className="mt-6 grid max-w-2xl gap-4 text-lg leading-8 text-muted">
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
      </section>

      <section className={`bg-soft ${pad} py-16 lg:py-24`}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 className={h2}>It&apos;s a tough year to be competing on price.</h2>
          <div className="mt-6 grid max-w-2xl gap-4 text-lg leading-8 text-muted">
            <p>
              You don&apos;t need me to tell you it&apos;s hard out there. Trades prices rose 6.6% in the year to September, the fastest in four years (HIA, October 2026). And a quarter of households say they&apos;re putting repairs off because of the cost of living (Finder, July 2026).
            </p>
            <p>
              So when someone does spend, they&apos;re careful about who they let in the house. They check first. 86% of homeowners on hipages check reviews before they hire, and 87% look at the star rating (hipages survey, March 2025).
            </p>
            <p>If your reviews are thin, the job goes to someone else before you knew it was there.</p>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
            Sources: HIA Trades Report, 22 Oct 2026. Finder via realestate.com.au, 20 Jul 2026. hipages homeowner survey, March 2025.
          </p>
        </div>
      </section>

      <section className={`${pad} py-16 lg:py-24`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center`}>
          <div className="max-w-xl">
            <h2 className={h2}>Happy customers don&apos;t leave reviews on their own.</h2>
            <div className="mt-6 grid gap-4 text-lg leading-8 text-muted">
              <p>
                Most of your customers are happy. Hardly any of them leave a review unless someone asks, and asking is where it falls over.
              </p>
              <p>
                It feels awkward. You forget when the next job&apos;s waiting. And when you do ask, the customer has to find your business on Google, find the review button, and remember to do it later. Most don&apos;t.
              </p>
              <p>The unhappy ones never need asking. That&apos;s how a good business ends up with 12 reviews while an average one has 80.</p>
            </div>
          </div>
          <ProductShot
            src="/images/request-review.png"
            alt="Sample review request sent to a customer"
            width={474}
            height={578}
            tone="tint"
            sizes="(min-width: 1024px) 360px, 92vw"
          />
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 bg-soft ${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <h2 className={h2}>How ReviewBuddy gets you more reviews.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            ReviewBuddy is a simple system that takes the friction out of asking, following up and showing your reviews. Here&apos;s what happens.
          </p>
          <ol className="mt-10 grid gap-0">
            {howSteps.map((step, index) => (
              <li key={step.title} className="grid gap-2 border-t-2 border-ink py-6">
                <span className="text-sm font-bold text-brand-text">{index + 1}</span>
                <h3 className="text-2xl font-bold text-ink">{step.title}</h3>
                <p className="max-w-3xl text-base leading-7 text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
            Every review comes from a real customer. We never write reviews, offer incentives, or filter out unhappy customers. Those are Google&apos;s rules and Australian consumer law.
          </p>
        </div>
      </section>

      <section className={`${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <h2 className={h2}>However you finish a job, there&apos;s a way to ask.</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {shareWays.map((way) => (
              <li key={way.title} className="rounded-[10px] border border-line bg-white p-6">
                <h3 className="text-xl font-bold text-ink">{way.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{way.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`bg-soft ${pad} py-16 lg:py-24`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center`}>
          <div className="max-w-xl">
            <h2 className={h2}>Be the tradie with the reviews.</h2>
            <div className="mt-6 grid gap-4 text-lg leading-8 text-muted">
              <p>
                Picture someone comparing three tradies. One has 9 reviews from 2022. One has 30. You&apos;ve got 80, and the latest is from last week.
              </p>
              <p>
                They don&apos;t know any of you. But they know who looks busy, trusted and still doing good work right now. That&apos;s who gets the call.
              </p>
              <p>And it&apos;s not only on Google. When they click through to your website, your reviews are there too.</p>
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
      </section>

      <section aria-labelledby="widget" className={`${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <div className="max-w-3xl">
            <h2 id="widget" className={h2}>Your reviews, right where your ads and SEO send people.</h2>
            <div className="mt-6 grid max-w-2xl gap-4 text-lg leading-8 text-muted">
              <p>You pay for ads and SEO to get people to your website. When they land, most are still deciding.</p>
              <p>
                The ReviewBuddy widget shows your latest reviews on your site, from Google and your other review sites, with your rating and review count. It updates on its own, so it never goes stale. It&apos;s there to turn more of those visits into calls.
              </p>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
              More than half of people (54%) visit a business&apos;s website after reading positive reviews (BrightLocal, 2026, US survey). Local search experts rank a high Google rating as the number one thing that turns a search into a customer (Whitespark, 2026).
            </p>
          </div>
          <div className="mt-10">
            <WebsiteFrame />
          </div>
        </div>
      </section>

      {/* Kovele proof stays off until Dan supplies real, approved numbers. */}
      <ProofBlock />

      <section className={`bg-soft ${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <h2 className={h2}>I do the setup. You keep doing the work.</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold text-ink">What I do</h3>
              <ul className="mt-4 grid gap-3">
                {iDo.map((item) => (
                  <li key={item} className="text-base leading-7 text-muted">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink">What you do</h3>
              <ul className="mt-4 grid gap-3">
                {youDo.map((item) => (
                  <li key={item} className="text-base leading-7 text-muted">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-base font-semibold text-ink">{SETUP_LINE}</p>
        </div>
      </section>

      <section className={`${pad} py-16 lg:py-24`}>
        <div className={`${wrap} max-w-3xl`}>
          <h2 className={h2}>You&apos;ve probably got dozens of reviews you never asked for.</h2>
          <div className="mt-6 grid max-w-2xl gap-4 text-lg leading-8 text-muted">
            <p>Think about last year&apos;s jobs. Most of those customers were happy, and most were never asked.</p>
            <p>
              On Growth, send me a list of people you&apos;ve actually done work for. They get the same friendly request, with one reminder.
            </p>
          </div>
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

      <FounderNote />

      <section id="pricing" className={`scroll-mt-24 bg-brand-tint ${pad} py-16 lg:py-24`}>
        <div className={wrap}>
          <div className="max-w-2xl">
            <h2 className={h2}>Two plans. Both set up for you.</h2>
            <p className="mt-5 text-lg leading-8 text-muted">{PRICING_SUB}</p>
            <p className="mt-3 text-base leading-7 text-muted">{BOTH_PLANS_LINE}</p>
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
            <h2 id="questions" className={h2}>Fair questions</h2>
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
              Build the trust before they call.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink">
              Free for 7 days. No card needed. I&apos;ll set it up for you.
            </p>
            <p className="mt-3 text-sm leading-6 text-ink">
              <Link href="/free-review-breakdown" className="font-semibold underline decoration-ink decoration-2 underline-offset-4">
                Or get a free review breakdown first
              </Link>
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
