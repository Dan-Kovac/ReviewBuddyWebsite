import { TRIAL_REMINDER } from "./flags";

export {
  defaultGrowthSignupUrl,
  defaultLoginUrl,
  defaultStarterSignupUrl,
  loginUrl,
  pricingSectionHref,
  resolveLoginUrl,
  resolveSignupHref,
  signupHref,
} from "./signup-url";
export type { SignupEnv } from "./signup-url";

export const siteUrl = "https://reviewbuddy.com.au";
export const siteName = "ReviewBuddy";
export const contactEmail = "hello@reviewbuddy.com.au";
/** Dan has not supplied the ABN. Shown as an obvious placeholder until he does. */
export const abnPlaceholder = "[ABN to be added before launch]";

export type PlanId = "starter" | "growth";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  /** Big figure on the plan card, for example "$49". */
  priceAmount: string;
  /** Small line under the figure. */
  pricePeriod: string;
  /** Weekly anchor under the monthly price. */
  weekly: string;
  /** Full price phrase for schema and pages that need one line. */
  priceLabel: string;
  tagline: string;
  subHeading: string;
  includes: readonly string[];
  recommended?: boolean;
  /** Wording for the product structured data offer. */
  offerDescription: string;
  /**
   * Older Stripe product and price ids kept for reference.
   * Checkout uses the payment links in lib/signup-url.ts.
   * The spots count uses the current price ids in lib/setup-spots.ts.
   */
  stripeProductId: string;
  stripePriceId: string;
};

export const plans: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    priceAmount: "$49",
    pricePeriod: "a month, GST incl.",
    weekly: "About $11 a week",
    priceLabel: "$49 a month, GST incl.",
    tagline: "For tradies who'll ask in person.",
    subHeading: "A Google review link and QR code. Your reviews show on your website. We set it up.",
    includes: [
      "A link and QR code to ask for a Google review",
      "Your best Google reviews show on your website",
      "We set it up for you",
    ],
    offerDescription:
      "$49 a month, GST included. A link and QR code to ask for a Google review, and those reviews show on your website. Setup is included.",
    stripeProductId: "prod_VUZxrvOPaIxAFn",
    stripePriceId: "price_1UTanI2VeLXnEu5vqJZEWtU9",
  },
  {
    id: "growth",
    name: "Growth",
    price: 75,
    priceAmount: "$75",
    pricePeriod: "a month, GST incl.",
    weekly: "About $17 a week",
    priceLabel: "$75 a month, GST incl.",
    tagline: "For tradies who'd rather we did the asking.",
    subHeading: "Everything in Starter. We email your customers and load your past customers.",
    recommended: true,
    includes: [
      "Everything in Starter",
      "We email customers to ask for a review",
      "One reminder, then we stop",
      "Your past customers loaded in",
      "I help you along the way",
    ],
    offerDescription:
      "$75 a month, GST included. Everything in Starter, plus emails that ask your customers for a review and your past customers loaded in.",
    stripeProductId: "prod_VUZx7ZiwpbyODv",
    stripePriceId: "price_1UTanI2VeLXnEu5vFjqFXp0U",
  },
];

export function planById(id: PlanId): Plan {
  const found = plans.find((plan) => plan.id === id);
  if (!found) {
    throw new Error(`Unknown plan: ${id}`);
  }
  return found;
}

/**
 * Settled offer. No setup-value claim and no "no card needed" claim.
 * TRIAL_REMINDER stays false until Dan confirms the Stripe reminder email.
 */
export const CTA_LABEL = "Start my free trial";
export const TRIAL_LINE = TRIAL_REMINDER
  ? "Free for 7 days. We'll email you before you're charged. Cancel with one email."
  : "Free for 7 days. Cancel with one email.";
export const SETUP_LINE = "Free setup.";
export const BOTH_PLANS_LINE =
  "Both plans come with free setup and a weekly tip from me. No lock-in.";
export const GUARANTEE_BADGE = "";
export const STICKY_CTA_LABEL = "Start free trial · from $49/mo";

export const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/free-review-breakdown", label: "Free breakdown" },
] as const;
