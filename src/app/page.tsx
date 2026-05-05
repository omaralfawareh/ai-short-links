import Link from "next/link";
import ShortLinkGenerator from "@/components/ShortLinkGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background gradient orbs */}
      <div
        className="gradient-orb w-[600px] h-[600px] -top-40 -left-40 fixed pointer-events-none"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
      />
      <div
        className="gradient-orb w-[400px] h-[400px] top-1/2 -right-20 fixed pointer-events-none"
        style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", animationDelay: "-4s" }}
      />

      {/* Header */}
      <header className="w-full py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">AI Short Links</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="hidden sm:flex text-sm px-4 py-2 glass-button rounded-lg text-foreground hover:bg-white/15 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm text-muted">AI-Powered Link Generation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Create memorable links{" "}
            <span className="gradient-text">powered by AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 text-pretty">
            Transform any URL into a branded, memorable short link. Our AI generates creative aliases based on your theme.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ShortLinkGenerator />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Create Short Link
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} AI Short Links. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
