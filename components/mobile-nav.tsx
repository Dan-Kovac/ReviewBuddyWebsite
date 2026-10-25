"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL, loginUrl, navLinks } from "@/lib/site";

export function MobileNav() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="inline-flex size-12 items-center justify-center rounded-full border border-line text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="text-xl leading-none">
          {open ? "×" : "☰"}
        </span>
      </button>
      {open ? (
        <nav
          id={panelId}
          aria-label="Mobile"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-background px-4 py-3 shadow-lg sm:px-6"
        >
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center text-base font-semibold text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={loginUrl}
                className="flex min-h-12 items-center text-base font-semibold text-ink"
              >
                Log in
              </a>
            </li>
            <li className="pt-2">
              <TrialButton variant="ink" className="w-full">
                {CTA_LABEL}
              </TrialButton>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
