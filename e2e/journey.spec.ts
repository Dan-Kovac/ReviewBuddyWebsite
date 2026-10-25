import { expect, test, type Page } from "@playwright/test";
import {
  defaultGrowthSignupUrl,
  defaultStarterSignupUrl,
  loginUrl,
  pricingSectionHref,
} from "../lib/site";

const starterSignup = defaultStarterSignupUrl;
const growthSignup = defaultGrowthSignupUrl;

function trackOwnErrors(page: Page) {
  const problems: string[] = [];
  let onOurSite = true;
  page.on("framenavigated", (frame) => {
    if (frame !== page.mainFrame()) return;
    try {
      onOurSite = new URL(frame.url()).hostname === "127.0.0.1";
    } catch {
      onOurSite = false;
    }
  });
  page.on("pageerror", (error) => {
    if (onOurSite) problems.push(`pageerror: ${error.message}`);
  });
  page.on("console", (message) => {
    if (!onOurSite || message.type() !== "error") return;
    const text = message.text();
    if (text.includes("favicon")) return;
    problems.push(`console: ${text}`);
  });
  return problems;
}

async function shot(page: Page, name: string) {
  await page.screenshot({
    path: `e2e/screenshots/${test.info().project.name}-${name}.png`,
    fullPage: false,
  });
}

test("landing, pricing, trial handoff, blog and help", async ({ page }) => {
  const problems = trackOwnErrors(page);
  const project = test.info().project.name;

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Get chosen before they call");
  await expect(page.getByText("A$49/month incl GST").first()).toBeVisible();
  await expect(page.getByText("A$75/month incl GST").first()).toBeVisible();
  await expect(page.getByText("Card taken up front").first()).toBeVisible();
  await expect(page.getByText("worth $500")).toHaveCount(0);
  await expect(page.getByText(/no card/i)).toHaveCount(0);
  await shot(page, "01-landing");

  const logins = page.getByRole("link", { name: "Log in" });
  expect(await logins.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await logins.count()); index += 1) {
    await expect(logins.nth(index)).toHaveAttribute("href", loginUrl);
  }

  if (project === "mobile") {
    const menuButton = page.getByRole("button", { name: "Open menu" });
    const box = await menuButton.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    await menuButton.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Help" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Log in" })).toHaveAttribute("href", loginUrl);
    await expect(menu.getByRole("link", { name: "Get started" })).toHaveAttribute("href", pricingSectionHref);
    await shot(page, "02-menu");
    await page.getByRole("button", { name: "Close menu" }).click();
  } else {
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Log in" })).toHaveAttribute("href", loginUrl);
    await expect(page.getByRole("banner").getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      pricingSectionHref,
    );
    await shot(page, "02-nav");
  }

  const pricingCtas = page.locator("[data-cta='pricing']");
  expect(await pricingCtas.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await pricingCtas.count()); index += 1) {
    await expect(pricingCtas.nth(index)).toHaveAttribute("href", pricingSectionHref);
  }

  await page.locator("[data-hero-cta] a").click();
  await expect(page).toHaveURL(/#pricing$/);
  await expect(page.locator("#pricing")).toBeInViewport();
  await shot(page, "03-pricing-section");

  const starterLinks = page.locator("[data-signup='starter']");
  const growthLinks = page.locator("[data-signup='growth']");
  expect(await starterLinks.count()).toBeGreaterThan(0);
  expect(await growthLinks.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await starterLinks.count()); index += 1) {
    await expect(starterLinks.nth(index)).toHaveAttribute("href", starterSignup);
  }
  for (let index = 0; index < (await growthLinks.count()); index += 1) {
    await expect(growthLinks.nth(index)).toHaveAttribute("href", growthSignup);
  }

  await page.goto("/pricing");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ReviewBuddy pricing");
  await expect(page.getByRole("link", { name: "Start free trial on Starter" })).toHaveAttribute("href", starterSignup);
  await expect(page.getByRole("link", { name: "Start free trial on Growth" })).toHaveAttribute("href", growthSignup);
  await expect(page.locator("[data-cta='pricing']").first()).toHaveAttribute("href", pricingSectionHref);
  await shot(page, "04-pricing-page");

  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("More reviews, more jobs");
  await expect(page.getByText("New articles are on the way")).toBeVisible();
  await shot(page, "05-blog");

  await page.goto("/help");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Help guides");
  await expect(page.getByText("Help guides are being prepared")).toBeVisible();
  await shot(page, "06-help");

  await page.goto("/free-review-breakdown");
  await page.getByLabel("Your name").fill("Sam Lee");
  await page.getByLabel("Business name").fill("Lee Plumbing");
  await page.getByLabel("Website or Google Business Profile link").fill("https://example.com");
  await page.getByLabel("Email").fill("sam@example.com");
  await page.getByRole("button", { name: "Send me my free breakdown" }).click();
  await expect(page.getByRole("status")).toContainText("Next step: email us");
  await expect(page.getByRole("status").getByRole("link", { name: /Email hello@/ })).toHaveAttribute(
    "href",
    /mailto:hello@reviewbuddy.com.au/,
  );
  await shot(page, "07-breakdown-next");

  expect(problems, problems.join("\n")).toEqual([]);
});

test("internal links resolve and external handoff URLs respond", async ({ page, request }) => {
  test.skip(test.info().project.name !== "desktop", "link crawl once");
  const problems = trackOwnErrors(page);
  const paths = new Set<string>();

  async function collect(path: string) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBeLessThan(400);
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
    );
    for (const href of hrefs) {
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        continue;
      }
      const url = new URL(href, "http://127.0.0.1:3000");
      if (url.hostname === "127.0.0.1") {
        paths.add(url.pathname);
      }
    }
  }

  await collect("/");
  const seeds = [
    "/",
    "/pricing",
    "/blog",
    "/help",
    "/free-review-breakdown",
    "/google-reviews-for-plumbers",
    "/privacy",
    "/terms",
    "/llms.txt",
  ];
  for (const path of seeds) paths.add(path);
  for (const path of [...paths]) {
    if (path === "/") continue;
    await collect(path);
  }

  const login = await request.get(loginUrl);
  expect(login.status(), loginUrl).toBeLessThan(400);

  expect(problems, problems.join("\n")).toEqual([]);
});
