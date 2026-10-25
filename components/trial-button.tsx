import { pricingSectionHref, signupHref, type PlanId } from "@/lib/site";

const variants = {
  brand: "bg-brand text-ink hover:bg-brand-deep",
  ink: "bg-ink text-white hover:bg-black",
  outline: "border-2 border-ink bg-white text-ink hover:bg-soft",
};

/**
 * With a plan, this is Start free trial and leaves for that plan's Stripe
 * payment link. Without a plan, this is Get started and goes to the pricing
 * section so the visitor chooses a plan first.
 */
export function TrialButton({
  children,
  className = "",
  variant = "brand",
  plan,
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  plan?: PlanId;
}) {
  const href = plan ? signupHref(plan) : pricingSectionHref;
  return (
    <a
      href={href}
      data-signup={plan}
      data-cta={plan ? undefined : "pricing"}
      className={`hover-lift inline-flex min-h-12 items-center justify-center rounded-full px-5 text-center text-base font-semibold shadow-[0_10px_24px_-16px_rgba(26,26,26,0.65)] ${variants[variant]} ${className}`}
    >
      {children ?? (plan ? "Start free trial" : "Get started")}
    </a>
  );
}
