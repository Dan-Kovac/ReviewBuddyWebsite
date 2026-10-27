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
    <footer id="s8">
      <div className="shell g12 ft">
        <div className="ft-brand">
          <Logo />
          <p>{FOOTER_LINE}</p>
        </div>
        <nav aria-label="Footer" className="ft-nav">
          <p className="eyebrow">Explore</p>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href={loginUrl}>Log in</a>
          {legal.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ft-con">
          <p className="eyebrow">Contact</p>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </dd>
            </div>
            {abn ? (
              <div>
                <dt>ABN</dt>
                <dd>{abn}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
      <div className="ft-bot">
        <p className="shell">
          <span>© 2026 ReviewBuddy</span>
          <span>Trademarks belong to their owners.</span>
        </p>
      </div>
    </footer>
  );
}
