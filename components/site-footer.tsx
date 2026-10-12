import Link from "next/link";
import { contactEmail, loginUrl, siteName } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-pine text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-lg font-semibold">{siteName}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-paper/80">
            Google reviews on your website, for Australian tradies. Texts and
            emails that ask for more after every job.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="min-h-11 py-2 hover:underline">
              {link.label}
            </Link>
          ))}
          <a href={loginUrl} className="min-h-11 py-2 hover:underline">
            Log in
          </a>
          <a href={`mailto:${contactEmail}`} className="min-h-11 py-2 hover:underline">
            {contactEmail}
          </a>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-paper/70 sm:px-6">
          © 2026 {siteName}
        </p>
      </div>
    </footer>
  );
}
