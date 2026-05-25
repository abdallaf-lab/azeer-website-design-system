"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variant,
} from "motion/react";

import { cn } from "../../lib";

export interface MotionPresetProps {
  /** Content to reveal. */
  children: ReactNode;
  /** Fade from 0 → 1 opacity. Default true. */
  fade?: boolean;
  /** Blur from 10px → 0, alongside the fade. Default false. */
  blur?: boolean;
  /** Extra delay (seconds) added on top of any `transition.delay`. Default 0. */
  delay?: number;
  /** Animation duration in seconds. Default 0.5. */
  duration?: number;
  /**
   * Wait until the element scrolls into view before animating (plays once).
   * When false, the reveal runs immediately on mount. Default true.
   */
  inView?: boolean;
  className?: string;
  /** Escape hatch — merged over the default duration/ease. */
  transition?: Transition;
}

/** Azeer's signature easing — cubic-bezier(.4, 0, .2, 1). */
const AZEER_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * MotionPreset — a lightweight entrance-animation wrapper for the marketing
 * layer (Path C). Fades (and optionally blurs) its children in, either on mount
 * or when scrolled into view. Honors `prefers-reduced-motion`: when the user
 * opts out, children render immediately with no animation. Client component
 * (uses the `motion` library + scroll hooks).
 *
 * Direction-agnostic: animates only opacity/filter, so it is RTL-safe and
 * introduces no physical-axis movement.
 *
 * Adapted from Orion's `src/components/ui/motion-preset.tsx` — slide/zoom/
 * polymorphic-component options dropped; reduced-motion fallback added.
 */
export function MotionPreset({
  children,
  fade = true,
  blur = false,
  delay = 0,
  duration = 0.5,
  inView = true,
  className,
  transition,
}: MotionPresetProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Respect the user's motion preference — render content as-is, no animation.
  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const hidden: Variant = {};
  const visible: Variant = {};

  if (fade) {
    hidden.opacity = 0;
    visible.opacity = 1;
  }

  if (blur) {
    hidden.filter = "blur(10px)";
    visible.filter = "blur(0px)";
  }

  const resolvedTransition: Transition = {
    duration,
    ease: AZEER_EASE,
    ...transition,
    delay: (transition?.delay ?? 0) + delay,
  };

  const animate = !inView || isInView ? "visible" : "hidden";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animate}
      variants={{ hidden, visible }}
      transition={resolvedTransition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
