import type { ReactNode } from "react";
import Link from "next/link";
import { DashboardAnnotations } from "@/components/dashboard-annotations";
import { FaqList } from "@/components/faq-list";
import { GuideCards } from "@/components/guide-cards";
import { JsonLd } from "@/components/json-ld";
import { TrialButton } from "@/components/trial-button";
import { publishedGuides } from "@/content/guides/registry";
import { visibleHomeFaqs } from "@/lib/faqs";
import { CARD_UPFRONT, SHOW_KOVELE } from "@/lib/flags";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { addOns } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get More Google Reviews and Show Them on Your Website | ReviewBuddy for Tradies",
  description:
    "Get chosen on trust, not price. Ask for Google reviews after every job by text, email or QR, and show them on your site. 7 days free, then $75 a month inc. GST.",
  path: "/",
});

const faqs = visibleHomeFaqs(CARD_UPFRONT);

const steps = [
  {
    title: "Ask after the job",
    detail: "By text, email or QR. Every customer can be asked.",
  },
  {
    title: "Reviews come in",
    detail: "On Google, from the customers you asked.",
  },
  {
    title: "They show on your site",
    detail: "The widget updates when a new review comes in.",
  },
];

const section = "px-4 py-[72px] sm:px-6 lg:py-32";
const wrap = "mx-auto w-full max-w-[1200px]";
const secondary =
  "hover-lift inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-base font-semibold text-ink hover:bg-soft";

function BrowserChrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)]">
      <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="ml-2 flex h-6 flex-1 items-center truncate rounded-full bg-white px-3 text-xs text-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function SourceBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-soft px-2.5 py-1 text-xs font-semibold text-ink">
      {children}
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`star-in size-3.5 ${index < count ? "fill-[#e0a106] text-[#e0a106]" : "fill-line text-line"}`}
          style={{ animationDelay: `${index * 40}ms` }}
          aria-hidden="true"
        >
          <path d="M10 1.8l2.1 4.5 4.9.7-3.5 3.4.8 4.9L10 13.1 5.7 15.3l.8-4.9L3 7l4.9-.7L10 1.8z" />
        </svg>
      ))}
    </span>
  );
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#f7f9fb,#e8edf2)] text-sm font-bold text-ink shadow-[inset_0_0_0_1px_rgba(11,15,20,0.06)]" aria-hidden="true">
      {letters}
    </span>
  );
}

function BlurredDate() {
  return (
    <>
      <span className="inline-block h-2.5 w-16 rounded-full bg-line blur-[2px]" aria-hidden="true" />
      <span className="sr-only">Calendar date was not on the public listing.</span>
    </>
  );
}

function BeforeSite() {
  return (
    <BrowserChrome url="koveleplumbing.com.au/reviews">
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <p className="text-sm font-semibold text-ink">Kovele Plumbing</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <SourceBadge>Google (48)</SourceBadge>
          <SourceBadge>Service Seeking (198)</SourceBadge>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">Newest review: 15 Oct 2025</p>
        <blockquote className="mt-8 border-t border-line pt-6 text-base leading-7 text-ink">
          What a wonderful duo, father and son! Extremely competent and kind! Got a gas heater removed at a reasonable
          price and on such short notice. He kindly replaced a shower head for me at no extra cost too while he was
          there! Steve didn&apos;t stop there. He returned to the property to drop off a replacement part. What a
          service! Highly recommend.
          <footer className="mt-3 text-sm text-muted">YC C. · Google · 15 Oct 2025</footer>
        </blockquote>
      </div>
    </BrowserChrome>
  );
}

