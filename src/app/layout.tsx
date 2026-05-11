import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import SiteShell from "@/components/SiteShell";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — memorable short URLs & guides`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Create readable short URLs with optional AI-assisted paths, plus editorial guides on naming, moderation, sharing, and brand-safe link habits.",
  keywords: ["short link", "short links", "url shortener", "ai", "link generator", "custom links", "free short links", "tiny links"],
  authors: [{ name: "Omar Alfawareh", url: "https://omaraalfawareh.com" }],
  creator: "Omar Alfawareh",
  applicationName: SITE_NAME,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${SITE_NAME} — memorable short URLs`,
    description: "Short links backed by substantive guides—not a bare redirect-only property.",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — memorable short URLs`,
    description: "Create short paths and bookmark our evergreen publishing on link strategy.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5350545345275925"
          crossOrigin="anonymous"
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
