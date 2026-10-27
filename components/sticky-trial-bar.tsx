"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { STICKY_CTA_LABEL, STICKY_TRIAL_TEXT, pricingSectionLink } from "@/lib/site";

/**
 * Sticky bottom bar on phones. Appears once the hero button leaves view,
 * and hides while pricing, the closing band, or the footer is on screen.
 * Hiding uses the hidden class on a fixed bar, so the page does not shift.
 */
export function StickyTrialBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroButton = document.querySelector("[data-hero-cta]");
    const pricing = document.getElementById("pricing");
    if (!heroButton || typeof IntersectionObserver === "undefined") {
      return;
    }

    let heroVisible = true;
    let pricingVisible = false;
    let footerVisible = false;
    let closingVisible = false;
    const update = () => setShow(!heroVisible && !pricingVisible && !footerVisible && !closingVisible);

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

    const footerObserver = new IntersectionObserver((entries) => {
      footerVisible = entries.some((entry) => entry.isIntersecting);
      update();
    });

    observer.observe(heroButton);
    if (pricing) observer.observe(pricing);
    const footer = document.querySelector("footer");
    if (footer) footerObserver.observe(footer);
    const closing = document.getElementById("s7");
    const closingObserver = new IntersectionObserver((entries) => {
      closingVisible = entries.some((entry) => entry.isIntersecting);
      update();
    });
    if (closing) closingObserver.observe(closing);
    return () => {
      observer.disconnect();
      footerObserver.disconnect();
      closingObserver.disconnect();
    };
  }, []);

  return (
    <div data-sticky-trial="" className={`fixed inset-x-0 bottom-0 z-40 lg:hidden ${show ? "" : "hidden"}`}>
      <div className="flex items-center gap-3 border-t border-[var(--rb-line)] bg-[var(--rb-surface-raised)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[var(--rb-shadow-card)]">
        <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-[var(--rb-text)]">{STICKY_TRIAL_TEXT}</p>
        <a
          href={pricingSectionLink(pathname)}
          data-cta="pricing"
          data-location="sticky"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[var(--rb-accent)] px-4 text-center text-base font-semibold text-[var(--rb-on-accent)]"
        >
          {STICKY_CTA_LABEL}
        </a>
      </div>
    </div>
  );
}
