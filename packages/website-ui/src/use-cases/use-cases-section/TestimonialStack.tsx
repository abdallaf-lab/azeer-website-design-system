"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "../../lib";

export interface TestimonialCard {
  id: string;
  /** The testimonial body (rendered with smart quotes). */
  quote: string;
  /** Optional attribution name. */
  author?: string;
  /** Optional role/company (rendered after `author`). */
  role?: string;
}

export interface TestimonialStackProps {
  testimonials: TestimonialCard[];
  /**
   * Rotation interval in ms. Default 5000 (Rule #16 calibration — never below
   * 5s; Orion's 2s creates anxiety/distraction). Set to 0 to disable.
   */
  rotateInterval?: number;
  className?: string;
}

/**
 * TestimonialStack — three overlapping testimonial cards with scale + opacity
 * fade, cycling through the provided array. Client Component (motion).
 *
 * Rule #16 sub-rule: rotation interval defaults to 5000ms. Under
 * `prefers-reduced-motion: reduce`, no rotation runs and cards render at their
 * initial stacked positions (all three visible at their final scale/opacity)
 * — preserves the "many reviews" visual without animation.
 *
 * Reset-on-input-change contract: the stack rotates internal state, so to
 * reset (e.g. a new tab activates with new testimonials), the parent must
 * ensure this component remounts. Inside `@azeer/ui Tabs`, Radix unmounts
 * inactive `TabsContent` by default — each tab activation mounts a fresh
 * stack starting at index 0. In other contexts, pass a `key` that changes
 * when the testimonial set changes.
 */
export function TestimonialStack({
  testimonials,
  rotateInterval = 5000,
  className,
}: TestimonialStackProps) {
  const [items, setItems] = useState<TestimonialCard[]>(testimonials);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (rotateInterval <= 0 || prefersReducedMotion) return;
    const id = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const tail = next.pop();
        if (tail) next.unshift(tail);
        return next;
      });
    }, rotateInterval);
    return () => clearInterval(id);
  }, [rotateInterval, prefersReducedMotion]);

  return (
    <div className={cn("relative h-33", className)}>
      {items.map((t, index) => {
        const target = {
          bottom: (index - 2) * -12,
          scale: 1 - index * 0.05,
          opacity: 1 - index * 0.25,
          zIndex: items.length - index,
        };
        return (
          <motion.div
            key={t.id}
            className="absolute inset-x-0 flex w-full flex-col gap-2 rounded-md border border-border-subtle bg-bg-default p-5 shadow-elev-2"
            style={{ transformOrigin: "bottom center" } as CSSProperties}
            initial={target}
            animate={target}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: "easeInOut" }
            }
          >
            <p className="line-clamp-3 text-start text-mkt-body font-medium text-content-emphasis">
              &ldquo;{t.quote}&rdquo;
            </p>
            {t.author ? (
              <p className="text-start text-mkt-caption text-content-muted">
                {t.author}
                {t.role ? `, ${t.role}` : ""}
              </p>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
