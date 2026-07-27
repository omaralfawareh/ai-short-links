import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-700/80 bg-slate-900/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="text-lg font-semibold text-white hover:text-slate-200 transition"
          >
            Short Links
          </Link>
        </div>
      </div>
    </header>
  );
}
