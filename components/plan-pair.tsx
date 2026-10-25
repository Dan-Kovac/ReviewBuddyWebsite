import { PlanCard } from "@/components/plan-card";
import { PLAN_FOOT_LINE, plans } from "@/lib/site";

export function PlanPair({ location = "plans" }: { location?: string }) {
  return (
    <div>
      <h2 className="sr-only">Plans</h2>
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} location={location} />
        ))}
      </div>
      <p className="mt-8 text-center text-base font-semibold text-ink">{PLAN_FOOT_LINE}</p>
    </div>
  );
}