function AfterWidget() {
  return (
    <BrowserChrome url="koveleplumbing.com.au">
      <div className="bg-[linear-gradient(180deg,rgba(56,182,255,0.08),transparent_88px)] px-5 py-6 sm:px-6">
        <p className="text-sm font-semibold text-ink">Kovele Plumbing</p>
        <ul className="mt-4 grid gap-2">
          <li className="flex flex-wrap items-center justify-between gap-2 rounded-[16px] border border-line bg-white px-3 py-3 shadow-[0_10px_24px_-20px_rgba(11,15,20,0.45)]">
            <SourceBadge>Google</SourceBadge>
            <p className="text-sm leading-6 text-ink">
              <span className="text-xl font-bold">4.8</span>
              <span className="text-muted"> · 53 reviews</span>
            </p>
          </li>
          <li className="flex flex-wrap items-center justify-between gap-2 rounded-[16px] border border-line bg-white px-3 py-3 shadow-[0_10px_24px_-20px_rgba(11,15,20,0.45)]">
            <SourceBadge>ServiceSeeking</SourceBadge>
            <p className="text-sm leading-6 text-ink">
              <span className="text-xl font-bold">4.9</span>
              <span className="text-muted"> · 200 reviews</span>
            </p>
          </li>
        </ul>
        <ul className="mt-4 grid gap-3">
          <li className="depth-card hover-lift rounded-[16px] border border-line bg-white p-4">
            <div className="flex items-start gap-3">
              <Initials name="kevin leahy" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">kevin leahy</p>
                  <SourceBadge>Google</SourceBadge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Stars count={5} />
                  <BlurredDate />
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink">
              Without question the best tradies I have ever used. Steve and Nick explain everything in laymans terms. I
              cannot recommend them highly enough.
            </p>
          </li>
          <li className="depth-card hover-lift rounded-[16px] border border-line bg-white p-4">
            <div className="flex items-start gap-3">
              <Initials name="Jason" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">Jason</p>
                  <SourceBadge>ServiceSeeking</SourceBadge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Stars count={5} />
                  <p className="text-xs text-muted">21 Aug 2026</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink">Turned up on time. Job done perfectly</p>
          </li>
          <li className="rounded-[16px] border border-dashed border-line bg-white/70 p-4" aria-hidden="true">
            <div className="flex items-center gap-3">
              <span className="size-10 shrink-0 rounded-full bg-line blur-[2px]" />
              <span className="h-3 w-24 rounded-full bg-line blur-[2px]" />
            </div>
            <div className="mt-3 grid gap-2">
              <span className="h-3 w-full rounded-full bg-line blur-[3px]" />
              <span className="h-3 w-4/5 rounded-full bg-line blur-[3px]" />
            </div>
          </li>
        </ul>
        <p className="sr-only">One more review row is blurred because its words were not copied from a public page.</p>
      </div>
    </BrowserChrome>
  );
}

function ExampleLabel() {
  return (
    <p className="mb-3">
      <span className="inline-flex rounded-full bg-ink px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
        Example
      </span>
    </p>
  );
}

function BlurBar({ className }: { className: string }) {
  return <span className={`block rounded-full bg-line blur-[2px] ${className}`} aria-hidden="true" />;
}

function ExampleBefore() {
  return (
    <div>
      <ExampleLabel />
      <BrowserChrome url="example.com/reviews">
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <BlurBar className="h-3 w-36" />
          <div className="mt-6 flex flex-wrap gap-2">
            <BlurBar className="h-7 w-24" />
            <BlurBar className="h-7 w-32" />
          </div>
          <div className="mt-8 grid gap-2 border-t border-line pt-6">
            <BlurBar className="h-3 w-full" />
            <BlurBar className="h-3 w-11/12" />
            <BlurBar className="h-3 w-8/12" />
          </div>
          <p className="sr-only">Example review text is hidden.</p>
        </div>
      </BrowserChrome>
    </div>
  );
}

function ExampleAfter() {
  return (
    <div>
      <ExampleLabel />
      <BrowserChrome url="example.com">
        <div className="bg-[linear-gradient(180deg,rgba(56,182,255,0.08),transparent_88px)] px-5 py-6 sm:px-6">
          <BlurBar className="h-3 w-36" />
          <div className="mt-4 grid gap-2">
            <div className="flex items-center justify-between rounded-[16px] border border-line bg-white px-3 py-3">
              <BlurBar className="h-6 w-20" />
              <BlurBar className="h-5 w-24" />
            </div>
            <div className="flex items-center justify-between rounded-[16px] border border-line bg-white px-3 py-3">
              <BlurBar className="h-6 w-28" />
              <BlurBar className="h-5 w-24" />
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[16px] border border-line bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded-full bg-line blur-[2px]" aria-hidden="true" />
                <BlurBar className="h-3 w-28" />
              </div>
              <div className="mt-3 grid gap-2">
                <BlurBar className="h-3 w-full" />
                <BlurBar className="h-3 w-4/5" />
              </div>
            </div>
            <div className="rounded-[16px] border border-dashed border-line bg-white/70 p-4">
              <div className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded-full bg-line blur-[2px]" aria-hidden="true" />
                <BlurBar className="h-3 w-24" />
              </div>
              <div className="mt-3 grid gap-2">
                <BlurBar className="h-3 w-full" />
                <BlurBar className="h-3 w-3/5" />
              </div>
            </div>
          </div>
          <p className="sr-only">Example review text is hidden.</p>
        </div>
      </BrowserChrome>
    </div>
  );
}

