import Link from "next/link";
import { Logo } from "@/components/logo";
import { contactEmail, loginUrl } from "@/lib/site";

const explore = [
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
];

const account = [
  { href: loginUrl, label: "Log in", external: true },
  { href: `mailto:${contactEmail}`, label: contactEmail, external: true },
  { href: "/privacy", label: "Privacy", external: false },
  { href: "/terms", label: "Terms", external: false },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Google reviews on your website, for Australian tradies. Texts and
            emails that ask for more after every job.
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-1 text-sm">
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted">Explore</p>
          {explore.map((link) => (
            <Link key={link.href} href={link.href} className="min-h-11 py-2 text-ink hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="grid content-start gap-1 text-sm">
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted">Account</p>
          {account.map((link) =>
            link.external ? (
              <a key={link.label} href={link.href} className="min-h-11 py-2 text-ink hover:underline">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="min-h-11 py-2 text-ink hover:underline">
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
      <div className="border-t border-line bg-white">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-muted sm:px-6">
          © 2026 ReviewBuddy
        </p>
      </div>
    </footer>
  );
}
