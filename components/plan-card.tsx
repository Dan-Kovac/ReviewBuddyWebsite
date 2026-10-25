import { Check } from "lucide-react";
import { TrialButton } from "@/components/trial-button";
import type { Plan } from "@/lib/site";

export function PlanCard({
  plan,
  location = "plan-card",
}: {
  plan: Plan;
  location?: string;
}) {
  const featured = plan.recommended === true;

  return (
    <section
      id={plan.id}
      className={`scroll-mt-24 relative flex h-full flex-col rounded-[10px] border p-6 sm:p-8 ${
        featured ? "border-brand bg-ink text-white" : "border-line bg-white text-ink"
      }`}
    >
      {featured ? (
        <p className="absolute -top-3.5 left-8 inline-flex rounded-[10px] bg-brand px-3 py-1 text-sm font-semibold text-ink">
          Most tradies start here
        </p>
      ) : null}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className={`mt-2 text-base leading-7 ${featured ? "text-muted-on-dark" : "text-muted"}`}>
        {plan.tagline}
      </p>
      <p className={`mt-6 text-[clamp(3rem,6vw,4.25rem)] font-extrabold leading-none ${featured ? "text-white" : "text-ink"}`}>
        {plan.priceAmount}
      </p>
      <p className={`mt-2 text-base font-semibold ${featured ? "text-white" : "text-ink"}`}>
        {plan.pricePeriod}
      </p>
      <p className={`mt-1 text-sm ${featured ? "text-muted-on-dark" : "text-muted"}`}>{plan.weekly}</p>
      <ul className="mt-6 grid gap-3">
        {plan.includes.map((item) => (
          <li key={item} className={`flex gap-3 text-base leading-7 ${featured ? "text-white" : "text-ink"}`}>
            <Check
              aria-hidden="true"
              className={`mt-1 size-5 shrink-0 ${featured ? "text-brand" : "text-brand-text"}`}
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <TrialButton
        plan={plan.id}
        location={location}
        variant={featured ? "brand" : "outline"}
        className="mt-8 w-full"
      >
        Try {plan.name} free
      </TrialButton>
    </section>
  );
}
