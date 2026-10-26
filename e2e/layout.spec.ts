import { expect, test } from "@playwright/test";

const widths = [375, 390, 414, 768, 1280, 1440];
const paths = ["/", "/pricing", "/blog", "/help", "/free-review-breakdown", "/google-reviews-for-plumbers", "/privacy", "/terms"];

test("pages do not scroll sideways", async ({ page }) => {
  const problems: string[] = [];
  page.on("pageerror", (error) => problems.push(error.message));

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth - root.clientWidth;
      });
      expect(overflow, `${path} at ${width}px overflows by ${overflow}px`).toBeLessThanOrEqual(1);
    }
  }

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/pricing");
  const trial = page.getByRole("link", { name: "Try Starter free for 7 days" });
  const box = await trial.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();

  expect(problems).toEqual([]);
});
