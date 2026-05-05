import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - AI Short Links",
  description:
    "Learn about AI Short Links, the free URL shortener that uses artificial intelligence to create memorable, branded short links.",
};

export default function About() {
  return (
    <div
      className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <main className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        <article className="bg-slate-800/50 rounded-2xl p-8 sm:p-12 border border-slate-700/50">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            About AI Short Links
          </h1>

          <div className="prose prose-invert prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Our Mission
              </h2>
              <p className="text-slate-300 leading-relaxed">
                AI Short Links was created with a simple goal: to make URL
                shortening smarter and more memorable. Traditional URL
                shorteners give you random strings of characters that are
                impossible to remember. We believe your links should tell a
                story and reinforce your brand.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                What Makes Us Different
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Unlike conventional URL shorteners, AI Short Links uses
                artificial intelligence to generate creative, themed aliases
                based on your description. Whether you&apos;re sharing a gaming
                tutorial, a recipe, or a business presentation, our AI creates
                memorable slugs that match your content.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">
                    AI-Powered Generation
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Describe your link&apos;s theme, and our AI creates relevant,
                    brandable aliases instantly.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">100% Free</h3>
                  <p className="text-slate-400 text-sm">
                    Create unlimited short links with AI generation at no cost.
                    No sign-up required.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">
                    Secure & Reliable
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Protected by Cloudflare with bot prevention and global edge
                    delivery for fast redirects.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">Custom Aliases</h3>
                  <p className="text-slate-400 text-sm">
                    Prefer your own alias? Switch to custom mode and create
                    exactly what you want.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                How It Works
              </h2>
              <ol className="list-decimal list-inside text-slate-300 space-y-3 ml-4">
                <li>
                  <strong className="text-white">Enter your long URL</strong> -
                  Paste the link you want to shorten
                </li>
                <li>
                  <strong className="text-white">Describe the theme</strong> -
                  Tell our AI what your link is about (e.g., &quot;gaming
                  peripherals&quot;, &quot;Italian cooking&quot;, &quot;startup
                  pitch&quot;)
                </li>
                <li>
                  <strong className="text-white">Get AI suggestions</strong> -
                  Our AI generates creative, memorable aliases based on your
                  theme
                </li>
                <li>
                  <strong className="text-white">Copy and share</strong> - Your
                  new short link is ready to use immediately
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Built With Modern Technology
              </h2>
              <p className="text-slate-300 leading-relaxed">
                AI Short Links is built with cutting-edge technology to ensure
                speed, reliability, and scalability. We use Next.js for our
                frontend, Cloudflare Workers for edge computing, and advanced AI
                models for alias generation. Our infrastructure is designed to
                handle millions of redirects with minimal latency.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Get Started
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Ready to create your first AI-powered short link? Head to our
                homepage and try it out - no account needed.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Create a Short Link
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </section>
          </div>
        </article>

        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
