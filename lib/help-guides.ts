export type HelpGuide = {
  slug: string;
  title: string;
  excerpt: string;
  paragraphs: readonly string[];
};

/**
 * Built-in help, so cancelling is explained even when the CMS has no articles.
 * Cancelling is from the billing page in the account, not by replying to an email.
 * Nothing here promises the review link or widget keeps working after the account ends.
 */
export const cancellingGuide: HelpGuide = {
  slug: "cancelling",
  title: "How to cancel",
  excerpt:
    "Cancel from the billing page in your account. You keep access until the end of the billing period.",
  paragraphs: [
    "You cancel from the billing page in your account, not by replying to an email.",
    "Log in to ReviewBuddy and open the billing page in your account. Cancel there. There's no contract and no notice period. You keep access until the end of your billing period.",
    "If your free week ends and you haven't added a card, your account pauses. Review requests and syncing stop, and you pay nothing. Add a card in the app and you pick up where you left off.",
    "Your reviews stay on Google and the other sites, because they're yours. Once your account ends, ReviewBuddy can't promise the review link or the widget on your website will keep working.",
    "Questions can still come to hello@reviewbuddy.com.au. Cancelling itself is done from the billing page in your account.",
  ],
};

export const builtInHelp: readonly HelpGuide[] = [cancellingGuide];
