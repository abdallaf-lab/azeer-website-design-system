import type { ReactNode } from "react";

import { cn, type CtaAction } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { PrimaryButton, SecondaryButton } from "../../marketing-button";
import { StatItem, type CTAStat } from "./StatItem";

export type { CTAStat } from "./StatItem";

export interface CTASectionProps {
  /** Headline. Default: revenue-framed Azeer copy. */
  title?: ReactNode;
  /** Sub-headline. */
  description?: ReactNode;
  /**
   * Accent CTA (icon is a Lucide component; RTL-flipped automatically by
   * `<Icon flipOnRtl>` inside the marketing buttons — Rule #18, never manual
   * rotate on directional icons).
   */
  primaryCTA?: CtaAction;
  /** Neutral CTA. Pass `null` to omit. */
  secondaryCTA?: CtaAction | null;
  /** 2–4 supporting stats. */
  stats: CTAStat[];
  /**
   * Show a SectionHeader above the CTA. Default `false` — the section IS the
   * call-to-action, not a labeled section.
   */
  showSectionHeader?: boolean;
  /** Forwarded to SectionHeader when shown (Rule #15). */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /** Section id (anchor). Default `"get-started"` (customer-facing, not engineer-speak). */
  id?: string;
  className?: string;
}

const TITLE_ID = "cta-title";

const DEFAULT_TITLE = "Ready to turn conversations into revenue?";
const DEFAULT_DESCRIPTION =
  "Start your free 14-day trial today — no credit card required. Connect your Salla or Zid store in minutes, or talk to our team about a custom rollout for your brand.";

/**
 * CTASection — the final-conversion section: headline + dual CTAs on the left,
 * supporting proof stats on the right. Server Component throughout (Rule #13/#17):
 * no hooks, no event handlers, no `"use client"` anywhere — smallest possible
 * JS bundle for the bottom of the marketing page.
 *
 * Heading hierarchy: when `showSectionHeader` is on, SectionHeader provides
 * `<h2>` and this section's headline renders as `<h3>` (proper outline);
 * when off, the headline renders as `<h2>` (it IS the section's heading).
 *
 * Optional `SectionHeader` is OFF by default. When on, every SectionHeader prop
 * is forwarded (Rule #15).
 *
 * Typography (Rule #11): headline `text-mkt-display-md lg:text-mkt-display-lg`
 * (the FINAL push gets the second-biggest scale in the page, after the hero);
 * stat values `text-mkt-display-md`. Weight 500 throughout — no
 * `font-semibold` override.
 *
 * Calibration (sub-rule under #16): CTA sections are the QUIETEST sections
 * visually — no background patterns, no decorative SVGs, no canvas behind the
 * CTAs. The button itself is the focal point; everything else recedes.
 *
 * RTL-safe: column separators use logical `md:border-s`; symmetric
 * `md:pe-* / md:ps-*` breathing room around the divider; CTA arrow icons flip
 * via `<Icon flipOnRtl>` inside the marketing buttons (Rule #18, no manual
 * rotation). Stat values use Western digits in both languages.
 *
 * Adapted from Orion's `cta-section.tsx` — `<Grill />` SVG + `<Card>` wrapper
 * dropped (Rule #16 + calm aesthetic); `<NumberTicker>` dropped;
 * `CTAStat.value` is a single string (handles %, x, K+, ranges, inequalities
 * without animation infra).
 */
export function CTASection({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  primaryCTA = { label: "Start free trial", href: "/signup" },
  secondaryCTA,
  stats,
  showSectionHeader = false,
  sectionHeader,
  id = "get-started",
  className,
}: CTASectionProps) {
  // Proper heading outline: SectionHeader h2 + inner h3 when labeled;
  // inner h2 when standalone.
  const Heading = showSectionHeader ? "h3" : "h2";

  return (
    <SectionRails
      id={id}
      ariaLabelledby={TITLE_ID}
      density="normal"
      className={cn(className)}
    >
      {showSectionHeader ? (
        <SectionHeader
          title={sectionHeader?.title ?? "Get started"}
          description={
            sectionHeader?.description ??
            "Start free or talk to our team about a custom rollout."
          }
          showCanvas={sectionHeader?.showCanvas}
          canvasIntensity={sectionHeader?.canvasIntensity}
        />
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — CTA card. Generous trailing padding around the column divider. */}
        <div className="flex flex-col justify-center py-12 md:py-16 md:pe-8 lg:py-20 lg:pe-12">
          <Heading
            id={TITLE_ID}
            className="text-balance text-mkt-display-md text-content-emphasis lg:text-mkt-display-lg"
          >
            {title}
          </Heading>
          <p className="mt-4 max-w-prose text-pretty text-mkt-body text-content-subtle">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <PrimaryButton action={primaryCTA} />
            {secondaryCTA ? <SecondaryButton action={secondaryCTA} /> : null}
          </div>
        </div>

        {/* Right — stats stack. Logical `md:border-s` separator + symmetric leading padding. */}
        <div className="flex flex-col border-t border-border-subtle md:border-t-0 md:border-s md:ps-8 lg:ps-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} isLast={i === stats.length - 1} />
          ))}
        </div>
      </div>
    </SectionRails>
  );
}
