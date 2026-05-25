"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MotionStyle, Transition } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "../../lib";

export interface BorderBeamProps {
  /** Diameter of the traveling beam (px). Default 50. */
  size?: number;
  /** Seconds for one full traverse of the perimeter. Default 6. */
  duration?: number;
  /** Negative seed into the loop (seconds), for phase-offsetting beams. Default 0. */
  delay?: number;
  /** Leading edge color. Default brand indigo. */
  colorFrom?: string;
  /** Trailing edge color — set different from `colorFrom` for a gradient. Default brand indigo. */
  colorTo?: string;
  /** Escape hatch — merged over the default infinite/linear loop. */
  transition?: Transition;
  className?: string;
  style?: CSSProperties;
  /** Travel counter-clockwise. Default false. */
  reverse?: boolean;
  /** Starting position along the perimeter (0–100%). Default 0. */
  initialOffset?: number;
  /** Border thickness the beam rides on (px). Default 1. */
  borderWidth?: number;
}

/**
 * BorderBeam — a decorative light that travels around an element's border, for
 * premium accent on badges and cards (Path C). The host must be
 * `position: relative` and rounded; the beam inherits the host's radius.
 *
 * Purely decorative: when `prefers-reduced-motion` is set it renders nothing
 * (no static fallback) — nothing functional is lost.
 *
 * RTL-safe: the beam circles the full perimeter (symmetric `inset-0`) and adds
 * no physical-axis layout utilities.
 *
 * Adapted from Orion's `src/components/ui/border-beam.tsx` — brand-indigo
 * defaults; reduced-motion renders null.
 */
export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "var(--brand-primary)",
  colorTo = "var(--brand-primary)",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) {
  const prefersReducedMotion = useReducedMotion();

  // Purely decorative — skip entirely when the user opts out of motion.
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as CSSProperties
      }
    >
      <motion.div
        // RTL: bg-gradient-to-l is acceptable here — decorative tail on
        // a perimeter-tracing beam, visually identical in both directions.
        className={cn(
          "absolute aspect-square rounded-full bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}
