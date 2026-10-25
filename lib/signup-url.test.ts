import assert from "node:assert/strict";
import { test } from "node:test";
import {
  defaultGrowthSignupUrl,
  defaultLoginUrl,
  defaultStarterSignupUrl,
  resolveLoginUrl,
  resolveSignupHref,
} from "./signup-url.ts";

test("plan trials use the Stripe payment links", () => {
  assert.equal(
    defaultStarterSignupUrl,
    "https://buy.stripe.com/6oU9AM0d0g0V2va2Ue6c000",
  );
  assert.equal(
    defaultGrowthSignupUrl,
    "https://buy.stripe.com/bJe8wIaRE8yt1r69iC6c001",
  );
  assert.equal(resolveSignupHref("starter", {}), defaultStarterSignupUrl);
  assert.equal(resolveSignupHref("growth", {}), defaultGrowthSignupUrl);
});

test("a per-plan env URL replaces that plan only", () => {
  const starter = "https://buy.stripe.com/test_starter";
  assert.equal(resolveSignupHref("starter", { starter }), starter);
  assert.equal(resolveSignupHref("growth", { starter }), defaultGrowthSignupUrl);
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
