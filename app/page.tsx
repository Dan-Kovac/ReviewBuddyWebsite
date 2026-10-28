import Link from "next/link";
import { preload } from "react-dom";
import { ArtImage } from "@/components/art-image";
import { FaqAccordion } from "@/components/faq-accordion";
import { FeatureBento } from "@/components/feature-bento";
import { FounderNote } from "@/components/founder-note";
import { Tick } from "@/components/tick";
import { JsonLd } from "@/components/json-ld";
import { KeyImage } from "@/components/key-image";
import { PlanPair } from "@/components/plan-pair";
import { PlatformLogos } from "@/components/platform-logos";
import { ProofBlock } from "@/components/proof-block";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { homeMetaDescription } from "@/lib/gst";
import { BOTH_PLANS_LINE, CLOSING_LINE, CTA_LABEL, PRICING_SUB, SETUP_LINE, TRIAL_LINE, TRUST_BAR, contactEmail, planById } from "@/lib/site";

export const metadata = pageMetadata({
  title: "More Google Reviews for Tradies | ReviewBuddy",
  description: homeMetaDescription(),
  path: "/",
});

const howSteps = [
  {
    title: "One link, and they pick the site",
    detail:
      "Your customer gets one review link. It opens a page with your review sites on it, like Google and Facebook, and they choose where to leave their review. Nobody has to search for your business.",
  },
  {
    title: "A QR code for the van and the counter",
    detail:
      "You get a QR code that opens the same page. Put it on the van, your business card or the invoice, and customers can scan it with their phone camera.",
  },
  {
    title: "Asked the way you already finish a job",
    detail:
      'Add the link to your invoice, send it in an email after the job, or just ask before you leave. Your team can say it too: "If you were happy with the job, a quick review would really help us."',
  },
  {
    title: "A polite follow-up",
    detail:
      "On Growth, the review email goes out after each job without you lifting a finger. Anyone who hasn't got to it gets one polite reminder, and anyone who's already left a review won't be hassled. On Starter, you send the link yourself.",
  },
  {
    title: "Shown on your website",
    detail:
      "New reviews show up on your website on their own, in a widget we match to your site. People who find you online see them before they call.",
  },
] as const;

const weDo = [
  "Connect your Google profile and your other review sites",
  "Build your review link and QR code",
  "Put the widget on your website, matched to your colours",
  "Write your review email, and you approve it before anything goes out",
  "On Growth, load your past customers and send their requests",
];

const youDo = [
  "Give us access to your Google profile and website (we'll show you how)",
  "Put the link or QR code on your invoices, van or cards",
];

const widgetStats = [
  {
    figure: "54%",
    line: "of people visit a business's website after reading positive reviews.",
    source: "BrightLocal Local Consumer Review Survey 2026 (US)",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
  },
  {
    figure: "No. 1",
    line: "Local search experts rank a high Google rating as the top thing that turns a search into a customer.",
    source: "Whitespark Local Search Ranking Factors 2026 (expert survey)",
    href: "https://whitespark.ca/local-search-ranking-factors/",
  },
] as const;

