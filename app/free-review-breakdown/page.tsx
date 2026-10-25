import Link from "next/link";
import { BreakdownForm } from "@/components/breakdown-form";
import { JsonLd } from "@/components/json-ld";
import { TrialButton } from "@/components/trial-button";
import { pageMetadata } from "@/lib/metadata";
import { TRIAL_LINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Google Review Breakdown | ReviewBuddy",
  description: "Tell me your business and suburb. I'll look at where you stand on Google reviews.",
  path: "/free-review-breakdown",
});

const covers = [
  "Your Google rating and how many reviews you have today",
  "How you sit next to nearby businesses in the same search",
  "Whether your website shows those reviews",
];

export default function FreeReviewBreakdownPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Free Google review breakdown",
          description: "A free look at where a business stands on Google reviews.",
        }}
      />
      <article>
        <header className="hero-wash border-b border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:py-20">
            <p className="text-sm font-semibold text-muted">Free for Australian tradies</p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-extrabold text-ink sm:text-6xl sm:leading-[1.05]">
              Get a free review breakdown
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Customers check your Google reviews before they call. I&apos;ll show you where you stand.
            </p>
          </div>
        </header>

        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1100px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">What you&apos;ll get</h2>
              <ul className="mt-6 grid gap-3">
                {covers.map((item) => (
                  <li key={item} className="text-base leading-7 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              <h2 className="mt-12 text-3xl font-semibold tracking-tight text-ink">If you want to go further</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {TRIAL_LINE} Setup includes your Google review link, QR code and a widget matched to your site.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrialButton variant="ink" location="breakdown-aside">
                  Start my free trial
                </TrialButton>
                <Link href="/pricing" className="font-semibold text-ink underline">
                  Compare plans
                </Link>
              </div>
            </div>
            <div id="request" className="scroll-mt-24 rounded-[10px] border border-line bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Request your breakdown</h2>
              {/* TODO(Dan): confirm the turnaround, then add "I'll send it within one business day." */}
              <p className="mt-2 text-sm leading-6 text-muted">Takes 30 seconds.</p>
              <div className="mt-6">
                <BreakdownForm />
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
