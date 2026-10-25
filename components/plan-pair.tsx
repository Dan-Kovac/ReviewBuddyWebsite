import { plans } from "@/lib/site";
import { PlanCard } from "@/components/plan-card";

export function PlanPair({ location = "plans" }: { location?: string }) {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} location={location} />
      ))}
    </div>
  );
}
