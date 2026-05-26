"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Avatar } from "@azeer/ui";

import { cn } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { MotionPreset } from "../../motion/motion-preset";
import { CompanyLogoStrip } from "./CompanyLogoStrip";

export interface TestimonialItem {
  id: string;
  /** The big centerpiece text (rendered inside a `<blockquote>`). */
  quote: string;
  author: {
    name: string;
    /** Combined title + company conventionally, e.g. "Co-founder, Bayt Al-Sweet". */
    role: string;
    /** Image URL, a custom ReactNode override, or undefined → Avatar initials fallback. */
    avatar?: ReactNode | string;
  };
  company: {
    /** Used as alt text for image logos and as the tab label. */
    name: string;
    /**
     * Logo as a ReactNode (preferred — pass a `currentColor` SVG for theme
     * adaptation) or a URL string (rendered as `<img>`).
     */
    logo: ReactNode | string;
  };
}

export interface TestimonialsSectionProps {
  /** 3–6 testimonials recommended. */
  testimonials: TestimonialItem[];
  /** Forwarded to SectionHeader when shown (Rule #15). */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /** Show the SectionHeader label. Default true. */
  showSectionHeader?: boolean;
  /**
   * Auto-rotate interval in ms (Rule #16: 5000ms default; minimum 5s).
   * Set to 0 to disable rotation (manual logo clicks only).
   */
  autoRotateInterval?: number;
  /** Pause auto-rotation after a logo click. Default true. */
  pauseOnInteraction?: boolean;
  /** How long to pause after a click (ms). Default 10000. */
  pauseDuration?: number;
  /** Section id (anchor). Default "testimonials". */
  id?: string;
  className?: string;
}

const DEFAULT_SECTION_HEADER = {
  title: "Testimonials",
  description: "What customer-facing teams say about running on Azeer.",
};

/** Render an avatar from a URL string, a ReactNode override, or initials fallback. */
function renderAvatar(author: TestimonialItem["author"]) {
  if (typeof author.avatar === "string") {
    return <Avatar src={author.avatar} alt={author.name} name={author.name} size="lg" />;
  }
  if (author.avatar) {
    return (
      <div className="size-10 overflow-hidden rounded-full bg-bg-muted">{author.avatar}</div>
    );
  }
  return <Avatar alt={author.name} name={author.name} size="lg" />;
}

/**
 * TestimonialsSection — single-centerpiece testimonial carousel. Large
 * pull-quote auto-rotates through customer voices; a row of company logos
 * doubles as a tab nav with a progress bar showing time until the next
 * rotation. Click a logo to jump (rotation pauses for `pauseDuration`).
 *
 * Distinct from `UseCasesSection`'s `TestimonialStack` — this is the
 * high-emphasis "featured voice" pattern (one prominent at a time), not
 * the stacked supporting-proof pattern.
 *
 * Composite: `SectionRails` + `SectionHeader` + `MotionPreset` (entrance on
 * change) + `Avatar` + `CompanyLogoStrip`. Client Component (state +
 * `setTimeout` rotation + `useRef`-tracked pause timer for click-spam safety).
 *
 * Rotation calibration (Rule #16): default 5000ms; never below 5s. Progress
 * bar uses a CSS scale transform (RTL-aware via `origin-left rtl:origin-right`,
 * Rule #19) rather than a JS interval — smoother and cheaper. Under
 * `prefers-reduced-motion: reduce`, auto-rotation is disabled and the
 * progress bar is suppressed; users navigate manually via the logo strip.
 *
 * Hover does NOT pause (different from `UseCasesSection`). This section is
 * always-on advertising; pause-on-hover would feel twitchy. Only an explicit
 * click pauses, for `pauseDuration` ms.
 *
 * Semantic HTML (Rule #11 sub-rule): the centerpiece is a `<blockquote><p>`,
 * NOT a heading. "Big text" ≠ "must be a heading" — the quote is quoted
 * content, not a section title. SectionHeader's `<h2>` carries the section's
 * heading role.
 *
 * Typography (Rule #11): quote `text-mkt-display-md lg:text-mkt-display-lg`
 * (weight 500, no `font-semibold` override). No `text-balance` anywhere
 * (Rule #20).
 *
 * RTL: logical `border-e` cell separators (Rule #19); progress bar
 * `rtl:origin-right` so it grows from logical start; `text-center` is
 * direction-agnostic.
 *
 * Adapted from Orion's `testimonials-section.tsx`. Dropped: dual-image
 * dark-logo trick (consumers ship `currentColor` SVGs); JS-interval
 * progress bar replaced with CSS scale transform.
 */
export function TestimonialsSection({
  testimonials,
  sectionHeader,
  showSectionHeader = true,
  autoRotateInterval = 5000,
  pauseOnInteraction = true,
  pauseDuration = 10000,
  id = "testimonials",
  className,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const header = { ...DEFAULT_SECTION_HEADER, ...sectionHeader };

  // Auto-rotation. Re-runs on each activeIndex change to schedule the next tick.
  useEffect(() => {
    if (autoRotateInterval <= 0 || paused || prefersReducedMotion) return;
    if (testimonials.length === 0) return;
    const tickId = setTimeout(() => {
      setActiveIndex((curr) => (curr + 1) % testimonials.length);
    }, autoRotateInterval);
    return () => clearTimeout(tickId);
  }, [activeIndex, autoRotateInterval, paused, prefersReducedMotion, testimonials.length]);

  // Cleanup the pause timer on unmount.
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current !== null) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (!pauseOnInteraction || pauseDuration <= 0) return;
    if (pauseTimerRef.current !== null) {
      clearTimeout(pauseTimerRef.current);
    }
    setPaused(true);
    pauseTimerRef.current = setTimeout(() => {
      setPaused(false);
      pauseTimerRef.current = null;
    }, pauseDuration);
  };

  const current = testimonials[activeIndex] ?? testimonials[0];
  const showProgress = !paused && !prefersReducedMotion;

  return (
    <SectionRails id={id} density="normal" className={cn(className)}>
      {showSectionHeader ? (
        <SectionHeader
          title={header.title}
          description={header.description}
          showCanvas={sectionHeader?.showCanvas}
          canvasIntensity={sectionHeader?.canvasIntensity}
        />
      ) : null}

      <div className="flex flex-col items-center gap-12 py-12 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-4xl text-center">
          <MotionPreset key={activeIndex} fade blur inView={false}>
            <blockquote className="flex flex-col items-center gap-6">
              <p className="text-mkt-display-md text-content-emphasis lg:text-mkt-display-lg">
                &ldquo;{current?.quote}&rdquo;
              </p>
              {current ? (
                <div className="flex flex-col items-center gap-3">
                  {renderAvatar(current.author)}
                  <footer className="text-center">
                    <cite className="not-italic">
                      <span className="block text-mkt-body font-medium text-content-emphasis">
                        {current.author.name}
                      </span>
                      <span className="block text-mkt-body-sm text-content-muted">
                        {current.author.role}
                      </span>
                    </cite>
                  </footer>
                </div>
              ) : null}
            </blockquote>
          </MotionPreset>
        </div>
      </div>

      <CompanyLogoStrip
        items={testimonials}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        rotateInterval={autoRotateInterval}
        showProgress={showProgress}
      />
    </SectionRails>
  );
}
