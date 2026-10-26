import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url);

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

test("the header nav does not link to plumbers", () => {
  const header = read("../components/site-header.tsx");
  const mobile = read("../components/mobile-nav.tsx");
  const site = read("../lib/site.ts");
  assert.match(header, /headerLinks/);
  assert.match(mobile, /headerLinks/);
  assert.doesNotMatch(header, /Plumbers|google-reviews-for-plumbers/);
  assert.doesNotMatch(mobile, /Plumbers|google-reviews-for-plumbers/);
  assert.match(site, /export const headerLinks = \[[\s\S]*?\] as const;/);
  const headerBlock = site.match(/export const headerLinks = \[[\s\S]*?\] as const;/)?.[0] ?? "";
  assert.doesNotMatch(headerBlock, /Plumbers|google-reviews-for-plumbers/);
  assert.match(read("../components/site-footer.tsx"), /footerLinks/);
  assert.match(site, /href: "\/google-reviews-for-plumbers", label: "Plumbers"/);
});

test("icons are the ReviewBuddy star and no Base44 asset remains", () => {
  for (const path of [
    "../app/favicon.ico",
    "../app/icon.svg",
    "../app/apple-icon.png",
    "../app/manifest.ts",
    "../public/icons/icon-192.png",
    "../public/icons/icon-512.png",
  ]) {
    assert.equal(existsSync(new URL(path, import.meta.url)), true, path);
  }
  const icon = read("../app/icon.svg");
  assert.match(icon, /#38B6FF/i);
  assert.match(icon, /#0B0F14/i);
  assert.doesNotMatch(icon, /base44/i);
  const manifest = read("../app/manifest.ts");
  assert.match(manifest, /icon-192\.png/);
  assert.match(manifest, /icon-512\.png/);
  assert.doesNotMatch(manifest, /base44/i);

  const skip = new Set(["node_modules", ".next", ".git"]);
  const hits: string[] = [];
  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      if (skip.has(entry)) continue;
      const full = join(dir, entry);
      const rel = relative(root.pathname, full);
      if (rel.startsWith("e2e/") || rel.endsWith(".test.ts")) continue;
      if (/base44/i.test(entry)) hits.push(rel);
      const info = statSync(full);
      if (info.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(tsx?|jsx?|css|svg|html|json|txt|md|mdx|xml|webmanifest|ico)$/.test(entry)) continue;
      if (info.size > 1_500_000) continue;
      const text = readFileSync(full);
      if (text.includes(Buffer.from("base44")) || text.includes(Buffer.from("Base44")) || text.includes(Buffer.from("BASE44"))) {
        hits.push(rel);
      }
    }
  }
  walk(root.pathname);
  assert.deepEqual(hits, []);
});

const bannedLine =
  /placeholder|coming soon|\bTODO\b|photo of dan|real photo|image coming soon|real screenshot/i;

function stripComments(source: string) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

test("published pages do not contain placeholder copy", () => {
  const dirs = ["app", "components"];
  const hits: string[] = [];
  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(tsx|css)$/.test(entry)) continue;
      const source = stripComments(readFileSync(full, "utf8"));
      source.split("\n").forEach((line, index) => {
        if (bannedLine.test(line)) hits.push(`${relative(root.pathname, full)}:${index + 1}: ${line.trim()}`);
      });
    }
  }
  for (const dir of dirs) walk(join(root.pathname, dir));
  assert.deepEqual(hits, []);
});

test("stock testimonial images and names are not in the repo", () => {
  for (const path of ["../public/images/find-the-best.png", "../public/images/request-review.png"]) {
    assert.equal(existsSync(new URL(path, import.meta.url)), false, path);
  }
  const banned = [/Anastasya/, /Young Lex/, /find-the-best/, /request-review/];
  const skip = new Set(["node_modules", ".next", ".git"]);
  const hits: string[] = [];
  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      if (skip.has(entry)) continue;
      const full = join(dir, entry);
      const rel = relative(root.pathname, full);
      if (rel.startsWith("e2e/") || rel.endsWith(".test.ts") || rel.endsWith("check-markers.mjs")) continue;
      if (banned.some((pattern) => pattern.test(entry))) hits.push(rel);
      const info = statSync(full);
      if (info.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(tsx?|jsx?|css|svg|html|json|txt|md|mdx|xml)$/.test(entry)) continue;
      if (info.size > 1_500_000) continue;
      const text = readFileSync(full, "utf8");
      for (const pattern of banned) {
        if (pattern.test(text)) hits.push(`${rel} matches ${pattern}`);
      }
    }
  }
  walk(root.pathname);
  assert.deepEqual(hits, []);
});
