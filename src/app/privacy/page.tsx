import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - AI Short Links",
  description:
    "Learn how AI Short Links collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 lg:pb-20">
      <main className="max-w-3xl mx-auto">

        <article className="bg-slate-800/50 rounded-2xl p-8 sm:p-12 border border-slate-700/50">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-400 mb-8">Last updated: May 5, 2025</p>

          <div className="prose prose-invert prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Introduction
              </h2>
              <p className="text-slate-300 leading-relaxed">
                AI Short Links (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our URL
                shortening service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Information We Collect
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>
                  <strong className="text-white">URLs you submit:</strong> The
                  original URLs you shorten and the custom aliases you create
                </li>
                <li>
                  <strong className="text-white">Usage data:</strong> Basic
                  analytics such as click counts on shortened links
                </li>
                <li>
                  <strong className="text-white">Device information:</strong>{" "}
                  Browser type, IP address, and device type for security and
                  analytics
                </li>
                <li>
                  <strong className="text-white">Cookies:</strong> We use
                  cookies for bot protection (Cloudflare Turnstile) and to
                  improve user experience
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Provide and maintain our URL shortening service</li>
                <li>Generate AI-powered custom aliases for your links</li>
                <li>Prevent abuse and ensure security of our platform</li>
                <li>Analyze usage patterns to improve our service</li>
                <li>Display relevant advertisements through Google AdSense</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Third-Party Services
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>
                  <strong className="text-white">Cloudflare:</strong> For
                  security, bot protection (Turnstile), and content delivery
                </li>
                <li>
                  <strong className="text-white">Google AdSense:</strong> For
                  displaying advertisements
                </li>
                <li>
                  <strong className="text-white">OpenAI:</strong> For AI-powered
                  alias generation (we send only the theme description, not the
                  full URL)
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-3">
                Each of these services has their own privacy policies governing
                their use of your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Data Retention
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Shortened links and their associated data are stored
                indefinitely to ensure links continue to work. We may delete
                links that violate our terms of service or that have been
                inactive for extended periods.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Your Rights
              </h2>
              <p className="text-slate-300 leading-relaxed mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Security
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information. However, no method of
                transmission over the Internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Our service is not directed to children under 13. We do not
                knowingly collect personal information from children under 13.
                If you believe we have collected information from a child under
                13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                9. Changes to This Policy
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                10. Contact Us
              </h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:privacy@aishort.link"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  privacy@aishort.link
                </a>
              </p>
            </section>
          </div>
        </article>

        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
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
