import Link from "next/link";
import { AppWindow, Clock3, Link2, Mail, MapPin, MessageSquare, QrCode, UserRound } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { DashboardAnnotations } from "@/components/dashboard-annotations";
import { ProductShot } from "@/components/product-shot";
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
  { icon: UserRound, label: "Sign up" },
  { icon: Clock3, label: "We set it up in 48 hours" },
  { icon: MessageSquare, label: "Reviews roll in" },
];

const quietLink =
  "hover-lift inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 text-base font-semibold text-ink";

export default function HomePage() {
  const articles = publishedGuides();

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="relative overflow-x-clip">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
        />
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
              <Link href="/pricing" className={quietLink}>
                See pricing
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              7 days free. Card taken at signup. Billing starts on day 8. Then {priceLabel}.
            </p>
          </div>
          <ProductShot
            src="/images/hero.png"
            alt="Illustration of review cards and a rating breakdown beside a website"
            width={1116}
            height={1130}
            priority
            float
          />
        </div>
      </section>

      <section className="relative overflow-x-clip">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12 xl:max-w-7xl">
          <p className="text-sm font-semibold tracking-wide text-muted">On your website</p>
          <div className="mt-6">
            <DashboardAnnotations />
          </div>
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

      <section id="how-it-works" className="scroll-mt-24 border-b border-line">
        <ol className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.label} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-ink">
                <step.icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wide text-muted">
                  {index + 1}
                </span>
                <span className="block text-sm font-semibold text-ink">{step.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="rise mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
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
          <ProductShot
            src="/images/find-the-best.png"
            alt="Illustration of a review widget, a badge, and a phone"
            width={995}
            height={868}
          />
        </div>
        <div className="rise mx-auto grid w-full max-w-6xl items-center gap-10 border-t border-line px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
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
            <ProductShot
              src="/images/request-review.png"
              alt="Illustration of a review request on a phone"
              width={474}
              height={578}
              sizes="(min-width: 1024px) 420px, 80vw"
            />
          </div>
        </div>
        <div className="rise mx-auto grid w-full max-w-6xl items-center gap-10 border-t border-line px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
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
          <ProductShot
            src="/images/hero.png"
            alt="Illustration of review cards shown with a website"
            width={1116}
            height={1130}
          />
        </div>
      </section>

      <section className="rise bg-soft">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-sm font-semibold tracking-wide text-muted">Included</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
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

      <section className="rise">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-muted">Notes</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Guides</h2>
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
                    className="hover-lift flex h-full flex-col rounded-3xl border border-line bg-white p-6"
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

      <section id="pricing" className="rise scroll-mt-24 border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="text-sm font-semibold tracking-wide text-muted">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">One price</h2>
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
          <div className="hover-lift rounded-3xl border border-line bg-white p-6 shadow-[0_20px_50px_-36px_rgba(26,26,26,0.5)] sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-muted">ReviewBuddy</p>
            <p className="mt-3 text-5xl font-semibold tracking-tight text-ink">$75</p>
            <p className="mt-1 text-base text-muted">a month (inc. GST)</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrialButton />
              <Link href="/pricing" className={quietLink}>
                Full pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="rise border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-sm font-semibold tracking-wide text-muted">FAQ</p>
          <h2 id="faq-heading" className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
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
