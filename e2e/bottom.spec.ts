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

  await expect(page.getByRole("heading", { name: "Win more jobs on trust" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "It's a tough year to compete on price" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Inside ReviewBuddy" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "You've probably got dozens of reviews you never asked for" })).toHaveCount(0);
  await expect(page.locator("#s1")).toHaveCount(0);
  await expect(page.locator(".bento")).toHaveCount(0);
  await expect(page.locator("#s-how img").nth(1)).toHaveAttribute("src", /widget-on-website/);
  await expect(page.locator("#s-how img").nth(1)).not.toHaveAttribute("src", /widget-builder/);
  expect(await page.content()).not.toContain("invitees");
  expect(await page.content()).not.toContain("worth at least $500");

  const buttons = page.locator("#s6 button.q");
  await expect(buttons).toHaveCount(5);
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(0)).toHaveText("Do I need a card to start?");
  for (let index = 1; index < 5; index += 1) {
    await expect(buttons.nth(index)).toHaveAttribute("aria-expanded", "false");
  }
  await expect(page.locator("#s6 .a")).toHaveCount(5);
  await expect(page.locator("#s6 .panel").nth(0)).not.toHaveAttribute("aria-hidden", "true");
  const closedPanel = page.locator("#s6 .panel").nth(1);
  await expect(closedPanel).toHaveAttribute("aria-hidden", "true");
  await expect(closedPanel).toContainText("We do the rest, including adding the widget");
  const closedBox = await closedPanel.boundingBox();
  expect(closedBox?.height ?? 0).toBeLessThanOrEqual(1);
  await buttons.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press(" ");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "false");

  const founder = page.locator("#s4 img");
  await expect(founder).toHaveAttribute("alt", "Dan Kovac, founder of ReviewBuddy");
  const founderFrame = await founder.evaluate((img: HTMLImageElement) => {
    const box = img.getBoundingClientRect();
    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: box.width,
      height: box.height,
      objectFit: getComputedStyle(img).objectFit,
    };
  });
  expect(founderFrame.naturalWidth).toBeGreaterThan(0);
  expect(founderFrame.naturalHeight).toBeGreaterThan(0);
  expect(founderFrame.naturalWidth / founderFrame.naturalHeight).toBeCloseTo(4 / 5, 2);
  expect(founderFrame.width / founderFrame.height).toBeCloseTo(4 / 5, 2);
  expect(founderFrame.objectFit).toBe("cover");
  await expect(page.locator("#s4 h2")).toHaveText("Dan Kovac");
  await expect(page.locator("#s4 .founder-quote")).toHaveCount(0);
  await expect(page.locator("#s4")).not.toContainText("If you've got a question, reply to any email from me.");
  const portrait = await page.locator("#s4 .fd-art").boundingBox();
  const letterCol = await page.evaluate(() => {
    const id = document.querySelector("#s4 .fd-id")?.getBoundingClientRect();
    const rest = document.querySelector("#s4 .fd-rest")?.getBoundingClientRect();
    if (!id || !rest) return null;
    return { height: rest.bottom - id.top };
  });
  expect(portrait && letterCol).toBeTruthy();
  expect(portrait!.height).toBeLessThanOrEqual(321);
  expect(Math.abs(portrait!.height - letterCol!.height)).toBeLessThanOrEqual(160);
  const portraitImg = await page.locator("#s4 .fd-art img").boundingBox();
  expect(portraitImg).toBeTruthy();
  expect(Math.abs(portrait!.x + portrait!.width / 2 - (portraitImg!.x + portraitImg!.width / 2))).toBeLessThanOrEqual(1);
  const portraitAlign = await page.locator("#s4 .fd-art img").evaluate((el) => getComputedStyle(el).justifySelf);
  expect(portraitAlign).toBe("center");
  const letterWrap = await page.locator("#s4 .letter p").first().evaluate((el) => getComputedStyle(el).textWrap);
  expect(letterWrap).toBe("pretty");
  await expect(page.getByRole("link", { name: "Compare the plans" })).toHaveAttribute("href", "/pricing");

  const numeral = await page.locator(".nlist .num").first().evaluate((el) => getComputedStyle(el).color);
  expect(numeral).toBe("rgb(10, 111, 176)");
  const closing = await page.locator("#s7 .close-cta").evaluate((el) => getComputedStyle(el).color);
  expect(closing).toBe("rgb(11, 15, 20)");
  const closingSize = await page.locator("#s7 .close-cta").evaluate((el) => getComputedStyle(el).fontSize);
  expect(closingSize).toBe("16px");
  expect(await headlineLines(page)).toEqual(["Build the trust", "before they call"]);

  const caption = await page.locator("#s-how figcaption").last().evaluate((el) => {
    const style = getComputedStyle(el);
    return { size: style.fontSize, lineHeight: style.lineHeight };
  });
  expect(caption).toEqual({ size: "14px", lineHeight: "20px" });

  for (const id of ["s-problem", "s-how", "s2", "s4", "s6", "s7"]) {
    const wrap = await page.locator(`#${id} h2`).first().evaluate((el) => getComputedStyle(el).textWrap);
    expect(wrap, `#${id} h2`).toBe("balance");
  }
  await expect(page.locator("#s4 picture source")).toHaveCount(0);
  await expect(founder).toHaveAttribute("src", /dan-founder-4x5-480x600\.jpg/);
  await expect(founder).toHaveAttribute("width", "480");
  await expect(founder).toHaveAttribute("height", "600");

  const footerEmail = page.getByRole("contentinfo").getByRole("link", { name: "hello@reviewbuddy.com.au" });
  const underline = await footerEmail.evaluate((el) => getComputedStyle(el).textDecorationLine);
  expect(underline).toBe("underline");

  const doCard = await page.locator(".card-do").boundingBox();
  const youCard = await page.locator(".card-you").boundingBox();
  expect(doCard && youCard).toBeTruthy();
  expect(Math.abs(doCard!.height - youCard!.height)).toBeLessThanOrEqual(1);

  const emailStack = await page.evaluate(() => {
    const label = [...document.querySelectorAll("footer dt")].find((el) => el.textContent?.trim() === "Email");
    const value = label?.parentElement?.querySelector("dd");
    if (!label || !value) return null;
    const labelBox = label.getBoundingClientRect();
    const valueBox = value.getBoundingClientRect();
    return { labelBottom: labelBox.y + labelBox.height, valueTop: valueBox.y, dx: Math.abs(labelBox.x - valueBox.x) };
  });
  expect(emailStack).toBeTruthy();
  expect(emailStack!.labelBottom).toBeLessThanOrEqual(emailStack!.valueTop + 1);
  expect(emailStack!.dx).toBeLessThan(8);

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
    "How much of my time does it take?",
    "Is this allowed by Google?",
    "Will my customers actually leave a review?",
    "What if I want to stop using ReviewBuddy?",
  ]);

  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: width >= 768 ? 900 : 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    await waitForLazyImages(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `no horizontal scroll at ${width}`).toBeLessThanOrEqual(1);
    const current = await page.locator("#s-problem img").evaluate((img: HTMLImageElement) => img.currentSrc);
    if (width < 1024) {
      expect(current, `problem art at ${width}`).toContain("be-the-tradie-mobile");
    } else {
      expect(current, `problem art at ${width}`).toContain("be-the-tradie-desktop");
    }
    expect(await headlineLines(page), `#s7 break at ${width}`).toEqual(["Build the trust", "before they call"]);
    const portrait = await page.locator("#s4 img").evaluate((img: HTMLImageElement) => {
      const box = img.getBoundingClientRect();
      return { src: img.currentSrc, naturalWidth: img.naturalWidth, width: box.width, height: box.height };
    });
    expect(portrait.src, `founder art at ${width}`).toContain("dan-founder-4x5-480x600.jpg");
    expect(portrait.src, `founder art at ${width}`).not.toContain("founder-portrait-monogram");
    expect(portrait.naturalWidth, `founder loaded at ${width}`).toBeGreaterThan(0);
    expect(portrait.width / portrait.height, `founder frame at ${width}`).toBeCloseTo(4 / 5, 2);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });
  await expect(page.locator(".faq-l .help")).toBeHidden();
  const help = page.locator(".faq-r .help");
  await expect(help).toBeVisible();
  await expect(help).toHaveAttribute("href", "/help");
  const helpPlace = await page.evaluate(() => {
    const helpLink = document.querySelector(".faq-r .help");
    const questions = document.querySelectorAll("#s6 button.q");
    const lastQuestion = questions[questions.length - 1];
    if (!helpLink || !lastQuestion) return null;
    const helpBox = helpLink.getBoundingClientRect();
    const questionBox = lastQuestion.getBoundingClientRect();
    return { helpY: helpBox.y, questionBottom: questionBox.y + questionBox.height };
  });
  expect(helpPlace).toBeTruthy();
  expect(helpPlace!.helpY).toBeGreaterThan(helpPlace!.questionBottom - 1);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  const duration = await page.locator("#s6 .panel").first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(duration).toBe("0s");
});

