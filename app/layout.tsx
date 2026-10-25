import type { Metadata } from "next";
import { Archivo, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CtaAnalytics } from "@/components/cta-analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd } from "@/lib/json-ld";
import { homeMetaDescription } from "@/lib/gst";
import { contactEmail, siteUrl } from "@/lib/site";
import "./globals.css";
import "./modern.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const homeTitle = "More Google Reviews for Tradies | ReviewBuddy";
const homeDescription = homeMetaDescription();

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | ReviewBuddy",
  },
  description: homeDescription,
  applicationName: "ReviewBuddy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
    siteName: "ReviewBuddy",
    locale: "en_AU",
    type: "website",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [`${siteUrl}/twitter-image`],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${archivo.variable} ${workSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {process.env.VERCEL ? <Analytics /> : null}
        <CtaAnalytics />
        <noscript>
          <p className="bg-ink px-4 py-3 text-center text-sm text-white">
            Trial links work without JavaScript. The free breakdown form needs
            JavaScript. Email {contactEmail} if it doesn&apos;t open.
          </p>
        </noscript>
      </body>
    </html>
  );
}
