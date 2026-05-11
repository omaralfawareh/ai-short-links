import Link from "next/link";

export default function HomeSections() {
  return (
    <div className="mx-auto mt-14 max-w-3xl space-y-10 px-4 text-left sm:mt-16 sm:px-6 lg:pb-8">
      <section className="space-y-3 text-slate-300">
        <h2 className="text-2xl font-semibold text-white">Guides beside the generator</h2>
        <p className="text-[17px] leading-relaxed">
          This isn&apos;t only a shortening form—we publish standalone articles on naming, moderation, branding, and social sharing (
          see{" "}
          <Link href="/blog" className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4">
            all guides
          </Link>
          ). That pairing is what advertiser programs look for alongside real tools.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-700/80 bg-slate-950/50 p-6 sm:p-8 space-y-3">
        <h2 className="text-xl font-semibold text-white">How clicks work</h2>
        <p className="text-[17px] leading-relaxed text-slate-300">
          When someone opens your short path, our server resolves it and responds with an immediate redirect—visitors aren&apos;t held on placeholder pages filled only with ads before reaching the URL you set.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Read next</h2>
        <ul className="space-y-2 text-[17px] text-slate-400">
          <li>
            <Link href="/blog/how-ai-generated-aliases-work" className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4">
              How AI-generated link aliases work
            </Link>
          </li>
          <li>
            <Link href="/blog/best-practices-sharing-links-social-media" className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4">
              Sharing short links on social media
            </Link>
          </li>
          <li>
            <Link href="/faq" className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4">
              FAQ for reviewers &amp; visitors
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
