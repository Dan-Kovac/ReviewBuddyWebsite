import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { confirmedAbnDisplay, legalEntityName } from "./abn.ts";
import { LEGAL_DRAFT } from "./flags.ts";
import { legalPagesPublic } from "./legal-pages.ts";

test("the confirmed ABN is the ABR number and the entity name is exact", () => {
  assert.equal(confirmedAbnDisplay(), "44 108 955 374");
  assert.equal(confirmedAbnDisplay("44108955374"), "44 108 955 374");
  assert.equal(confirmedAbnDisplay(""), null);
  assert.equal(confirmedAbnDisplay("not an abn"), null);
  assert.equal(legalEntityName, "KOVAC, DANIEL DEAN");
});

test("published legal pages stay public, including in production", () => {
  assert.equal(LEGAL_DRAFT, false);
  assert.equal(legalPagesPublic(true, "production"), false);
  assert.equal(legalPagesPublic(true, "preview"), true);
  assert.equal(legalPagesPublic(false, "production"), true);
});

test("published pages use the reviewed spellings and the real legal entity", () => {
  const terms = readFileSync(new URL("../app/terms/page.tsx", import.meta.url), "utf8");
  const privacy = readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const breakdown = readFileSync(new URL("../app/free-review-breakdown/page.tsx", import.meta.url), "utf8");
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
  const footer = readFileSync(new URL("../components/site-footer.tsx", import.meta.url), "utf8");

  assert.match(
    terms,
    /Starter gives you a review link where customers\s+pick the site, a QR code, and a widget that shows your reviews on your\s+website\./,
  );
  assert.equal(terms.includes("ongoing coaching"), false);
  assert.equal(terms.includes("first week"), false);
  assert.match(terms, /Third-party services/);
  const abnSource = readFileSync(new URL("./abn.ts", import.meta.url), "utf8");
  assert.match(abnSource, /KOVAC, DANIEL DEAN/);
  assert.match(abnSource, /44 108 955 374/);
  assert.match(terms, /legalEntityName/);
  assert.match(privacy, /legalEntityName/);
  assert.equal(privacy.includes("text messages"), false);
  assert.equal(privacy.includes("["), false);
  assert.equal(terms.includes("["), false);
  assert.equal(privacy.includes("Draft"), false);
  assert.equal(terms.includes("Draft"), false);
  assert.match(privacy, /Google Ads/);
  assert.match(privacy, /Meta pixel/);
  assert.match(home, /Those are Google&apos;s rules and Australian consumer law/);
  assert.match(breakdown, /plain-English/);
  assert.equal(breakdown.includes("plain English"), false);
  assert.match(llms, /\/privacy/);
  assert.match(llms, /\/terms/);
  assert.match(footer, /confirmedAbnDisplay/);
});
