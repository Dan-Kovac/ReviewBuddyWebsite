"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL, headerLinks, loginUrl } from "@/lib/site";

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

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (target instanceof Element && target.closest("a")) {
        setOpenPath(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-[12px] border-[1.5px] border-[color-mix(in_srgb,var(--rb-on-brand)_25%,transparent)] text-[var(--rb-on-brand)]"
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
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-[var(--rb-line)] bg-[var(--rb-surface)] px-[var(--rb-gutter)] py-3"
        >
          <ul className="grid gap-1">
            {headerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center text-base font-semibold text-ink"
                  onClick={() => setOpenPath(null)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={loginUrl}
                className="flex min-h-12 items-center text-base font-semibold text-ink"
                onClick={() => setOpenPath(null)}
              >
                Log in
              </a>
            </li>
            {pathname === "/welcome" ? null : (
              <li className="pt-2" onClick={() => setOpenPath(null)}>
                <TrialButton variant="ink" location="mobile-nav" className="w-full">
                  {CTA_LABEL}
                </TrialButton>
              </li>
            )}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
