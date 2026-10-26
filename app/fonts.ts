import localFont from "next/font/local";

/** Display face. Preloaded. OFL. Variable axes: SOFT, WONK, opsz, wght. */
export const fraunces = localFont({
  src: [{ path: "../fonts/Fraunces-VF.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  adjustFontFallback: "Times New Roman",
  fallback: ["Times New Roman", "Georgia", "serif"],
});

/**
 * Italic display face from the same family. The pages don't set italic,
 * so this stays available and is not preloaded.
 */
export const frauncesItalic = localFont({
  src: [{ path: "../fonts/Fraunces-Italic-VF.woff2", style: "italic", weight: "100 900" }],
  variable: "--font-fraunces-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Body and UI. Preloaded. OFL. Optical size is pinned; weight stays 400-700. */
export const inter = localFont({
  src: "../fonts/Inter-VF.woff2",
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: "400 700",
  adjustFontFallback: "Arial",
  fallback: ["Arial", "system-ui", "sans-serif"],
});

/**
 * Handwriting for the signature. Not preloaded. OFL.
 * Subset to the letters in "Dan" at weight 600 so it stays off the critical path.
 */
export const caveat = localFont({
  src: "../fonts/Caveat-VF.woff2",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
  weight: "600",
  adjustFontFallback: false,
  fallback: ["cursive"],
});
