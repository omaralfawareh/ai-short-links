import type { Metadata } from "next";

import HomeSections from "@/components/HomeSections";
import ShortLinkGenerator from "@/components/ShortLinkGenerator";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Short link generator & guides",
  description: `Create memorable short URLs on ${SITE_NAME}, then browse in-depth guides and FAQs—not just a lone form page.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div
      className="pb-16"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0.09) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <ShortLinkGenerator />
        <HomeSections />
      </main>
    </div>
  );
}
