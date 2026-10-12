"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DOMAIN, TICKER_SAMPLES } from "./constants";

/** Types out sample aliases one after another; just cycles them with reduced motion. */
export default function AliasTicker() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TICKER_SAMPLES[idx];
    if (reduced) {
      const t = setTimeout(() => setIdx((i) => (i + 1) % TICKER_SAMPLES.length), 2500);
      return () => clearTimeout(t);
    }
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && len < word.length) {
      t = setTimeout(() => setLen(len + 1), 60 + Math.random() * 70);
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), 1700);
    } else if (len > 0) {
      t = setTimeout(() => setLen(len - 1), 28);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % TICKER_SAMPLES.length);
      }, 300);
    }
    return () => clearTimeout(t);
  }, [idx, len, deleting, reduced]);

  const word = TICKER_SAMPLES[idx];
  return (
    <span className="font-mono">
      <span className="text-muted">{DOMAIN}/</span>
      <span className="text-accent-text">{reduced ? word : word.slice(0, len)}</span>
      <span className="caret ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-accent" />
    </span>
  );
}
