import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { TrialButton } from "@/components/trial-button";
import { pricingFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import {
  addOns,
  contactEmail,
  planIncludes,
  priceLabel,
  setupDeadline,
  setupPrice,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: "ReviewBuddy Pricing: $75 + GST a month | 7-Day Free Trial",
  description:
    "One plan for tradies: 80 texts a month, unlimited email, and reviews on your site in 48 hours or that month is free. Setup included until 31 Dec 2026.",
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
        <header className="border-b border-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pine">
              One plan for tradies
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
              ReviewBuddy pricing
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {priceLabel}. 7 days free, then billing starts on day 8. 80 texts
              a month, unlimited email, and your reviews on your site.
            </p>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-pine">
              ReviewBuddy
            </h2>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-ink">
              $75 <span className="text-2xl">+ GST</span>
            </p>
            <p className="mt-2 text-lg text-muted">$82.50 a month</p>
            <h3 className="mt-8 text-base font-semibold text-ink">Included</h3>
            <ul className="mt-3 grid gap-2">
              {planIncludes.map((item) => (
                <li key={item} className="text-base leading-7 text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TrialButton />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              7 days free. Card taken at signup. Billing starts on day 8.
            </p>
          </section>

          <div className="grid gap-4 content-start">
            <section className="rounded-2xl border border-line bg-paper p-6">
              <h2 className="text-xl font-semibold text-ink">Trial and billing</h2>
              <ul className="mt-4 grid gap-2">
                {billing.map((item) => (
                  <li key={item} className="text-base leading-7 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-hi-vis bg-hi-vis/30 p-6">
              <h2 className="text-xl font-semibold text-ink">Setup included for now</h2>
              <p className="mt-3 text-base leading-7 text-ink">
                Setup is normally {setupPrice}. It is included free if you start
                before {setupDeadline}.
              </p>
            </section>
            <section className="rounded-2xl border border-line bg-paper p-6">
              <h2 className="text-xl font-semibold text-ink">48-hour promise</h2>
              <p className="mt-3 text-base leading-7 text-muted">
                If your reviews are not live on your site within 48 hours of us
                getting access, that month is free.
              </p>
            </section>
          </div>
        </div>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Add-ons</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Optional extras. Email us if you want one.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {addOns.map((addOn) => (
                <li key={addOn.name} className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="text-lg font-semibold text-ink">{addOn.name}</h3>
                  <p className="mt-2 text-base text-muted">{addOn.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-line bg-paper">
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
              <Link href="/google-reviews-for-plumbers" className="font-semibold text-pine underline">
                Google reviews for plumbers
              </Link>
              .
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
