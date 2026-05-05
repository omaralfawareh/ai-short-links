import Link from "next/link";
import ShortLinkGenerator from "@/components/ShortLinkGenerator";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-slate-900 flex flex-col"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            AI Short Links
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/blog"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ShortLinkGenerator />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Create Short Link
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:contact@aishort.link"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-sm text-slate-500 text-center">
              &copy; {new Date().getFullYear()} AI Short Links. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
