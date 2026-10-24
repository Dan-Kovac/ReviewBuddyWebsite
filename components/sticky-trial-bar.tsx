"use client";

import { useEffect, useState } from "react";
import { useTrial } from "@/components/trial-provider";
import { CTA_LABEL } from "@/lib/site";

/**
 * Sticky bottom trial bar on phones. Appears once the hero button leaves view,
 * hides while the pricing band is on screen.
 */
export function StickyTrialBar() {
  const { openTrial } = useTrial();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroButton = document.querySelector("[data-hero-cta]");
    const pricing = document.getElementById("pricing");
    if (!heroButton || typeof IntersectionObserver === "undefined") {
      return;
    }

    let heroVisible = true;
    let pricingVisible = false;
    const update = () => setShow(!heroVisible && !pricingVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroButton) heroVisible = entry.isIntersecting;
          if (entry.target === pricing) pricingVisible = entry.isIntersecting;
        }
        update();
      },
      { rootMargin: "-72px 0px -72px 0px" },
    );

    observer.observe(heroButton);
    if (pricing) observer.observe(pricing);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sticky-bar fixed inset-x-0 bottom-0 z-40 md:hidden ${show ? "" : "hidden"}`}
    >
      <div className="border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
        <button
          type="button"
          onClick={() => openTrial()}
          className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-white"
        >
          {CTA_LABEL}
        </button>
      </div>
    </div>
  );
}
