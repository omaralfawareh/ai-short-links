"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { ICONS } from "@/components/ui/Icon";
import Burst from "./Burst";
import { DOMAIN } from "./constants";

export default function SuccessPanel({
  link,
  destination,
  onCopy,
  onReset,
}: {
  link: string;
  destination?: string;
  onCopy: (text: string) => void;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canShare = typeof navigator !== "undefined" && !!navigator.share;
  const path = link.replace(/^https?:\/\/[^/]+\//, "");

  const copy = () => {
    onCopy(link);
    setCopied(true);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    [],
  );

  return (
    <div className="animate-fade-in text-center">
      <div className="relative mx-auto mb-5 grid h-14 w-14 place-items-center">
        <Burst />
        <span className="animate-pop grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-ink shadow-[0_0_40px_-6px_var(--accent)]">
          <Icon d={ICONS.check} className="h-7 w-7" />
        </span>
      </div>
      <p className="text-sm text-muted">Your link is live</p>

      <button
        type="button"
        onClick={copy}
        title="Click to copy"
        className="group mt-3 w-full cursor-pointer rounded-2xl border border-line-strong bg-canvas px-4 py-5 transition hover:border-accent/60"
      >
        <span className="block break-all font-mono text-xl sm:text-3xl tracking-tight">
          <span className="text-muted">{DOMAIN}/</span>
          <span className="text-fg">{path}</span>
        </span>
        <span className="mt-2 block text-xs text-muted transition group-hover:text-accent-text">
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </button>

      {destination && (
        <p className="mt-3 flex items-center justify-center gap-1.5 truncate text-xs text-muted">
          <Icon d={ICONS.arrow} className="h-3 w-3 shrink-0" />
          <span className="truncate">{destination}</span>
        </p>
      )}

      <div className={`mt-6 grid gap-2 ${canShare ? "grid-cols-3" : "grid-cols-2"}`}>
        <button
          type="button"
          onClick={copy}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-ink transition hover:brightness-110 cursor-pointer"
        >
          <Icon d={copied ? ICONS.check : ICONS.copy} />
          {copied ? "Copied" : "Copy"}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-line-strong bg-tint py-3 text-sm font-medium text-fg transition hover:bg-tint-strong"
        >
          <Icon d={ICONS.external} /> Open
        </a>
        {canShare && (
          <button
            type="button"
            onClick={() => navigator.share({ url: link }).catch(() => {})}
            className="flex items-center justify-center gap-2 rounded-xl border border-line-strong bg-tint py-3 text-sm font-medium text-fg transition hover:bg-tint-strong cursor-pointer"
          >
            <Icon d={ICONS.share} /> Share
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg cursor-pointer"
      >
        <Icon d={ICONS.plus} /> Make another link
      </button>
    </div>
  );
}
