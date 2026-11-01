import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

test("colour contrast has no axe violations", async ({ page }) => {
  test.setTimeout(180_000);
  for (const path of pages) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    const details = results.violations
      .map((violation) =>
        violation.nodes.map((node) => `${path} ${node.target.join(" ")} ${node.failureSummary}`).join("\n"),
      )
      .join("\n");
    expect(results.violations, details || path).toEqual([]);
  }
});
