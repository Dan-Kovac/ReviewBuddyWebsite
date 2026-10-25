export const siteUrl = "https://reviewbuddy.com.au";
export const siteName = "ReviewBuddy";
export const contactEmail = "hello@reviewbuddy.com.au";
export const contactPhone = "0411 701 078";
/** tel: links must not contain spaces. */
export const contactPhoneHref = "tel:+61411701078";
/** Dan has not supplied the ABN. Shown as an obvious placeholder until he does. */
export const abnPlaceholder = "[ABN to be added before launch]";
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
 * Copy switches. The 7 day free trial, free setup, first week results and
 * cancel anytime are confirmed by Dan (24 October 2026). The 48 hour guarantee
 * is not adopted, so GUARANTEE_BADGE stays empty. Whether the trial takes a
 * card up front is still Dan's call: CARD_UPFRONT in lib/flags.ts stays false
 * and no copy mentions a card either way.
 */
export const CTA_LABEL = "Start free trial";
export const TRIAL_LINE = "7-day free trial. Free setup. Cancel anytime.";
export const SETUP_LINE = "Setup included.";
/** Dan values the setup at $500 or more. Dan to confirm this public wording. */
export const SETUP_VALUE_LINE = "Free setup worth $500";
export const FIRST_WEEK_LINE = "Set up to bring in new reviews in your first week.";
export const GUARANTEE_BADGE = "";

export const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/help", label: "Help" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/free-review-breakdown", label: "Free breakdown" },
] as const;
