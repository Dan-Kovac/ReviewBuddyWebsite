import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { TrialButton } from "@/components/trial-button";
import { loginUrl, navLinks } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href={loginUrl} className="text-sm font-medium text-ink">
            Log in
          </a>
          <TrialButton variant="ink" />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-3 md:hidden sm:px-6">
        <TrialButton variant="ink" className="w-full" />
      </div>
    </header>
  );
}
