"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@azeer/ui";

import { cn } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { MotionPreset } from "../../motion/motion-preset";
import { TestimonialStack, type TestimonialCard } from "./TestimonialStack";

export type { TestimonialCard } from "./TestimonialStack";

export interface UseCaseTab {
  /** Stable id (also used as the tab `value`). */
  id: string;
  /** Tab trigger label. */
  name: string;
  /** Icon element for the trigger (a Lucide icon JSX element). */
  icon: ReactNode;
  /** Active-tab heading. */
  title: string;
  /** Active-tab body. */
  description: string;
  /** Learn-more link target + optional label override (default "Learn more"). */
  learnMoreLink: { label?: string; href: string };
  /** Right-column visual — pass an `<img>`, `<video>`, or any custom node. */
  visual: ReactNode;
  /** Optional 2–5 testimonials for the stack overlay. */
  testimonials?: TestimonialCard[];
}

export interface UseCasesSectionProps {
  /** 2–5 tabs (required). */
  tabs: UseCaseTab[];
  /** Forwarded to SectionHeader when shown (Rule #15). */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /**
   * Show the SectionHeader above the hero. Default `true` — the section is
   * conventionally labeled "Use Cases". Set to `false` if you want the
   * `heroTitle` to be the section's primary heading.
   */
  showSectionHeader?: boolean;
  /** Hero h2/h3 above the tabs. Heading level adapts to `showSectionHeader`. */
  heroTitle?: ReactNode;
  /**
   * Auto-rotate interval in ms (Rule #16 calibration: 5000ms default).
   * Set to 0 to disable. Paused while the section is hovered.
   */
  autoRotateInterval?: number;
  /** Render the TestimonialStack overlay when a tab has testimonials. Default true. */
  showTestimonials?: boolean;
  /** Section id (anchor). Default `"use-cases"`. */
  id?: string;
  className?: string;
}

const TITLE_ID = "use-cases-title";

const DEFAULT_SECTION_HEADER = {
  title: "Use Cases",
  description: "See the practical ways Azeer powers customer-facing teams across verticals.",
};
const DEFAULT_HERO_TITLE = "See how Azeer powers every customer-facing team";

/**
 * UseCasesSection — tabbed showcase of vertical-specific use cases. Each tab
 * pairs a title + description + Learn-more link with a visual and an optional
 * testimonial stack overlay. Tabs auto-rotate every 5s by default, pause on
 * hover, and respect `prefers-reduced-motion` (manual nav only under reduced).
 *
 * Composite: `SectionRails` + `SectionHeader` + `@azeer/ui` `Tabs` +
 * `TestimonialStack`. Client Component (state + interval for tab rotation
 * + pause-on-hover handlers).
 *
 * Heading hierarchy: when `showSectionHeader=true` (default) SectionHeader is
 * `<h2>` and `heroTitle` is `<h3>`. When `showSectionHeader=false`, `heroTitle`
 * is `<h2>` (the section's primary heading). Matches CTASection's pattern —
 * this is the established convention for Stage 2B composites that pair
 * SectionHeader with a hero headline.
 *
 * Tabs styling — DS-compliant rectangular cells (NOT pills): DS Variants.md
 * bans pill tabs (`rounded-full` active background = "individual buttons
 * floating in a container"). This usage uses **rectangular cells** with shared
 * borders (`divide-x`), a filled active state (`bg-bg-muted`), and a tinted
 * icon container (`bg-accent-fill text-fg-on-accent` on active). The default
 * underline is removed via `border-b-0`. The "pill" rule targets shape, not
 * filled active states.
 *
 * Triggers use `flex-1` (equal-width distribution) instead of Orion's static
 * `basis-1/3` — works for any tab count without per-N CSS branches.
 *
 * Typography (Rule #11): hero `text-mkt-display-md lg:text-mkt-display-lg`;
 * tab title h3 `text-mkt-heading-lg`; body `text-mkt-body`. Weight 500.
 *
 * RTL: column order auto-mirrors; logical `border-s` on the right column;
 * Learn-more arrow uses `rtl:rotate-180` + sign-flipped hover translate
 * (Rule #12 refinement — the icon is not inside a button so Rule #18 doesn't
 * apply; pairing icon rotation with translate sign-flip preserves the "arrow
 * slides toward where it points" semantics in RTL).
 *
 * Adapted from Orion's `use-cases-section.tsx` + `testimonial-stack.tsx`. The
 * decorative gray-word headline treatment is dropped (accessibility + brand
 * fit); testimonial rotation slowed from 2s → 5s (Rule #16).
 */
