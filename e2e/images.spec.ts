import { expect, test } from "@playwright/test";

const pages = ["/", "/pricing"];

test("home and pricing images load", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const images = page.locator("img");
    const count = await images.count();
    expect(count, path).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      const result = await image.evaluate(async (element: HTMLImageElement) => {
        if (!element.complete || element.naturalWidth === 0) {
          await new Promise<void>((resolve) => {
            const done = () => resolve();
            element.addEventListener("load", done, { once: true });
            element.addEventListener("error", done, { once: true });
            setTimeout(done, 4000);
          });
        }
        return {
          src: element.currentSrc || element.src,
          naturalWidth: element.naturalWidth,
        };
      });
      expect(result.naturalWidth, `${path} ${result.src}`).toBeGreaterThan(0);
      const response = await page.request.get(result.src);
      expect(response.status(), `${path} ${result.src}`).toBeLessThan(400);
    }
  }
});
