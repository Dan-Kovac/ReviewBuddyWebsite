import { expect, test, type Page } from "@playwright/test";
import { waitForLazyImages } from "./lazy-images";

async function headlineLines(page: Page) {
  return page.locator("#s7 h2").evaluate((el) => {
    const rows: { top: number; text: string }[] = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const value = node.textContent ?? "";
      for (let index = 0; index < value.length; index += 1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + 1);
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const top = Math.round(rect.top);
        const current = rows.find((row) => Math.abs(row.top - top) < 4);
        if (current) current.text += value[index];
        else rows.push({ top, text: value[index] });
      }
      node = walker.nextNode();
    }
    return rows.sort((a, b) => a.top - b.top).map((row) => row.text.replace(/\s+/g, " ").trim());
  });
}

test("the home bottom half matches the build spec", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "once, across 360, 390, 768 and 1440");

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await waitForLazyImages(page);

  const bright = page.getByRole("link", { name: "BrightLocal Local Consumer Review Survey 2026 (US)" });
  const white = page.getByRole("link", { name: "Whitespark Local Search Ranking Factors 2026 (expert survey)" });
  await expect(bright).toBeVisible();
  await expect(white).toBeVisible();
  await expect(bright).toHaveAttribute("href", "https://www.brightlocal.com/research/local-consumer-review-survey/");
  await expect(white).toHaveAttribute("href", "https://whitespark.ca/local-search-ranking-factors/");
  await expect(page.locator("#s1 figcaption")).toHaveText(
    "Demo data for illustration. Real ReviewBuddy widget, reviews replaced.",
  );
  await expect(page.locator("#s1 img")).toHaveAttribute("src", /widget-builder-desktop\.png/);
  await expect(page.locator("#s1 img")).not.toHaveAttribute("src", /widget-on-website/);
  await expect(page.locator("#s1 .stat")).toHaveCount(2);
  expect(await page.content()).not.toContain("invitees");

  const buttons = page.locator("#s6 button.q");
  await expect(buttons).toHaveCount(8);
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(0)).toHaveText("Do I need a card to start?");
  for (let index = 1; index < 8; index += 1) {
    await expect(buttons.nth(index)).toHaveAttribute("aria-expanded", "false");
  }
  await expect(page.locator("#s6 .a")).toHaveCount(8);
  await expect(page.locator("#s6 .panel").nth(0)).not.toHaveAttribute("aria-hidden", "true");
  const closedPanel = page.locator("#s6 .panel").nth(1);
  await expect(closedPanel).toHaveAttribute("aria-hidden", "true");
  await expect(closedPanel).toContainText("Cancel any time from the billing page");
  const closedBox = await closedPanel.boundingBox();
  expect(closedBox?.height ?? 0).toBeLessThanOrEqual(1);
  await buttons.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press(" ");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "false");

  await expect(page.locator("#s4 img")).toHaveAttribute("alt", "");
  await expect(page.locator("#s4 h2")).toHaveText("Dan Kovac");
  await expect(page.locator("#s4 .founder-quote")).toHaveCount(0);
  await expect(page.locator("#s4")).not.toContainText("If you've got a question, reply to any email from me.");
  const portrait = await page.locator("#s4 .fd-art").boundingBox();
  const letterCol = await page.locator("#s4 .fd-copy").boundingBox();
  expect(portrait && letterCol).toBeTruthy();
  expect(Math.abs(portrait!.height - letterCol!.height)).toBeLessThanOrEqual(120);
  const portraitImg = await page.locator("#s4 .fd-art img").boundingBox();
  expect(portraitImg).toBeTruthy();
  expect(Math.abs(portrait!.x + portrait!.width / 2 - (portraitImg!.x + portraitImg!.width / 2))).toBeLessThanOrEqual(1);
  const portraitAlign = await page.locator("#s4 .fd-art img").evaluate((el) => getComputedStyle(el).justifySelf);
  expect(portraitAlign).toBe("center");
  const letterWrap = await page.locator("#s4 .letter p").evaluate((el) => getComputedStyle(el).textWrap);
  expect(letterWrap).toBe("pretty");
  await expect(page.getByRole("link", { name: "See the Growth plan" })).toHaveAttribute("href", "/pricing#growth");

  const numeral = await page.locator(".nlist .num").first().evaluate((el) => getComputedStyle(el).color);
  expect(numeral).toBe("rgb(10, 111, 176)");
  const closing = await page.locator("#s7 .close-cta").evaluate((el) => getComputedStyle(el).color);
  expect(closing).toBe("rgb(11, 15, 20)");
  const closingSize = await page.locator("#s7 .close-cta").evaluate((el) => getComputedStyle(el).fontSize);
  expect(closingSize).toBe("17px");
  expect(await headlineLines(page)).toEqual(["Build the trust", "before they call"]);

  const caption = await page.locator("#s1 figcaption").evaluate((el) => {
    const style = getComputedStyle(el);
    return { size: style.fontSize, lineHeight: style.lineHeight };
  });
  expect(caption).toEqual({ size: "13px", lineHeight: "18px" });

  for (const id of ["s1", "s2", "s3", "s4", "s6", "s7"]) {
    const wrap = await page.locator(`#${id} h2`).evaluate((el) => getComputedStyle(el).textWrap);
    expect(wrap, `#${id} h2`).toBe("balance");
  }

  const widgetSources = page.locator("#s1 picture source[media]");
  await expect(widgetSources).toHaveCount(2);
  for (const source of await widgetSources.all()) {
    await expect(source).toHaveAttribute("width", "1080");
    await expect(source).toHaveAttribute("height", "933");
  }
  const portraitSources = page.locator("#s4 picture source[media]");
  await expect(portraitSources).toHaveCount(2);
  for (const source of await portraitSources.all()) {
    await expect(source).toHaveAttribute("srcset", /founder-portrait-monogram-desktop/);
    await expect(source).toHaveAttribute("width", "960");
    await expect(source).toHaveAttribute("height", "1200");
  }

  const footerEmail = page.getByRole("contentinfo").getByRole("link", { name: "hello@reviewbuddy.com.au" });
  const underline = await footerEmail.evaluate((el) => getComputedStyle(el).textDecorationLine);
  expect(underline).toBe("underline");

  const doCard = await page.locator(".card-do").boundingBox();
  const youCard = await page.locator(".card-you").boundingBox();
  expect(doCard && youCard).toBeTruthy();
  expect(Math.abs(doCard!.height - youCard!.height)).toBeLessThanOrEqual(1);

  const emailDt = await page.locator("footer dt", { hasText: "Email" }).boundingBox();
  const emailDd = await page.locator("footer dd").first().boundingBox();
  expect(emailDt && emailDd).toBeTruthy();
  expect(emailDt!.y + emailDt!.height).toBeLessThanOrEqual(emailDd!.y + 1);
  expect(Math.abs(emailDt!.x - emailDd!.x)).toBeLessThan(8);

  const desktopHelp = page.locator(".faq-l .help");
  const mobileHelp = page.locator(".faq-r .help");
  await expect(desktopHelp).toBeVisible();
  await expect(desktopHelp).toHaveAttribute("href", "/help");
  await expect(mobileHelp).toBeHidden();

  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const faq = ld.map((text) => JSON.parse(text) as { "@type"?: string; mainEntity?: { name: string }[] }).find(
    (item) => item["@type"] === "FAQPage",
  );
  expect(faq?.mainEntity?.map((item) => item.name)).toEqual([
    "Do I need a card to start?",
    "What if I want to stop using ReviewBuddy?",
    "How much of my time does it take?",
    "Do I need to touch my website?",
    "Is this allowed by Google?",
    "What if a customer wasn't happy?",
    "Will my customers actually leave a review?",
    "Which plan should I pick?",
  ]);

  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: width >= 768 ? 900 : 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    await waitForLazyImages(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `no horizontal scroll at ${width}`).toBeLessThanOrEqual(1);
    const current = await page.locator("#s1 img").evaluate((img: HTMLImageElement) => img.currentSrc);
    if (width < 768) {
      expect(current, `mobile art at ${width}`).toContain("widget-builder-mobile");
    } else {
      expect(current, `desktop art at ${width}`).toContain("widget-builder-desktop");
    }
    expect(await headlineLines(page), `#s7 break at ${width}`).toEqual(["Build the trust", "before they call"]);
    const portraitSrc = await page.locator("#s4 img").evaluate((img: HTMLImageElement) => img.currentSrc);
    expect(portraitSrc, `founder art at ${width}`).toContain("founder-portrait-monogram-desktop");
    expect(portraitSrc, `founder art at ${width}`).not.toContain("founder-portrait-monogram-mobile");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".faq-l .help")).toBeHidden();
  const help = page.locator(".faq-r .help");
  await expect(help).toBeVisible();
  await expect(help).toHaveAttribute("href", "/help");
  const helpBox = await help.boundingBox();
  const lastQuestion = await page.locator("#s6 button.q").nth(7).boundingBox();
  expect(helpBox && lastQuestion).toBeTruthy();
  expect(helpBox!.y).toBeGreaterThan(lastQuestion!.y + lastQuestion!.height - 1);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  const duration = await page.locator("#s6 .panel").first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(duration).toBe("0s");
});

