import ShortLinkGenerator from "@/components/ShortLinkGenerator";

export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] bg-slate-900 px-2 py-8 sm:px-6 sm:py-12 lg:px-8"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <main className="max-w-7xl mx-auto">
        <ShortLinkGenerator />
      </main>
    </div>
  );
}
