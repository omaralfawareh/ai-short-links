import type { CSSProperties } from "react";

const COLORS = ["var(--accent)", "var(--ai)", "var(--fg)"];
const PARTICLES = 18;

/** Celebration burst; particle motion is driven by .burst-particle in globals.css. */
export default function Burst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {Array.from({ length: PARTICLES }).map((_, i) => (
        <span
          key={i}
          className="burst-particle"
          style={
            {
              "--a": `${(360 / PARTICLES) * i}deg`,
              "--d": `${56 + (i % 3) * 18}px`,
              background: COLORS[i % COLORS.length],
              animationDelay: `${(i % 4) * 25}ms`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
