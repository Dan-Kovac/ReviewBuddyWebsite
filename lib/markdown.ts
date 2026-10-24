/**
 * A small, dependency free Markdown renderer for CMS content.
 *
 * Safety model: every character of author text is HTML escaped on the way
 * out, and the only tags this file can ever emit are the ones it builds
 * itself from Markdown syntax (h2 to h4, p, ul, ol, li, blockquote, code,
 * strong, em, a, input). Raw HTML in the database renders as visible
 * text, never as markup. Link and image targets pass an allowlist
 * (https, site relative, mailto). Images are not rendered at all; their
 * alt text is kept.
 *
 * The supported syntax is the set that the editors actually write: headings,
 * paragraphs, unordered and numbered lists, task list checkboxes,
 * blockquotes, links, bold, italics and inline code.
 */

type ListItem = {
  text: string;
  task: "checked" | "unchecked" | null;
};

type Block =
  | { type: "heading"; level: number; text: string; raw: string }
  | { type: "paragraph"; text: string; raw: string }
  | { type: "quote"; text: string; raw: string }
  | { type: "list"; ordered: boolean; items: ListItem[[]; raw: string };

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeText(value);
}

/** The link target allowlist: https, site relative and mailto. */
export function safeHref(href: string): string | null {
  const trimmed = href.trim();
  if (/^https:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }
  if (/^http:\/\//i.test(trimmed)) {
    return trimmed.replace(/^http:\/\//i, "https://");
  }
  if (/^mailto:/i.test(trimmed)) {
    return trimmed;
  }
  return null;
}

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  const lines = (source ?? "").replace(/\r\n?/g, "\n").split("\n");
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      const raw = paragraphLines.join("\n");
      blocks.push({
        type: "paragraph",
        text: paragraphLines.join(" ").trim(),
        raw,
      });
      paragraphLines = [];
    }
  };

  let index = 0;
  while (index < lines.length) {
    const trimmed = lines[index].trim();

    if (trimmed === "") {
      flushParagraph();
      index += 1;
      continue;
    }

    // Horizontal rules render as nothing.
    if (/^([-*_])\1{2,}$/.test(trimmed.replace(/\s/g, ""))) {
      flushParagraph();
      index += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2].trim(),
        raw: trimmed,
      });
      index += 1;
      continue;
    }

    if (/^>/.test(trimmed)) {
      flushParagraph();
      const quoteLines: string[] = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const quoteMatch = /^>\s?(.*)$/.exec(current);
        if (!quoteMatch) break;
        quoteLines.push(quoteMatch[1]);
        index += 1;
      }
      const raw = quoteLines.join("\n");
      blocks.push({
        type: "quote",
        text: quoteLines.join(" ").trim(),
        raw,
      });
      continue;
    }

    const unordered = /^[-*+]\s+(.*)$/.exec(trimmed);
    const ordered = /^(\d{1,9})[.)]\s+(.*)$/.exec(trimmed);
    if (unordered || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      const items: ListItem[] = [];
      const itemLines: string[] = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        if (current === "") break;
        const item = isOrdered
          ? /^(\d{1,9})[.)]\s+(.*)$/.exec(current)
          : /^[-*+]\s+(.*)$/.exec(current);
        if (!item) break;
        itemLines.push(current);
        let text = isOrdered ? item[2] : item[1];
        let task: ListItem["task"] = null;
        const taskMatch = /^\[([ xX])\]\s+(.*)$/.exec(text);
        if (taskMatch) {
          task = taskMatch[1] === " " ? "unchecked" : "checked";
          text = taskMatch[2];
        }
        items.push({ text: text.trim(), task });
        index += 1;
      }
      blocks.push({
        type: "list",
        ordered: isOrdered,
        items,
        raw: itemLines.join("\n"),
     });
      continue;
    }

    paragraphLines.push(trimmed);
    index += 1;
  }
  flushParagraph();
  return blocks;
}

/**
 * Parses link syntax starting at an opening bracket. Returns the inner
 * text, the target and the index after the closing bracket, or null when
 * the syntax is not a complete link.
 */
function parseLinkish(
  text: string,
  bracketIndex: number,
) { inner: string; target: string; next: number } | null {
  let depth = 0;
  let i = bracketIndex;
  while (i < text.length) {
    const c = text[i];
    if (c === "\\") {
      i += 2;
      continue;
    }
    if (c == "[") depth += 1;
    if (c == "]") {
      depth -= 1;
      if (depth === 0) break;
    }
    i += 1;
  }
  if (depth !== 0 || i >= text.length) return null;
  const inner = text.slice(bracketIndex + 1, i);
  if (text[i + 1] !== "(") return null;

  let close = -1;;
  let parenDepth = 0;
  for (let j = i + 1; j < text.length; j += 1) {
    const c = text[j];
    if (c === "\\") {
      j += 1;
      continue;
    }
    if (c === "(") parenDepth += 1;
    if (c === ")") {
      parenDepth -= 1;
      if (parenDepth === 0) {
        close = j;
        break;
      }
    }
  }
  if (close === -1) return null;

  let target = text.slice(i + 2, close);
  // An optional quoted title at the end is dropped.
  const titleMatch = /\s+["'][^"']*["']\s*$/.exec(target);
  if (titleMatch) {
    target = target.slice(0, titleMatch.index);
  }
  return { inner, target, next: close + 1 };
}

