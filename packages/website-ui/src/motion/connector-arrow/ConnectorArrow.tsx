"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "../../lib";

type ConnectorDirection = "right" | "left" | "down" | "up";

export interface ConnectorArrowProps {
  /** Visual (LTR) direction the arrow points. Default `right`. */
  direction?: ConnectorDirection;
  /** When the draw animation starts (seconds). Default 0. */
  delay?: number;
  /** Positioning / sizing classes from the parent (e.g. absolute placement). */
  className?: string;
  /** Line/arrowhead thickness. Default 2. */
  strokeWidth?: number;
  /** Color override. Default the `--color-border-strong` token (subtle, theme-aware). */
  color?: string;
  /** Main line/diamond draw duration (seconds). Default 0.4. */
  duration?: number;
  /** Render the starting diamond marker. Default true. */
  showDiamond?: boolean;
}

const GEOMETRY = {
  horizontal: {
    width: 71,
    height: 15,
    viewBox: "0 0 71 15",
    diamond: "M6 1.35791L12 7.35791L6 13.3579L0 7.35791L6 1.35791Z",
    line: "M6 7.35791H70",
    head: "M63.4941 1L69.8768 7.35817L63.4944 13.7158",
  },
  vertical: {
    width: 15,
    height: 69,
    viewBox: "0 0 15 69",
    diamond: "M13.3584 6L7.3584 12L1.3584 6L7.3584 0L13.3584 6Z",
    line: "M7.3584 6V68",
    head: "M13.7158 61.4941L7.35765 67.8768L1 61.4944",
  },
} as const;

const EASE = "easeInOut" as const;

/**
 * ConnectorArrow — an animated SVG arrow that draws itself between workflow
 * cards (input → action → output). Three parts animate in sequence: the
 * starting diamond fades in, the line draws via `pathLength`, then the
 * arrowhead draws. Client component (uses the motion library).
 *
 * Functional, not decorative: it expresses the connection between cards, so
 * under `prefers-reduced-motion` it renders STATICALLY (fully drawn, no
 * animation) rather than disappearing.
 *
 * Positioning is the parent's job — pass placement via `className` (e.g.
 * `absolute …`). The component only renders the sized SVG.
 *
 * RTL: horizontal arrows auto-mirror in a `dir="rtl"` context
 * (`rtl:-scale-x-100` on the wrapper) so a `direction="right"` arrow points
 * along the reading flow (leftward) in Arabic. Direction reversal (`left`/`up`)
 * is applied on the SVG itself, so the two compose without fighting over the
 * `transform` property. Vertical arrows always follow visual top-to-bottom,
 * regardless of script.
 *
 * Combines Orion's `arrow-right.tsx` + `arrow-bottom.tsx` into one component.
 */
export function ConnectorArrow({
  direction = "right",
  delay = 0,
  className,
  strokeWidth = 2,
  color = "var(--color-border-strong)",
  duration = 0.4,
  showDiamond = true,
}: ConnectorArrowProps) {
  const prefersReducedMotion = useReducedMotion();

  const horizontal = direction === "right" || direction === "left";
  const reversed = direction === "left" || direction === "up";
  const g = horizontal ? GEOMETRY.horizontal : GEOMETRY.vertical;

  // Direction reversal lives on the SVG (inline transform); RTL mirroring lives
  // on the wrapper (Tailwind `rtl:` variant) — different elements, so they
  // compose without fighting over the `transform` property.
  const svgStyle: CSSProperties | undefined = reversed
    ? { transform: horizontal ? "scaleX(-1)" : "scaleY(-1)" }
    : undefined;

  const wrapperClassName = cn("inline-flex", horizontal && "rtl:-scale-x-100", className);

  const svgProps = {
    width: g.width,
    height: g.height,
    viewBox: g.viewBox,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: svgStyle,
  };

  if (prefersReducedMotion) {
    return (
      <span className={wrapperClassName} aria-hidden="true">
        <svg {...svgProps}>
          {showDiamond ? <path d={g.diamond} fill={color} /> : null}
          <path d={g.line} stroke={color} strokeWidth={strokeWidth} />
          <path
            d={g.head}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className={wrapperClassName} aria-hidden="true">
      <motion.svg {...svgProps}>
        {showDiamond ? (
          <motion.path
            d={g.diamond}
            fill={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, ease: EASE, delay }}
          />
        ) : null}
        <motion.path
          d={g.line}
          stroke={color}
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration, ease: EASE, delay: delay + 0.24 }}
        />
        <motion.path
          d={g.head}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.3, ease: EASE, delay: delay + 0.64 },
            opacity: { duration: 0.1, delay: delay + 0.64 },
          }}
        />
      </motion.svg>
    </span>
  );
}
