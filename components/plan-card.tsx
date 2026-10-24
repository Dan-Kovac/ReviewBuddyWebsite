"use client";

import { useTrial } from "@/components/trial-provider";
import type { Plan } from "@/lib/site";

export function PlanCard({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  const featured = plan.recommended === true;
  const { openTrial } = useTrial();

  return (
    <section
      id={plan.id}
      className={`scroll-mt-24 lift-card relative flex flex-col rounded-[24px] border p-8 ${featured
        ? "border-brand bg-ink text-white shadow-[0_24px_60px_-24px_rgba(56,182,255,0.55)]"
        : "border-line bg-white text-ink shadow-[0_16px_40px_-32px_rgba(11,15,20,0.4)]"}`}
    >
      {featured ? (
        <p className="absolute -top-3.5 left-8 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-ink lg:left-1/2 lg:-translate-x-1/2">
          Recommended
        </p>
      ) : null}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className={`mt-2 text-base leading-7 ${featured ? "text-muted-on-dark" : "text-muted"}`}>
        {plan.tagline}
      </p>
      <p className="mt-6">
        <span className={`text-[3.5rem] font-extrabold leading-none lg:text-[4rem] ${featured ? "text-white" : "text-ink"}`}>
          ${plan.price}
        </span>
        <span className={`ml-2 text-base ${featured ? "text-muted-on-dark" : "text-muted"}`}>
          a month, including GST
        </span>
      </p>
      <ul className={`mt-6 divide-y ${featured ? "divide-white/15" : "divide-line"}`}>
        {plan.includes.map((item) => (
          <li key={item} className={`flex gap-3 py-3 text-base leading-7 ${featured ? "text-white" : "text-ink"}`}>
            <span
              aria-hidden="true"
              className={`mt-3 h-0.5 w-4 shrink-0 rounded-full ${featured ? "bg-brand" : "bg-brand-text"}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => openTrial(plan.id)}
        className={`mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full px-5 text-center text-base font-semibold transition-colors ${featured
          ? "bg-brand text-ink hover:bg-brand-deep"
          : "border-2 border-ink bg-white text-ink hover:bg-soft"}`}
      >
        Start free trial on {plan.name}
      </button>
      {!compact ? (
        <p className={`mt-4 text-sm leading-6 ${featured ? "text-muted-on-dark" : "text-muted"}`}>
          {plan.subHeading}
        </p>
      ) : null}
    </section>
  );
}
