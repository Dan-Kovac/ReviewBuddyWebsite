import { CARD_UPFRONT } from "./flags";

/**
 * The published trial sentence while Embed My Reviews
 * "Require Payment Before Signup" is OFF.
 * Flip CARD_UPFRONT in lib/flags.ts to publish CARD_REQUIRED_TRIAL_LINE instead.
 */
export const NO_CARD_TRIAL_LINE =
  "7-day free trial, no card needed. Add a card before day 8 to keep going.";

/**
 * Used when CARD_UPFRONT is true. A card is taken on the Embed My Reviews
 * sign-up page. Wording follows the file: add the card in the app, and cancel
 * from the billing page in the account.
 */
export const CARD_REQUIRED_TRIAL_LINE =
  "7-day free trial. A card is needed to start. Cancel from the billing page in your account before day 8 if you don't want to continue.";

/**
 * Reminder-email copy is not published. A reminder flag throws rather than
 * inventing wording that has not been confirmed.
 */
export function resolveTrialLine(cardUpfront: boolean, trialReminder = false): string {
  if (trialReminder) {
    throw new Error("Trial reminder emails are unconfirmed and are not published.");
  }
  return cardUpfront ? CARD_REQUIRED_TRIAL_LINE : NO_CARD_TRIAL_LINE;
}

export const TRIAL_LINE = resolveTrialLine(CARD_UPFRONT);

export const BILLING_LINE =
  "Cancel any time from the billing page in your account. No contract, no notice period.";

export const PRICING_SUB =
  "Try either plan free for 7 days. Cancel any time from the billing page in your account, no notice needed. Prices are in Australian dollars.";
