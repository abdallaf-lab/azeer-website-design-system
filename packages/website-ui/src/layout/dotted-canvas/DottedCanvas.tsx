import type { CSSProperties, ReactNode } from "react";

import { cn } from "../../lib";

type DottedCanvasDensity = "tight" | "normal" | "loose";

export interface DottedCanvasProps {
  /** Content rendered on top of the canvas. */
  children: ReactNode;
  className?: string;
  /** Dot grid spacing. Default `normal` (20px, matches Orion). */
  density?: DottedCanvasDensity;
  /** Dot opacity as a % of brand indigo (≈5–20). Default 10. */
  intensity?: number;
  /** Fade dots out toward the edges with a radial mask. Default true. */
  fade?: boolean;
  /** Where the edge fade begins, as a % from center (0–50). Default 20. */
  fadeStart?: number;
  /** Pin the dot layer to the viewport (`background-attachment: fixed`) for parallax. Default true. */
  parallax?: boolean;
  /** Optional fixed height (e.g. "600px"). Default: grows with content. */
  height?: string;
  /** Round the canvas corners and clip the pattern. Default false. */
  rounded?: boolean;
}

const DOT_SIZE: Record<DottedCanvasDensity, number> = {
  tight: 16,
  normal: 20,
  loose: 24,
};

/**
 * DottedCanvas — a background canvas of subtle brand-tinted dots with an
 * optional radial edge-fade, used behind hero workflows and open layouts to
 * add depth without visual noise. Pure CSS (no client directive, no motion).
 *
 * Layering (inside the canvas's own `isolate` stacking context): dot grid at
 * `-z-[2]`, fade overlay at `-z-[1]`, content above at the default level.
 *
 * Dynamic values (intensity, dot size, fade start, parallax) are applied via
 * inline `style` because Tailwind's JIT cannot see runtime-interpolated
 * arbitrary classes.
 *
 * RTL-safe: fully symmetric (radial pattern + centered mask).
 *
 * Adapted from Orion's `src/components/blocks/hero-section/hero-section.tsx`
 * (lines ~214–218) — the radial-dot + radial-mask background technique.
 *
 * TODO(stage-2b): Consider exposing a `fadeColor` prop if components need to
 * use DottedCanvas on non-default surfaces (the edge fade currently dissolves
 * into `bg-bg-default` — see README).
 */
export function DottedCanvas({
  children,
  className,
  density = "normal",
  intensity = 10,
  fade = true,
  fadeStart = 20,
  parallax = true,
  height,
  rounded = false,
}: DottedCanvasProps) {
  const dotSize = DOT_SIZE[density];

  // Tailwind v4 JIT can't see runtime-interpolated values like
  // bg-[radial-gradient(${color})] — must use inline style for dynamic CSS.
  const dotStyle: CSSProperties = {
    backgroundImage: `radial-gradient(color-mix(in oklab, var(--brand-primary) ${intensity}%, transparent) 2px, transparent 2px)`,
    backgroundSize: `${dotSize}px ${dotSize}px`,
    backgroundAttachment: parallax ? "fixed" : undefined,
  };

  // Dynamic fade percentage → inline style (same JIT limitation as above).
  const fadeMask = `radial-gradient(ellipse at center, transparent ${fadeStart}%, black)`;
  const fadeStyle: CSSProperties = {
    maskImage: fadeMask,
    WebkitMaskImage: fadeMask,
  };

  return (
    // `isolate` creates a fresh stacking context so the negative-z layers below
    // stay contained — without it they can paint behind ancestor backgrounds
    // and disappear. Do not remove.
    <div
      className={cn("relative isolate", rounded && "overflow-hidden rounded-2xl", className)}
      style={height ? { height } : undefined}
    >
      {/* Layer 1 — dot grid (-z-[2]) */}
      <div className="pointer-events-none absolute inset-0 -z-[2]" style={dotStyle} />

      {/* Layer 2 — radial edge fade into the page background (-z-[1]) */}
      {fade ? (
        <div
          className="pointer-events-none absolute inset-0 -z-[1] bg-bg-default"
          style={fadeStyle}
        />
      ) : null}

      {/* Content — `h-full` only when a fixed height is set, so children can center */}
      <div className={cn("relative", height && "h-full")}>{children}</div>
    </div>
  );
}
