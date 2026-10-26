import assert from "node:assert/strict";
import { test } from "node:test";
import {
  defaultGrowthSignupUrl,
  defaultLoginUrl,
  defaultStarterSignupUrl,
  pricingSectionLink,
  resolveLoginUrl,
  resolveSignupHref,
} from "./signup-url.ts";

test("plan trials go to Embed My Reviews registration, with no Stripe step", () => {
  assert.equal(
    defaultStarterSignupUrl,
    "https://1qbx.app.embedmyreviews.com/register?plan=5",
  );
  assert.equal(
    defaultGrowthSignupUrl,
    "https://1qbx.app.embedmyreviews.com/register?plan=6",
  );
  assert.equal(resolveSignupHref("starter", {}), defaultStarterSignupUrl);
  assert.equal(resolveSignupHref("growth", {}), defaultGrowthSignupUrl);
  assert.equal(defaultStarterSignupUrl.includes("stripe"), false);
  assert.equal(defaultGrowthSignupUrl.includes("stripe"), false);
});

test("a per-plan env URL replaces that plan only", () => {
  const starter = "https://example.com/register?plan=starter";
  assert.equal(resolveSignupHref("starter", { starter }), starter);
  assert.equal(resolveSignupHref("growth", { starter }), defaultGrowthSignupUrl);

  const growth = "https://example.com/register?plan=growth";
  assert.equal(resolveSignupHref("growth", { growth }), growth);
  assert.equal(resolveSignupHref("starter", { growth }), defaultStarterSignupUrl);
});

test("blank or unsafe env values fall back to the app registration URL", () => {
  assert.equal(resolveSignupHref("starter", { starter: "  " }), defaultStarterSignupUrl);
  assert.equal(
    resolveSignupHref("starter", { starter: "javascript:alert(1)" }),
    defaultStarterSignupUrl,
  );
});

test("pages that already show pricing keep the trial link on that page", () => {
  assert.equal(pricingSectionLink("/"), "/#pricing");
  assert.equal(pricingSectionLink("/pricing"), "#pricing");
  assert.equal(pricingSectionLink("/google-reviews-for-plumbers"), "#pricing");
  assert.equal(pricingSectionLink("/welcome"), "/#pricing");
});

test("login defaults to Embed My Reviews and can be overridden", () => {
  assert.equal(defaultLoginUrl, "https://1qbx.app.embedmyreviews.com/login");
  assert.equal(resolveLoginUrl(undefined), defaultLoginUrl);
  assert.equal(resolveLoginUrl("  "), defaultLoginUrl);
  assert.equal(resolveLoginUrl("javascript:alert(1)"), defaultLoginUrl);
  assert.equal(
    resolveLoginUrl("https://app.reviewbuddy.com.au/login"),
    "https://app.reviewbuddy.com.au/login",
  );
});
