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

function BrowserChrome({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)]">
      <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="ml-2 flex h-6 flex-1 items-center rounded-full bg-white px-3 text-xs text-muted">
          northside-plumbing.example
        </span>
      </div>
      {children}
    </div>
  );
}

function SiteMock({ live }: { live: boolean }) {
  return (
    <BrowserChrome>
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink">Northside Plumbing Co</p>
          <p className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold tracking-wide text-ink">
            Example
          </p>
        </div>
        <p className="mt-6 text-2xl font-bold leading-tight text-ink">Plumbing for local homes</p>
        <div
          className={`mt-8 rounded-[16px] border px-5 py-5 ${live ? "border-ink/15 bg-white" : "border-line bg-soft"}`}
        >
          <p className={`text-sm font-semibold ${live ? "text-ink" : "text-muted"}`}>Reviews</p>
          <p className="mt-2 text-base leading-7 text-muted">
            {live ? "Shown live on this website." : "Still showing reviews from last year."}
          </p>
          <div className="mt-4 grid gap-2" aria-hidden="true">
            <span className={`h-3 rounded-full ${live ? "w-4/5 bg-[#d7dde3]" : "w-3/5 bg-[#e6e8eb]"}`} />
            <span className={`h-3 rounded-full ${live ? "w-2/3 bg-[#d7dde3]" : "w-2/5 bg-[#e6e8eb]"}`} />
          </div>
        </div>
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
            Old reviews cost you jobs.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            A site still showing reviews from last year looks quiet. Live reviews show you&apos;re busy and trusted.
          </p>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <figure>
              <SiteMock live={false} />
              <figcaption className="mt-4 text-sm leading-6 text-muted">
                Before. Fictional example. Not a real business.
              </figcaption>
            </figure>
            <figure>
              <SiteMock live={true} />
              <figcaption className="mt-4 text-sm leading-6 text-muted">
                After. The same fictional example, with reviews on the site.
              </figcaption>
            </figure>
          </div>
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
