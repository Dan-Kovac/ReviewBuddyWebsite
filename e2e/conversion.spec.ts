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
  expect(starter!.x).toBeLessThan(growth!.x);
  expect(Math.abs(starter!.width - growth!.width)).toBeLessThan(4);
  expect(Math.abs(starter!.height - growth!.height)).toBeLessThan(4);
  await expect(page.getByRole("link", { name: "Try Growth free for 7 days" })).toBeVisible();
  await expect(page.locator("#growth").getByText("Recommended")).toBeVisible();
});

test("starter stacks above growth on a phone", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "phone width only");
  await page.goto("/pricing");
  const growth = await page.locator("#growth").boundingBox();
  const starter = await page.locator("#starter").boundingBox();
  expect(starter!.y).toBeLessThan(growth!.y!);
});

test("spots route returns the real configured count", async ({ request }) => {
  test.skip(test.info().project.name !== "desktop", "once");
  const response = await request.get("/api/spots");
  expect(response.status()).toBe(200);
  const body = (await response.json()) as { claimed: number; total: number; remaining: number };
  expect(body).toEqual({ claimed: 0, total: 200, remaining: 200 });
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
  await page.getByRole("button", { name: "Send me my breakdown" }).click();
  await expect(page.getByRole("status")).toContainText("Got it");
  await expect(page.getByRole("status").getByRole("link", { name: "Try it free for 7 days" })).toHaveAttribute(
    "href",
    "/#pricing",
  );
});
