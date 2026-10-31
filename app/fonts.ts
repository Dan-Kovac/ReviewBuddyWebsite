import localFont from "next/font/local";

/**
 * Geist, display and body. Preloaded. OFL (Vercel).
 * Latin subset, variable wght 100-900, from @fontsource-variable/geist.
 */
export const geist = localFont({
  src: [{ path: "../fonts/Geist-VF.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-geist",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "system-ui", "sans-serif"],
});

/**
 * Geist Mono for plan prices and step numerals. Not preloaded. OFL (Vercel).
 * Latin subset, variable wght, from @fontsource-variable/geist-mono.
 */
export const geistMono = localFont({
  src: [{ path: "../fonts/GeistMono-VF.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