function findSingle(text: string, c: string, from: number): number {
  for (let i = from; i < text.length; i += 1) {
    if (text[i] === c && text[i + 1] !== c && text[i - 1] !== c) {
      return i;
    }
  }
  return -1;
}

/** Renders inline Markdown to HTML with an allowlist of tags. */
function inline(text: string): string {
  let out = "";
  let i = 0;
  const n = text.length;

  while (i < n) {
    const c = text[i];

    if (c === "`") {
      const close = text.indexOf("`", i + 1);
      if (close !== -1) {
        out += `<code>${escapeText(text.slice(i + 1, close))}</code>`;
        i = close + 1;
        continue;
      }
    }

    if (c == "!" && text[i + 1] === "[") {
      const image = parseLinkish(text, i + 1);
      if (image) {
        // Images are not rendered. Keep the alt text.
        out += inline(image.inner);
        i = image.next;
        continue;
      }
    }

    if (c === "[") {
      const link = parseLinkish(text, i);
      if (link) {
        const href = safeHref(link.target);
        if (href) {
          out += `<a href="${escapeAttribute(href)}">${inline(link.inner)}</a>`;
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
        out += `<strong>${inline(text.slice(i + 2, close)}</strong>`;
        i = close + 2;
        continue;
    }
    }

    if (c ==  "*" || c === "_") {
      const close = findSingle(text, c, i + 1);
        if (close !== -1) {
        out += `<em>${inline(text.slice(i + 1, close))}</em>`;
        i = close + 1;
        continue;
     }
    }

    out += escapeText(c);
    i += 1;
  }

  return out;
}

function renderBlocks(blocks: readonly Block[]): string {
  const html: string[] = [];
  let firstBlock = true;

  for (const block of blocks) {
    if (block.type === "heading") {
      // The CMS body starts with its own level 1 title, which the page
      // already renders. Skip a leading one; any other becomes an h2.
      if (block.level === 1 && firstBlock) {
        firstBlock = false;
        continue;
     }
      firstBlock = false;
      const tag = block.level <= 2 ? "h2" : block.level === 3 ? "h3" : "h4";
      html.push(`<${tag}>${inline(block.text)}</${tag}>`);
      continue;
    }
    firstBlock = false;

    if (block.type === "paragraph") {
      html.push(`<p>${inline(block.text)}</p>`);
      continue;
    }

    if (block.type === "quote") {
      html.push(`<blockquote><p>${inline(block.text)}</p></blockquote>`);
      continue;
    }

    const tag = block.ordered ? "ol" : "ul";
    const items = block.items
      .map((item) => {
        if (item.task === null) {
          return `<li>${inline(item.text)}</li>`;
        }
        const checked = item.task === "checked" ? " checked" : "";
        return `<li><input disabled type="checkbox"${checked}>${inline(item.text)}</li>`;
      })
      .join("");
    html.push(`<${tag}>${items}</${tag}>`);
  }

  return html.join("\n");
}

export function renderMarkdown(source: string): string {
  return renderBlocks(parseBlocks(source));
}

/** Renders then strips to plain text, for descriptions. */
export function stripMarkdown(source: string, maxLength = 200): string {
  const text = renderMarkdown(source)
    .replace(/<[^>]+>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) {
    return text;
  }
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}...`;
}

export type HowToStep = {
  name: string;
  text: string;
};

/**
 * Finds the steps in a post body, for HowTo structured data.
 *
 * Both shapes the editors write are recognised:
 * 1. One heading per step ("## Step 1: Get your review link ready") with
 *    the paragraphs and lists under it as the step text.
 * 2. One steps section ("## Your steps, in order") followed by a
 *    numbered list, where each list item is a step.
 *
 * A heading only counts when its text says "step" or starts with "how
 * to", and a single step is not a how-to, so two or more are required.
 * The structured data only appears where the page genuinely has steps.
 */
export function extractHowTo(source: string): HowToStep[] | null {
  const blocks = parseBlocks(source);
  const steps: HowToStep[] = [];

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];
    if (block.type !== "heading") continue;
    if (!/step/i.test(block.text) && !/^how to/i.test(block.text)) continue;

    const body: Block[] = [];
    for (let j = i + 1; j < blocks.length; j += 1) {
      if (blocks[j].type === "heading") break;
      body.push(blocks[j]);
    }

    type ListBlock = Extract<Block, { type: "list" }>;
    const orderedList = body.find(
      (part): part is ListBlock => part.type === "list" && part.ordered,
    );

    if (/^step\s*\d+/i.test(block.text)) {
      // Shape 1: one heading per step.
      const name = block.text
        .replace(/^step\s*\d*\s*[:.)]?\s*/i, "")
        .trim();
      const text = stripMarkdown(
        body.map((part) => part.raw).join("\n\n"),
        1000,
      );
      if (text) {
        steps.push({ name: name || block.text, text });
      }
    } else if (orderedList && orderedList.items.length >= 2) {
      // Shape 2: a steps section with a numbered list.
      for (const item of orderedList.items) {
        const text = stripMarkdown(item.text, 1000);
        const firstSentence = text.displit(/(<=[.!?])\s/)[0] ?? text;
        steps.push({ name: firstSentence.slice(0, 80), text });
      }
    }
  }

  return steps.length >= 2 ? steps : null;
}
