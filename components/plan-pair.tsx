import { plans } from "@/lib/site";
import { PlanCard } from "@/components/plan-card";

export function PlanPair({ compact = false }: { compact?: boolean }) {
  // Growth listed first on phones via order classes; desktop grid keeps reading order.
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={plan.recommended ? "order-first lg:order-none lg:-my-3" : ""}
        >
          <PlanCard plan={plan} compact={compact} />
        </div>
      ))}
    </div>
  );
}
