import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { FeatureList } from "@/components/feature-list";
import { JsonLd } from "@/components/json-ld";
import { ProductShot } from "@/components/product-shot";
import { TrialButton } from "@/components/trial-button";
import { pricingFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import {
  addOns,
  contactEmail,
  planIncludes,
  priceLabel,
  setupOffer,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: "ReviewBuddy Pricing: $75 a month inc. GST | 7-Day Free Trial",
  description:
    `One plan for tradies: 80 texts a month, unlimited email, and reviews on your site in 48 hours or that month is free. ${setupOffer}.`,
  path: "/pricing",
});

const billing = [
  "7 days free",
  "Card taken at signup",
  "Billing starts on day 8",
  "Cancel any time",
  "Email us for any change",
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <article>
        <header className="relative overflow-x-clip border-b border-line">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <p className="text-sm font-semibold tracking-wide text-muted">
                One plan for tradies
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
                ReviewBuddy pricing
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                {priceLabel}. 7 days free, then billing starts on day 8. 80 texts
                a month, unlimited email, and your reviews on your site.
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

        <div className="rise mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="hover-lift rounded-3xl border border-line bg-white p-6 shadow-[0_20px_50px_-36px_rgba(26,26,26,0.45)] sm:p-8">
            <h2 className="text-sm font-semibold tracking-wide text-muted">
              ReviewBuddy
            </h2>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-ink">$75</p>
            <p className="mt-2 text-lg text-muted">a month (inc. GST)</p>
            <h3 className="mt-8 text-base font-semibold text-ink">Included</h3>
            <div className="mt-4">
              <FeatureList items={planIncludes} />
            </div>
            <div className="mt-8">
              <TrialButton />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              7 days free. Card taken at signup. Billing starts on day 8.
            </p>
          </section>

          <div className="grid gap-4 content-start">
            <section className="hover-lift rounded-3xl border border-line bg-white p-6 shadow-[0_16px_40px_-32px_rgba(26,26,26,0.4)]">
              <h2 className="text-xl font-semibold text-ink">Trial and billing</h2>
              <ul className="mt-4 grid gap-2">
                {billing.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                    <span aria-hidden="true" className="text-ink">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-brand bg-brand/15 p-6">
              <h2 className="text-xl font-semibold text-ink">Installation and setup</h2>
              <p className="mt-3 text-base leading-7 text-ink">
                {setupOffer}.
              </p>
            </section>
            <section className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-xl font-semibold text-ink">48-hour promise</h2>
              <p className="mt-3 text-base leading-7 text-muted">
                If your Google reviews are not live on your site within 48 hours of us
                getting access, that month is free.
              </p>
            </section>
          </div>
        </div>

        <section className="rise border-t border-line">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <ProductShot
              src="/images/request-review.png"
              alt="Illustration of a review request on a phone"
              width={474}
              height={578}
              sizes="(min-width: 1024px) 380px, 80vw"
            />
            <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Add-ons</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Optional extras. Email us if you want one.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {addOns.map((addOn) => (
                <li key={addOn.name} className="hover-lift rounded-3xl border border-line bg-white p-5 shadow-[0_16px_40px_-32px_rgba(26,26,26,0.4)]">
                  <h3 className="text-lg font-semibold text-ink">{addOn.name}</h3>
                  <p className="mt-2 text-base text-muted">{addOn.price}</p>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-soft">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                More than one location?
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                More than one location? Get in touch. There is no public price
                for that.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrialButton>Get in touch</TrialButton>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 font-semibold text-ink"
              >
                Email us
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Pricing questions</h2>
            <div className="mt-8">
              <FaqList faqs={pricingFaqs} />
            </div>
            <p className="mt-8 text-base text-muted">
              Plumbing business?{" "}
              <Link href="/google-reviews-for-plumbers" className="font-semibold text-ink underline">
                Google reviews for plumbers
              </Link>
              .
            </p>
          </div>
        </section>
      </article>
      <CtaBand
        title="Start the 7-day free trial"
        body="Card taken at signup. Billing starts on day 8. Then $75 a month (inc. GST)."
      />
    </>
  );
}
