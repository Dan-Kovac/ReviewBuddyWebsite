import { expect, test } from "@playwright/test";

const origin = "https://www.reviewbuddy.com.au";
const apex = "https://" + "reviewbuddy.com.au";

function absoluteUrls(text: string) {
  return text.match(/https?:\/\/[^"'\\\s<>]+/g) ?? [];
}

test("canonical, open graph, sitemap and robots use the www origin", async ({ page }) => {
  const home = await page.goto("/");
  expect(home?.status()).toBe(200);

  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", origin);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", origin);

  const shareImages = await page
    .locator('meta[property="og:image"], meta[name="twitter:image"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
  expect(shareImages.length).toBeGreaterThan(0);
  for (const image of shareImages) {
    expect(new URL(image).origin, image).toBe(origin);
    expect(image, image).not.toContain("vercel.app");
  }

  const html = await page.content();
  expect(html).toContain(`${origin}/#organization`);
  expect(html).toContain(`${origin}/logo.svg`);
  expect(html).not.toContain(apex);
  expect(html).not.toContain("vercel.app");

  const pricing = await page.goto("/pricing");
  expect(pricing?.status()).toBe(200);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/pricing`);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${origin}/pricing`);
  const pricingHtml = await page.content();
  expect(pricingHtml).not.toContain(apex);
  expect(pricingHtml).not.toContain("vercel.app");

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(locs).toContain(origin);
  expect(locs).toContain(`${origin}/pricing`);
  for (const loc of locs) expect(new URL(loc).origin).toBe(origin);
  expect(xml).not.toContain(apex);
  expect(xml).not.toContain("vercel.app");

  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toContain(`Host: ${origin}`);
  expect(robotsText).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(robotsText).not.toContain(apex);
  expect(robotsText).not.toContain("vercel.app");

  const missing = await page.goto("/this-page-does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", origin);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", origin);
  const missingImages = await page
    .locator('meta[property="og:image"], meta[name="twitter:image"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content") ?? ""));
  expect(missingImages.length).toBeGreaterThan(0);
  for (const image of missingImages) expect(new URL(image).origin).toBe(origin);
  expect(await page.content()).not.toContain("vercel.app");

  const llms = await page.request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  const llmsText = await llms.text();
  const llmsUrls = absoluteUrls(llmsText).filter((url) => url.includes("reviewbuddy.com.au"));
  expect(llmsUrls.length).toBeGreaterThan(0);
  for (const url of llmsUrls) expect(new URL(url).origin).toBe(origin);
  expect(llmsText).not.toContain(apex);
});
