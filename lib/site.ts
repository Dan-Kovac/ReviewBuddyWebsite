export const siteUrl = "https://reviewbuddy.com.au";
export const siteName = "ReviewBuddy";
export const contactEmail = "hello@reviewbuddy.com.au";
export const contactPhone = "0411 701 078";
export const loginUrl = "https://app.reviewbuddy.com.au/login";

export type PlanId = "starter" | "growth";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  subHeading: string;
  includes: readonly string[];
  recommended?: boolean;
  /** Wording for the product structured data offer. */
  offerDescription: string;
  /**
   * Stripe ids for the lead record and later checkout work.
   * The site never calls Stripe.
   */
  stripeProductId: string;
  stripePriceId: string;
};

export const plans: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    priceLabel: "$49 a month (inc. GST)",
    tagline: "Your reviews, live on your website.",
    subHeading:
      "For tradies who want a steady stream of Google reviews and a site that shows them off. You share your link or QR code. We handle the widget.",
    includes: [
      "Google review link and QR code",
      "Live reviews widget on your website",
      "Setup included",
    ],
    offerDescription:
      "$49 a month (inc. GST). Google review link, QR code and live reviews widget. Setup included. Cancel anytime.",
    stripeProductId: "prod_VUZxrvOPaIxAFn",
    stripePriceId: "price_1UTanI2VeLXnEu5vqJZEWtU9",
  },
  {
    id: "growth",
    name: "Growth",
    price: 75,
    priceLabel: "$75 a month (inc. GST)",
    tagline: "Keep the reviews coming, and win back past customers.",
    subHeading:
      "For tradies who want reviews to keep coming without chasing every customer, and want to ask the customers they have already done jobs for.",
    recommended: true,
    includes: [
      "Everything in Starter",
      "Email sequences that keep asking customers for reviews",
      "Re-engage past leads and customers (we show you how to export and import them by CSV)",
    ],
    offerDescription:
      "$75 a month (inc. GST). Everything in Starter plus email review sequences and past customer re-engagement. Cancel anytime.",
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

export const lowestPrice = Math.min(...plans.map((plan) => plan.price));

/**
 * Copy switches. The 7 day trial, the 48 hour guarantee and the $350 setup
 * value are not confirmed for the two plan offer, so they stay off. Dan flips
 * them on once he confirms the rules behind each one.
 */
export const CTA_LABEL = "Get started";
export const SETUP_LINE = "Setup included.";
export const TRIAL_LINE = "";
export const GUARANTEE_BADGE = "";

export const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
] as const;
