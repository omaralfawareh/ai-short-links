import type { ReactNode } from "react";

export default function StepLabel({
  n,
  children,
  htmlFor,
  aside,
}: {
  n: number;
  children: ReactNode;
  htmlFor?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2.5 text-sm font-medium text-fg"
      >
        <span className="grid h-5 w-5 place-items-center rounded-md border border-line-strong font-mono text-[11px] text-muted">
          {n}
        </span>
        {children}
      </label>
      {aside}
    </div>
  );
}
