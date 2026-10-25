import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProductShot } from "@/components/product-shot";
import { StickyTrialBar } from "@/components/sticky-trial-bar";
import { TrialButton } from "@/components/trial-button";
import { plumberFaqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { CTA_LABEL, TRIAL_LINE, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Google Reviews for Plumbers | ReviewBuddy",
  description:
    "Google reviews for plumbers, shown on your website. Starter is $49 a month. Growth is $75 a month. GST included.",
  path: "/google-reviews-for-plumbers",
});

const starter = plans.find((plan) => plan.id === "starter")!;
const growth = plans.find((plan) => plan.id === "growth")!;

const steps = [
  {
    title: "The job's finished",
    body: "When you pack up, share your Google review link while they still remember you turned up.",
  },
  {
    title: "They've got an easy way to review you",
    body: "Hand over the link, or put the QR code on the invoice or the side of the van.",
  },
  {
    title: "It shows on your website",
    body: "We set the widget up. Reviews from Google, Service Seeking and hipages can sit in the same box.",
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
              <p className="text-sm font-semibold text-muted">For plumbing tradies</p>
              <h1 className="mt-4 text-balance text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold leading-[1.02] text-ink">
                Google reviews for plumbers
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                People read your Google reviews, then they look at your website. We help you get more reviews after the job and show them on your site.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-hero-cta="">
                <TrialButton variant="ink" location="plumbers-hero">
                  {CTA_LABEL}
                </TrialButton>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-5 font-semibold text-ink"
                >
                  Compare plans
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                {TRIAL_LINE} Then Starter is {starter.priceAmount} a month or Growth is {growth.priceAmount} a month.
              </p>
            </div>
            <ProductShot
              src="/images/hero.png"
              alt="Sample Google review card and a rating request"
              width={1116}
              height={1130}
              priority
              sizes="(min-width: 1024px) 480px, 92vw"
            />
          </div>
        </header>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Ask while the job&apos;s still fresh
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            You don&apos;t have time to message every customer from the van. Ask before you leave.
          </p>
          <ol className="mt-12 grid lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink py-7">
                <span className="text-sm font-bold text-brand-text">{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2">
            <ProductShot
              src="/images/request-review.png"
              alt="Sample review request sent to a customer"
              width={474}
              height={578}
              sizes="(min-width: 768px) 360px, 92vw"
            />
            <ProductShot
              src="/images/find-the-best.png"
              alt="Sample review cards from Google and other sites"
              width={995}
              height={868}
              tone="soft"
              sizes="(min-width: 768px) 560px, 92vw"
            />
          </div>
        </section>

        <section className="border-t border-line bg-soft">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Past jobs count too</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Plenty of past customers never got asked. On Growth, send us the list. We&apos;ll load it and ask them, with one reminder.
            </p>
            <p className="mt-4">
              <Link href="/pricing#growth" className="font-semibold text-ink underline">
                See the Growth plan
              </Link>
            </p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Same two plans</h2>
              <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
                <p>
                  <strong className="text-ink">Starter, {starter.priceAmount} a month.</strong> A Google review link, a QR code and a widget on your plumbing site. Setup&apos;s included.
                </p>
                <p>
                  <strong className="text-ink">Growth, {growth.priceAmount} a month.</strong> Everything in Starter, plus we email your customers and load past jobs in.
                </p>
                <p>{TRIAL_LINE} You also get a weekly tip from me.</p>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <TrialButton plan="starter" location="plumbers-starter" className="w-full sm:w-fit">
                Try Starter free
              </TrialButton>
              <TrialButton plan="growth" location="plumbers-growth" variant="ink" className="w-full sm:w-fit">
                Try Growth free
              </TrialButton>
              <Link href="/pricing" className="font-semibold text-ink underline">
                Full pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Fair questions</h2>
            <div className="mt-8 max-w-3xl">
              <FaqList faqs={plumberFaqs} />
            </div>
          </div>
        </section>
      </article>
      <CtaBand
        title="Put your plumbing reviews on your website"
        body={`Then Starter is ${starter.priceAmount} a month or Growth is ${growth.priceAmount} a month.`}
        location="plumbers-band"
      />
      <StickyTrialBar />
    </>
  );
}
