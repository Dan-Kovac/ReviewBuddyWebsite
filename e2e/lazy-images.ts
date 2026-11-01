import type { Page } from "@playwright/test";

/**
 * Scroll the page in steps so lazy images enter the viewport, then wait until
 * every img is complete with naturalWidth > 0. Throws if any image fails.
 * The blank-frame check and the full-page capture both call this first.
 */
export async function waitForLazyImages(page: Page) {
  const failed = await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const img of document.images) {
      img.loading = "eager";
    }

    const step = Math.max(240, Math.floor(window.innerHeight * 0.5));
    const height = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < height(); y += step) {
      window.scrollTo(0, y);
      await sleep(180);
    }
    window.scrollTo(0, height());
    await sleep(200);

    const imgs = [...document.images].filter((img) => (img.currentSrc || img.getAttribute("src") || "").length > 0);
    const broken = () => imgs.filter((img) => !img.complete || img.naturalWidth === 0);
    const deadline = Date.now() + 20_000;
    while (broken().length > 0 && Date.now() < deadline) {
      await Promise.race([
        sleep(200),
        ...broken().map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener("load", () => resolve(null), { once: true });
              img.addEventListener("error", () => resolve(null), { once: true });
            }),
        ),
      ]);
    }

    await Promise.all(imgs.map((img) => (typeof img.decode === "function" ? img.decode().catch(() => undefined) : undefined)));

    const images = broken().map((img) => img.currentSrc || img.src || img.getAttribute("src") || "(no src)");

    const backgrounds = [""];
    backgrounds.length = 0;
    const urls = new Set([""]);
    urls.clear();
    for (const el of document.querySelectorAll("*")) {
      const bg = getComputedStyle(el).backgroundImage;
      if (!bg || bg === "none" || !bg.includes("url(")) continue;
      el.setAttribute("data-has-bg", "");
      for (const match of bg.matchAll(/url\((['"]?)(.*?)\1\)/g)) {
        const url = match[2];
        if (url && !url.startsWith("data:")) urls.add(new URL(url, location.href).href);
      }
    }
    await Promise.all(
      [...urls].map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (img.naturalWidth > 0) resolve(null);
              else {
                backgrounds.push(url);
                resolve(null);
              }
            };
            img.onerror = () => {
              backgrounds.push(url);
              resolve(null);
            };
            img.src = url;
          }),
      ),
    );

    window.scrollTo(0, 0);
    return { images, backgrounds };
  });

  const problems = [
    ...failed.images.map((src) => `img ${src}`),
    ...failed.backgrounds.map((src) => `background ${src}`),
  ];
  if (problems.length > 0) {
    throw new Error(`Images had not loaded on ${page.url()}:\n${problems.join("\n")}`);
  }
}
