import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
] as const;

const footerNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/blog", label: "Guides & articles" },
] as const;

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 antialiased">
      <header className="sticky top-0 z-40 border-b border-slate-700/80 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight text-white hover:text-blue-300 transition-colors">
            {SITE_NAME}
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-10 text-sm text-slate-400 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-md space-y-2">
            <p className="font-medium text-slate-200">{SITE_NAME}</p>
            <p>
              Free short links plus in-depth guides.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              Redirects resolve with a normal HTTP redirect to your destination—no extra ad countdown interstitial pages in the redirect path.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-col gap-2 sm:text-right">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-200 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500 sm:text-left">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </footer>
    </div>
  );
}
