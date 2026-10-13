import type { ReactNode } from "react";
import Link from "next/link";
import { DashboardAnnotations } from "@/components/dashboard-annotations";
import { GuideCards } from "@/components/guide-cards";
import { TrialButton } from "@/components/trial-button";
import { publishedGuides } from "@/content/guides/registry";
import { pageMetadata } from "@/lib/metadata";
import { addOns } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get More Google Reviews and Show Them on Your Website | ReviewBuddy for Tradies",
  description:
    "Get chosen on trust, not price. Ask for Google reviews after every job by text, email or QR, and show them on your site. 7 days free, then $75 a month inc. GST.",
  path: "/",
});

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
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <p className="text-sm font-semibold text-ink">Kovele Plumbing</p>
        <ul className="mt-6 grid gap-3">
          <li className="flex flex-wrap items-baseline justify-between gap-2 rounded-[16px] border border-line px-4 py-4">
            <SourceBadge>Google</SourceBadge>
            <p className="text-base leading-7 text-ink">
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-muted"> · 53 reviews</span>
            </p>
          </li>
          <li className="flex flex-wrap items-baseline justify-between gap-2 rounded-[16px] border border-line px-4 py-4">
            <SourceBadge>ServiceSeeking</SourceBadge>
            <p className="text-base leading-7 text-ink">
              <span className="text-2xl font-bold">4.9</span>
              <span className="text-muted"> · 200 reviews</span>
            </p>
          </li>
        </ul>
        <blockquote className="mt-8 border-t border-line pt-6 text-base leading-7 text-ink">
          <SourceBadge>Google</SourceBadge>
          <p className="mt-3">
            Without question the best tradies I have ever used. Steve and Nick explain everything in laymans terms. I
            cannot recommend them highly enough.
          </p>
          <footer className="mt-3 text-sm text-muted">kevin leahy</footer>
        </blockquote>
        <blockquote className="mt-6 border-t border-line pt-6 text-base leading-7 text-ink">
          <SourceBadge>ServiceSeeking</SourceBadge>
          <p className="mt-3">Turned up on time. Job done perfectly</p>
          <footer className="mt-3 text-sm text-muted">Jason · 21 Aug 2026</footer>
        </blockquote>
      </div>
    </BrowserChrome>
  );
}

export default function HomePage() {
  const articles = publishedGuides().slice(0, 3);

  return (
    <>
      <section className={section}>
        <div className={wrap}>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              Get chosen before they call.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Fresh Google reviews, shown live on your website.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <TrialButton variant="ink" className="px-6" />
              <Link href="#how-it-works" className={secondary}>
                See how it works
              </Link>
            </div>
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
            Kovele Plumbing&apos;s site showed his Google and ServiceSeeking reviews together, but they stopped
            updating a year ago. With ReviewBuddy they&apos;ll update live, so new jobs show up as they happen and
            customers can see why to book him.
          </p>
          <figure className="mt-16">
            <div className="grid items-start gap-6 lg:grid-cols-2">
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
            </div>
            <figcaption className="mt-4 text-sm leading-6 text-muted">
              All your reviews in one place, live on your site.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 ${section}`}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Live in 48 hours.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            We set it up, add the widget and fix what we can see. If your reviews aren&apos;t live in 48 hours, that month is free.
          </p>
          <ol className="mt-16 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="hover-lift rounded-[20px] border border-line bg-white p-8 shadow-[0_16px_40px_-28px_rgba(11,15,20,0.16)]"
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
          <div className="hover-lift max-w-[560px] rounded-[20px] border border-line bg-white p-8 shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)] sm:p-10">
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
    </>
  );
}
