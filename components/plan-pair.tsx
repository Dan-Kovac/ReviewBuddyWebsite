import { plans } from "@/lib/site";
import { PlanCard } from "@/components/plan-card";

export function PlanPair({ location = "plans" }: { location?: string }) {
  const ordered = [...plans].sort((a, b) => Number(b.recommended === true) - Number(a.recommended === true));

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      {ordered.map((plan) => (
        <PlanCard key={plan.id} plan={plan} location={location} />
      ))}
    </div>
  );
}
