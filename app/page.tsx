import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { QrPreview, TextPreview, WidgetPreview } from "@/components/illustrations";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import {
  contactEmail,
  planIncludes,
  priceLabel,
  setupDeadline,
  setupPrice,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: "Show Your Google Reviews on Your Website | ReviewBuddy for Tradies",
  description:
    "Your Google reviews, live on your website, plus texts and emails that ask for more. Built for Aussie tradies. 7 days free, then $75 + GST a month.",
  path: "/",
});

const steps = [
  {
    title: "A text or email after every job",
    body: "When the job is done, ReviewBuddy sends a review request by text or email. You do not have to remember, and you do not have to chase it.",
  },
  {
    title: "Your Google review link and a QR code",
    body: "The message includes your Google review link. You also get a QR code for the van, the invoice, or the counter.",
  },
  {
    title: "Reviews, live on your website",
    body: "A Google review widget on your site shows those reviews as they come in. New ones show up without you editing the website.",
  },
];

const reasons = [
  {
    title: "Found in Google search and Maps",
    body: "People look up a tradie in Google search and on Maps before they call. Your reviews are part of what they see there.",
  },
  {
    title: "Website enquiries that turn into jobs",
    body: "Someone lands on your website and the reviews are already there. That is when an enquiry is more likely to turn into a job.",
  },
  {
    title: "Feedback while it is fresh",
    body: "You hear what the customer thought of the work, not just a paid invoice and silence.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pine">
              For Aussie tradies
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              Show your Google reviews on your website
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              ReviewBuddy puts a Google review widget on your website and sends
              a text or email after each job so more customers leave one. Built
              for Aussie tradies.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrialButton />
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-paper px-5 text-base font-semibold text-ink"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              7 days free. Card taken at signup. Billing starts on day 8. Then{" "}
              {priceLabel}.
            </p>
          </div>
          <div className="grid gap-4">
            <WidgetPreview />
            <TextPreview />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-sm leading-6 text-muted">
            Built for plumbers, electricians, builders, roofers, HVAC, and landscapers.{" "}
            <Link href="/google-reviews-for-plumbers" className="font-semibold text-pine underline">
              Google reviews for plumbers
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Three parts. Ask after the job, give them an easy way to leave the
            review, and show it on your site.
          </p>
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-line bg-paper p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-hi-vis text-base font-semibold text-ink">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 max-w-sm">
            <QrPreview />
          </div>
        </div>
      </section>

      <section className="bg-pine text-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Why Google reviews matter
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => (
              <article key={reason.title} className="rounded-2xl bg-white/5 p-5">
                <h3 className="text-xl font-semibold">{reason.title}</h3>
                <p className="mt-2 text-base leading-7 text-paper/80">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              One price
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              One public plan, called ReviewBuddy. {priceLabel}. Built for a
              tradie with one location.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Setup is normally {setupPrice}. It is included free if you start
              before {setupDeadline}.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              If your reviews are not live on your site within 48 hours of us
              getting access, that month is free.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pine">
              ReviewBuddy
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">
              $75 <span className="text-xl font-semibold">+ GST</span>
            </p>
            <p className="mt-1 text-base text-muted">$82.50 a month</p>
            <ul className="mt-6 grid gap-2">
              {planIncludes.map((item) => (
                <li key={item} className="text-base text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <TrialButton />
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 font-semibold text-ink"
              >
                Full pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Questions tradies ask
          </h2>
          <div className="mt-8">
            <FaqList faqs={homeFaqs} />
          </div>
          <p className="mt-6 text-base text-muted">
            Still stuck? Email{" "}
            <a className="font-semibold text-pine underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-pine">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Put your Google reviews on your website
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-paper/80">
              Start the 7-day free trial. Card taken at signup. Billing starts
              on day 8.
            </p>
          </div>
          <TrialButton />
        </div>
      </section>
    </>
  );
}
