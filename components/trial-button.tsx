import { pricingSectionHref, signupHref, type PlanId } from "@/lib/site";

const variants = {
  brand: "bg-brand text-ink hover:bg-brand-deep",
  ink: "bg-ink text-white hover:bg-black",
  outline: "border-2 border-ink bg-white text-ink hover:bg-soft",
};

/**
 * With a plan, this leaves for that plan's Stripe payment link.
 * Without a plan, this goes to the pricing section so the visitor picks one.
 */
export function TrialButton({
  children,
  className = "",
  variant = "brand",
  plan,
  location = "cta",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  plan?: PlanId;
  location?: string;
}) {
  const href = plan ? signupHref(plan) : pricingSectionHref;
  return (
    <a
      href={href}
      data-signup={plan}
      data-cta={plan ? undefined : "pricing"}
      data-location={location}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-center text-base font-semibold ${variants[variant]} ${className}`}
    >
      {children ?? (plan ? "Try this plan free" : "Start my free trial")}
    </a>
  );
}