const growth = planById("growth");
const growthIncludes = growth.includes.filter((item) => item !== "Everything in Starter");

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
            before they pick up the phone
          </h1>
          <p className="lead mx-auto mt-5 max-w-[34rem] text-[var(--rb-on-brand-muted)]">
            Before anyone rings, they check your reviews and compare you with the next tradie. ReviewBuddy asks every customer for a review after the job and shows those reviews on your website. We set it all up for you.
          </p>
          <div className="hero-actions">
            <div data-hero-cta="" className="w-full lg:w-auto">
              <TrialButton variant="gold" location="hero" className="w-full lg:w-auto">
                {CTA_LABEL}
              </TrialButton>
            </div>
          </div>
          <p className="hero-quiet">
            See where you stand first with a{" "}
            <Link href="/free-review-breakdown">free review breakdown</Link>
          </p>
          <p className="mx-auto mt-3 max-w-[34rem] text-sm leading-5 text-[var(--rb-on-brand-muted)]">{TRIAL_LINE}</p>
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

      <PlatformLogos />

      <section id="how-it-works" className="scroll-mt-24 bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3">How ReviewBuddy gets you more reviews</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">
              We set all of this up for you. After that, here&apos;s what happens with every job.
            </p>
          </div>
          <ol className="steps">
            {howSteps.map((step, index) => (
              <li key={step.title} className="step">
                <span className="step-num">{index + 1}</span>
                <h3>{step.title}</h3>
                <p className="text-base leading-6 text-[var(--rb-text-muted)]">{step.detail}</p>
                {index === 3 ? (
                  <figure className="art step-shot">
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
                        width: 1080,
                        height: 930,
                      }}
                      alt="The ReviewBuddy Send Review Request screen, with empty fields for a customer name and contact, and buttons for sending by email or copying the link. No customer is filled in."
                    />
                    <figcaption>Sending a request from the app.</figcaption>
                  </figure>
                ) : null}
                {index === 4 ? (
                  <figure className="art step-shot">
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
                    <figcaption>The widget on a website. Demo data for illustration. Not real customers or reviews.</figcaption>
                  </figure>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="fair">
            <svg width="20" height="20" viewBox="0 0 20 20" className="mt-px shrink-0" aria-hidden="true">
              <path d="M10 2l6 2.5v5c0 4-2.7 7-6 8.5-3.3-1.5-6-4.5-6-8.5v-5z" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="M7 10l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <p>
              Everyone gets the same link and the same choice of sites, whatever they thought of the job. If they&apos;d rather tell you something privately, there&apos;s a box for that too, so you hear about a problem while you can still fix it. Every review comes from a real customer. Those are Google&apos;s rules and Australian consumer law.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <p className="eyebrow">Inside ReviewBuddy</p>
            <h2 className="mt-3">All your reviews in one place</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">
              These are real screens from the app. The business name is demo data.
            </p>
          </div>
          <FeatureBento />
        </div>
      </section>

      <section className="bg-[var(--rb-surface-alt)]">
        <div className={shell}>
          <div className="max-w-[var(--rb-text-max)]">
            <h2>Win more jobs on trust</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                People used to pick a tradie because someone over the back fence said &quot;use this one&quot;. That recommendation still decides who gets the job. It just happens on Google now.
              </p>
              <p>
                They search, they look at the stars and the number of reviews, and they ring the one that looks trusted. If that&apos;s you, you&apos;re the safe pick. And the safe pick doesn&apos;t have to be the cheapest quote.
              </p>
              <p>
                More reviews means more people trust you before they&apos;ve met you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={shell}>
          <div className="mx-auto max-w-[var(--rb-text-max)]">
            <h2>It&apos;s a tough year to compete on price</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                You don&apos;t need us to tell you it&apos;s hard out there. Trades prices rose 6.6% in the year to September, the fastest in four years (HIA, October 2026). And a quarter of households say they&apos;re putting repairs off because of the cost of living (Finder, July 2026).
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
        <div className={`${shell} story`}>
          <div>
            <h2>Happy customers don&apos;t leave reviews on their own</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                Most of your customers are happy. Hardly any of them leave a review unless someone asks, and asking is where it falls over.
              </p>
              <p>
                It feels awkward. You forget when the next job&apos;s waiting. And when you do ask, the customer has to find your business on Google, find the review button, and remember to do it later. Most don&apos;t.
              </p>
              <p>That&apos;s how a good business can end up with fewer reviews than an average one.</p>
            </div>
          </div>
          <figure className="art baked-at-lg">
            <ArtImage
              desktop={{
                webp: "/img/sections/reviewbuddy-happy-customers-desktop.webp",
                png: "/img/sections/reviewbuddy-happy-customers-desktop.png",
                width: 1440,
                height: 940,
              }}
              mobile={{
                webp: "/img/sections/reviewbuddy-happy-customers-mobile.webp",
                png: "/img/sections/reviewbuddy-happy-customers-mobile.png",
                width: 1080,
                height: 2160,
              }}
              alt="A real ReviewBuddy Send Review Request screen beside an illustration of the page a customer opens, with Google, Facebook and other review sites to choose from. No customer name is filled in."
            />
            <figcaption>Request form: real ReviewBuddy screen. Customer page: illustration.</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[var(--rb-surface)]">
        <div className={`${shell} story`}>
          <div>
            <h2>Be the tradie with the reviews</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-[var(--rb-text-muted)]">
              <p>
                Picture someone choosing between two tradies. One has 9 reviews, and the latest is from 2022. You&apos;ve got 80, and the latest is from last week. You get the call.
              </p>
              <p>
                They don&apos;t know either of you. But they can see who&apos;s trusted and still doing good work right now.
              </p>
              <p>And it&apos;s not only on Google. When they click through to your website, your reviews are there too.</p>
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
      </section>

      <section id="s1" aria-labelledby="widget" className="sec alt">
        <div className="shell">
          <div className="g12 s1-head">
            <h2 id="widget">Your reviews, right where your ads and SEO send people</h2>
            <div className="body muted">
              <p>You pay for ads and SEO to get people to your website. When they land, most are still deciding.</p>
              <p>
                The ReviewBuddy widget shows them your latest reviews, with your rating and review count. New reviews show up on their own, so it stays current.
              </p>
            </div>
          </div>
          <div className="g12 s1-row">
            <figure className="art art-at-768">
              <ArtImage
                mobileMax={767}
                desktop={{
                  webp: "/img/sections/reviewbuddy-widget-builder-desktop.webp",
                  png: "/img/sections/reviewbuddy-widget-builder-desktop.png",
                  width: 2400,
                  height: 1574,
                }}
                mobile={{
                  webp: "/img/sections/reviewbuddy-widget-builder-mobile.webp",
                  png: "/img/sections/reviewbuddy-widget-builder-mobile.png",
                  width: 1080,
                  height: 933,
                }}
                alt="The ReviewBuddy widget builder, with widget types on the left and a preview of review cards on a website. The business name, reviewer names and review text are demo data."
              />
              <figcaption>Demo data for illustration. Real ReviewBuddy widget, reviews replaced.</figcaption>
            </figure>
            <div className="stats">
              {widgetStats.map((stat) => (
                <div key={stat.figure} className="stat">
                  <p className="num">{stat.figure}</p>
                  <p className="line">{stat.line}</p>
                  <p className="src">
                    Source:{" "}
                    <a href={stat.href} target="_blank" rel="noopener">
                      {stat.source}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProofBlock />

      <section id="s2" className="sec s2">
        <div className="shell">
          <h2>We set it up for you, and you keep doing the work</h2>
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
                <span>{SETUP_LINE}</span>
              </p>
              <p className="setup-time">
                It takes about 2 business days. By then your account is set up and connected, and your review widget is on your website.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="s3" className="sec alt">
        <div className="shell">
          <div className="g12 dz">
            <div className="dz-copy">
              <h2>You&apos;ve probably got dozens of reviews you never asked for</h2>
              <div className="body">
                <p>Think about last year&apos;s jobs. Most of those customers were happy, and most were never asked.</p>
                <p>
                  On Growth, send us a list of people you&apos;ve actually done work for. They get the same friendly request, with one reminder.
                </p>
              </div>
            </div>
            <div className="dz-plan">
              <h3>{growth.name}</h3>
              <p className="tag">{growth.tagline}</p>
              <ul className="list">
                {growthIncludes.map((item) => (
                  <li key={item}>
                    <Tick />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing#growth" className="btn btn-ghost-dark">
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
            <h2 className="mt-3">Two plans, both set up for you</h2>
            <p className="lead mt-4 text-[var(--rb-text-muted)]">{PRICING_SUB}</p>
            <p className="mt-3 text-base leading-7 text-[var(--rb-text-muted)]">{BOTH_PLANS_LINE}</p>
          </div>
          <div className="mx-auto mt-10 max-w-[880px]">
            <PlanPair location="home-plans" />
          </div>
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
