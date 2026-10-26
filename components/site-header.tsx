import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL, STICKY_CTA_LABEL, headerLinks, loginUrl } from "@/lib/site";

const linkClass =
  "text-[15px] font-medium text-[color-mix(in_srgb,var(--rb-on-brand)_80%,transparent)] hover:text-[var(--rb-on-brand)]";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--rb-brand)]">
      <div className="mx-auto flex h-[72px] w-full max-w-[var(--rb-max-width)] items-center gap-3 px-[var(--rb-gutter)]">
        <Logo />
        <nav aria-label="Main" className="ml-auto hidden items-center gap-8 lg:flex">
          {headerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <a href={loginUrl} className={linkClass}>
            Log in
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2.5 lg:ml-8">
          <TrialButton variant="gold" location="header">
            <span className="lg:hidden">{STICKY_CTA_LABEL}</span>
            <span className="hidden lg:inline">{CTA_LABEL}</span>
          </TrialButton>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