export default function HomePage() {
  const articles = publishedGuides().slice(0, 3);

  return (
    <>
      <section className={`hero-wash ${section}`}>
        <div className={wrap}>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              Get chosen before they call.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Fresh Google reviews, shown live on your website.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <TrialButton variant="ink" className="px-6" />
              <Link href="#how-it-works" className={secondary}>
                See how it works
              </Link>
              <p className="badge-in inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[0_10px_24px_-18px_rgba(11,15,20,0.45)]">
                <span className="pulse-dot size-2 rounded-full bg-brand" aria-hidden="true" />
                48 hours or that month is free
              </p>
            </div>
            <ul aria-label="Review sources" className="mt-8 flex flex-wrap items-center gap-2">
              <li className="text-xs font-semibold tracking-wide text-muted">Sources</li>
              <li>
                <SourceBadge>Google</SourceBadge>
              </li>
              <li>
                <SourceBadge>ServiceSeeking</SourceBadge>
              </li>
            </ul>
          </div>
          <div className="rise mt-20 lg:mt-28">
            <DashboardAnnotations />
          </div>
        </div>
      </section>

      <section className={`bg-soft ${section}`}>
        <div className={wrap}>
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Win the job on trust, not price.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {SHOW_KOVELE ? (
              <>
                Kovele Plumbing&apos;s site showed his Google and ServiceSeeking reviews together, but they stopped
                updating a year ago. With ReviewBuddy, his Google reviews will update live, so new jobs show up as they
                happen and customers can see why to book him.
              </>
            ) : (
              <>
                A tradie&apos;s site showed his Google and ServiceSeeking reviews together, but they stopped updating a
                year ago. With ReviewBuddy, his Google reviews will update live, so new jobs show up as they happen and
                customers can see why to book him.
              </>
            )}
          </p>
          <figure className="mt-16">
            <div className="grid items-start gap-6 lg:grid-cols-2">
              {SHOW_KOVELE ? (
                <>
                  <div>
                    <p className="mb-3 hidden text-sm font-semibold invisible lg:block" aria-hidden="true">
                      With ReviewBuddy
                    </p>
                    <BeforeSite />
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-ink">With ReviewBuddy</p>
                    <AfterWidget />
                  </div>
                </>
              ) : (
                <>
                  <ExampleBefore />
                  <ExampleAfter />
                </>
              )}
            </div>
            <figcaption className="mt-4 text-sm leading-6 text-muted">
              All your reviews in one place, on your site.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 ${section}`}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Google reviews, live in 48 hours.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            We set it up, add the widget and fix what we can see. If your Google reviews aren&apos;t live in 48 hours, that month is free.
          </p>
          <ol className="mt-16 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="depth-card hover-lift rounded-[20px] border border-line bg-white p-8"
              >
                <p className="text-sm font-semibold text-brand">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className={`bg-soft ${section}`}>
        <div className={wrap}>
          <div className="depth-card hover-lift max-w-[560px] rounded-[20px] border border-line bg-[linear-gradient(180deg,#fff,rgba(56,182,255,0.06))] p-8 sm:p-10">
            <h2 className="text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              $75 a month, including GST.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Setup included, valued at $350 including GST. First 7 days free, cancel anytime.
            </p>
            <h3 className="mt-10 text-base font-bold text-ink">Add-ons</h3>
            <ul className="mt-4 grid gap-3">
              {addOns.map((addOn) => (
                <li key={addOn.name} className="flex items-baseline justify-between gap-4 text-base leading-7">
                  <span className="text-ink">{addOn.name}</span>
                  <span className="text-muted">{addOn.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TrialButton variant="ink" className="px-6" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-guides" className={section}>
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 id="latest-guides" className="text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
                Simple guides for busier tradies.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Practical help for getting more reviews.
              </p>
            </div>
            <Link href="/guides" className="text-base font-semibold text-ink underline decoration-brand underline-offset-4">
              All guides
            </Link>
          </div>
          <GuideCards guides={articles} columns={3} emptyHref="/guides" />
        </div>
      </section>

      <section aria-labelledby="questions" className={`bg-soft ${section}`}>
        <div className={wrap}>
          <h2 id="questions" className="max-w-2xl text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Questions
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Setup, the 7-day trial, and $75 a month including GST.
          </p>
          <div className="rise mt-16 max-w-3xl">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
