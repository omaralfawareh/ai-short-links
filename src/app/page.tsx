import ShortLinkGenerator from "@/components/ShortLinkGenerator";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="backdrop-grid absolute inset-0" />
      </div>

      <main className="px-4 pt-12 pb-20 sm:px-6 sm:pt-20 lg:px-8">
        <ShortLinkGenerator />
      </main>
    </div>
  );
}
