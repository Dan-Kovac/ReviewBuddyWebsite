import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { breakdownAlertText } from "./breakdown-alert.ts";
import { homeFaqs, plumberFaqs, pricingFaqs } from "./faqs.ts";
import { CARD_UPFRONT, TRIAL_REMINDER } from "./flags.ts";
import { cancellingGuide } from "./help-guides.ts";
import {
  BILLING_LINE,
  CARD_REQUIRED_TRIAL_LINE,
  NO_CARD_TRIAL_LINE,
  PRICING_SUB,
  resolveTrialLine,
} from "./trial-copy.ts";

const forbidden = [
  "cancel with one email",
  "cancel by email",
  "card taken up front",
  "card up front",
  "card is taken",
  "buy.stripe.com",
  "stripe portal",
  "payment link",
  "one tap",
  "we'll email you before you're charged",
  "you'll get a reminder before your week's up",
  "around day 5 you'll get a reminder",
];

function collectedCopy(): string {
  const faqText = [...homeFaqs, ...pricingFaqs, ...plumberFaqs]
    .flatMap((faq) => [faq.question, faq.answer])
    .join("\n");
  return [
    resolveTrialLine(false, false),
    BILLING_LINE,
    PRICING_SUB,
    faqText,
    cancellingGuide.excerpt,
    ...cancellingGuide.paragraphs,
    breakdownAlertText({
      businessName: "Lee Plumbing",
      email: "sam@example.com",
      mobile: "",
      source: "breakdown_request",
      source_post: "",
    }),
  ]
    .join("\n")
    .toLowerCase();
}

test("no-card mode is on and the trial line is the settled sentence", () => {
  assert.equal(CARD_UPFRONT, false);
  assert.equal(TRIAL_REMINDER, false);
  assert.equal(
    NO_CARD_TRIAL_LINE,
    "7-day free trial, no card needed. Add a card before day 8 to keep going.",
  );
  assert.equal(resolveTrialLine(CARD_UPFRONT, TRIAL_REMINDER), NO_CARD_TRIAL_LINE);
  assert.equal(resolveTrialLine(false, false), NO_CARD_TRIAL_LINE);
  assert.equal(resolveTrialLine(true, false), CARD_REQUIRED_TRIAL_LINE);
  assert.equal(CARD_REQUIRED_TRIAL_LINE.toLowerCase().includes("no card"), false);
  assert.throws(() => resolveTrialLine(false, true), /unconfirmed/);
  assert.throws(() => resolveTrialLine(true, true), /unconfirmed/);
});

test("billing and cancel copy uses the billing page in the account", () => {
  assert.match(BILLING_LINE, /billing page in your account/);
  assert.match(PRICING_SUB, /billing page in your account/);
  assert.match(cancellingGuide.paragraphs[0], /billing page in your account/);
  assert.match(cancellingGuide.paragraphs[0], /not by replying to an email/);
  assert.equal(
    cancellingGuide.paragraphs.join(" ").toLowerCase().includes("stripe"),
    false,
  );
});

test("published trial copy does not promise a card, a reminder email, or Stripe", () => {
  const copy = collectedCopy();
  for (const phrase of forbidden) {
    assert.equal(copy.includes(phrase), false, phrase);
  }
  assert.equal(copy.includes("no card needed"), true);
  assert.match(copy, /review requests and syncing stop/);
  assert.match(copy, /add a card in the app/);
  assert.equal(copy.includes("add a card any time"), false);
  assert.equal(copy.includes("usually means another paid tool"), false);
});

test("the home FAQ hedges Service Seeking the same way as the plumbers FAQ", () => {
  const home = homeFaqs.find((faq) => faq.question === "What if I want to stop using ReviewBuddy?")!.answer;
  const plumber = plumberFaqs.find((faq) => faq.question.includes("Service Seeking"))!.answer;
  assert.match(home, /Service Seeking can show in your widget if it connects\./);
  assert.match(home, /Email me the sites you use and I'll check\./);
  assert.match(plumber, /if they connect/);
  assert.match(plumber, /Email me the sites you use and I'll check\./);
});

test("plans no longer carry the stale Stripe product ids", () => {
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  const spots = readFileSync(new URL("./setup-spots.ts", import.meta.url), "utf8");
  assert.equal(site.includes("stripeProductId"), false);
  assert.equal(site.includes("stripePriceId"), false);
  assert.equal(site.includes("prod_VUZx"), false);
  assert.equal(site.includes("price_1UTanI"), false);
  assert.match(spots, /price_1UUJke2VeLXnEu5vfFWYnp0Y/);
  assert.match(spots, /price_1UUJlp2VeLXnEu5vB6hQdpL0/);
});

test("the breakdown alert is an internal note, not a trial or a card request", () => {
  const text = breakdownAlertText({
    businessName: "Lee Plumbing",
    email: "sam@example.com",
    mobile: "0411000000",
    source: "breakdown_request",
    source_post: "plumber",
  });
  assert.match(text, /Lee Plumbing/);
  assert.match(text, /sam@example.com/);
  assert.match(text, /no card needed/);
  assert.equal(text.toLowerCase().includes("stripe"), false);
});
