import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrialProvider } from "@/components/trial-provider";
import { organizationJsonLd } from "@/lib/json-ld";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import "./modern.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const homeTitle = "Get More Google Reviews | ReviewBuddy for Tradies";
const homeDescription =
  "7-day free trial, free setup. Get more Google reviews and show them with your other review sites in one widget on your website. From $49 a month inc. GST.";

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
      className={`${inter.variable} ${workSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
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
          <p className="bg-ink px-4 py-3 text-center text-sm text-white">
            The sign up form needs JavaScript. Email hello@reviewbuddy.com.au with
            your name, business, mobile, and website.
          </p>
        </noscript>
      </body>
    </html>
  );
}
