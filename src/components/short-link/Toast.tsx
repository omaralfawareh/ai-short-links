import Icon, { ICONS } from "@/components/ui/Icon";

export type ToastData = { error: boolean; message: string; id: number };

export default function Toast({ toast }: { toast: ToastData | null }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
    >
      {toast && (
        <div
          key={toast.id}
          className={`animate-fade-in flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl ${
            toast.error
              ? "border-danger/40 bg-danger-soft/95 text-danger-fg"
              : "border-accent/30 bg-raised/90 text-fg"
          }`}
        >
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
              toast.error
                ? "bg-danger/20 text-danger"
                : "bg-accent/15 text-accent-text"
            }`}
          >
            <Icon
              d={toast.error ? ICONS.x : ICONS.check}
              className="h-3.5 w-3.5"
            />
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
