import ShortLinkGenerator from "@/components/ShortLinkGenerator";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8"
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
