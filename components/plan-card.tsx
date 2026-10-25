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
  return (
    <section
      id={plan.id}
      className="relative flex h-full scroll-mt-24 flex-col rounded-[10px] border border-line bg-white p-6 text-ink sm:p-8"
    >
      <p
        className={`mb-3 inline-flex w-fit rounded-[10px] bg-brand px-3 py-1 text-sm font-semibold text-ink ${
          plan.recommended ? "" : "invisible"
        }`}
        aria-hidden={plan.recommended ? undefined : true}
      >
        Recommended
      </p>
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className="mt-2 min-h-14 text-base leading-7 text-muted">{plan.tagline}</p>
      <p className="mt-6 text-[clamp(3rem,6vw,4.25rem)] font-extrabold leading-none text-ink">{plan.priceAmount}</p>
      <p className="mt-2 text-base font-semibold text-ink">{plan.pricePeriod}</p>
      <p className="mt-1 text-sm text-muted">{plan.weekly}</p>
      <ul className="mt-6 grid gap-3">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base leading-6 text-ink">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-text" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <TrialButton plan={plan.id} location={location} variant="outline" className="w-full">
          Try {plan.name} free
        </TrialButton>
      </div>
    </section>
  );
}
