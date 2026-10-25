import Link from "next/link";
import { Logo } from "@/components/logo";
import { LEGAL_DRAFT } from "@/lib/flags";
import {
  FOOTER_LINE,
  confirmedAbnDisplay,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  loginUrl,
  navLinks,
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
    <footer className="bg-ink text-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-16 pb-28 sm:px-6 md:grid-cols-[1.3fr_0.8fr_1fr] lg:pb-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
            {FOOTER_LINE}
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-1 text-sm">
          <p className="mb-2 text-xs font-semibold tracking-wide text-white/50">Explore</p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-11 py-2 text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a href={loginUrl} className="min-h-11 py-2 text-white/85 transition-colors hover:text-white">
            Log in
          </a>
          {legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-11 py-2 text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-white/50">Contact</p>
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/85">Phone</dt>
              <dd>
                <a href={contactPhoneHref} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                  {contactPhone}
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/85">Email</dt>
              <dd>
                <a href={`mailto:${contactEmail}`} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                  {contactEmail}
                </a>
              </dd>
            </div>
            {abn ? (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/85">ABN</dt>
                <dd className="text-white/85">{abn}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-5 text-sm text-white/60 sm:px-6">
          <span>© 2026 ReviewBuddy</span>
          <span>Trademarks belong to their owners.</span>
        </p>
      </div>
    </footer>
  );
}
