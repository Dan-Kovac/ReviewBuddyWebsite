import Link from "next/link";
import { Logo } from "@/components/logo";
import { loginUrl, navLinks } from "@/lib/site";

const legal = [
  { href: loginUrl, label: "Log in", external: true },
  { href: "/privacy", label: "Privacy", external: false },
  { href: "/terms", label: "Terms", external: false },
];

function TodoMark() {
  return (
    <span className="inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-bold tracking-wide text-ink">
      TODO
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
            Google reviews on your website, for Australian tradies.
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
          {legal.map((link) =>
            link.external ? (
              <a key={link.label} href={link.href} className="min-h-11 py-2 text-white/85 transition-colors hover:text-white">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="min-h-11 py-2 text-white/85 transition-colors hover:text-white">
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-white/50">Contact</p>
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/85">Email</dt>
              <dd>
                <TodoMark />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/85">Phone</dt>
              <dd>
                <TodoMark />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/85">ABN</dt>
              <dd>
                <TodoMark />
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-5 text-sm text-white/60 sm:px-6">
          <span>© 2026 ReviewBuddy</span>
          <span className="inline-flex items-center gap-2">
            ABN <TodoMark />
          </span>
        </p>
      </div>
    </footer>
  );
}