test("the founder letter and sign-off end on more than one word", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "the 390 widow from QA N-1");

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const lines = page.locator("#s4 .letter p, #s4 .founder-signoff-line p");
  await expect(lines.first()).toBeVisible();
  for (const line of await lines.all()) {
    await expect(line).toHaveCSS("text-wrap", "pretty");
    const words = await line.evaluate((el) => {
      const found: { text: string; top: number }[] = [];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const value = node.textContent ?? "";
        for (const match of value.matchAll(/\S+/g)) {
          const range = document.createRange();
          range.setStart(node, match.index!);
          range.setEnd(node, match.index! + match[0].length);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0) found.push({ text: match[0], top: Math.round(rect.top) });
        }
        node = walker.nextNode();
      }
      return found;
    });
    if (words.length < 2) continue;
    const bottom = Math.max(...words.map((word) => word.top));
    const lastLine = words.filter((word) => Math.abs(word.top - bottom) < 4).map((word) => word.text);
    expect(lastLine.length, `one-word last line: ${lastLine.join(" ")}`).toBeGreaterThan(1);
  }
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
  expect(faq?.mainEntity).toHaveLength(7);

  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("I've got more than one location.")).toBeVisible();
  await expect(page.locator("body")).toContainText(
    "Email us at hello@reviewbuddy.com.au and we'll work out what suits.",
  );
  const locations = page.locator("section", { has: page.getByRole("heading", { name: "More than one location" }) });
  await expect(locations).toContainText("and we'll work out what suits.");
  await expect(locations).not.toContainText("I'll work out");
  await expect(
    page.getByText("We set it up for you in about 2 business days, then send you your review email to approve.", {
      exact: true,
    }),
  ).toBeVisible();
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
