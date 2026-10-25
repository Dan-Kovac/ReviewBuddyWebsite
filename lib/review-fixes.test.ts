import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { confirmedAbnDisplay } from "./abn.ts";
import { legalPagesPublic } from "./legal-pages.ts";

test("the footer ABN stays hidden until a real number is configured", () => {
  assert.equal(confirmedAbnDisplay(), null);
  assert.equal(confirmedAbnDisplay(""), null);
  assert.equal(confirmedAbnDisplay("[ABN to be added before launch]"), null);
  assert.equal(confirmedAbnDisplay("44 108 955 374"), null);
  assert.equal(confirmedAbnDisplay("51824753556"), "51 824 753 556");
});

test("draft legal pages render on preview and 404 in production", () => {
  assert.equal(legalPagesPublic(true, "production"), false);
  assert.equal(legalPagesPublic(true, "preview"), true);
  assert.equal(legalPagesPublic(true, undefined), true);
  assert.equal(legalPagesPublic(false, "production"), true);
});

test("published pages use the reviewed spellings and hide unfinished legal copy", () => {
  const terms = readFileSync(new URL("../app/terms/page.tsx", import.meta.url), "utf8");
  const privacy = readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const breakdown = readFileSync(new URL("../app/free-review-breakdown/page.tsx", import.meta.url), "utf8");
  const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
  const footer = readFileSync(new URL("../components/site-footer.tsx", import.meta.url), "utf8");

  assert.match(
    terms,
    /Starter gives you a review link where customers\s+pick the site, a QR code, and a widget that shows your reviews on your\s+website\./,
  );
  assert.equal(terms.includes("ongoing coaching"), false);
  assert.equal(terms.includes("first week"), false);
  assert.match(terms, /Third-party services/);
  assert.equal(privacy.includes("text messages"), false);
  assert.match(home, /Those are Google&apos;s rules and Australian consumer law/);
  assert.match(breakdown, /plain-English/);
  assert.equal(breakdown.includes("plain English"), false);
  assert.equal(llms.includes("/privacy"), false);
  assert.equal(llms.includes("/terms"), false);
  assert.match(sitemap, /LEGAL_DRAFT \? \[\] : \["\/privacy", "\/terms"\]/);
  assert.equal(footer.includes("abnPlaceholder"), false);
});
