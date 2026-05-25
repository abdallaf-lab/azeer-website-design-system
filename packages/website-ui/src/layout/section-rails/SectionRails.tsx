import type { ReactNode } from "react";

import { cn } from "../../lib";

type SectionRailsTag = "section" | "div" | "article";
type SectionRailsDensity = "compact" | "normal" | "spacious";

export interface SectionRailsProps {
  /** Section content (rendered inside the centered, railed column). */
  children: ReactNode;
  /** Extra classes, merged onto the outer (full-bleed) element. */
  className?: string;
  /** Vertical rhythm of the inner column. Default `normal` (matches Orion). */
  density?: SectionRailsDensity;
  /** Render the dividing bottom hairline. Default true. Set false on the last section. */
  showBottomBorder?: boolean;
  /** Anchor id for in-page links (e.g. "hero", "pricing", "faq"). */
  id?: string;
  /** Semantic element for the outer wrapper. Default `section`. */
  as?: SectionRailsTag;
}

const DENSITY: Record<SectionRailsDensity, string> = {
  compact: "py-8 sm:py-12 lg:py-16",
  normal: "py-8 sm:py-16 lg:py-24",
  spacious: "py-12 sm:py-20 lg:py-32",
};

/**
 * SectionRails — the architectural section wrapper for Azeer marketing pages.
 * Two nested wrappers create Orion's vertical-rails + bottom-border treatment:
 * a full-bleed outer with a bottom hairline, and a centered `max-w-7xl` inner
 * column with left/right hairlines. Stacked sections line up into continuous
 * vertical guides — the Linear/Vercel "framed canvas" look.
 *
 * Pure layout — no client directive, no motion, no shadow. Marketing-only
 * (the product app shell owns its own chrome). Uses the 1280px marketing
 * ceiling (`max-w-7xl`), wider than the 1080px product ceiling — see README.
 *
 * RTL-safe: rails (`border-x`) and gutters (`px-*`) are symmetric; `mx-auto`
 * centers — nothing to mirror.
 *
 * Adapted from Orion's `src/components/blocks/hero-section/hero-section.tsx`
 * (lines 120–121) — the two-wrapper rails pattern, generalized.
 */
export function SectionRails({
  children,
  className,
  density = "normal",
  showBottomBorder = true,
  id,
  as: Tag = "section",
}: SectionRailsProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "px-4 sm:px-6 lg:px-8",
        showBottomBorder && "border-b border-border-subtle",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl flex-col border-x border-border-subtle px-4 sm:px-6 lg:px-8",
          DENSITY[density],
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
