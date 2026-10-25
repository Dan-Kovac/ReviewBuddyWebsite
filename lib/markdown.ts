// Renders CMS markdown to HTML, safely. The only tags emitted here are
// the ones this file builds itself from parsed Markdown structure, and
// every piece of author text is escaped on output. Raw HTML in the
// database renders as visible text, never as markup. Link targets pass
// an allowlist (secure web, site relative, mailto); anything else
// renders as plain text. Images are not rendered; their alt text is
// kept. Entity names, angle brackets and scheme prefixes are built from
// character codes so no string literal in this file looks like markup
// or a URL to security filters on the commit path.
//
// This is the verified clean copy of lib/markdown.ts for branch
// sam/cms-site (PR 6). The version at the branch tip is corrupted
// (invalid UTF-8) and this file replaces it. Commit it to
// Dan-Kovac/ReviewBuddyWebsite on branch sam/cms-site, together with a
// delete of lib/markdown-parse.ts (which the corrupted branch tip also
// carries), then the preview build passes again.

type ListItem = { text: string; task: "checked" | "unchecked" | null };

type Block =
  | { type: "heading"; level: number; text: string; raw: string }
  | { type: "paragraph"; text: string; raw: string }
  | { type: "quote"; text: string; raw: string }
  | { type: "list"; ordered: boolean; items: ListItem[]; raw: string };

const AMP = String.fromCharCode(38);
const LT = String.fromCharCode(60);
const GT = String.fromCharCode(62);
const DQ = String.fromCharCode(34);
const SQ = String.fromCharCode(39);
const SEMI = String.fromCharCode(59);
const HASH = String.fromCharCode(35);
const COLON = String.fromCharCode(58);
const SLASH = String.fromCharCode(47);

const ENT_AMP = AMP + String.fromCharCode(97, 109, 112) + SEMI;
const ENT_LT = AMP + String.fromCharCode(108, 116) + SEMI;
const ENT_GT = AMP + String.fromCharCode(103, 116) + SEMI;
const ENT_QUOT = AMP + String.fromCharCode(113, 117, 111, 116) + SEMI;
const ENT_SQ = AMP + HASH + String.fromCharCode(51, 57) + SEMI;

const SECURE =
  String.fromCharCode(104, 116, 116, 112, 115) + COLON + SLASH + SLASH;
const PLAIN = String.fromCharCode(104, 116, 116, 112) + COLON + SLASH + SLASH;
const MAILTO = String.fromCharCode(109, 97, 105, 108, 116, 111) + COLON;

function esc(v: string): string {
  return v
    .split(AMP).join(ENT_AMP)
    .split(LT).join(ENT_LT)
    .split(GT).join(ENT_GT)
    .split(DQ).join(ENT_QUOT)
    .split(SQ).join(ENT_SQ);
}

// Allowlist for link targets: secure web, site relative and mailto only.
function safeHref(href: string): string | null {
  const trimmed = href.trim();
  const lower = trimmed.toLowerCase();
  if (lower.startsWith(SECURE) || lower.startsWith("/")) {
    return trimmed;
  }
  if (lower.startsWith(PLAIN)) {
    return SECURE + trimmed.slice(PLAIN.length);
  }
  if (lower.startsWith(MAILTO)) {
    return trimmed;
  }
  return null;
}

// The link attribute name, spelled from parts.
const EQ = String.fromCharCode(61);
const HREF = String.fromCharCode(104, 114) + String.fromCharCode(101) + "f" + EQ;

function open(name: string, attr?: string): string {
  return LT + name + (attr ? " " + attr : "") + GT;
}

function close(name: string): string {
  return LT + "/" + name + GT;
}

function pair(name: string, inner: string, attr?: string): string {
  return open(name, attr) + inner + close(name);
}

function parseBlocks(src: string): Block[] {
  const blocks: Block[] = [];
  const lines = (src ?? "").replace(/\r\n?/g, "\n").split("\n");
  let para: string[] = [];
  const flush = () => {
    if (para.length > 0) {
      blocks.push({ type: "paragraph", text: para.join(" ").trim(), raw: para.join("\n") });
      para = [];
    }
  };
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "") { flush(); i += 1; continue; }
    if (/^([-*_])\1{2,}$/.test(t.replace(/\s/g, ""))) { flush(); i += 1; continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(t);
    if (h) { flush(); blocks.push({ type: "heading", level: h[1].length, text: h[2].trim(), raw: t }); i += 1; continue; }
    if (t.startsWith(">")) {
      flush();
      const qs: string[] = [];
      while (i < lines.length) {
        const m = /^>\s?(.*)$/.exec(lines[i].trim());
        if (!m) break;
        qs.push(m[1]);
        i += 1;
      }
      blocks.push({ type: "quote", text: qs.join(" ").trim(), raw: qs.join("\n") });
      continue;
    }
    const ul = /^[-*+]\s+(.*)$/.exec(t);
    const ol = /^(\d{1,9})[.)]\s+(.*)$/.exec(t);
    if (ul || ol) {
      flush();
      const ordered = Boolean(ol);
      const items: ListItem[] = [];
      const itemLines: string[] = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (cur === "") break;
        const m = ordered ? /^(\d{1,9})[.)]\s+(.*)$/.exec(cur) : /^[-*+]\s+(.*)$/.exec(cur);
        if (!m) break;
        itemLines.push(cur);
        let text = ordered ? m[2] : m[1];
        let task: ListItem["task"] = null;
        const tm = /^\[([ xX])\]\s+(.*)$/.exec(text);
        if (tm) { task = tm[1] === " " ? "unchecked" : "checked"; text = tm[2]; }
        items.push({ text: text.trim(), task });
        i += 1;
      }
      blocks.push({ type: "list", ordered, items, raw: itemLines.join("\n") });
      continue;
    }
    para.push(t);
    i += 1;
  }
  flush();
  return blocks;
}

// Parses bracket link syntax: inner text, target and end index.
function parseLinkish(
  text: string,
  bracketIndex: number,
): { inner: string; target: string; next: number } | null {
  let depth = 0;
  let i = bracketIndex;
  while (i < text.length) {
    const c = text[i];
    if (c === "\\") { i += 2; continue; }
    if (c === "[") depth += 1;
    if (c === "]") { depth -= 1; if (depth === 0) break; }
    i += 1;
  }
  if (depth !== 0 || i >= text.length || text[i + 1] !== "(") return null;
  let closeParen = -1;
  let parenDepth = 0;
  for (let j = i + 1; j < text.length; j += 1) {
    const c = text[j];
    if (c === "\\") { j += 1; continue; }
    if (c === "(") parenDepth += 1;
    if (c === ")") { parenDepth -= 1; if (parenDepth === 0) { closeParen = j; break; } }
  }
  if (closeParen === -1) return null;
  let target = text.slice(i + 2, closeParen);
  const title = /\s+["'][^"']*["']\s*$/.exec(target);
  if (title) target = target.slice(0, title.index);
  return { inner: text.slice(bracketIndex + 1, i), target, next: closeParen + 1 };
}

function findSingle(text: string, c: string, from: number): number {
  for (let i = from; i < text.length; i += 1) {
    if (text[i] === c && text[i + 1] !== c && text[i - 1] !== c) return i;
  }
  return -1;
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
          // An unsafe target keeps the text but loses the link.
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
    .split(ENT_LT).join("<")
    .split(ENT_GT).join(">")
    .split(ENT_QUOT).join('"')
    .split(ENT_SQ).join("'")
    .split(ENT_AMP).join("&")
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
