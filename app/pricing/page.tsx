import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PlanPair } from "@/components/plan-pair";
import { TrialButton } from "@/components/trial-button";
import { pricingFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { contactEmail, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "ReviewBuddy Pricing: Starter $49, Growth $75 a month inc. GST",
  description:
    "Two plans for tradies. Starter puts your Google reviews live on your website. Growth adds email follow ups and re-engages past customers. Setup included. Cancel anytime.",
  path: "/pricing",
});

const billing = [
  "Billed monthly",
  "Prices include GST",
  "Cancel anytime",
  "Email us for any change",
];

export default function PricingPage() {
  const starter = plans.find((plan) => plan.id === "starter")!;
  const growth = plans.find((plan) => plan.id === "growth")!;

  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <article>
        <header className="hero-wash border-b border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:py-20">
            <p className="text-sm font-semibold tracking-wide text-muted">Two plans for tradies</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05]">
              ReviewBuddy pricing
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Starter puts your Google reviews live on your website. Growth keeps
              them coming and reaches your past customers. Prices include GST.
              Cancel anytime.
            </p>
          </div>
        </header>

        <div className="bg-brand-tint px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <PlanPair compact />
            </div>
            <p className="mt-8 text-center text-base text-muted">Cancel anytime.</p>
          </div>
        </div>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-[1100px]">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Compare the plans</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-soft">
                    <th scope="col" className="px-4 py-4 text-sm font-semibold text-ink">
                      Plan
                    </th>
                    <th scope="col" className="px-4 py-4 text-sm font-semibold text-ink">
                      Starter
                    </th>
                    <th scope="col" className="px-4 py-4 text-sm font-semibold text-ink">
                      Growth <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-ink">Recommended</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-base">
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Price</th>
                    <td className="px-4 py-4 text-ink">{starter.priceLabel}</td>
                    <td className="px-4 py-4 text-ink">{growth.priceLabel}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Google review link and QR code</th>
                    <td className="px-4 py-4 text-ink">Included</td>
                    <td className="px-4 py-4 text-ink">Included</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Live reviews widget on your website</th>
                    <td className="px-4 py-4 text-ink">Included</td>
                    <td className="px-4 py-4 text-ink">Included</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Setup</th>
                    <td className="px-4 py-4 text-ink">Included</td>
                    <td className="px-4 py-4 text-ink">Included</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Email sequences that keep asking customers for reviews</th>
                    <td className="px-4 py-4 text-muted">Not included</td>
                    <td className="px-4 py-4 text-ink">Included</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Re-engage past leads and customers</th>
                    <td className="px-4 py-4 text-muted">Not included</td>
                    <td className="px-4 py-4 text-ink">Included</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Help exporting past customers and importing by CSV</th>
                    <td className="px-4 py-4 text-muted">Not included</td>
                    <td className="px-4 py-4 text-ink">Included</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">Cancel anytime</th>
                    <td className="px-4 py-4 text-ink">Yes</td>
                    <td className="px-4 py-4 text-ink">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-soft px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1100px] gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Not sure which plan?</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Start with Starter if you only want your reviews on your website.
                Choose Growth if you want email follow ups and want to ask the
                customers you have already worked for. You can also pick &quot;Not
                sure yet&quot; in the sign up form and we will talk it through.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Setup is done for you</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Setup is included on both plans. We add the live reviews widget
                to your website and set up your Google review link and QR code.
              </p>
              <ul className="mt-6 grid gap-2">
                {billing.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                    <span aria-hidden="true" className="text-ink">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Running more than one location?
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                Email us at{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-ink underline">
                  {contactEmail}
                </a>{" "}
                and we will work out what suits.
              </p>
            </div>
            <TrialButton variant="ink">Get started</TrialButton>
          </div>
        </section>

        <section className="bg-soft px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto w-full max-w-3xl">
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
        title="Get your reviews working for you."
        body={`Starter from $${starter.price} a month, Growth $${growth.price}. Including GST. Cancel anytime.`}
      />
    </>
  );
}
