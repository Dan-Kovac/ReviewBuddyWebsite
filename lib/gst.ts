import { CARD_UPFRONT, GST_REGISTERED } from "./flags";
import { resolveTrialLine } from "./trial-copy";

export const GST_NOT_REGISTERED_TERMS =
  "We are not currently registered for GST, so no GST is charged. If we register, we will tell you at least 30 days before any GST is added, and you can cancel before then.";

/** Small line under a plan price. "incl GST" only after registration. */
export function gstCardNote(registered = GST_REGISTERED): string {
  return registered ? "incl GST" : "No GST charged";
}

export function gstTermsParagraph(registered = GST_REGISTERED): string {
  return registered ? "These prices are in Australian dollars and incl GST." : GST_NOT_REGISTERED_TERMS;
}

/** "$49 a month" or "$49 a month, incl GST". */
export function monthlyPriceLabel(amount: string, registered = GST_REGISTERED): string {
  return registered ? `${amount}, incl GST` : amount;
}

export function fromPriceLine(registered = GST_REGISTERED): string {
  return registered ? "From $49 a month, incl GST" : "From $49 a month";
}

export function thenFromPriceLine(registered = GST_REGISTERED): string {
  return registered ? "Then from $49 a month, incl GST." : "Then from $49 a month.";
}

export function pricingPageTitle(registered = GST_REGISTERED): string {
  return registered
    ? "ReviewBuddy Pricing: $49 or $75 a month, incl GST"
    : "ReviewBuddy Pricing: $49 or $75 a month";
}

function trialLine(): string {
  return resolveTrialLine(CARD_UPFRONT);
}

export function homeMetaDescription(registered = GST_REGISTERED): string {
  return `Win their trust before they call. ReviewBuddy asks every customer for a Google review and shows your reviews on your website. Set up for you. ${trialLine()} ${fromPriceLine(registered)}.`;
}

export function sharePriceLine(registered = GST_REGISTERED): string {
  return `${trialLine()} ${fromPriceLine(registered)}.`;
}

export function pricingIntro(registered = GST_REGISTERED): string {
  const plans =
    "Starter gives you the link, QR code and website widget, and you do the asking. Growth does the asking for you, including your past customers.";
  return registered
    ? `${plans} Prices are in Australian dollars, incl GST.`
    : `${plans} Prices are in Australian dollars.`;
}

export function pricingSubTail(registered = GST_REGISTERED): string {
  return registered ? "Prices are in Australian dollars, incl GST." : "Prices are in Australian dollars.";
}

export function priceFaqAnswer(registered = GST_REGISTERED): string {
  return registered
    ? "Yes. $49 and $75 a month are in Australian dollars and incl GST."
    : "No. We are not registered for GST, so no GST is charged. $49 and $75 a month are in Australian dollars.";
}

export function plumberCostAnswer(registered = GST_REGISTERED): string {
  const price = registered ? "$49 or $75 a month, incl GST" : "$49 a month for Starter or $75 a month for Growth";
  return registered
    ? `${price}, after a 7-day free trial. Setup is free and there's no contract.`
    : "$49 a month for Starter or $75 a month for Growth, after a 7-day free trial. Setup is free and there's no contract.";
}

export function offerDescription(plan: "starter" | "growth", registered = GST_REGISTERED): string {
  const gst = registered ? ", incl GST" : "";
  if (plan === "starter") {
    return `$49 a month${gst}. Your review link, QR code and a review widget on your website. I set it up for you.`;
  }
  return `$75 a month${gst}. Everything in Starter, plus an automatic review request after each job, one polite reminder, and your past customers asked too.`;
}

export function valueAddedTaxIncluded(registered = GST_REGISTERED): boolean {
  return registered;
}
