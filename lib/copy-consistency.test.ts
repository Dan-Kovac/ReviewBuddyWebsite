import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";
import { NO_CARD_TRIAL_LINE } from "./trial-copy.ts";

const root = new URL("..", import.meta.url);

test("the home hero says no card only once", () => {
  const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const start = source.indexOf('<section className="site-hero">');
  const end = source.indexOf("</section>", start);
  assert.ok(start >= 0 && end > start);
  const hero = source
    .slice(start, end)
    .replaceAll("{TRIAL_LINE}", NO_CARD_TRIAL_LINE)
    .replaceAll("&apos;", "'");
  const hits = hero.match(/no card/gi) ?? [];
  assert.equal(hits.length, 1);
});

/**
 * "Review Buddy" is the registered business name. It may appear in the legal
 * pages and the footer. Everywhere else the product is ReviewBuddy.
 */
const allowedReviewBuddy = new Set([
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "components/site-footer.tsx",
]);

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
      continue;
    }
    if (/\.(tsx|ts|txt|mdx)$/.test(entry)) {
      out.push(full);
    }
  }
}

test("body copy writes the product as ReviewBuddy", () => {
  const files: string[] = [];
  for (const dir of ["app", "components", "content"]) {
    const path = new URL(`../${dir}`, import.meta.url);
    if (existsSync(path)) {
      walk(path.pathname, files);
    }
  }
  const llms = new URL("../public/llms.txt", import.meta.url);
  files.push(llms.pathname);

  const offenders: string[] = [];
  for (const file of files) {
    const rel = relative(root.pathname, file);
    if (allowedReviewBuddy.has(rel) || rel.endsWith(".test.ts")) {
      continue;
    }
    if (readFileSync(file, "utf8").includes("Review Buddy")) {
      offenders.push(rel);
    }
  }
  assert.deepEqual(offenders, []);
});
