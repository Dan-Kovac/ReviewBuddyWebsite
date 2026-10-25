import { abn, confirmedAbnDisplay } from "./abn";
import { CARD_UPFRONT, TRIAL_REMINDER } from "./flags";
import { BILLING_LINE, PRICING_SUB, resolveTrialLine } from "./trial-copy";

export { abn, confirmedAbnDisplay };
export { BILLING_LINE, PRICING_SUB, resolveTrialLine };
export { NO_CARD_TRIAL_LINE } from "./trial-copy";

export {
  defaultGrowthSignupUrl,
  defaultLoginUrl,
  defaultStarterSignupUrl,
  loginUrl,
  pricingSectionHref,
  pricingSectionLink,
  resolveLoginUrl,
  resolveSignupHref,
  signupHref,
} from "./signup-url";
export type { SignupEnv } from "./signup-url";

export const siteUrl = "https://reviewbuddy.com.au";
export const siteName = "ReviewBuddy";
export const contactEmail = "hello@reviewbuddy.com.au";
export const contactPhone = "0411 701 078";
export const contactPhoneHref = "tel:+61411701078";

export type PlanId = "starter" | "growth";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  /** Big figure on the plan card, for example "$49". */
  priceAmount: string;
  /** Small line under the figure. */
  pricePeriod: string;
  /** Full price phrase for schema and pages that need one line. */
  priceLabel: string;
  tagline: string;
  subHeading: string;
  includes: readonly string[];
  recommended?: boolean;
  /** Wording for the product structured data offer. */
  offerDescription: string;
};

export const plans: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    priceAmount: "$49",
    pricePeriod: "a month",
    priceLabel: "$49 a month, AUD, GST included",
    tagline: "You do the asking. We make it easy.",
    subHeading: "Your review link, QR code and a review widget on your website. I set it up for you.",
    includes: [
      "Your review link and QR code",
      "A review widget on your website, matched to your site",
      "Free setup",
      "A short weekly email with one thing to do",
    ],
    offerDescription:
      "$49 a month, AUD, GST included. Your review link, QR code and a review widget on your website. Setup is free.",
  },
  {
    id: "growth",
    name: "Growth",
    price: 75,
    priceAmount: "$75",
    pricePeriod: "a month",
    priceLabel: "$75 a month, AUD, GST included",
    tagline: "The asking happens without you.",
    subHeading: "Everything in Starter, plus we ask your customers and your past customers.",
    recommended: true,
    includes: [
      "Everything in Starter",
      "An automatic review request after each job, with one polite reminder",
      "Your past customers asked too",
    ],
    offerDescription:
      "$75 a month, AUD, GST included. Everything in Starter, plus an automatic review request after each job, one polite reminder, and your past customers asked too.",
  },
];

export function planById(id: PlanId): Plan {
  const found = plans.find((plan) => plan.id === id);
  if (!found) {
    throw new Error(`Unknown plan: ${id}`);
  }
  return found;
}

export const TRIAL_LINE = resolveTrialLine(CARD_UPFRONT, TRIAL_REMINDER);

export const SETUP_LINE = "I set it all up for you, free.";
export const BOTH_PLANS_LINE =
  "Both plans come with free setup, a short weekly email with one thing to do, and no contract.";
export const PLAN_FOOT_LINE = "No card to start. No contract. No notice period.";
export const CTA_LABEL = "Try it free for 7 days";
export const STICKY_TRIAL_TEXT = "7-day free trial, no card needed.";
export const STICKY_CTA_LABEL = "Try it free";
export const FOOTER_LINE =
  "More reviews, more trust, more calls. For Australian tradies. Made in Melbourne by Roadmap Labs.";
export const GUARANTEE_BADGE = "";

export const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/free-review-breakdown", label: "Free breakdown" },
] as const;
