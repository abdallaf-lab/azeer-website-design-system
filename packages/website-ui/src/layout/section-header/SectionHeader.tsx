"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "../../lib";

type SectionHeaderIntensity = "subtle" | "normal";

export interface SectionHeaderProps {
  /** Section label (e.g. "Features"). Rendered uppercase. */
  title: string;
  /** Supporting paragraph below the label. */
  description: ReactNode;
  /** Anchor id (applied to the outer element). */
  id?: string;
  className?: string;
  /** Render the flickering brand-tinted canvas behind the label. Default true. */
  showCanvas?: boolean;
  /** Canvas density — `subtle` (0.05/0.06) or `normal` (0.08/0.08). Default `subtle`. */
  canvasIntensity?: SectionHeaderIntensity;
}

/** Azeer brand indigo (#7b61ff = 123, 97, 255), used for the canvas tint in light mode. */
const BRAND_RGB: readonly [number, number, number] = [123, 97, 255];

const INTENSITY: Record<SectionHeaderIntensity, { maxOpacity: number; flickerChance: number }> = {
  subtle: { maxOpacity: 0.05, flickerChance: 0.06 },
  normal: { maxOpacity: 0.08, flickerChance: 0.08 },
};

/**
 * SectionHeader — uppercase section label over a soft flickering canvas,
 * framed by horizontal hairlines. Used above the content of every Stage-2B
 * section (Features, Pricing, FAQ, etc.) for consistent rhythm.
 *
 * Distinct from `SectionHeading` (in `../lib/section.tsx`): that one is an
 * eyebrow+h2+description triad rendered INSIDE a section. SectionHeader sits
 * ABOVE content as the section label/divider. (TODO: at end of Stage 2B,
 * consider renaming to `SectionLabel` for unambiguous naming.)
 *
 * Sits INSIDE SectionRails by design — its `border-y` spans the rails' padded
 * inner width, not the viewport. This is a deliberate adaptation from Orion's
 * edge-to-edge Separators: Azeer's rails frame everything for the architectural
 * premium feel.
 *
 * Client component (the canvas uses `requestAnimationFrame` + `useRef`). Under
 * `prefers-reduced-motion` the canvas is omitted entirely — the bracketing
 * border-y + text are the meaningful content (Rule #3, decorative).
 *
 * Brand: light-mode dots use `rgb(123, 97, 255)` (the brand indigo at low
 * alpha); dark-mode uses white. Theme is sniffed via the document's
 * `data-theme` attribute per frame, matching Azeer's dark-mode mechanism.
 *
 * RTL: the `tracking-wider` treatment is scoped to LTR via `ltr:tracking-wider`
 * (Rule #14) — Arabic letter connection is preserved.
 */
export function SectionHeader({
  title,
  description,
  id,
  className,
  showCanvas = true,
  canvasIntensity = "subtle",
}: SectionHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const animate = showCanvas && !prefersReducedMotion;

  useEffect(() => {
    if (!animate) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const squareSize = 4;
    const gridGap = 6;
    const { maxOpacity, flickerChance } = INTENSITY[canvasIntensity];

    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    if (!parent) return;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cols = Math.floor(width / (squareSize + gridGap));
    const rows = Math.floor(height / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * maxOpacity;
    }

    let lastTime = 0;
    let frameId = 0;

    const draw = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Azeer uses `data-theme="dark"` (not `class="dark"`). Re-check each
      // frame so the canvas adapts when the user flips the theme.
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const [r, g, b] = isDark ? [255, 255, 255] : BRAND_RGB;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [animate, canvasIntensity]);

  return (
    <div
      id={id}
      className={cn(
        "relative isolate overflow-hidden border-y border-border-subtle bg-bg-default",
        className,
      )}
    >
      {animate ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-[2] opacity-40"
        />
      ) : null}

      {/* Soft fade to the page background at the bottom edge. */}
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-linear-to-b from-transparent to-bg-default"
        aria-hidden="true"
      />

      <div className="relative space-y-3 pb-5 pt-8 text-center">
        {/* Rule #14: Arabic letters connect; scope tracking-wider to LTR only
            so Arabic section labels render with natural letter-spacing. */}
        <h2 className="text-xl font-medium uppercase text-content-emphasis ltr:tracking-wider">
          {title}
        </h2>
        <p className="text-mkt-body text-content-muted">{description}</p>
      </div>
    </div>
  );
}
