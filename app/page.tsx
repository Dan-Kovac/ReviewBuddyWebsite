import Link from "next/link";
import {
  AppWindow,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  QrCode,
  Star,
} from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { GuideCards } from "@/components/guide-cards";
import { JsonLd } from "@/components/json-ld";
import { DashboardAnnotations } from "@/components/dashboard-annotations";
import { ProductShot } from "@/components/product-shot";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { publishedGuides } from "@/content/guides/registry";
import { pillarGuideLink } from "@/lib/guides";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { contactEmail, priceLabel, setupOffer } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get More Google Reviews and Show Them on Your Website | ReviewBuddy for Tradies",
  description:
    "Get chosen on trust, not price. Ask for Google reviews after every job by text, email or QR, and show them on your site. 7 days free, then $75 a month inc. GST.",
  path: "/",
});

const cards = [
  {
    title: "Google review widget",
    body: "Your Google reviews, on the website, updating when a new one comes in.",
    icon: AppWindow,
  },
  {
    title: "Google review link",
    body: "The text and the email both include the link to your Google review page.",
    icon: Link2,
  },
  {
    title: "QR code",
    body: "Same link, for the van, the invoice, or the counter.",
    icon: QrCode,
  },
  {
    title: "80 texts a month",
    body: "A review request by text after the job, on the public plan.",
    icon: MessageSquare,
  },
  {
    title: "Unlimited email",
    body: "Email review requests are not capped.",
    icon: Mail,
  },
  {
    title: "One location",
    body: "Two team members. More than one location? Get in touch.",
    icon: MapPin,
  },
];

const steps = [
  {
    icon: MessageSquare,
    label: "Ask after the job",
    detail: "By text, email or QR.",
  },
  {
    icon: Star,
    label: "Reviews come in",
    detail: "From the customers you asked.",
  },
  {
    icon: AppWindow,
    label: "They show on your site",
    detail: "Live within 48 hours, or that month is free.",
  },
];

const quietLink =
  "hover-lift inline-flex min-h-12 items-center justify-center rounded-full bg-[#e2e2e2] px-6 text-base font-semibold text-ink";

const pillarGuideClass =
  "mt-6 inline-flex text-base font-semibold text-ink underline decoration-brand underline-offset-4";

