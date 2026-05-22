import * as React from "react";
import { cn } from "../lib";

export type BrandPatternVariant = "waves" | "topographic" | "grid" | "layers";

export interface BrandPatternProps {
  variant?: BrandPatternVariant;
  /** Extra classes — set the color with a `text-*` utility (drawn in
   * `currentColor`) and the size/position on the wrapper. */
  className?: string;
  ref?: React.Ref<SVGSVGElement>;
}

/** Reuleaux-triangle outline (the Azeer mark's silhouette) in a 0..100 box. */
const REULEAUX =
  "M 50 22 A 70 70 0 0 1 85 82 A 70 70 0 0 1 15 82 A 70 70 0 0 1 50 22 Z";

/** A single flowing wave line at vertical offset `y` across the 800-wide box. */
function wavePath(y: number): string {
  return `M -40 ${y} C 110 ${y - 34} 250 ${y + 34} 400 ${y} S 690 ${y - 34} 840 ${y}`;
}

/** Organic closed contour, scaled into concentric rings for the topographic map. */
const BLOB =
  "M 430 64 C 556 84 604 196 562 300 C 522 398 360 420 276 352 C 198 290 224 150 320 98 C 360 76 396 60 430 64 Z";

const baseSvg = "block";

/**
 * BrandPattern — the four brand-book background patterns, drawn in
 * `currentColor` so any `text-*` (e.g. `text-brand-secondary`) tints them.
 * Decorative by design (`aria-hidden`). Place behind content in a positioned
 * wrapper:
 *
 * @example
 * <div className="relative isolate overflow-hidden bg-brand-supportive">
 *   <BrandPattern variant="waves" className="absolute inset-0 text-brand-secondary/10" />
 *   <div className="relative">…content…</div>
 * </div>
 */
export function BrandPattern({ variant = "waves", className, ref }: BrandPatternProps) {
  const reactId = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const patternId = `azeer-grid-${reactId}`;

  if (variant === "waves") {
    const offsets = [40, 92, 144, 196, 248, 300, 352, 404];
    return (
      <svg
        ref={ref}
        viewBox="0 0 800 450"
        preserveAspectRatio="none"
        aria-hidden
        className={cn(baseSvg, "h-full w-full", className)}
      >
        <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round">
          {offsets.map((y) => (
            <path key={y} d={wavePath(y)} />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "topographic") {
    const rings = [1, 0.84, 0.68, 0.53, 0.39, 0.27, 0.16];
    return (
      <svg
        ref={ref}
        viewBox="0 0 600 450"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        className={cn(baseSvg, "h-full w-full", className)}
      >
        <g fill="none" stroke="currentColor" strokeWidth="6">
          {rings.map((k) => (
            <path key={k} d={BLOB} transform={`translate(419 230) scale(${k}) translate(-419 -230)`} />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "grid") {
    return (
      <svg ref={ref} aria-hidden className={cn(baseSvg, "h-full w-full", className)}>
        <defs>
          <pattern id={patternId} width="46" height="84" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="6">
              <path d={REULEAUX} transform="translate(2 2) scale(0.42)" />
              <path d={REULEAUX} transform="translate(25 44) scale(0.42)" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    );
  }

  // layers — concentric Reuleaux silhouettes.
  const layers = [1, 0.88, 0.76, 0.64, 0.52, 0.41, 0.31, 0.22, 0.14];
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      aria-hidden
      className={cn(baseSvg, "h-full w-full", className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {layers.map((k) => (
          <path key={k} d={REULEAUX} transform={`translate(50 62) scale(${k}) translate(-50 -62)`} />
        ))}
      </g>
    </svg>
  );
}
