"use client";

import { usePathname } from "next/navigation";
import { CTA_LABEL, pricingSectionLink, signupHref, type PlanId } from "@/lib/site";

const variants = {
  brand:
    "bg-[var(--rb-accent)] text-[var(--rb-on-accent)] shadow-[var(--rb-shadow-button)] hover:bg-[var(--rb-accent-strong)]",
  gold:
    "bg-[var(--rb-accent)] text-[var(--rb-on-accent)] shadow-[var(--rb-shadow-button)] hover:bg-[var(--rb-accent-strong)]",
  ink:
    "bg-[var(--rb-accent)] text-[var(--rb-on-accent)] shadow-[var(--rb-shadow-button)] hover:bg-[var(--rb-accent-strong)]",
  outline:
    "border-[1.5px] border-[var(--rb-line-strong)] bg-[var(--rb-surface-raised)] text-[var(--rb-brand)] hover:bg-[var(--rb-surface-alt)]",
  "ghost-dark":
    "border-[1.5px] border-[color-mix(in_srgb,var(--rb-on-brand)_40%,transparent)] bg-transparent text-[var(--rb-on-brand)] hover:bg-[color-mix(in_srgb,var(--rb-on-brand)_8%,transparent)]",
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
      className={`inline-flex min-h-[52px] items-center justify-center rounded-full px-6 text-center text-base font-semibold ${variants[variant]} ${className}`}
    >
      {children ?? (plan ? "Try this plan free for 7 days" : CTA_LABEL)}
    </a>
  );
}
