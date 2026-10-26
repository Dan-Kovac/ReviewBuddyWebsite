import { PlanCard } from "@/components/plan-card";
import { plans } from "@/lib/site";

export function PlanPair({ location = "plans" }: { location?: string }) {
  return (
    <div>
      <h2 className="sr-only">Plans</h2>
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} location={location} />
        ))}
      </div>
    </div>
  );
}
