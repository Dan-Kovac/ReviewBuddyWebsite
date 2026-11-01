import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { GST_REGISTERED } from "./flags.ts";
import {
  GST_NOT_REGISTERED_TERMS,
  fromPriceLine,
  homeMetaDescription,
  gstCardNote,
  gstTermsParagraph,
  monthlyPriceLabel,
  priceFaqAnswer,
  valueAddedTaxIncluded,
} from "./gst.ts";

test("GST wording follows the registration flag", () => {
  assert.equal(GST_REGISTERED, false);
  assert.equal(gstCardNote(false), "No GST charged");
  assert.equal(gstCardNote(true), "incl GST");
  assert.equal(monthlyPriceLabel("$49 a month", false), "$49 a month");
  assert.equal(monthlyPriceLabel("$75 a month", true), "$75 a month, incl GST");
  assert.equal(fromPriceLine(false), "From $49 a month");
  assert.equal(gstTermsParagraph(false), GST_NOT_REGISTERED_TERMS);
  assert.match(gstTermsParagraph(true), /incl GST/);
  assert.equal(priceFaqAnswer(false), "No GST is charged.");
  assert.match(priceFaqAnswer(true), /incl GST/);
  assert.equal(valueAddedTaxIncluded(false), false);
  assert.equal(valueAddedTaxIncluded(true), true);
  assert.equal(
    homeMetaDescription(false),
    "ReviewBuddy asks every customer for a Google review and shows your reviews on your website. Set up for you. 7-day free trial, no card needed.",
  );
  assert.equal(
    homeMetaDescription(true),
    "ReviewBuddy asks every customer for a Google review and shows your reviews on your website. Set up for you. 7-day free trial. A card is needed to start.",
  );
});

test("published copy does not say prices include GST", () => {
  const files = [
    "../app/page.tsx",
    "../app/layout.tsx",
    "../app/pricing/page.tsx",
    "../app/terms/page.tsx",
    "../app/opengraph-image.tsx",
    "../app/google-reviews-for-plumbers/page.tsx",
    "../components/plan-card.tsx",
    "../lib/faqs.ts",
    "../lib/trial-copy.ts",
    "../lib/site.ts",
    "../lib/json-ld.ts",
    "../public/llms.txt",
    "../lib/breakdown-alert.ts",
  ];
  const banned = ["GST included", "including GST", "GST inclusive", "incl GST"];
  for (const file of files) {
    const text = readFileSync(new URL(file, import.meta.url), "utf8");
    for (const phrase of banned) {
      assert.equal(text.includes(phrase), false, `${file} contains ${phrase}`);
    }
  }
  const terms = readFileSync(new URL("../app/terms/page.tsx", import.meta.url), "utf8");
  assert.match(terms, /gstTermsParagraph/);
});
