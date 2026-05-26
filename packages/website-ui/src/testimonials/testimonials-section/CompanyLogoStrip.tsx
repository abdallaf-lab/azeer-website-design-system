"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "../../lib";

export interface CompanyLogoStripItem {
  id: string;
  company: { name: string; logo: ReactNode | string };
}

export interface CompanyLogoStripProps {
  items: CompanyLogoStripItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Progress-bar / rotation duration in ms. 0 disables the bar (manual mode). */
  rotateInterval: number;
  /** When false, the progress bar is suppressed (paused after interaction or under reduced motion). */
  showProgress: boolean;
  className?: string;
}

function renderLogo(logo: ReactNode | string, alt: string): ReactNode {
  if (typeof logo === "string") {
    return <img src={logo} alt={alt} className="h-8 object-contain" />;
  }
  return logo;
}

/**
 * Single thin progress bar that grows from logical start (left in LTR, right
 * in RTL) to full via a CSS scale-x transition. Lives inside the active logo
 * cell; when the active cell changes, the previous bar unmounts and this one
 * remounts fresh in the new cell — so the animation auto-resets on rotation
 * without an explicit reset effect.
 *
 * Rule #19 — `origin-left rtl:origin-right` keeps growth direction logical
 * (matches the user's reading direction) in both LTR and RTL.
 */
function ProgressBar({ durationMs }: { durationMs: number }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-accent-fill rtl:origin-right"
      style={{
        transform: filled ? "scaleX(1)" : "scaleX(0)",
        transition: `transform ${durationMs}ms linear`,
      }}
    />
  );
}

/**
 * CompanyLogoStrip — clickable row of company logos with a progress bar
 * indicating time until the next rotation. Each cell is a tab-like button
 * that jumps to its testimonial. Active = full opacity; inactive =
 * `opacity-50 grayscale`. Borders between cells use logical `border-e`
 * (Rule #19) so the separators land correctly in both directions.
 *
 * Rule #21 — variable-count layout uses CSS Grid auto-fit
 * (`grid-cols-[repeat(auto-fit,minmax(140px,1fr))]`): handles 3–6 logos
 * gracefully, wraps cleanly when too narrow, no JS sizing logic.
 */
export function CompanyLogoStrip({
  items,
  activeIndex,
  onSelect,
  rotateInterval,
  showProgress,
  className,
}: CompanyLogoStripProps) {
  return (
    <div
      role="tablist"
      aria-label="Featured customer logos"
      className={cn(
        "grid w-full border-t border-border-subtle grid-cols-[repeat(auto-fit,minmax(140px,1fr))]",
        className,
      )}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Show testimonial from ${item.company.name}`}
            onClick={() => onSelect(index)}
            className={cn(
              "group relative flex h-20 cursor-pointer items-center justify-center px-4 transition-opacity duration-300",
              "[&:not(:last-child)]:border-e [&:not(:last-child)]:border-border-subtle",
              isActive ? "opacity-100" : "opacity-50 grayscale hover:opacity-75",
            )}
          >
            {renderLogo(item.company.logo, item.company.name)}
            {isActive && showProgress && rotateInterval > 0 ? (
              <ProgressBar durationMs={rotateInterval} />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
