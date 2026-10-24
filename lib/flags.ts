/**
 * Keep both flags false. The code that sat behind them (the Kovele Plumbing
 * example and the card-at-signup sentence) has been removed; these stay so the
 * switch positions are explicit while Dan decides what comes back.
 */
export const SHOW_KOVELE = false;

/** Set true to mention taking the card in the homepage cost answer. */
export const CARD_UPFRONT = false;

/**
 * True while the privacy policy and terms are drafts that Dan has not had
 * checked. It shows a draft notice on both pages and keeps them out of search.
 * Set false only after a lawyer has reviewed them.
 */
export const LEGAL_DRAFT = true;
