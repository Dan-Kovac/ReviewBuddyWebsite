import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";
import robots from "../app/robots.ts";
import { organizationJsonLd } from "./json-ld.ts";
import { pageMetadata } from "./metadata.ts";
import { siteUrl } from "./site.ts";

const origin = "https://www.reviewbuddy.com.au";
const apex = "https://" + "reviewbuddy.com.au";

function absoluteUrls(value: unknown) {
  return JSON.stringify(value).match(/https?:\/\/[^"\\]+/g) ?? [];
}

function assertPublicOrigin(urls: readonly string[]) {
  assert.ok(urls.length > 0);
  for (const url of urls) {
    const host = new URL(url).host;
    if (host === "schema.org") continue;
    assert.equal(host, "www.reviewbuddy.com.au", url);
    assert.equal(url.includes("vercel.app"), false, url);
  }
  assert.equal(urls.join("\n").includes(apex), false);
}

test("the site origin is the www host production serves", () => {
  assert.equal(siteUrl, origin);
  assert.equal(new URL(siteUrl).host, "www.reviewbuddy.com.au");
});

test("page metadata and JSON-LD absolute URLs use the www origin", () => {
  const home = pageMetadata({ title: "Home", description: "Home", path: "/" });
  const pricing = pageMetadata({ title: "Pricing", description: "Pricing", path: "/pricing" });
  assert.equal(home.alternates?.canonical, "/");
  assert.equal(pricing.alternates?.canonical, "/pricing");
  assert.equal(home.openGraph && "url" in home.openGraph ? home.openGraph.url : null, origin);
  assert.equal(
    pricing.openGraph && "url" in pricing.openGraph ? pricing.openGraph.url : null,
    `${origin}/pricing`,
  );

  assertPublicOrigin([
    ...absoluteUrls(home),
    ...absoluteUrls(pricing),
    ...absoluteUrls(organizationJsonLd()),
  ]);
  const images = absoluteUrls(home);
  assert.ok(images.some((url) => url.startsWith(`${origin}/opengraph-image`)));
  assert.ok(images.some((url) => url.startsWith(`${origin}/twitter-image`)));
  assert.ok(absoluteUrls(organizationJsonLd()).includes(`${origin}/logo.svg`));
});

test("robots names the www host and the sitemap is built from that origin", () => {
  const robotsFile = robots();
  assert.equal(robotsFile.sitemap, `${origin}/sitemap.xml`);
  assert.equal(robotsFile.host, origin);

  const notFound = readFileSync(new URL("../app/not-found.tsx", import.meta.url), "utf8");
  assert.match(notFound, /pageMetadata\(/);
  const source = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(source, /url: `\$\{siteUrl\}\$\{path\}`/);
  assert.match(source, /url: `\$\{siteUrl\}\/blog\/\$\{post\.slug\}`/);
  assert.match(source, /url: `\$\{siteUrl\}\/help\/\$\{doc\.slug\}`/);
  assert.equal(source.includes(apex), false);
  assert.equal(source.includes("vercel.app"), false);
});

test("emitted site files do not hardcode the apex origin or a vercel.app host", () => {
  const root = new URL("..", import.meta.url).pathname;
  const hits: string[] = [];
  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const info = statSync(full);
      if (info.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(tsx?|jsx?|mjs|txt|mdx|xml|html)$/.test(entry)) continue;
      if (entry.endsWith(".test.ts")) continue;
      const text = readFileSync(full, "utf8");
      if (text.includes(apex) || text.includes("vercel.app")) hits.push(relative(root, full));
    }
  }
  for (const dir of ["app", "components", "lib", "public", "content"]) {
    walk(join(root, dir));
  }
  assert.deepEqual(hits, []);
});
