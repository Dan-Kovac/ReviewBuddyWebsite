import sharp from "sharp";
import { expect, test, type Locator } from "@playwright/test";
import { waitForLazyImages } from "./lazy-images";

const pages = [
  "/",
  "/pricing",
  "/blog",
  "/help",
  "/help/cancelling",
  "/free-review-breakdown",
  "/google-reviews-for-plumbers",
  "/privacy",
  "/terms",
  "/welcome",
];

/** A frame this large is a picture, not a 24px mark. Blank white boxes fail here. */
const frameMinWidth = 100;
const frameMinHeight = 48;

async function dominantShare(buffer: Buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const buckets = new Map<string, number>();
  let counted = 0;
  const step = Math.max(1, Math.floor(Math.sqrt((width * height) / 6000)));
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * channels;
      if (data[i + 3] < 128) continue;
      const key = `${data[i] >> 3},${data[i + 1] >> 3},${data[i + 2] >> 3}`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
      counted += 1;
    }
  }
  let max = 0;
  for (const count of buckets.values()) max = Math.max(max, count);
  return { share: counted === 0 ? 1 : max / counted, counted };
}

async function isMediaFrame(locator: Locator) {
  const box = await locator.boundingBox();
  if (!box || box.width < 2 || box.height < 2) return false;
  const marked = await locator.evaluate((el) => el.hasAttribute("data-media-frame"));
  return marked || (box.width >= frameMinWidth && box.height >= frameMinHeight);
}

