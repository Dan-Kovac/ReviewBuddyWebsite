import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { ProductShot } from "@/components/product-shot";
import { TrialButton } from "@/components/trial-button";
import { plumberFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { priceLabel, setupOffer } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Google Reviews for Plumbers | ReviewBuddy",
  description:
    "Get more Google reviews from every job and show them on your plumbing website. Set up for you, 7 days free.",
  path: "/google-reviews-for-plumbers",
});

const steps = [
  {
    title: "The job is finished",
    body: "A blocked drain, a hot water unit, a tap that will not shut off. When you pack up, a text or email goes to the customer while they still remember you turned up.",
  },
  {
    title: "They get your Google review link",
    body: "The message has your Google review link. Put the QR code on the invoice or the side of the van, for the customer who would rather scan than tap a text.",
  },
  {
    title: "The review shows on your plumbing website",
    body: "We set it up. The Google review widget sits on your plumbing site, so the next person who finds you can read the reviews there, not only on Google.",
  },
];

export default function PlumbersPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(plumberFaqs)} />
      <article>
        <header className="relative overflow-x-clip border-b border-line">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
            <div>
              <p className="text-sm font-semibold tracking-wide text-muted">
                For plumbing tradies
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
                Google reviews for plumbers
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">
                People search, they read the Google reviews, then they look at
                your website. ReviewBuddy asks for a review after every plumbing
                job and shows those reviews on your site. Set up for you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrialButton />
                <Link
                  href="/pricing"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 font-semibold text-ink"
                >
                  See pricing
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                7 days free. Card taken at signup. Billing starts on day 8.
                Then {priceLabel}.
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
        </header>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            After the call-out, not a week later
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            A plumbing tradie does not have time to text every customer from the
            van. ReviewBuddy sends the request. You keep doing the next job.
          </p>
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="hover-lift rounded-3xl border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgba(26,26,26,0.45)]">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand font-semibold text-ink">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
            <ProductShot
              src="/images/request-review.png"
              alt="Illustration of a review request on a phone"
              width={474}
              height={578}
              sizes="(min-width: 768px) 420px, 80vw"
            />
            <ProductShot
              src="/images/find-the-best.png"
              alt="Illustration of a review widget, a badge, and a phone"
              width={995}
              height={868}
            />
          </div>
        </section>

        <section className="border-t border-line bg-soft">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Same plan as every other tradie
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                One location. Two team members. 80 texts a month. Unlimited
                email review requests. Google review link, QR code, and the
                widget on your plumbing website. {priceLabel}.
              </p>
              <p className="mt-4 text-base leading-7 text-muted">
                {setupOffer}. If your Google reviews are not live on your site within 48
                hours of us getting access, that month is free.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <TrialButton className="w-full sm:w-fit" />
              <Link href="/pricing" className="font-semibold text-ink underline">
                Full pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Plumbing questions
            </h2>
            <div className="mt-8">
              <FaqList faqs={plumberFaqs} />
            </div>
          </div>
        </section>
      </article>
      <CtaBand
        title="Put your plumbing reviews on the website"
        body="7 days free. Card taken at signup. Billing starts on day 8."
      />
    </>
  );
}
