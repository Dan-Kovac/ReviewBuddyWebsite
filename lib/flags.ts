/**
 * Keep both flags false. The code that sat behind them (the Kovele Plumbing
 * example and the card-at-signup sentence) has been removed; these stay so the
 * switch positions are explicit while Dan decides what comes back.
 */
export const SHOW_KOVELE = false;

/** The 7-day trial takes a card up front on the Embed My Reviews sign-up page. */
export const CARD_UPFRONT = true;

/**
 * TODO(Dan): confirm two Stripe settings before turning this on.
 * 1. The card is charged at the end of the trial, not on day one.
 * 2. Stripe's trial-ending reminder email is switched on.
 * While this is false, the site does not say we'll email before the charge.
 */
export const TRIAL_REMINDER = false;

/**
 * True while the privacy policy and terms are drafts that Dan has not had
 * checked. It shows a draft notice on both pages and keeps them out of search.
 * Set false only after a lawyer has reviewed them.
 */
export const LEGAL_DRAFT = true;
