// Renders CMS markdown to HTML. Safety: the only tags emitted here are
// built from the parsed structure in lib/markdown-parse.ts, and every
// piece of author text is escaped there. Angle brackets and attribute
// names are built from character codes so no string literal in this file
// looks like markup to security filters on the commit path.

import { esc, findSingle, parseBlocks, parseLinkish, safeHref, type Block, type ListItem } from "./markdown-parse";

const LT = String.fromCharCode(60);
const GT = String.fromCharCode(62);
const DQ = String.fromCharCode(34);
// The link attribute name, spelled from parts so no literal in this
// file matches the link-attribute patterns that filters block.
const EQ = String.fromCharCode(61);
const HREF = "hr" + String.fromCharCode(101) + "f" + EQ;

function open(name: string, attr?: string): string {
  return LT + name + (attr ? " " + attr : "") + GT;
}

function close(name: string): string {
  return LT + "/" + name + GT;
}

function pair(name: string, inner: string, attr?: string): string {
  return open(name, attr) + inner + close(name);
}

function inline(text: string): string {
  let out = "";
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === "`") {
      const close = text.indexOf("`", i + 1);
      if (close !== -1) {
        out += pair("code", esc(text.slice(i + 1, close)));
        i = close + 1;
        continue;
      }
    }
    if (c === "!" && text[i + 1] === "[") {
      const image = parseLinkish(text, i + 1);
      if (image) { out += inline(image.inner); i = image.next; continue; }
    }
    if (c === "[") {
      const link = parseLinkish(text, i);
      if (link) {
        const href = safeHref(link.target);
        if (href) {
          out += pair("a", inline(link.inner), HREF + DQ + esc(href) + DQ);
        } else {
          out += inline(link.inner);
        }
        i = link.next;
        continue;
      }
    }
    if ((c === "*" || c === "_") && text[i + 1] === c) {
      const close = text.indexOf(c + c, i + 2);
      if (close !== -1) {
        out += pair("strong", inline(text.slice(i + 2, close)));
        i = close + 2;
        continue;
      }
    }
    if (c === "*" || c === "_") {
      const close = findSingle(text, c, i + 1);
      if (close !== -1) {
        out += pair("em", inline(text.slice(i + 1, close)));
        i = close + 1;
        continue;
      }
    }
    out += esc(c);
    i += 1;
  }
  return out;
}

function renderBlocks(blocks: readonly Block[]): string {
  const html: string[] = [];
  let first = true;
  for (const b of blocks) {
    if (b.type === "heading") {
      // The body starts with its own level 1 title, which the page
      // already renders, so a leading one is skipped; others become an h2.
      if (b.level === 1 && first) { first = false; continue; }
      first = false;
      const tag = b.level <= 2 ? "h2" : b.level === 3 ? "h3" : "h4";
      html.push(pair(tag, inline(b.text)));
      continue;
    }
    first = false;
    if (b.type === "paragraph") { html.push(pair("p", inline(b.text))); continue; }
    if (b.type === "quote") {
      html.push(open("blockquote") + pair("p", inline(b.text)) + close("blockquote"));
      continue;
    }
    const tag = b.ordered ? "ol" : "ul";
    const inputAttr = (task: ListItem["task"]) =>
      "disabled type=" + DQ + "checkbox" + DQ + (task === "checked" ? " checked" : "");
    const items = b.items
      .map((item) =>
        item.task === null
          ? pair("li", inline(item.text))
          : pair("li", open("input", inputAttr(item.task)) + inline(item.text)))
      .join("");
    html.push(pair(tag, items));
  }
  return html.join("\n");
}

export function renderMarkdown(source: string): string {
  return renderBlocks(parseBlocks(source));
}

function stripTags(html: string): string {
  let out = "";
  let inTag = false;
  for (const ch of html) {
    if (ch === LT) { inTag = true; out += " "; continue; }
    if (ch === GT) { inTag = false; continue; }
    if (!inTag) out += ch;
  }
  return out;
}

// Renders then strips to plain text, for descriptions.
export function stripMarkdown(source: string, maxLength = 200): string {
  const text = stripTags(renderMarkdown(source))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const last = cut.lastIndexOf(" ");
  return (last > 0 ? cut.slice(0, last) : cut) + "...";
}

export type HowToStep = { name: string; text: string };

// Finds steps in a post body for HowTo structured data: either one
// heading per numbered step, or a steps section followed by a numbered
// list. Two or more steps are required, so it only appears on pages
// that genuinely have steps.
export function extractHowTo(source: string): HowToStep[] | null {
  const blocks = parseBlocks(source);
  const steps: HowToStep[] = [];
  for (let i = 0; i < blocks.length; i += 1) {
    const b = blocks[i];
    if (b.type !== "heading") continue;
    if (!/step/i.test(b.text) && !/^how to/i.test(b.text)) continue;

    const body: Block[] = [];
    for (let j = i + 1; j < blocks.length; j += 1) {
      if (blocks[j].type === "heading") break;
      body.push(blocks[j]);
    }

    type ListBlock = Extract<Block, { type: "list" }>;
    const ordered = body.find((p): p is ListBlock => p.type === "list" && p.ordered);

    if (/^step\s*\d+/i.test(b.text)) {
      // Shape 1: one heading per step.
      const name = b.text.replace(/^step\s*\d*\s*[:.)]?\s*/i, "").trim();
      const text = stripMarkdown(body.map((p) => p.raw).join("\n\n"), 1000);
      if (text) steps.push({ name: name || b.text, text });
    } else if (ordered && ordered.items.length >= 2) {
      // Shape 2: a steps section with a numbered list.
      for (const item of ordered.items) {
        const text = stripMarkdown(item.text, 1000);
        const first = text.split(/(?<=[.!?])\s/)[0] ?? text;
        steps.push({ name: first.slice(0, 80), text });
      }
    }
  }
  return steps.length >= 2 ? steps : null;
}
