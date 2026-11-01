import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Fails the build when marker text is left in source or in rendered HTML.
 * Code syntax is allowed: Tailwind colour utilities, types, and CSS ::placeholder.
 * A square bracket in visible built text is not allowed.
 */

const root = new URL("..", import.meta.url).pathname;
const built = process.argv.includes("--built");

const markers = [
  { name: "TODO", re: /\bTODO\b/ },
  { name: "TBD", re: /\bTBD\b/ },
  { name: "FIXME", re: /\bFIXME\b/ },
  { name: "Lorem", re: /\blorem(?:\s+ipsum)?\b/i },
  { name: "placeholder", re: /\bplaceholders?\b/i },
  { name: "image here", re: /image here/i },
  { name: "XXX", re: /\bXXX+\b/ },
  { name: "DAN:", re: /\bDAN\s*:/ },
  { name: "coming soon", re: /coming soon/i },
  { name: "real screenshot", re: /real screenshot/i },
  { name: "real photo", re: /real photo/i },
  { name: "goes here", re: /goes here/i },
  { name: "photo of dan", re: /photo of dan/i },
];

const bracketPlaceholder = /\[[A-Z][^\]\n]{1,80}\]/;

function excuse(line) {
  return /::placeholder\b|\bplaceholder\s*[:=]|\bplaceholder-shown\b/i.test(line);
}

function walk(dir, hits, testFile) {
  for (const entry of readdirSync(dir)) {
    if (["node_modules", ".next", ".git", "e2e"].includes(entry)) continue;
    const full = join(dir, entry);
    const rel = relative(root, full);
    if (rel.endsWith(".test.ts") || rel.endsWith("check-markers.mjs")) continue;
    const info = statSync(full);
    if (info.isDirectory()) {
      walk(full, hits, testFile);
      continue;
    }
    if (!testFile(entry, info)) continue;
    const text = readFileSync(full, "utf8");
    text.split("\n").forEach((line, index) => {
      if (excuse(line)) return;
      const cleaned = line.replace(/className=(?:"[^"]*"|\{`[^`]*`\}|\{'[^']*'\})/g, "");
      for (const marker of markers) {
        if (marker.re.test(cleaned)) hits.push(`${rel}:${index + 1} ${marker.name}`);
      }
      const withoutLinks = cleaned.replace(/\[[^\]]+\]\([^)]*\)/g, "");
      if (bracketPlaceholder.test(withoutLinks) && !/className|import |from ["']/.test(line)) {
        hits.push(`${rel}:${index + 1} bracket marker`);
      }
    });
  }
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&[a-z]+;/gi, " ");
}

const hits = [];

if (!built) {
  for (const dir of ["app", "components", "content", "lib", "public", "scripts"]) {
    walk(join(root, dir), hits, (entry, info) => {
      if (info.size > 1_500_000) return false;
      return /\.(tsx?|jsx?|mjs|css|md|mdx|txt|html|svg)$/.test(entry);
    });
  }
} else {
  const nextDir = join(root, ".next");
  let htmlCount = 0;
  walk(nextDir, hits, (entry) => {
    if (!entry.endsWith(".html")) return false;
    htmlCount += 1;
    return true;
  });
  if (htmlCount === 0) {
    console.error("check-markers: no built HTML under .next");
    process.exit(1);
  }
  // Re-scan HTML for a raw square bracket in visible text. The walk above
  // already applied the word markers. This pass is the bracket rule.
  const bracketHits = [];
  function walkHtml(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walkHtml(full);
        continue;
      }
      if (!entry.endsWith(".html")) continue;
      const text = visibleText(readFileSync(full, "utf8"));
      if (text.includes("[")) bracketHits.push(relative(root, full));
      for (const marker of markers) {
        if (marker.re.test(text)) bracketHits.push(`${relative(root, full)} ${marker.name}`);
      }
    }
  }
  walkHtml(nextDir);
  hits.push(...bracketHits);
}

if (hits.length > 0) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(built ? "built output has no marker text" : "source has no marker text");