test("images and background crops are loaded and not a blank colour", async ({ page }) => {
  test.setTimeout(180_000);
  for (const path of pages) {
    await page.goto(path, { waitUntil: "networkidle" });
    await waitForLazyImages(page);

    const images = page.locator("img");
    for (let index = 0; index < (await images.count()); index += 1) {
      const image = images.nth(index);
      if (!(await image.isVisible())) continue;
      const state = await image.evaluate((element: HTMLImageElement) => ({
        complete: element.complete,
        naturalWidth: element.naturalWidth,
        src: element.currentSrc || element.src,
      }));
      expect(state.complete, `${path} ${state.src} did not finish loading`).toBe(true);
      expect(state.naturalWidth, `${path} ${state.src} is blank`).toBeGreaterThan(0);
    }

    const frames = page.locator("img, [data-has-bg]");
    const seen = new Set<string>();
    for (let index = 0; index < (await frames.count()); index += 1) {
      const frame = frames.nth(index);
      if (!(await frame.isVisible())) continue;
      if (!(await isMediaFrame(frame))) continue;
      const label = await frame.evaluate((el) => {
        if (el instanceof HTMLImageElement) return el.currentSrc || el.src || el.alt;
        return el.getAttribute("aria-label") || el.className || "background";
      });
      const key = `${path}:${label}:${index}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const buffer = await frame.screenshot({ animations: "disabled" });
      const { share, counted } = await dominantShare(buffer);
      expect(
        share,
        `${path} media frame is ${Math.round(share * 100)}% one colour (${label}, ${counted} pixels)`,
      ).toBeLessThanOrEqual(0.95);
      expect(counted, `${path} media frame has no painted pixels (${label})`).toBeGreaterThan(20);
    }
  }
});

test("the hero shows the demo-data line at 390", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "390 width only");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(page.viewportSize()?.width).toBe(390);
  const hero = page.locator(".site-hero");
  const note = hero.getByText("Demo data for illustration. Not real customers or reviews.", { exact: true });
  await expect(note).toBeVisible();
  const noteBox = await note.boundingBox();
  const stageBox = await hero.locator(".stage").boundingBox();
  expect(noteBox).toBeTruthy();
  expect(stageBox).toBeTruthy();
  expect(noteBox!.y).toBeGreaterThanOrEqual(stageBox!.y);
});

test("the last footer link is clickable at 390", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "390 width only");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(page.viewportSize()?.width).toBe(390);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator("[data-sticky-trial]")).toBeHidden();
  const links = page.getByRole("contentinfo").getByRole("link");
  const count = await links.count();
  expect(count).toBeGreaterThan(0);
  let last = links.nth(0);
  let lowest = -1;
  for (let index = 0; index < count; index += 1) {
    const box = await links.nth(index).boundingBox();
    if (box && box.y >= lowest) {
      lowest = box.y;
      last = links.nth(index);
    }
  }
  await expect(last).toBeVisible();
  await last.click({ trial: true });
});

test("the tablet hero shares one centre line and the key image stays in frame", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "once, at a 768 viewport");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/", { waitUntil: "networkidle" });
  const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
  const lead = await page.locator(".site-hero .lead").boundingBox();
  const cta = await page.locator(".site-hero [data-hero-cta] a").boundingBox();
  const image = await page.locator(".site-hero .stage img").boundingBox();
  expect(h1 && lead && cta && image).toBeTruthy();
  const centre = (box: { x: number; width: number }) => box.x + box.width / 2;
  expect(Math.abs(centre(h1!) - centre(lead!))).toBeLessThanOrEqual(2);
  expect(Math.abs(centre(h1!) - centre(cta!))).toBeLessThanOrEqual(2);
  expect(image!.height).toBeLessThan(1024 * 1.2);
  const ratio = image!.width / image!.height;
  expect(ratio).toBeGreaterThan(1080 / 2040 - 0.02);
  expect(ratio).toBeLessThan(1080 / 2040 + 0.02);
});

test("the blog index is noindex and stays out of the sitemap", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "once");
  const response = await page.goto("/blog", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveAttribute("content", /noindex/);
  await expect(robots).toHaveAttribute("content", /follow/);
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).not.toMatch(/<loc>https:\/\/reviewbuddy\.com\.au\/blog<\/loc>/);
});

test("the home page has one SVG signature beside the founder sign-off", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "once, at 390, 768 and 1440");
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    const signs = page.locator(".founder-sign");
    await expect(signs).toHaveCount(1);
    const svg = signs.getByRole("img", { name: "Dan" });
    await expect(svg).toHaveCount(1);
    const svgBox = await svg.boundingBox();
    expect(Math.round(svgBox!.height), `signature height at ${width}`).toBe(width >= 1024 ? 40 : 32);
    const fonts = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const family = (name: string) => root.getPropertyValue(name).replace(/['"]/g, "").trim().toLowerCase();
      const loaded = [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.family.toLowerCase());
      return {
        geist: family("--font-geist"),
        mono: family("--font-geist-mono"),
        body: getComputedStyle(document.body).fontFamily.toLowerCase(),
        heading: getComputedStyle(document.querySelector("h1")!).fontFamily.toLowerCase(),
        loaded,
      };
    });
    const firstFamily = (stack: string) => stack.split(",")[0].trim();
    const geist = firstFamily(fonts.geist);
    const mono = firstFamily(fonts.mono);
    expect(geist, "Geist is the body face").toBe("geist");
    expect(firstFamily(fonts.body), "body uses Geist").toBe(geist);
    expect(firstFamily(fonts.heading), "headings use Geist").toBe(geist);
    expect(fonts.loaded.some((family) => firstFamily(family) === geist), "Geist has loaded").toBe(true);
    expect(fonts.loaded.some((family) => family.includes("caveat")), "no Caveat font").toBe(false);
    expect(fonts.loaded.some((family) => family.includes("fraunces")), "no Fraunces font").toBe(false);
    const numeral = await page.locator(".step-num").first().evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
    expect(mono, "Geist Mono is available").toBe("geistmono");
    expect(firstFamily(numeral), "step numerals use Geist Mono").toBe(mono);

    const sign = await signs.boundingBox();
    const line = await page.locator(".founder-signoff-line").boundingBox();
    const signoff = await page.locator(".founder-signoff").boundingBox();
    const letter = await page.locator(".founder-letter p").last().boundingBox();
    expect(sign && line && signoff && letter, `boxes at ${width}`).toBeTruthy();
    expect(letter!.y + letter!.height, `letter then sign-off at ${width}`).toBeLessThanOrEqual(signoff!.y + 1);
    expect(sign!.x + sign!.width, `signature left of the line at ${width}`).toBeLessThanOrEqual(line!.x + 1);
    const overlaps = sign!.y < line!.y + line!.height && line!.y < sign!.y + sign!.height;
    expect(overlaps, `signature lines up with the sign-off at ${width}`).toBe(true);
  }
});

test("the sticky header does not cover the page title at the top", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.scrollTo(0, 0));
    const header = await page.getByRole("banner").boundingBox();
    const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(header, path).toBeTruthy();
    expect(heading, path).toBeTruthy();
    expect(heading!.y, `${path} heading starts under the header`).toBeGreaterThanOrEqual(
      header!.y + header!.height - 1,
    );
  }
});
