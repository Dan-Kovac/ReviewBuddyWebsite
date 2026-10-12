import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrialProvider } from "@/components/trial-provider";
import { organizationJsonLd } from "@/lib/json-ld";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const homeTitle = "Show Your Google Reviews on Your Website | ReviewBuddy for Tradies";
const homeDescription =
  "Your Google reviews, live on your website, plus texts and emails that ask for more. Built for Aussie tradies. 7 days free, then $75 + GST a month.";

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
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <TrialProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </TrialProvider>
        <noscript>
          <p className="bg-ink px-4 py-3 text-center text-sm text-paper">
            The trial form needs JavaScript. Email hello@reviewbuddy.com.au with
            your name, business, mobile, and website.
          </p>
        </noscript>
      </body>
    </html>
  );
}
