import { expect, test } from "@playwright/test";

test("pricing cards sit side by side at 1440", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "desktop width only");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/pricing");

  const growth = await page.locator("#growth").boundingBox();
  const starter = await page.locator("#starter").boundingBox();
  expect(growth).toBeTruthy();
  expect(starter).toBeTruthy();
  expect(Math.abs(growth!.y - starter!.y)).toBeLessThan(40);
  expect(growth!.x).toBeLessThan(starter!.x);
  expect(growth!.width).toBeGreaterThan(starter!.width + 40);
  expect(growth!.width + starter!.width).toBeGreaterThan(800);
});

test("breakdown form posts and can show the trial step", async ({ page }) => {
  await page.route("**/api/breakdown", async (route) => {
    const body = route.request().postDataJSON() as { businessName?: string; email?: string };
    expect(body.businessName).toContain("Lee Plumbing");
    expect(body.email).toBe("sam@example.com");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/free-review-breakdown");
  await page.getByLabel("Business name and suburb").fill("Lee Plumbing, Richmond");
  await page.getByLabel("Email").fill("sam@example.com");
  await page.getByRole("button", { name: "Send me my free breakdown" }).click();
  await expect(page.getByRole("status")).toContainText("Got it");
  await expect(page.getByRole("link", { name: "Start your trial" })).toHaveAttribute("href", "/#pricing");
});