export function UseCasesSection({
  tabs,
  sectionHeader,
  showSectionHeader = true,
  heroTitle = DEFAULT_HERO_TITLE,
  autoRotateInterval = 5000,
  showTestimonials = true,
  id = "use-cases",
  className,
}: UseCasesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? "");
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const header = { ...DEFAULT_SECTION_HEADER, ...sectionHeader };

  useEffect(() => {
    if (autoRotateInterval <= 0 || paused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        const i = tabs.findIndex((t) => t.id === curr);
        return tabs[(i + 1) % tabs.length]?.id ?? curr;
      });
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotateInterval, paused, prefersReducedMotion, tabs]);

  // Heading level adapts to whether SectionHeader is shown (mirror of
  // CTASection's pattern — established convention for Stage 2B composites).
  const Heading = showSectionHeader ? "h3" : "h2";

  return (
    <SectionRails id={id} ariaLabelledby={TITLE_ID} density="normal" className={cn(className)}>
      {showSectionHeader ? (
        <SectionHeader
          title={header.title}
          description={header.description}
          showCanvas={sectionHeader?.showCanvas}
          canvasIntensity={sectionHeader?.canvasIntensity}
        />
      ) : null}

      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/*
           * Grid column order is swapped under RTL via explicit `order` utilities.
           * CSS Grid does NOT reliably auto-mirror columns based on `dir="rtl"`
           * in every browser — column placement stays physical unless we
           * intervene. The `order` property is grid-aware: at `lg+` we pin the
           * hero column to logical start (order 1 in LTR, order 2 in RTL) and
           * the visual column to logical end (order 2 in LTR, order 1 in RTL).
           * `border-s` on the visual column is already logical and correct in
           * both directions — no change there.
           */}
          <div className="grid lg:grid-cols-3">
            {/* Left in LTR / right in RTL — hero + active tab content + tab triggers */}
            <div className="flex flex-col justify-between lg:col-span-2 lg:order-1 rtl:lg:order-2">
              {/*
               * `text-balance` (CSS `text-wrap: balance`) is gated to LTR.
               * Browsers diverge in how they apply balanced wrapping under
               * `direction: rtl` — some re-center balanced lines, breaking
               * `text-start` alignment for Arabic headlines. LTR keeps the
               * aesthetic win; RTL falls back to natural wrap with reliable
               * start alignment.
               */}
              <Heading
                id={TITLE_ID}
                className="px-4 py-9 text-start ltr:text-balance text-mkt-display-md text-content-emphasis sm:px-6 lg:px-8 lg:text-mkt-display-lg"
              >
                {heroTitle}
              </Heading>
              <div className="border-t border-border-subtle">
                {tabs.map((tab) => (
                  <TabsContent
                    key={tab.id}
                    value={tab.id}
                    className="mt-0 px-4 pt-8 sm:px-6 lg:px-8"
                  >
                    <MotionPreset fade blur inView={false}>
                      <div className="space-y-4">
                        <h3 className="text-start text-mkt-heading-lg text-content-emphasis">
                          {tab.title}
                        </h3>
                        <p className="text-start text-mkt-body text-content-subtle">
                          {tab.description}
                        </p>
                        <LearnMoreLink
                          href={tab.learnMoreLink.href}
                          label={tab.learnMoreLink.label ?? "Learn more"}
                        />
                      </div>
                    </MotionPreset>
                  </TabsContent>
                ))}
              </div>

              {/*
               * Tab triggers — rectangular cells with shared inline-start
               * borders (logical via `[&>*:not(:first-child)]:border-s`, NOT
               * the physical `divide-x` which puts borders on the wrong edges
               * in RTL) and a filled `bg-bg-muted` active state. DS-compliant:
               * pill SHAPE is banned, but filled active states on rectangular
               * cells are fine. The default underline is removed via `border-b-0`.
               */}
              <TabsList
                className={cn(
                  "mt-8 h-auto w-full flex-wrap border-t border-border-subtle border-b-0 bg-transparent p-0 gap-0 rounded-none",
                  "[&>*:not(:first-child)]:border-s [&>*:not(:first-child)]:border-border-subtle",
                )}
              >
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "group flex-1 min-w-0 cursor-pointer items-center gap-3 rounded-none px-4 py-4 font-medium text-mkt-body-sm text-content-default transition-colors max-sm:flex-col sm:h-18 sm:gap-4 sm:flex-row",
                      "border-b-0 mb-0",
                      "hover:bg-bg-muted/50",
                      "data-[state=active]:bg-bg-muted data-[state=active]:text-content-emphasis data-[state=active]:shadow-none",
                    )}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-accent-bg-subtle text-accent-text transition-colors group-data-[state=active]:bg-accent-fill group-data-[state=active]:text-fg-on-accent [&>svg]:size-4">
                      {tab.icon}
                    </span>
                    <span className="text-wrap text-mkt-body-sm">{tab.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Right in LTR / left in RTL — visual + testimonial stack (lg+
                only). Radix unmounts inactive TabsContent by default → each
                tab's stack mounts fresh, starting at index 0 (the founder's
                "reset on tab change" requirement). */}
            <div className="border-s border-border-subtle max-lg:hidden lg:order-2 rtl:lg:order-1">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} asChild className="mt-0">
                  <div className="relative h-140 w-full overflow-hidden">
                    {tab.visual}
                    {showTestimonials && tab.testimonials?.length ? (
                      <div className="absolute inset-x-6 bottom-6">
                        <TestimonialStack testimonials={tab.testimonials} />
                      </div>
                    ) : null}
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </SectionRails>
  );
}

/* ── LearnMoreLink ───────────────────────────────────────────────── */

function LearnMoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-mkt-body-sm font-medium text-accent-text hover:underline"
    >
      {label}
      {/*
       * Rule #12 refinement + sub-rule pairing with #18:
       *   • This arrow is purely decorative (no button primitive wrapping;
       *     Rule #18's `flipOnRtl` applies to buttons only — and there's no
       *     button mechanism here).
       *   • For a horizontal arrow, `rtl:rotate-180` correctly mirrors it.
       *   • The hover-translate must ALSO flip sign in RTL
       *     (`rtl:group-hover:-translate-x-0.5`), otherwise the arrow points
       *     left but slides right on hover (jarring).
       *   • Together they preserve "arrow slides toward where it points" in
       *     both LTR and RTL.
       */}
      <ArrowRight
        className="size-4 transition-transform duration-200 ltr:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
