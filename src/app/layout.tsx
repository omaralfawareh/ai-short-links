import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Short Link Generator",
  description: "Create free custom short links with AI-powered generation",
  keywords: [
    "short link",
    "short links",
    "url shortener",
    "ai",
    "link generator",
    "custom links",
    "free short links",
    "tiny links",
  ],
  authors: [{ name: "Omar Alfawareh", url: "https://omaraalfawareh.com" }],
  creator: "Omar Alfawareh",
  applicationName: "AI Short Links",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI Short Link Generator",
    description: "Create custom short links with AI-powered generation",
    siteName: "AI Short Links",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Short Link Generator",
    description: "Create custom short links with AI-powered generation",
  },
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)"),s=localStorage.getItem("theme");d.dataset.theme=s||(m.matches?"dark":"light");m.addEventListener("change",function(e){if(!localStorage.getItem("theme"))d.dataset.theme=e.matches?"dark":"light"})}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5350545345275925"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
