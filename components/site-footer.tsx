import Link from "next/link";
import { Logo } from "@/components/logo";
import { LEGAL_DRAFT } from "@/lib/flags";
import {
  FOOTER_LINE,
  confirmedAbnDisplay,
  contactEmail,
  footerLinks,
  loginUrl,
} from "@/lib/site";

const legal = LEGAL_DRAFT
  ? []
  : [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ];

const abn = confirmedAbnDisplay();

export function SiteFooter() {
  return (
    <footer className="bg-[var(--rb-brand)] text-[var(--rb-on-brand)]">
      <div className="mx-auto grid w-full max-w-[var(--rb-max-width)] gap-12 px-[var(--rb-gutter)] py-[72px] pb-28 md:grid-cols-[1.3fr_0.8fr_1fr] lg:pb-[72px]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--rb-on-brand-muted)]">
            {FOOTER_LINE}
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-1 text-sm">
          <p className="eyebrow mb-2">Explore</p>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-11 py-2 text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)] transition-colors hover:text-[var(--rb-on-brand)]"
            >
              {link.label}
            </Link>
          ))}
            <a href={loginUrl} className="min-h-11 py-2 text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)] transition-colors hover:text-[var(--rb-on-brand)]">
            Log in
          </a>
          {legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-11 py-2 text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)] transition-colors hover:text-[var(--rb-on-brand)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="eyebrow mb-3">Contact</p>
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)]">Email</dt>
              <dd>
                <a href={`mailto:${contactEmail}`} className="text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)] underline-offset-4 hover:text-[var(--rb-on-brand)] hover:underline">
                  {contactEmail}
                </a>
              </dd>
            </div>
            {abn ? (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)]">ABN</dt>
                <dd className="text-[color-mix(in_srgb,var(--rb-on-brand)_85%,transparent)]">{abn}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
      <div className="border-t border-[color-mix(in_srgb,var(--rb-on-brand)_12%,transparent)]">
        <p className="mx-auto flex w-full max-w-[var(--rb-max-width)] flex-wrap items-center gap-x-4 gap-y-2 px-[var(--rb-gutter)] py-5 text-sm text-[var(--rb-on-brand-muted)]">
          <span>© 2026 ReviewBuddy</span>
          <span>Trademarks belong to their owners.</span>
        </p>
      </div>
    </footer>
  );
}
