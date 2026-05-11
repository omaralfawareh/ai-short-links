import Link from "next/link";
import type { Metadata } from "next";

import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_NAME}`,
  description:
    "Frequently asked questions about AI Short Links: redirects, custom paths, AI aliases, spam prevention, ads, privacy, and what reviewers should expect.",
  alternates: { canonical: "/faq" },
};

const faq = [
  {
    q: "Is this only a short-link form?",
    a: `${SITE_NAME} pairs the generator with long-form guides (see /blog). The goal is substantive publisher pages with a utility, not a blank tool surface.`,
  },
  {
    q: "Does a short-link click open an ad page before my destination?",
    a: "No. We issue a normal HTTP redirect. Display ads may appear on regular HTML pages like this site’s articles or home—they are not substituted as mandatory steps in the redirect chain.",
  },
  {
    q: "Which characters work in custom slugs?",
    a: "Lowercase letters, numbers, and ASCII hyphens. That keeps URLs easy to dictate and avoids odd Unicode in SMS or legacy clients.",
  },
  {
    q: "Why is there Turnstile (captcha)?",
    a: "Public creation endpoints attract automated abuse; Turnstile raises the bar for scripted spam without classic puzzle friction for legitimate users.",
  },
  {
    q: "Where are mappings stored?",
    a: "Short paths and destinations live in Cloudflare KV for fast edge lookups. Categories of data are spelled out in the privacy policy.",
  },
  {
    q: `What hostname do short URLs use on ${SITE_NAME}?`,
    a: `Typically the production branded host tied to this deployment—for example paths under ${getSiteUrl().replace(/^https?:\/\//, "")}. Always copy the generated link shown in-app as the source of truth.`,
  },
  {
    q: "May I shorten any URL?",
    a: "Only lawful destinations you have the right to share. Phishing, malware, deceptive redirects, harassment, spam, IP violations, or other prohibited uses violate the terms of service.",
  },
] as const;

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 lg:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-slate-300">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-400">FAQ</li>
          </ol>
        </nav>

        <header className="mb-12 space-y-4 border-b border-slate-700 pb-10">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white">FAQ</h1>
          <p className="text-lg text-slate-400">
            Straight answers about behavior, tooling, redirects, moderation, and what makes this property more than navigation-only wrappers.
          </p>
        </header>

        <div className="space-y-10">
          {faq.map((item) => (
            <section key={item.q} className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-white">{item.q}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-slate-300">{item.a}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 rounded-xl border border-slate-700 bg-slate-800/40 p-6 text-base text-slate-400">
          More depth in the{" "}
          <Link href="/blog" className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4">
            guides archive
          </Link>
          {" "}or the{" "}
          <Link href="/about" className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4">
            about
          </Link>{" "}
          page.
        </p>
      </main>
    </div>
  );
}