export default function HomePage() {
  const articles = publishedGuides();
  const trustGuide = pillarGuideLink(articles, "trust");
  const valueGuide = pillarGuideLink(articles, "value");
  const foundGuide = pillarGuideLink(articles, "found");

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="relative overflow-x-clip bg-soft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(56,182,255,0.12),transparent_68%)]"
        />
        <div className="relative mx-auto w-full max-w-3xl px-4 pt-24 text-center sm:px-6 lg:pt-36">
          <p className="text-sm font-semibold tracking-wide text-muted">For Aussie tradies</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.035em] text-balance text-ink sm:text-6xl sm:leading-[1.02] lg:text-7xl">
            Get chosen before they call.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted sm:text-xl">
            Real Google reviews on your website and in search, so homeowners
            trust you before they ring. Win the job on trust, not price.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrialButton className="px-6" />
            <Link href="/pricing" className={quietLink}>
              See pricing
            </Link>
          </div>
          <p className="mt-6 text-sm leading-6 text-muted">
            7 days free. Card taken at signup. Billing starts on day 8. Then {priceLabel}.
          </p>
        </div>
        <div className="rise relative mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:px-6 lg:pt-28 lg:pb-24 xl:max-w-7xl">
          <DashboardAnnotations />
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-center text-sm leading-6 text-muted sm:px-6">
          Built for plumbers, electricians, builders, roofers, HVAC, and landscapers.{" "}
          <Link href="/google-reviews-for-plumbers" className="font-semibold text-ink underline">
            Google reviews for plumbers
          </Link>
          .
        </p>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(56,182,255,0.05),#ffffff_24%)]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-24 sm:px-6 lg:gap-14 lg:py-32">
          <article className="rise grid items-center gap-10 rounded-[32px] border border-line bg-white p-8 shadow-[0_24px_70px_-40px_rgba(26,26,26,0.28)] sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-wide text-muted">Trust</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Can I trust them?
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                A homeowner is letting a stranger into their house. Real Google
                reviews, near the quote button, answer that before they ring.
              </p>
              <Link href={trustGuide.href} className={pillarGuideClass}>
                {trustGuide.label}
              </Link>
            </div>
            <ProductShot
              src="/images/hero.png"
              alt="Illustration of review cards beside a website"
              width={1116}
              height={1130}
            />
          </article>

          <article className="rise rounded-[32px] border border-line bg-white px-8 py-16 text-center shadow-[0_24px_70px_-40px_rgba(26,26,26,0.28)] sm:px-16 sm:py-24">
            <p className="text-sm font-semibold tracking-wide text-muted">Value</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              Stop being the cheap quote. Be the one they trust.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              When the quotes sit side by side, the reviews are what set you
              apart. Win the job on trust, not price.
            </p>
            <Link href={valueGuide.href} className={pillarGuideClass}>
              {valueGuide.label}
            </Link>
          </article>

          <article className="rise grid items-center gap-10 rounded-[32px] border border-line bg-white p-8 shadow-[0_24px_70px_-40px_rgba(26,26,26,0.28)] sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <p className="text-sm font-semibold tracking-wide text-muted">Local search</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Helps you get found
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Fresh Google reviews help your Google Business Profile show up
                when a homeowner nearby searches for a tradie. That helps you
                get found.
              </p>
              <Link href={foundGuide.href} className={pillarGuideClass}>
                {foundGuide.label}
              </Link>
            </div>
            <div className="lg:order-1">
              <ProductShot
                src="/images/find-the-best.png"
                alt="Illustration of a review widget and a phone"
                width={995}
                height={868}
              />
            </div>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-soft">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-32">
          <div>
            <p className="text-sm font-semibold tracking-wide text-muted">How it works</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              After the job, the reviews do the rest
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted">
              Every customer can be asked. The request is not kept for the happy ones.
            </p>
            <div className="mx-auto mt-12 max-w-xs lg:mx-0">
              <ProductShot
                src="/images/request-review.png"
                alt="Illustration of a review request on a phone"
                width={474}
                height={578}
                sizes="320px"
              />
            </div>
          </div>
          <ol className="grid gap-4">
            {steps.map((step, index) => (
              <li
                key={step.label}
                className="rise rounded-[28px] border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgba(26,26,26,0.45)] sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="text-sm font-semibold tracking-[0.14em] text-muted">
                    0{index + 1}
                  </span>
                  <span>
                    <span className="flex items-center gap-2 text-lg font-semibold text-ink">
                      <step.icon aria-hidden="true" className="size-4" />
                      {step.label}
                    </span>
                    <span className="mt-2 block text-base leading-7 text-muted">{step.detail}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className="rise scroll-mt-24">
        <div className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <p className="text-sm font-semibold tracking-wide text-muted">Pricing</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            $75 a month
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
            One public plan, called ReviewBuddy. {priceLabel}. 7 days free.
            Built for a tradie with one location.
          </p>
          <div className="mx-auto mt-12 max-w-lg rounded-[32px] border border-line bg-white p-8 text-left shadow-[0_24px_70px_-40px_rgba(26,26,26,0.35)] sm:p-10">
            <p className="text-sm font-semibold tracking-wide text-muted">ReviewBuddy</p>
            <p className="mt-3 text-6xl font-semibold tracking-tight text-ink">$75</p>
            <p className="mt-1 text-base text-muted">a month (inc. GST)</p>
            <p className="mt-6 text-base leading-7 text-muted">
              7 days free. Card taken at signup. Billing starts on day 8.
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              {setupOffer}.
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              If your reviews are not live on your site within 48 hours of us
              getting access, that month is free.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrialButton />
              <Link href="/pricing" className={quietLink}>
                Full pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rise border-t border-line bg-soft">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
          <p className="text-sm font-semibold tracking-wide text-muted">Included</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What you get
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            One public plan, called ReviewBuddy. {priceLabel}.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <li
                key={card.title}
                className="hover-lift rounded-3xl border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgba(26,26,26,0.5)]"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-brand/15 text-ink">
                  <card.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="latest-guides" className="rise">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-muted">Guides</p>
              <h2 id="latest-guides" className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Latest guides
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Short, practical notes for tradies. No invented numbers.
              </p>
            </div>
            <Link href="/guides" className="text-base font-semibold text-ink underline decoration-brand underline-offset-4">
              All guides
            </Link>
          </div>
          <GuideCards guides={articles} emptyHref="/guides" />
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="rise border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
          <p className="text-sm font-semibold tracking-wide text-muted">FAQ</p>
          <h2 id="faq-heading" className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Questions tradies ask
          </h2>
          <div className="mt-8">
            <FaqList faqs={homeFaqs} />
          </div>
          <p className="mt-6 text-base text-muted">
            Still stuck? Email{" "}
            <a className="font-semibold text-ink underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Get chosen before they call"
        body="Start the 7-day free trial. Card taken at signup. Billing starts on day 8."
      />
    </>
  );
}
