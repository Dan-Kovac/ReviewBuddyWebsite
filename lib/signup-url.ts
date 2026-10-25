/**
 * Checkout and log-in addresses. This is the only file that chooses them.
 * lib/site.ts re-exports them.
 *
 * A general Get started button does not use these. It scrolls to the pricing
 * section so the visitor picks Starter or Growth first.
 *
 * Starter and Growth "Start free trial" buttons use the Stripe payment links.
 * Stripe takes the card, starts the 7-day trial, and sends the visitor on to
 * Embed My Reviews registration. Replace a link by editing the matching
 * constant, or set the full URL in NEXT_PUBLIC_SIGNUP_URL_STARTER or
 * NEXT_PUBLIC_SIGNUP_URL_GROWTH. An env value is used as-is.
 *
 * Log in is NEXT_PUBLIC_LOGIN_URL, or the Embed My Reviews login below until
 * a custom domain replaces it.
 */
export const defaultStarterSignupUrl =
  "https://buy.stripe.com/6oU9AM0d0g0V2va2Ue6c000";

export const defaultGrowthSignupUrl =
  "https://buy.stripe.com/bJe8wIaRE8yt1r69iC6c001";

export const defaultLoginUrl = "https://1qbx.app.embedmyreviews.com/login";

/** Home pricing block. General Get started buttons go here, not to checkout. */
export const pricingSectionHref = "/#pricing";

export type SignupPlan = "starter" | "growth";

export type SignupEnv = {
  starter?: string;
  growth?: string;
  login?: string;
};

function usableSignupUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }
  try {
    const url = new URL(trimmed);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    return null;
  }
  return null;
}

export function resolveSignupHref(
  plan: SignupPlan,
  env: SignupEnv = {
    starter: process.env.NEXT_PUBLIC_SIGNUP_URL_STARTER,
    growth: process.env.NEXT_PUBLIC_SIGNUP_URL_GROWTH,
  },
): string {
  if (plan === "starter") {
    return usableSignupUrl(env.starter) ?? defaultStarterSignupUrl;
  }
  return usableSignupUrl(env.growth) ?? defaultGrowthSignupUrl;
}

/** The href for a plan's Start free trial control. */
export function signupHref(plan: SignupPlan): string {
  return resolveSignupHref(plan);
}

export function resolveLoginUrl(
  value: string | undefined = process.env.NEXT_PUBLIC_LOGIN_URL,
): string {
  return usableSignupUrl(value) ?? defaultLoginUrl;
}

export const loginUrl = resolveLoginUrl();
