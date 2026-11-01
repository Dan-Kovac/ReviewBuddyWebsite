/**
 * SHOW_KOVELE stays false until Dan supplies a real, approved Kovele Plumbing
 * screenshot, results and quote. Do not publish invented numbers.
 */
export const SHOW_KOVELE = false;

/**
 * Flip this one constant before launch if Embed My Reviews
 * "Require Payment Before Signup" is ON.
 * false publishes NO_CARD_TRIAL_LINE. true publishes CARD_REQUIRED_TRIAL_LINE.
 * Both sentences live in lib/trial-copy.ts. Every page reads them through TRIAL_LINE.
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
