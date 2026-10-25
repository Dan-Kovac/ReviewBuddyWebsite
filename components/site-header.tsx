import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL, loginUrl, navLinks } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 shadow-[0_1px_0_rgba(11,15,20,0.04)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-fade text-sm font-medium text-ink">
              {link.label}
            </Link>
          ))}
          <a href={loginUrl} className="link-fade text-sm font-medium text-ink">
            Log in
          </a>
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          <TrialButton variant="ink">{CTA_LABEL}</TrialButton>
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
