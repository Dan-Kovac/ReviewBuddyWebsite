import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { renderMarkdown } from "./markdown.ts";

function link(target: string): string {
  return renderMarkdown(`[here](${target})`);
}

test("markdown links allow http(s), mailto, tel and same-site paths", () => {
  assert.match(link("https://example.com/a"), /href="https:\/\/example.com\/a"/);
  assert.match(link("HTTP://example.com/a"), /href="https:\/\/example.com\/a"/);
  assert.match(link("http://example.com/a"), /href="https:\/\/example.com\/a"/);
  assert.match(link("mailto:hello@reviewbuddy.com.au"), /href="mailto:hello@reviewbuddy.com.au"/);
  assert.match(link("tel:+61411701078"), /href="tel:\+61411701078"/);
  assert.match(link("/pricing"), /href="\/pricing"/);
  assert.match(link("./guide"), /href="\.\/guide"/);
  assert.match(link("../guide"), /href="\.\.\/guide"/);
  assert.match(link("#pricing"), /href="#pricing"/);
  assert.match(link("?plan=starter"), /href="\?plan=starter"/);
  assert.match(link("guides/setup"), /href="guides\/setup"/);
});

test("markdown links refuse protocol-relative targets and other schemes", () => {
  const refused = [
    "//evil.example",
    "///evil.example",
    "/\\evil.example",
    "\\\\evil.example",
    " //evil.example",
    "javascript:alert(1)",
    "data:text/html,hi",
  ];
  for (const target of refused) {
    const html = link(target);
    assert.equal(html.includes("href"), false, target);
    assert.equal(html.includes("evil.example"), false, target);
    assert.equal(html.includes("javascript"), false, target);
    assert.match(html, /here/);
  }
});

test("review follow-ups stay in the source", () => {
  const founder = readFileSync(new URL("../components/founder-note.tsx", import.meta.url), "utf8");
  const plans = readFileSync(new URL("../components/plan-pair.tsx", import.meta.url), "utf8");
  const card = readFileSync(new URL("../components/plan-card.tsx", import.meta.url), "utf8");
  const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  const migration = readFileSync(
    new URL("../supabase/migrations/20261025235100_revoke_leads_grants.sql", import.meta.url),
    "utf8",
  );
  const pkg = readFileSync(new URL("../package.json", import.meta.url), "utf8");
  const signupCheck = readFileSync(new URL("../scripts/check-signup-urls.mjs", import.meta.url), "utf8");

  assert.match(founder, /Roadmap Digital/);
  assert.match(founder, /Made in Melbourne by Roadmap Labs/);
  assert.match(plans, /<h2 className="sr-only">Plans<\/h2>/);
  const groupHeading = plans.indexOf('className="sr-only">Plans');
  const cardUse = plans.indexOf("<PlanCard");
  assert.ok(groupHeading > 0 && groupHeading < cardUse);
  assert.match(card, /<h3[^>]*>\{plan\.name\}<\/h3>/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /X-Content-Type-Options", value: "nosniff"/);
  assert.match(config, /Referrer-Policy", value: "strict-origin-when-cross-origin"/);
  assert.match(config, /X-Frame-Options", value: "DENY"/);
  assert.match(config, /camera=\(\), microphone=\(\), geolocation=\(\)/);
  assert.equal(config.includes("script-src"), false);
  assert.match(migration, /revoke all on table public\.leads from anon, authenticated/);
  assert.match(migration, /grant all on table public\.leads to service_role/);
  const scripts = JSON.parse(pkg).scripts as Record<string, string>;
  assert.equal(scripts.typecheck, "next typegen && tsc --noEmit");
  assert.equal(scripts["check:signup"], "node --experimental-strip-types scripts/check-signup-urls.mjs");
  assert.equal(scripts["test:e2e"], "playwright test");
  assert.equal(scripts["test:unit"].includes("check-signup"), false);
  assert.match(signupCheck, /defaultStarterSignupUrl/);
  assert.match(signupCheck, /defaultGrowthSignupUrl/);
  assert.match(signupCheck, /response\.status !== 200/);
});
