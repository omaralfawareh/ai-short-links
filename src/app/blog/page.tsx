import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - AI Short Links",
  description:
    "Tips, guides, and insights about URL shortening, link management, and making your links more memorable with AI.",
};

const articles = [
  {
    slug: "why-memorable-urls-matter",
    title: "Why Memorable URLs Matter for Your Brand",
    description:
      "Discover how custom, memorable short links can boost click-through rates and strengthen brand recognition.",
    date: "May 1, 2025",
    readTime: "5 min read",
    category: "Branding",
  },
  {
    slug: "how-ai-generated-aliases-work",
    title: "How AI-Generated Link Aliases Work",
    description:
      "A behind-the-scenes look at how artificial intelligence creates relevant, creative short link aliases.",
    date: "April 28, 2025",
    readTime: "4 min read",
    category: "Technology",
  },
  {
    slug: "best-practices-sharing-links-social-media",
    title: "Best Practices for Sharing Links on Social Media",
    description:
      "Learn how to optimize your short links for maximum engagement across different social platforms.",
    date: "April 24, 2025",
    readTime: "6 min read",
    category: "Marketing",
  },
  {
    slug: "custom-vs-random-short-links",
    title: "Custom vs Random Short Links: Which is Better?",
    description:
      "Compare the pros and cons of custom branded links versus random character URLs for different use cases.",
    date: "April 20, 2025",
    readTime: "5 min read",
    category: "Guide",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient orbs */}
      <div
        className="gradient-orb w-[500px] h-[500px] -top-40 -right-40 fixed pointer-events-none"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
      />
      <div
        className="gradient-orb w-[300px] h-[300px] bottom-20 -left-20 fixed pointer-events-none"
        style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", animationDelay: "-4s" }}
      />

      <div className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <main className="max-w-4xl mx-auto">
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

          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm text-muted">Resources</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted max-w-2xl">
              Tips, guides, and insights about URL shortening, link management,
              and making your links more memorable with AI.
            </p>
          </header>

          <div className="grid gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group glass-card rounded-xl p-6 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h2>
                    <p className="text-muted">{article.description}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
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
                </div>
              </Link>
            ))}
          </div>

          <footer className="mt-12 text-center">
            <div className="flex justify-center gap-6 text-sm text-muted">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
