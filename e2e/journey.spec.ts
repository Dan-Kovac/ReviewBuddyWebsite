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
    // The breakdown form returns 503 when Supabase is not configured. That is the fallback.
    if (text.includes("status of 503")) return;
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

  const home = await page.goto("/");
  const headers = home?.headers() ?? {};
  expect(headers["strict-transport-security"] ?? "").toMatch(/max-age=\d+/);
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-frame-options"]).toBe("DENY");
  const policy = headers["permissions-policy"] ?? "";
  expect(policy).toContain("camera=()");
  expect(policy).toContain("microphone=()");
  expect(policy).toContain("geolocation=()");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Win their trust before they pick up the phone",
  );
  await expect(page.getByText("7-day free trial, no card needed. Add a card before day 8 to keep going.").first()).toBeVisible();
  await expect(page.getByText("and no contract.")).toBeVisible();
  await expect(page.getByText("no notice needed").first()).toBeVisible();
  await expect(page.getByText(/free setups left/)).toHaveCount(0);
  await expect(page.getByText("0411 701 078")).toHaveCount(0);
  await expect(page.locator("a[href^='tel:']")).toHaveCount(0);
  await expect(page.getByText(/Free until/)).toHaveCount(0);
  await expect(page.getByText("We'll email you before you're charged")).toHaveCount(0);
  await expect(page.getByText("Cancel with one email")).toHaveCount(0);
  await expect(page.getByText(/card taken up front/i)).toHaveCount(0);
  await expect(page.getByText(/card up front/i)).toHaveCount(0);
  await expect(page.getByText(/Stripe/)).toHaveCount(0);
  await expect(page.getByText("worth $500")).toHaveCount(0);
  await expect(page.getByText("Roadmap Digital")).toBeVisible();
  await expect(page.getByText("Made in Melbourne by Roadmap Labs.").first()).toBeVisible();
  await expect(page.getByText(/prevent negative reviews/i)).toHaveCount(0);
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
    await expect(menu.getByRole("link", { name: "Plumbers" })).toHaveCount(0);
    await expect(menu.getByRole("link", { name: "Free review breakdown" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Blog" })).toHaveCount(0);
    await expect(menu.getByRole("link", { name: "Help" })).toHaveCount(0);
    await expect(menu.getByRole("link", { name: "Log in" })).toHaveAttribute("href", loginUrl);
    await expect(menu.getByRole("link", { name: "Try it free for 7 days" })).toHaveAttribute("href", pricingSectionHref);
    await shot(page, "02-menu");
    await page.getByRole("button", { name: "Close menu" }).click();
  } else {
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Plumbers" })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Log in" })).toHaveAttribute("href", loginUrl);
    await expect(nav.getByRole("link", { name: "Blog" })).toHaveCount(0);
    await expect(page.getByRole("banner").getByRole("link", { name: "Try it free for 7 days" })).toHaveAttribute(
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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Two plans, both set up for you");
  await expect(page.getByRole("heading", { level: 2, name: /^Plans$/ })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 3, name: "Starter" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Try Starter free for 7 days" })).toHaveAttribute("href", starterSignup);
  await expect(page.getByRole("link", { name: "Try Growth free for 7 days" })).toHaveAttribute("href", growthSignup);
  await expect(
    page.getByText("7-day free trial, no card needed. Add a card before day 8 to keep going.").first(),
  ).toBeVisible();
  await expect(page.getByText("billing page in your account").first()).toBeVisible();
  await expect(page.getByText("Day 0")).toBeVisible();
  await expect(page.getByText("Day 8, no card")).toBeVisible();
  await expect(page.getByText(/day 5/i)).toHaveCount(0);
  await expect(page.getByText(/card taken up front/i)).toHaveCount(0);
  await expect(page.getByText(/Stripe/)).toHaveCount(0);
  await expect(page.getByText("Add a card in the app and you pick up where you left off.").first()).toBeVisible();
  await expect(page.getByText("Add a card any time")).toHaveCount(0);
  await expect(page.locator("#pricing")).toHaveCount(1);
  const pricingPageCtas = page.locator("[data-cta='pricing']");
  expect(await pricingPageCtas.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await pricingPageCtas.count()); index += 1) {
    await expect(pricingPageCtas.nth(index)).toHaveAttribute("href", "#pricing");
  }
  await shot(page, "04-pricing-page");

  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Guides to getting more reviews");
  await expect(page.getByText("Plain-English guides")).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Plain-English guides/);
  await expect(page.getByText("There aren't any guides up yet.")).toBeVisible();
  await shot(page, "05-blog");

  await page.goto("/help");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Help guides");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "How to cancel, and how to reach us.",
  );
  await expect(page.getByRole("link", { name: "How to cancel" })).toBeVisible();
  await shot(page, "06-help");

  await page.goto("/help/cancelling");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("How to cancel");
  await expect(page.getByText("the billing page in your account").first()).toBeVisible();
  await expect(page.getByText("not by replying to an email")).toBeVisible();
  await expect(page.getByText(/Stripe/)).toHaveCount(0);
  await expect(page.getByText(/card taken up front/i)).toHaveCount(0);
  await shot(page, "06b-cancel-help");

  await page.goto("/free-review-breakdown");
  const posted = page.waitForResponse((response) => response.url().includes("/api/breakdown") && response.request().method() === "POST");
  await page.getByLabel("Business name and suburb").fill("Lee Plumbing, Richmond");
  await page.getByLabel("Email").fill("sam@example.com");
  await page.getByRole("button", { name: "Send me my breakdown" }).click();
  const response = await posted;
  expect(response.status()).toBe(503);
  await expect(page.getByRole("status")).toContainText("hello@reviewbuddy.com.au");
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
  const starter = await request.get(starterSignup);
  expect(starter.status(), starterSignup).toBe(200);
  const growth = await request.get(growthSignup);
  expect(growth.status(), growthSignup).toBe(200);

  expect(problems, problems.join("\n")).toEqual([]);
});

