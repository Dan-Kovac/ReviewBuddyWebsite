import { TrialButton } from "@/components/trial-button";
import type { Plan } from "@/lib/site";

export function PlanCard({
  plan,
  location = "plan-card",
}: {
  plan: Plan;
  location?: string;
}) {
  const featured = Boolean(plan.recommended);

  return (
    <section
      id={plan.id}
      className={`relative flex h-full scroll-mt-24 flex-col rounded-[var(--rb-radius-xl)] p-8 ${
        featured
          ? "bg-[var(--rb-brand)] text-[var(--rb-on-brand)] shadow-[var(--rb-shadow-product)]"
          : "border border-[var(--rb-line)] bg-[var(--rb-surface-raised)] text-[var(--rb-text)] shadow-[var(--rb-shadow-card)]"
      }`}
    >
      <p
        className={`mb-3 inline-flex w-fit rounded-full bg-[var(--rb-accent)] px-2.5 py-1 text-xs font-bold tracking-[0.06em] text-[var(--rb-on-accent)] uppercase ${
          featured ? "" : "invisible max-lg:hidden"
        }`}
        aria-hidden={featured ? undefined : true}
      >
        Recommended
      </p>
      <h3 className={featured ? "text-[var(--rb-on-brand)]" : undefined}>{plan.name}</h3>
      <p className={`mt-1 text-base ${featured ? "text-[var(--rb-on-brand-muted)]" : "text-[var(--rb-text-muted)]"}`}>
        {plan.tagline}
      </p>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="wordmark text-[56px] leading-none tracking-[-0.02em]">{plan.priceAmount}</span>
        <span className={featured ? "text-[var(--rb-on-brand-muted)]" : "text-[var(--rb-text-muted)]"}>{plan.pricePeriod}</span>
      </p>
      <ul className="mt-6 grid gap-2.5 text-base leading-6">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full ${
                featured ? "bg-[var(--rb-accent)] text-[var(--rb-brand)]" : "bg-[var(--rb-brand-tint)] text-[var(--rb-brand)]"
              }`}
            >
              <svg viewBox="0 0 18 18" className="size-[18px]" fill="none">
                <path d="M5 9.5l2.5 2.5L13 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={featured ? "text-[var(--rb-on-brand-muted)]" : undefined}>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <TrialButton plan={plan.id} location={location} variant={featured ? "gold" : "outline"} className="w-full">
          Try {plan.name} free for 7 days
        </TrialButton>
      </div>
    </section>
  );
}