test("help and pricing show the moved questions", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "once");
  await page.goto("/help", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Your account" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reviews and your business" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Asking for reviews" })).toBeVisible();
  await expect(page.getByText("I've got more than one location.")).toBeVisible();
  await expect(page.getByText("Do you write reviews for me?")).toBeVisible();
  await expect(page.getByText("Answers on setup")).toHaveCount(0);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const faq = ld.map((text) => JSON.parse(text) as { "@type"?: string; mainEntity?: unknown[] }).find(
    (item) => item["@type"] === "FAQPage",
  );
  expect(faq?.mainEntity).toHaveLength(6);

  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("I've got more than one location.")).toBeVisible();
  await expect(page.locator("body")).toContainText(
    "Email us at hello@reviewbuddy.com.au and we'll work out what suits.",
  );
  const locations = page.locator("section", { has: page.getByRole("heading", { name: "More than one location" }) });
  await expect(locations).toContainText("and we'll work out what suits.");
  await expect(locations).not.toContainText("I'll work out");
  await expect(page.getByText("We set it up for you and send you your review email to approve.")).toBeVisible();
});

test("the sticky trial bar hides while the closing band is in view", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "phone widths only");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await waitForLazyImages(page);

  for (const width of [390, 360]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => {
      const hero = document.querySelector("[data-hero-cta]");
      if (!hero) throw new Error("missing hero button");
      const rect = hero.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.scrollY + rect.height + 120, left: 0, behavior: "instant" });
    });
    const bar = page.locator("[data-sticky-trial]");
    await expect(bar, `bar visible between hero and closing at ${width}`).toBeVisible();

    const button = page.locator("#s7 .close-cta");
    await page.evaluate(() => {
      const closingButton = document.querySelector("#s7 .close-cta");
      if (!closingButton) throw new Error("missing closing button");
      const rect = closingButton.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2,
        left: 0,
        behavior: "instant",
      });
    });
    await expect(bar, `bar hidden over #s7 at ${width}`).toBeHidden();
    await expect(button).toBeVisible();
    const covered = await button.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return hit !== el && !el.contains(hit);
    });
    expect(covered, `closing button covered at ${width}`).toBe(false);
    await button.click({ trial: true });
    expect(await headlineLines(page), `#s7 break at ${width}`).toEqual(["Build the trust", "before they call"]);
  }
});

test("an open phone menu closes when a nav link or Try it free is tapped", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "390 width only");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const menu = () => page.getByRole("navigation", { name: "Mobile" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu()).toBeVisible();
  await menu().getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(menu()).toHaveCount(0);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu()).toBeVisible();
  await menu().getByRole("link", { name: "Try it free for 7 days" }).click();
  await expect(page).toHaveURL(/\/#pricing$/);
  await expect(menu()).toHaveCount(0);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(menu()).toBeVisible();
  await page.getByRole("banner").getByRole("link", { name: "Try it free", exact: true }).click();
  await expect(page).toHaveURL(/\/#pricing$/);
  await expect(menu()).toHaveCount(0);
});
