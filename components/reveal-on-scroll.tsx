"use client";

import { useEffect } from "react";

/**
 * Scroll-in motion. Anything marked data-reveal that starts below the first
 * screen fades up once when it enters view. Nothing is hidden before this runs,
 * so the page reads fine without JavaScript, and it does nothing at all when
 * the visitor prefers reduced motion.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (items.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const pending: HTMLElement[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    for (const item of items) {
      if (item.getBoundingClientRect().top > window.innerHeight * 0.92) {
        item.dataset.reveal = "pending";
        pending.push(item);
        observer.observe(item);
      }
    }

    return () => {
      observer.disconnect();
      for (const item of pending) {
        item.dataset.reveal = "shown";
      }
    };
  }, []);

  return null;
}
