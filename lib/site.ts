import { CARD_UPFRONT } from "./flags";

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
export const contactPhone = "0411 701 078";
/** tel: links must not contain spaces. */
export const contactPhoneHref = "tel:+61411701078";
/** Dan has not supplied the ABN. Shown as an obvious placeholder until he does. */
export const abnPlaceholder = "[ABN to be added before launch]";

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
    priceLabel: "A$49/month incl GST",
    tagline: "Your reviews, live on your website.",
    subHeading:
      "A direct Google review link and QR code, and a review widget on your site matched to its look. Free done-for-you setup.",
    includes: [
      "Direct Google review link and QR code",
      "Review widget on your site, matched to its look",
      "Free done-for-you setup",
    ],
    offerDescription:
      "A$49/month incl GST. Direct Google review link and QR code, a review widget matched to your site, and free done-for-you setup. 7-day free trial, card taken up front. Cancel any time.",
    stripeProductId: "prod_VUZxrvOPaIxAFn",
    stripePriceId: "price_1UTanI2VeLXnEu5vqJZEWtU9",
  },
  {
    id: "growth",
    name: "Growth",
    price: 75,
    priceLabel: "A$75/month incl GST",
    tagline: "Reviews keep coming, including from past customers.",
    subHeading:
      "Everything in Starter, plus automatic review-request emails with one polite reminder, your past-customer list loaded, and ongoing coaching.",
    recommended: true,
    includes: [
      "Everything in Starter",
      "Automatic review-request emails with one polite reminder",
      "Past-customer list loaded",
      "Ongoing coaching",
    ],
    offerDescription:
      "A$75/month incl GST. Everything in Starter, plus automatic review-request emails with one polite reminder, past-customer list loaded, and ongoing coaching. 7-day free trial, card taken up front. Cancel any time.",
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
 * Settled offer. Card is taken up front (CARD_UPFRONT). No setup-value
 * claim and no "no card needed" claim.
 */
export const CTA_LABEL = "Get started";
export const TRIAL_LINE = CARD_UPFRONT
  ? "7-day free trial. Card taken up front. Cancel any time."
  : "7-day free trial. Cancel any time.";
export const SETUP_LINE = "Free done-for-you setup.";
export const BOTH_PLANS_LINE =
  "Both plans include a 7-day free trial (card taken up front), a weekly note with one simple thing to do, and you can cancel any time.";
export const GUARANTEE_BADGE = "";

export const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/help", label: "Help" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/free-review-breakdown", label: "Free breakdown" },
] as const;
