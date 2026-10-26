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
