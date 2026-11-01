import { abn, confirmedAbnDisplay } from "./abn";
import { monthlyPriceLabel, offerDescription } from "./gst";
import { BILLING_LINE, PRICING_SUB, TRIAL_LINE } from "./trial-copy";

export { abn, confirmedAbnDisplay };
export { GST_REGISTERED } from "./flags";
export { BILLING_LINE, PRICING_SUB, TRIAL_LINE };
export { CARD_REQUIRED_TRIAL_LINE, NO_CARD_TRIAL_LINE, resolveTrialLine } from "./trial-copy";

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
    priceLabel: monthlyPriceLabel("$49 a month"),
    tagline: "A simple system to get more reviews",
    subHeading: "Your review link, QR code and a review widget on your website.",
    includes: [
      "Your review link and QR code",
      "A review widget on your website, matched to your site",
      "Free setup",
      "A short weekly email with one thing to do",
    ],
    offerDescription: offerDescription("starter"),
  },
  {
    id: "growth",
    name: "Growth",
    price: 75,
    priceAmount: "$75",
    pricePeriod: "a month",
    priceLabel: monthlyPriceLabel("$75 a month"),
    tagline: "The asking happens without you.",
    subHeading: "Everything in Starter, plus your customers and your past customers get asked.",
    recommended: true,
    includes: [
      "Everything in Starter",
      "An automatic review request after each job, with one polite reminder if they haven't reviewed yet",
      "We'll ask your past customers too, from a list you send us",
    ],
    offerDescription: offerDescription("growth"),
  },
];

export function planById(id: PlanId): Plan {
  const found = plans.find((plan) => plan.id === id);
  if (!found) {
    throw new Error(`Unknown plan: ${id}`);
  }
  return found;
}

export const SETUP_LINE = "Setup is free on both plans.";
export const BOTH_PLANS_LINE = "Both plans come with free setup and no contract.";
export const CTA_LABEL = "Try it free for 7 days";
export const CLOSING_LINE = "Pick a plan and we'll set it up for you. If it's not for you, cancel from your account.";
/** Phone header and sticky bar only. The full label does not fit beside the logo. */
export const STICKY_TRIAL_TEXT = "7 days free. We set it up for you.";
export const STICKY_CTA_LABEL = "Try it free";
export const FOOTER_LINE =
  "Google reviews for Australian tradies, set up for you. Made in Melbourne by Roadmap Labs.";
export const GUARANTEE_BADGE = "";

/** Facts under the hero. None of these repeat the trial line. */
export const TRUST_BAR = [
  "From $49 a month",
  "No contract",
  "Google Compliant",
  "Works with Google & most major review platforms",
] as const;

export const headerLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/free-review-breakdown", label: "Free review breakdown" },
] as const;

export const footerLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/free-review-breakdown", label: "Free review breakdown" },
] as const;
