/**
 * SHOW_KOVELE stays false until Dan supplies a real, approved Kovele Plumbing
 * screenshot, results and quote. Do not publish invented numbers.
 */
export const SHOW_KOVELE = false;

/**
 * The 7-day trial does not take a card. People register in the app.
 * Keep this false. Card-up-front wording is not published.
 */
export const CARD_UPFRONT = false;

/**
 * Day-5 and day-7 add-a-card reminder emails are unconfirmed with Embed My
 * Reviews. Keep this false so the site does not promise those emails.
 */
export const TRIAL_REMINDER = false;

/**
 * False until this ABN is registered for GST. An unregistered business must
 * not show prices as including GST or charge GST. Flip to true to show
 * "incl GST". The phrases live in lib/gst.ts.
 */
export const GST_REGISTERED = false;

/**
 * False once privacy and terms are published: linked in the footer, listed in
 * the sitemap and llms.txt, and indexable. Set true only to pull those pages
 * off production again.
 */
export const LEGAL_DRAFT = false;
