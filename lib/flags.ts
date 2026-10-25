/**
 * Keep both flags false. The code that sat behind them (the Kovele Plumbing
 * example and the card-at-signup sentence) has been removed; these stay so the
 * switch positions are explicit while Dan decides what comes back.
 */
export const SHOW_KOVELE = false;

/** The 7-day trial takes a card up front on the Embed My Reviews sign-up page. */
export const CARD_UPFRONT = true;

/**
 * True while the privacy policy and terms are drafts that Dan has not had
 * checked. It shows a draft notice on both pages and keeps them out of search.
 * Set false only after a lawyer has reviewed them.
 */
export const LEGAL_DRAFT = true;
