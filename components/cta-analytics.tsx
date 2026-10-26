"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/** Records cta_click for any plan or pricing link. Failures stay silent. */
export function CtaAnalytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const el = target.closest("[data-signup], [data-cta]");
      if (!(el instanceof HTMLElement)) {
        return;
      }
      const plan = el.dataset.signup ?? "";
      const location = el.dataset.location || el.dataset.cta || "unknown";
      try {
        track("cta_click", { location, plan });
      } catch {
        // Analytics must not block the click.
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
