/**
 * Full-page screenshots after every image has loaded.
 * Usage: start the site on :3000, then `node scripts/capture-pages.mjs`.
 * Fails if any img is incomplete or has naturalWidth 0.
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { waitForLazyImages } from "../e2e/lazy-images.ts";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const outDir = process.env.OUT_DIR ?? "/opt/cursor/artifacts/screenshots";

const pages = [
  ["home", "/"],
  ["pricing", "/pricing"],
  ["blog", "/blog"],
  ["help", "/help"],
  ["help-cancelling", "/help/cancelling"],
  ["free-review-breakdown", "/free-review-breakdown"],
  ["google-reviews-for-plumbers", "/google-reviews-for-plumbers"],
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["welcome", "/welcome"],
];

const viewports = [
  ["desktop", { width: 1440, height: 900 }, false],
  ["mobile", { width: 390, height: 844 }, true],
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

try {
  for (const [name, viewport, isMobile] of viewports) {
    const context = await browser.newContext({
      viewport,
      isMobile,
      hasTouch: isMobile,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const [slug, path] of pages) {
      const response = await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
      if (!response || response.status() >= 400) {
        throw new Error(`${path} returned ${response?.status() ?? "no response"}`);
      }
      await waitForLazyImages(page);
      await page.addStyleTag({
        content: "header { position: relative !important; top: auto !important; }",
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      const file = `${outDir}/gate-${slug}-${name}.png`;
      await page.screenshot({ path: file, fullPage: true, animations: "disabled" });
      console.log(file);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
