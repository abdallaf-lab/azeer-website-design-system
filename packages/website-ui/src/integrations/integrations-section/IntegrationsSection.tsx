import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { IntegrationCard, type IntegrationsSectionItem } from "./IntegrationCard";

export type { IntegrationsSectionItem } from "./IntegrationCard";

export interface IntegrationsSectionProps {
  /** 4–12 integrations recommended. */
  integrations: IntegrationsSectionItem[];
  /** Forwarded to SectionHeader when shown (Rule #15). */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /** Show the SectionHeader label. Default true. */
  showSectionHeader?: boolean;
  /** Hero h2/h3 above the grid. */
  heroTitle?: ReactNode;
  /** Hero supporting line. */
  heroDescription?: ReactNode;
  /** Render the hero "View all integrations" arrow link. Default true. */
  showHeroCTA?: boolean;
  /** Override the hero CTA target. */
  heroCTA?: { label?: string; href: string; external?: boolean };
  /**
   * Group cards by category. When `true`, render each category as its own
   * subsection (with a `<p>` label) and hide the per-card category badge.
   * Default `false` (single auto-fit grid with badges on each card).
   */
  groupByCategory?: boolean;
  /** Section id (anchor). Default `"integrations"`. */
  id?: string;
  className?: string;
}

const TITLE_ID = "integrations-title";

const DEFAULT_SECTION_HEADER = {
  title: "Integrations",
  description: "Azeer connects with the tools your team already uses.",
};
const DEFAULT_HERO_TITLE = "Connect Azeer to your stack";
const DEFAULT_HERO_DESCRIPTION =
  "Pre-built integrations for e-commerce, CRM, messaging, and scheduling — plus an API for everything else.";
const DEFAULT_HERO_CTA = { label: "View all integrations", href: "/integrations" };

const GRID_CLASS = "grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]";

interface CategoryGroup {
  category: string;
  items: IntegrationsSectionItem[];
}

/**
 * Group integrations by category in source order. Plain function — no
 * `useMemo` — because this is a Server Component (no hooks). Re-runs on every
 * render with new props; fine for typical 4–12 item arrays.
 */
function groupItems(items: IntegrationsSectionItem[]): CategoryGroup[] {
  const order: string[] = [];
  const map = new Map<string, IntegrationsSectionItem[]>();
  for (const item of items) {
    if (!map.has(item.category)) {
      map.set(item.category, []);
      order.push(item.category);
    }
    map.get(item.category)!.push(item);
  }
  return order.map((category) => ({ category, items: map.get(category)! }));
}

/**
 * IntegrationsSection — curated integration showcase for the marketing page.
 * The **lean** variant of the Orion integration pattern: drops the search +
 * sidebar filter (those belong on a dedicated `/integrations` directory
 * page), keeps the card grid. Homepage visitors need to SEE that Azeer
 * connects with what they use; they don't need to filter through a directory.
 *
 * **Server Component throughout** (Rule #13/#17): no hooks, no handlers, no
 * `"use client"`. Smallest possible JS for a "trust signal" section near the
 * page bottom — major Core Web Vitals win.
 *
 * Heading hierarchy (locked-in Stage-2B convention): when
 * `showSectionHeader=true` (default), SectionHeader provides `<h2>`, hero is
 * `<h3>`, card names are `<h4>` — clean h2 → h3 → h4 outline. When false:
 * hero `<h2>`, card names `<h3>` — h2 → h3. No skipped levels in either case.
 * Both hero AND card use the polymorphic `const Heading` pattern.
 *
 * Group-by-category: when `groupByCategory=true`, items are bucketed in source
 * order (insertion-order Map, same pattern as FAQSection). Each group renders
 * its own grid below a styled `<p>` label (not a heading — keeps outline
 * clean per Rule #11 sub-rule). The per-card category badge is hidden in
 * grouped mode to avoid redundancy with the group label.
 *
 * Grid (Rule #21): `grid-cols-[repeat(auto-fit,minmax(280px,1fr))]` — handles
 * any count 4–12+ without per-N CSS branches; wraps gracefully on narrow
 * viewports.
 *
 * Featured cards (Rule #22): the `IntegrationCard` `featured` flag applies a
 * subtle `ring-1 ring-accent-border` — NOT a BorderBeam. BorderBeam is
 * reserved for single-emphasis conversion moments (pricing highlight, hero).
 *
 * Typography (Rule #11): hero `text-mkt-display-md lg:text-mkt-display-lg`;
 * card title `text-mkt-heading-sm`; description `text-mkt-body-sm`; category
 * label `text-mkt-heading-sm`. Weight 500 throughout, no `font-semibold`. No
 * `text-balance` (Rule #20).
 *
 * RTL: grid auto-fit is symmetric (Rule #21); logical spacing throughout;
 * arrow icons in Learn-more + hero CTA use `rtl:rotate-180` + sign-flipped
 * hover translate (Rule #12 refinement + Turn-4 paired-transform sub-rule).
 *
 * Adapted from Orion's `app-integration/integration-tools.tsx` (lean
 * variant — sidebar + search dropped; auto-fit grid replaces sm:grid-cols-2).
 */
export function IntegrationsSection({
  integrations,
  sectionHeader,
  showSectionHeader = true,
  heroTitle = DEFAULT_HERO_TITLE,
  heroDescription = DEFAULT_HERO_DESCRIPTION,
  showHeroCTA = true,
  heroCTA = DEFAULT_HERO_CTA,
  groupByCategory = false,
  id = "integrations",
  className,
}: IntegrationsSectionProps) {
  const header = { ...DEFAULT_SECTION_HEADER, ...sectionHeader };
  const Heading = showSectionHeader ? "h3" : "h2";
  const cardHeading: "h3" | "h4" = showSectionHeader ? "h4" : "h3";
  const groups = groupByCategory ? groupItems(integrations) : [];

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

      {/* Hero block */}
      <div className="flex flex-col items-center gap-5 border-b border-border-subtle py-12 text-center md:py-16 lg:py-20">
        <Heading
          id={TITLE_ID}
          className="text-mkt-display-md text-content-emphasis lg:text-mkt-display-lg"
        >
          {heroTitle}
        </Heading>
        <p className="max-w-2xl text-mkt-body text-content-muted">{heroDescription}</p>
        {showHeroCTA && heroCTA ? (
          <a
            href={heroCTA.href}
            target={heroCTA.external ? "_blank" : undefined}
            rel={heroCTA.external ? "noopener noreferrer" : undefined}
            className="group mt-2 inline-flex items-center gap-1.5 text-mkt-body-sm font-medium text-accent-text hover:underline"
          >
            {heroCTA.label ?? DEFAULT_HERO_CTA.label}
            <ArrowRight
              className="size-4 transition-transform duration-200 ltr:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        ) : null}
      </div>

      {/* Cards */}
      {groupByCategory ? (
        <div className="flex flex-col gap-12 py-12 md:py-16 lg:py-20">
          {groups.map((group) => (
            <div key={group.category}>
              <p className="pb-4 text-start text-mkt-heading-sm font-medium text-accent-text">
                {group.category}
              </p>
              <div className={GRID_CLASS}>
                {group.items.map((item) => (
                  <IntegrationCard
                    key={item.id}
                    integration={item}
                    headingAs={cardHeading}
                    hideCategory
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={cn(GRID_CLASS, "py-12 md:py-16 lg:py-20")}>
          {integrations.map((item) => (
            <IntegrationCard key={item.id} integration={item} headingAs={cardHeading} />
          ))}
        </div>
      )}
    </SectionRails>
  );
}
