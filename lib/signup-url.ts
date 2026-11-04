/**
 * Trial registration and log-in addresses. This is the only file that chooses them.
 * lib/site.ts re-exports them.
 *
 * A general "Try it free for 7 days" button uses the Starter registration URL,
 * the same address as the Starter plan button: signupHref("starter").
 * The Growth plan button keeps its own registration URL.
 *
 * There is no Stripe payment step. The app's own 7-day trial does not take a card.
 * Replace a link by editing the matching constant, or set the full URL in
 * NEXT_PUBLIC_SIGNUP_URL_STARTER or NEXT_PUBLIC_SIGNUP_URL_GROWTH.
 * An env value is used as-is. If those Vercel vars still point at Stripe
 * payment links, they override these defaults and need updating or removing.
 *
 * Log in is NEXT_PUBLIC_LOGIN_URL, or the Embed My Reviews login below until
 * a custom domain replaces it.
 */
export const defaultStarterSignupUrl =
  "https://1qbx.app.embedmyreviews.com/register?plan=5";

export const defaultGrowthSignupUrl =
  "https://1qbx.app.embedmyreviews.com/register?plan=6";

export const defaultLoginUrl = "https://1qbx.app.embedmyreviews.com/login";

/** Home pricing block. Trial buttons do not use this. They go to registration. */
export const pricingSectionHref = "/#pricing";

const pagesWithPricing = new Set(["/pricing", "/google-reviews-for-plumbers"]);

/** Hash on a page that already shows pricing. Everywhere else, the home pricing block. */
export function pricingSectionLink(pathname: string): string {
  return pagesWithPricing.has(pathname) ? "#pricing" : pricingSectionHref;
}

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

/** The href for a plan's trial control. */
export function signupHref(plan: SignupPlan): string {
  return resolveSignupHref(plan);
}

export function resolveLoginUrl(
  value: string | undefined = process.env.NEXT_PUBLIC_LOGIN_URL,
): string {
  return usableSignupUrl(value) ?? defaultLoginUrl;
}

export const loginUrl = resolveLoginUrl();
