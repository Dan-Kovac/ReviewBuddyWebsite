import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { ProductShot } from "@/components/product-shot";
import { TrialButton } from "@/components/trial-button";
import { plumberFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { CTA_LABEL, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Google Reviews for Plumbers | ReviewBuddy",
  description:
    "Get more Google reviews after every plumbing job and show them live on your plumbing website. Starter $49, Growth $75 a month inc. GST. Setup included.",
  path: "/google-reviews-for-plumbers",
});

const starter = plans.find((plan) => plan.id === "starter")!;
const growth = plans.find((plan) => plan.id === "growth")!;

const steps = [
  {
    title: "The job is finished",
    body: "A blocked drain, a hot water unit, a tap that will not shut off. When you pack up, share your Google review link while the customer still remembers you turned up.",
  },
  {
    title: "They get your Google review link",
    body: "Hand over the link, or put the QR code on the invoice or the side of the van, for the customer who would rather scan than type.",
  },
  {
    title: "The review shows on your plumbing website",
    body: "We set it up. The live reviews widget sits on your site, so the next person who finds you can read the reviews there, not only on Google.",
  },
];

export default function PlumbersPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(plumberFaqs)} />
      <article>
        <header className="hero-wash border-b border-line">
          <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
            <div>
              <p className="text-sm font-semibold tracking-wide text-muted">For plumbing tradies</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
                Google reviews for plumbers
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                People search, they read the Google reviews, then they look at
                your website. ReviewBuddy helps you get more reviews after every
                plumbing job and shows them live on your site. Set up for you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrialButton variant="ink">{CTA_LABEL}</TrialButton>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 font-semibold text-ink"
                >
                  See pricing
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                Plans from ${starter.price} a month (inc. GST). Cancel anytime.
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

        <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            After the call-out, not a week later
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            A plumber does not have time to message every customer from the van.
            Ask while the job is fresh, and let the follow ups do the rest.
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
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Past plumbing customers count too
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Hot water jobs, blocked drains, bathroom renovations. Plenty of past
              customers never got asked. On Growth, we show you how to export them
              and import them by CSV, then email sequences ask them for a review.
            </p>
            <p className="mt-4">
              <Link href="/pricing#growth" className="font-semibold text-ink underline">
                See the Growth plan
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Two plans, same for every tradie
              </h2>
              <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
                <p>
                  <strong className="text-ink">Starter, {starter.priceLabel}:</strong>{" "}
                  Google review link and QR code, live reviews widget on your
                  plumbing website, setup included.
                </p>
                <p>
                  <strong className="text-ink">Growth, {growth.priceLabel}:</strong>{" "}
                  everything in Starter, plus email sequences that keep asking for
                  reviews and a way to reach past customers.
                </p>
                <p>Cancel anytime.</p>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <TrialButton plan="starter" className="w-full sm:w-fit">Start with Starter</TrialButton>
              <TrialButton plan="growth" variant="ink" className="w-full sm:w-fit">Choose Growth</TrialButton>
              <Link href="/pricing" className="font-semibold text-ink underline">
                Full pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Plumbing questions
            </h2>
            <div className="mt-8 max-w-3xl">
              <FaqList faqs={plumberFaqs} />
            </div>
          </div>
        </section>
      </article>
      <CtaBand
        title="Put your plumbing reviews on the website"
        body={`Starter from $${starter.price} a month, Growth $${growth.price}. Cancel anytime.`}
      />
    </>
  );
}
