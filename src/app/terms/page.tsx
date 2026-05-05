import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - AI Short Links",
  description:
    "Read the terms and conditions for using the AI Short Links URL shortening service.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient orbs */}
      <div
        className="gradient-orb w-[400px] h-[400px] -top-20 -left-20 fixed pointer-events-none"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
      />
      <div
        className="gradient-orb w-[300px] h-[300px] bottom-40 -right-20 fixed pointer-events-none"
        style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", animationDelay: "-4s" }}
      />

      <div className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <main className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-8 transition-colors"
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

          <article className="glass-card rounded-2xl p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Terms of Service
            </h1>
            <p className="text-muted mb-8">Last updated: May 5, 2025</p>

            <div className="prose prose-invert prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted leading-relaxed">
                  By accessing and using AI Short Links (&quot;the Service&quot;), you
                  accept and agree to be bound by these Terms of Service. If you
                  do not agree to these terms, please do not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. Description of Service
                </h2>
                <p className="text-muted leading-relaxed">
                  AI Short Links provides a free URL shortening service that
                  allows users to create shortened versions of long URLs. Our
                  service includes AI-powered alias generation to create
                  memorable, themed short links.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Acceptable Use
                </h2>
                <p className="text-muted leading-relaxed mb-3">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                  <li>
                    Create links to illegal, harmful, or malicious content
                  </li>
                  <li>
                    Distribute malware, viruses, or other harmful software
                  </li>
                  <li>Engage in phishing or fraudulent activities</li>
                  <li>
                    Violate intellectual property rights of others
                  </li>
                  <li>
                    Harass, abuse, or harm other individuals
                  </li>
                  <li>
                    Send spam or unsolicited communications
                  </li>
                  <li>
                    Attempt to circumvent our security measures or bot protection
                  </li>
                  <li>
                    Create links to content that promotes violence, hatred, or
                    discrimination
                  </li>
                  <li>
                    Use automated systems to create links in bulk without
                    permission
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Link Content Responsibility
                </h2>
                <p className="text-muted leading-relaxed">
                  You are solely responsible for the content of the URLs you
                  shorten. We do not monitor or control the content of destination
                  URLs. We reserve the right to disable or remove any shortened
                  link that violates these terms or applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. No Guarantee of Availability
                </h2>
                <p className="text-muted leading-relaxed">
                  While we strive to maintain high availability, we do not
                  guarantee that the Service will be available at all times. We
                  may modify, suspend, or discontinue the Service at any time
                  without notice. We are not liable for any loss or damage
                  resulting from service interruptions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Alias Availability
                </h2>
                <p className="text-muted leading-relaxed">
                  Custom aliases are provided on a first-come, first-served basis.
                  We do not guarantee the availability of any specific alias.
                  AI-generated aliases are suggestions and may need to be modified
                  if already in use.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  7. Intellectual Property
                </h2>
                <p className="text-muted leading-relaxed">
                  The Service, including its design, features, and content, is
                  owned by AI Short Links and protected by intellectual property
                  laws. You may not copy, modify, or distribute any part of the
                  Service without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  8. Limitation of Liability
                </h2>
                <p className="text-muted leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, AI SHORT LINKS SHALL NOT
                  BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                  OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR
                  GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  9. Indemnification
                </h2>
                <p className="text-muted leading-relaxed">
                  You agree to indemnify and hold harmless AI Short Links and its
                  operators from any claims, damages, losses, or expenses arising
                  from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  10. Termination
                </h2>
                <p className="text-muted leading-relaxed">
                  We may terminate or suspend your access to the Service
                  immediately, without prior notice, for any reason, including
                  breach of these Terms. Upon termination, your right to use the
                  Service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  11. Changes to Terms
                </h2>
                <p className="text-muted leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes
                  will be effective immediately upon posting. Your continued use
                  of the Service after changes constitutes acceptance of the
                  modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  12. Governing Law
                </h2>
                <p className="text-muted leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with applicable laws, without regard to conflict of law
                  principles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  13. Contact Information
                </h2>
                <p className="text-muted leading-relaxed">
                  For questions about these Terms, please contact us at{" "}
                  <a
                    href="mailto:legal@aishort.link"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    legal@aishort.link
                  </a>
                </p>
              </section>
            </div>
          </article>

          <footer className="mt-8 text-center">
            <div className="flex justify-center gap-6 text-sm text-muted">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
