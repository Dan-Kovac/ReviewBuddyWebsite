import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { helpFaqs, homeFaqs, pricingFaqs } from "./faqs.ts";

const homeOrder = [
  "Do I need a card to start?",
  "What if I want to stop using ReviewBuddy?",
  "How much of my time does it take?",
  "Do I need to touch my website?",
  "Is this allowed by Google?",
  "What if a customer wasn't happy?",
  "Will my customers actually leave a review?",
  "Which plan should I pick?",
];

const helpOrder = [
  "What do more reviews do for my website and my calls?",
  "Why do reviews matter right now?",
  "My competitor has more reviews than me. Why does that matter?",
  "Can my team ask in person?",
  "Do you write reviews for me?",
  "I've got more than one location.",
];

test("home FAQs are the eight copy-v1 questions, in order", () => {
  assert.deepEqual(
    homeFaqs.map((faq) => faq.question),
    homeOrder,
  );
  const unhappy = homeFaqs.find((faq) => faq.question === "What if a customer wasn't happy?")!.answer;
  assert.equal(unhappy.includes("Plenty of people would rather do that than post about it."), false);
  assert.match(unhappy, /And if a 3-star review does land/);
  const will = homeFaqs.find((faq) => faq.question === "Will my customers actually leave a review?")!.answer;
  assert.equal(will.includes("everyone gets asked"), false);
  assert.match(will, /it makes asking for one part of every job/);
  const joined = homeFaqs.map((faq) => `${faq.question}\n${faq.answer}`).join("\n");
  for (const banned of ["sentiment", "review gating", "hipages", "Service Seeking", "multiple locations", "AI replies", "Trustpilot"]) {
    assert.equal(joined.toLowerCase().includes(banned.toLowerCase()), false, banned);
  }
});

test("help FAQs are the six moved questions, and /help renders them", () => {
  assert.deepEqual(
    helpFaqs.map((faq) => faq.question),
    helpOrder,
  );
  const help = readFileSync(new URL("../app/help/page.tsx", import.meta.url), "utf8");
  assert.match(help, /Reviews and your business/);
  assert.match(help, /Asking for reviews/);
  assert.match(help, /Your account/);
  assert.equal(help.includes("Answers on setup"), false);
  assert.match(help, /How to cancel, and how to reach us\./);
  assert.match(help, /faqJsonLd\(helpFaqs\)/);
  for (const faq of helpFaqs) {
    assert.equal(help.includes(faq.question) || help.includes("helpFaqs"), true);
  }
});

test("pricing still shows the locations answer from help", () => {
  const locations = helpFaqs.find((faq) => faq.question === "I've got more than one location.")!;
  const priced = pricingFaqs.find((faq) => faq.question === "I've got more than one location.")!;
  assert.equal(priced.answer, locations.answer);
  assert.match(priced.answer, /hello@reviewbuddy.com.au/);
});

test("FAQ structured data uses the same question lists as the pages", () => {
  const jsonLd = readFileSync(new URL("./json-ld.ts", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(jsonLd, /name: faq\.question/);
  assert.match(jsonLd, /text: faq\.answer/);
  assert.match(home, /faqJsonLd\(homeFaqs\)/);
  assert.equal(homeFaqs.length, 8);
  assert.equal(helpFaqs.length, 6);
});