test("review fixes: spots, legal links, in-page pricing, welcome and 404", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByText(/free setups left/)).toHaveCount(0);
  await expect(page.getByText("No GST charged")).toHaveCount(0);
  await expect(page.getByText("GST included")).toHaveCount(0);
  await expect(page.getByText("incl GST")).toHaveCount(0);
  await expect(page.getByText("[ABN to be added before launch]")).toHaveCount(0);
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByText("ABN")).toBeVisible();
  await expect(footer.getByText("44 108 955 374")).toBeVisible();
  await expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
  await expect(footer.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
  await expect(page.getByText("Those are Google's rules and Australian consumer law")).toBeVisible();

  await page.getByText("What if I want to stop using ReviewBuddy?").click();
  await expect(page.getByText("Other review sites can show in your widget if they connect.")).toBeVisible();
  await expect(page.getByText("Email me the sites you use and I'll check.")).toBeVisible();

  for (const path of ["/pricing", "/google-reviews-for-plumbers"]) {
    await page.goto(path);
    await expect(page.locator("#pricing")).toHaveCount(1);
    const links = page.locator("[data-cta='pricing']");
    expect(await links.count()).toBeGreaterThan(0);
    for (let index = 0; index < (await links.count()); index += 1) {
      await expect(links.nth(index)).toHaveAttribute("href", "#pricing");
    }
  }
  await page.goto("/pricing");
  await expect(page.locator("[data-location='pricing-locations']")).toHaveCount(0);
  await page.locator("[data-location='pricing-band']").click();
  await expect(page).toHaveURL(/\/pricing#pricing$/);
  await expect(page.locator("#pricing")).toBeInViewport();

  await page.goto("/terms");
  const termsText = await page.locator("article").innerText();
  expect(termsText).not.toContain("[");
  expect(termsText).not.toContain("Draft");
  await expect(
    page.getByText(
      "Starter gives you a review link where customers pick the site, a QR code, and a widget that shows your reviews on your website.",
    ),
  ).toBeVisible();
  await expect(page.getByText("KOVAC, DANIEL DEAN (ABN 44 108 955 374)")).toBeVisible();
  await expect(
    page.getByText(
      "We are not currently registered for GST, so no GST is charged. If we register, we will tell you at least 30 days before any GST is added, and you can cancel before then.",
    ),
  ).toBeVisible();
  await expect(page.getByText("incl GST")).toHaveCount(0);
  await expect(page.getByText("ongoing coaching")).toHaveCount(0);
  await expect(page.getByText(/first week/)).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Third-party services" })).toBeVisible();
  await expect(page.getByText("Last updated: 25 October 2026.").last()).toBeVisible();

  await page.goto("/privacy");
  const privacyText = await page.locator("article").innerText();
  expect(privacyText).not.toContain("[");
  expect(privacyText).not.toContain("Draft");
  expect(privacyText).not.toContain("text messages");
  await expect(page.getByText("KOVAC, DANIEL DEAN (ABN 44 108 955 374)")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cookies, analytics and advertising" })).toBeVisible();
  await expect(page.getByText("Last updated: 25 October 2026.").last()).toBeVisible();

  await page.goto("/free-review-breakdown");
  await expect(page.getByText(/plain-English/)).toBeVisible();

  await page.goto("/welcome");
  await expect(page.getByRole("link", { name: "Try it free for 7 days" })).toHaveCount(0);
  if (test.info().project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Try it free for 7 days" }),
    ).toHaveCount(0);
  }

  const missing = await page.goto("/this-page-does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page).toHaveTitle("Page not found | ReviewBuddy");

  await expect(footer.getByRole("link", { name: "Plumbers" })).toHaveAttribute(
    "href",
    "/google-reviews-for-plumbers",
  );

  if (test.info().project.name === "desktop") {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("/privacy");
    expect(xml).toContain("/terms");
    const llms = await request.get("/llms.txt");
    const text = await llms.text();
    expect(text).toContain("/privacy");
    expect(text).toContain("/terms");
  }
});

const unfinished =
  /placeholder|coming soon|\bTODO\b|photo of dan|real photo|image coming soon|real screenshot/i;

test("pages have no unfinished copy, header plumbers link, or Base44 icon", async ({ page }) => {
  const paths = ["/", "/pricing", "/google-reviews-for-plumbers", "/free-review-breakdown", "/privacy", "/terms"];
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBeLessThan(400);
    const text = await page.locator("body").innerText();
    expect(text, path).not.toMatch(unfinished);
    const header = await page.getByRole("banner").innerHTML();
    expect(header, path).not.toMatch(/Plumbers|google-reviews-for-plumbers/);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Plumbers" })).toHaveAttribute(
      "href",
      "/google-reviews-for-plumbers",
    );
    await page.evaluate(async () => {
      const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += window.innerHeight) {
        window.scrollTo(0, y);
        await wait(40);
      }
      window.scrollTo(0, height);
      await Promise.all(
        [...document.images].map(
          (image) =>
            new Promise((resolve) => {
              if (image.complete) {
                resolve(null);
                return;
              }
              image.addEventListener("load", () => resolve(null), { once: true });
              image.addEventListener("error", () => resolve(null), { once: true });
            }),
        ),
      );
    });
    const broken = await page.locator("img").evaluateAll((images) =>
      images.flatMap((node) => {
        const image = node as HTMLImageElement;
        if (image.complete && image.naturalWidth > 0) return [];
        return [image.currentSrc || image.getAttribute("src") || image.getAttribute("alt") || "image"];
      }),
    );
    expect(broken, path).toEqual([]);
  }

  await page.goto("/");
  const icons = await page.locator("link[rel='icon'], link[rel='apple-touch-icon'], link[rel='manifest']").evaluateAll(
    (links) => links.map((link) => link.getAttribute("href") ?? ""),
  );
  expect(icons.length).toBeGreaterThan(0);
  for (const href of icons) {
    expect(href.toLowerCase()).not.toContain("base44");
    const asset = await page.request.get(href);
    expect(asset.status(), href).toBe(200);
    expect(asset.headers()["content-type"] ?? "", href).toMatch(/icon|image|manifest|json/);
  }
});
