import Link from "next/link";
import { Logo } from "@/components/logo";
import { contactEmail, loginUrl } from "@/lib/site";

const links = [
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Google reviews on your website, for Australian tradies. Texts and
            emails that ask for more after every job.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="min-h-11 py-2 text-ink">
              {link.label}
            </Link>
          ))}
          <a href={loginUrl} className="min-h-11 py-2 text-ink">
            Log in
          </a>
          <a href={`mailto:${contactEmail}`} className="min-h-11 py-2 text-ink">
            {contactEmail}
          </a>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-muted sm:px-6">
          © 2026 ReviewBuddy
        </p>
      </div>
    </footer>
  );
}