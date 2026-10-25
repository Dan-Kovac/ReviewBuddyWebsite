"use client";

import { usePathname } from "next/navigation";
import { CTA_LABEL, pricingSectionLink, signupHref, type PlanId } from "@/lib/site";

const variants = {
  brand: "bg-brand text-ink hover:bg-brand-deep",
  ink: "bg-ink text-white hover:bg-black",
  outline: "border-2 border-ink bg-white text-ink hover:bg-soft",
};

/**
 * With a plan, this leaves for that plan's Embed My Reviews registration.
 * There is no Stripe step. Without a plan, this goes to the pricing section
 * on this page when it has one, and to the home pricing section otherwise.
 * The header button is hidden on /welcome, which is the page after a trial starts.
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
  const pathname = usePathname();
  if ((location === "header" || location === "mobile-nav") && pathname === "/welcome") {
    return null;
  }
  const href = plan ? signupHref(plan) : pricingSectionLink(pathname);
  return (
    <a
      href={href}
      data-signup={plan}
      data-cta={plan ? undefined : "pricing"}
      data-location={location}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-center text-base font-semibold ${variants[variant]} ${className}`}
    >
      {children ?? (plan ? "Try this plan free for 7 days" : CTA_LABEL)}
    </a>
  );
}
