import Link from "next/link";
import { DashboardAnnotations } from "@/components/dashboard-annotations";
import { GuideCards } from "@/components/guide-cards";
import { TrialButton } from "@/components/trial-button";
import { publishedGuides } from "@/content/guides/registry";
import { pageMetadata } from "@/lib/metadata";
import { addOns, setupOffer } from "@/lib/site";

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

function PlaceholderFrame({ eyebrow, caption }: { eyebrow: string; caption: string }) {
  return (
    <figure className="hover-lift flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)]">
      <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="size-2.5 rounded-full bg-[#d5d8de]" />
        <span className="ml-2 h-6 flex-1 rounded-full bg-white" />
      </div>
      <div className="grid min-h-72 flex-1 place-items-center px-8 py-16 text-center">
        <div>
          <p className="text-sm font-semibold text-muted">{eyebrow}</p>
          <p className="mt-4 text-lg font-semibold leading-7 text-ink">Product screenshot coming</p>
        </div>
      </div>
      <figcaption className="border-t border-line px-6 py-5 text-base leading-7 text-muted">{caption}</figcaption>
    </figure>
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
              Get chosen before they call
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Real Google reviews on your website, so homeowners trust you before they ring.
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
            Your Google profile has the reviews. Your website doesn&apos;t show them.
          </h2>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <PlaceholderFrame
              eyebrow="Before"
              caption="The website, without your Google reviews."
            />
            <PlaceholderFrame
              eyebrow="After"
              caption="The same website, with your Google reviews on it."
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`scroll-mt-24 ${section}`}>
        <div className={wrap}>
          <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            How it works in 48 hours
          </h2>
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
          <p className="mt-12 max-w-2xl text-lg leading-8 text-ink">
            Reviews live on your site within 48 hours, or that month is free.
          </p>
        </div>
      </section>

      <section id="pricing" className={`bg-soft ${section}`}>
        <div className={wrap}>
          <div className="hover-lift max-w-[560px] rounded-[20px] border border-line bg-white p-8 shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)] sm:p-10">
            <p className="text-sm font-semibold text-muted">Pricing</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              $75 a month, including GST
            </h2>
            <p className="mt-6 text-base leading-7 text-ink">
              7 days free. Card taken at signup. Billing starts on day 8.
            </p>
            <p className="mt-3 text-base leading-7 text-muted">{setupOffer}.</p>
            <h3 className="mt-10 text-base font-bold text-ink">Add-ons</h3>
            <ul className="mt-4 grid gap-3">
              {addOns.map((addOn) => (
                <li key={addOn.name} className="flex items-baseline justify-between gap-4 text-base leading-7">
                  <span className="text-ink">{addOn.name}</span>
                  <span className="text-muted">{addOn.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base leading-7 text-muted">Cancel any time.</p>
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
                Latest guides
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Short, practical notes for tradies. No invented numbers.
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
