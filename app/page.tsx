import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import {
  DashboardPreview,
  QrPreview,
  RequestPreview,
  ReputationPreview,
} from "@/components/product-mocks";
import { TrialButton } from "@/components/trial-button";
import { homeFaqs } from "@/lib/faqs";
import { publishedGuides } from "@/content/guides/registry";
import { guidePath } from "@/lib/guides";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { contactEmail, priceLabel, setupDeadline, setupPrice } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Show Your Google Reviews on Your Website | ReviewBuddy for Tradies",
  description:
    "Your Google reviews, live on your website, plus texts and emails that ask for more. Built for Aussie tradies. 7 days free, then $75 a month inc. GST.",
  path: "/",
});

const cards = [
  {
    title: "Google review widget",
    body: "Your Google reviews, on the website, updating when a new one comes in.",
  },
  {
    title: "Google review link",
    body: "The text and the email both include the link to your Google review page.",
  },
  {
    title: "QR code",
    body: "Same link, for the van, the invoice, or the counter.",
  },
  {
    title: "80 texts a month",
    body: "A review request by text after the job, on the public plan.",
  },
  {
    title: "Unlimited email",
    body: "Email review requests are not capped.",
  },
  {
    title: "One location",
    body: "Two team members. More than one location? Get in touch.",
  },
];

export default function HomePage() {
  const articles = publishedGuides();

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="text-sm font-semibold tracking-wide text-muted">For Aussie tradies</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
              Show your Google reviews on your website
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              ReviewBuddy puts a Google review widget on your website and sends
              a text or email after each job so more customers leave one. Built
              for Aussie tradies.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrialButton />
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 text-base font-semibold text-ink"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              7 days free. Card taken at signup. Billing starts on day 8. Then {priceLabel}.
            </p>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="border-y border-line bg-soft">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-sm leading-6 text-muted sm:px-6">
          Built for plumbers, electricians, builders, roofers, HVAC, and landscapers.{" "}
          <Link href="/google-reviews-for-plumbers" className="font-semibold text-ink underline">
            Google reviews for plumbers
          </Link>
          .
        </p>
      </section>

      <section id="how-it-works" className="scroll-mt-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <p className="text-sm font-semibold tracking-wide text-muted">Widgets</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A Google review widget on your website
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              New Google reviews show on your site without you editing the page.
              You also get a QR code for the van, the invoice, or the counter,
              using the same Google review link.
            </p>
          </div>
          <QrPreview />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 border-t border-line px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="lg:order-2">
            <p className="text-sm font-semibold tracking-wide text-muted">After every job</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A text or email when the job is done
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              When the job is done, ReviewBuddy sends a review request by text
              or email. You do not have to remember, and you do not have to
              chase it. The message includes your Google review link.
            </p>
          </div>
          <div className="lg:order-1">
            <RequestPreview />
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 border-t border-line px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <p className="text-sm font-semibold tracking-wide text-muted">Why it matters</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Found in Google search and on your website
            </h2>
            <div className="mt-4 grid gap-4 text-lg leading-8 text-muted">
              <p>
                People look up a tradie in Google search and on Maps before they
                call. Your reviews are part of what they see there.
              </p>
              <p>
                Someone lands on your website and the reviews are already there.
                That is when an enquiry is more likely to turn into a job.
              </p>
              <p>
                You hear what the customer thought of the work, not just a paid
                invoice and silence. Every customer can be asked. The request
                is not kept for the happy ones.
              </p>
            </div>
          </div>
          <ReputationPreview />
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What you get
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            One public plan, called ReviewBuddy. {priceLabel}.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <li key={card.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Guides</h2>
              <p className="mt-3 max-w-xl text-lg leading-8 text-muted">
                Short, practical notes for tradies. No invented numbers.
              </p>
            </div>
            <Link href="/guides" className="font-semibold text-ink underline">
              All guides
            </Link>
          </div>
          {articles.length > 0 ? (
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {articles.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={guidePath(guide.slug)}
                    className="flex h-full flex-col rounded-3xl border border-line bg-white p-6"
                  >
                    <p className="text-sm text-muted">{guide.dateLabel}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-muted">{guide.description}</p>
                    <p className="mt-6 text-sm font-semibold text-ink">Read the guide</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">One price</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              One public plan, called ReviewBuddy. {priceLabel}. Built for a
              tradie with one location.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Setup is normally {setupPrice}. It is included free until {setupDeadline}.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              If your reviews are not live on your site within 48 hours of us
              getting access, that month is free.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_20px_50px_-36px_rgba(26,26,26,0.5)] sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-muted">ReviewBuddy</p>
            <p className="mt-3 text-5xl font-semibold tracking-tight text-ink">$75</p>
            <p className="mt-1 text-base text-muted">a month (inc. GST)</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
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
        title="Put your Google reviews on your website"
        body="Start the 7-day free trial. Card taken at signup. Billing starts on day 8."
      />
    </>
  );
}
