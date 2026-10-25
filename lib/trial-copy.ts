import { pricingSubTail } from "./gst";

/** No-card trial line. Published only while CARD_UPFRONT is false. */
export const NO_CARD_TRIAL_LINE =
  "7-day free trial, no card needed. Add a card before day 8 to keep going.";

/**
 * Card-up-front copy is not published. A true card flag, or a reminder-email
 * flag, throws rather than inventing wording Dan has not confirmed.
 */
export function resolveTrialLine(cardUpfront: boolean, trialReminder = false): string {
  if (cardUpfront) {
    throw new Error("Card-up-front trial copy is not published.");
  }
  if (trialReminder) {
    throw new Error("Trial reminder emails are unconfirmed and are not published.");
  }
  return NO_CARD_TRIAL_LINE;
}

export const BILLING_LINE =
  "No card by day 8? Your account pauses, and adding a card in the app picks up where you left off. Cancel any time from the billing page in your account, no notice needed.";

export const PRICING_SUB =
  `7-day free trial, no card needed. Add a card before day 8 to keep going, and your plan starts. Cancel any time from the billing page in your account, no notice needed. ${pricingSubTail()}`;
