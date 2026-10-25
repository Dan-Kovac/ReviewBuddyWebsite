"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { STICKY_CTA_LABEL, contactPhoneHref, pricingSectionHref } from "@/lib/site";

/**
 * Sticky bottom bar on phones. Appears once the hero button leaves view,
 * and hides while the pricing block is on screen.
 */
export function StickyTrialBar() {
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
    <div className={`fixed inset-x-0 bottom-0 z-40 lg:hidden ${show ? "" : "hidden"}`}>
      <div className="flex gap-2 border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={pricingSectionHref}
          data-cta="pricing"
          data-location="sticky"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-ink px-4 text-center text-base font-semibold text-white"
        >
          {STICKY_CTA_LABEL}
        </a>
        <a
          href={contactPhoneHref}
          aria-label="Call Dan on 0411 701 078"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink"
        >
          <Phone aria-hidden="true" className="size-5" />
        </a>
      </div>
    </div>
  );
}
