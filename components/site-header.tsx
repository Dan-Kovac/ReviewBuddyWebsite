import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { TrialButton } from "@/components/trial-button";
import { loginUrl, navLinks, siteName } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <LogoMark />
          <span>{siteName}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={loginUrl}
            className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
          >
            Log in
          </a>
          <TrialButton />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-3 md:hidden sm:px-6">
        <TrialButton className="w-full" />
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="32" height="32" rx="8" fill="#14332c" />
      <path
        d="M8 9.5h16a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-6.2L13 25.2V21H8a2 2 0 0 1-2-2v-7.5a2 2 0 0 1 2-2z"
        fill="#f5c400"
      />
    </svg>
  );
}
