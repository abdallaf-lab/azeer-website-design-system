import type { ReactNode } from "react";

import { cn } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { ChannelsVisual } from "./visuals/ChannelsVisual";
import { AIAgentsVisual } from "./visuals/AIAgentsVisual";
import { WorkflowVisual } from "./visuals/WorkflowVisual";
import { VerticalTemplatesVisual } from "./visuals/VerticalTemplatesVisual";
import { ComplianceVisual } from "./visuals/ComplianceVisual";

export interface FeatureCell {
  title: string;
  description: string;
  visual: ReactNode;
  /** `wide` spans 2 columns on `sm+`. */
  gridSpan?: "normal" | "wide";
  /** Optional anchor id for the cell heading. */
  id?: string;
}

export interface FeaturesBentoGridProps {
  /** Override the 5-cell default. */
  features?: FeatureCell[];
  /**
   * Override the section header. Forwards every SectionHeader prop (Rule #15)
   * so callers can fully control the label without bypassing the section.
   */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /** Section id (for anchor links). Default `"features"`. */
  id?: string;
  className?: string;
}

const DEFAULT_SECTION = {
  title: "Features",
  description:
    "Boost your team's efficiency with an AI-assisted workspace that unifies every customer conversation.",
};

const DEFAULT_FEATURES: FeatureCell[] = [
  {
    title: "Channel Unification",
    description:
      "Unify WhatsApp, Voice, SMS, and email into one AI-assisted workspace — so your team replies faster and customers stay happy.",
    visual: <ChannelsVisual />,
  },
  {
    title: "AI Agents",
    description:
      "Deploy AI agents that handle FAQs, qualify leads, and escalate complex queries to humans — 24/7, in Arabic and English.",
    visual: <AIAgentsVisual />,
  },
  {
    title: "Workflow Automation",
    description:
      "Build journeys that recover abandoned carts, confirm appointments, and re-engage customers automatically based on their behavior.",
    visual: <WorkflowVisual />,
  },
  {
    title: "Multi-Vertical Templates",
    description:
      "Pre-built journeys for e-commerce (Salla, Zid) and healthcare (clinic groups, dental chains) — launch in days, not months.",
    visual: <VerticalTemplatesVisual />,
    gridSpan: "wide",
  },
  {
    title: "Compliance & Trust",
    description:
      "GDPR, HIPAA-ready for healthcare clinics, with full audit trails and customer consent management.",
    visual: <ComplianceVisual />,
  },
];

/**
 * Per-cell border + order classes mirroring Orion's 5-cell bento — logical
 * `border-s`/`border-e` for RTL correctness. Indices map to:
 *   0 top-left · 1 top-mid · 2 top-right (reordered on sm)
 *   3 bottom-wide (sm:col-span-2) · 4 bottom-right (reordered on sm)
 * Custom feature arrays of length ≠ 5 still use these classes by index; the
 * `order-1` / `col-span-2` rules degrade gracefully on shorter arrays.
 */
const CELL_CLASSES: readonly string[] = [
  "border-border-subtle max-sm:border-b",
  "border-border-subtle sm:border-s lg:border-x",
  "border-border-subtle max-lg:order-1 max-lg:border-t sm:max-lg:border-e",
  "border-border-subtle border-t sm:col-span-2 lg:border-e",
  "border-border-subtle border-t max-lg:order-1",
];

/**
 * FeaturesBentoGrid — the section below the hero that explains what Azeer
 * does. A SectionHeader-labeled, 5-cell bento grid: each cell pairs a visual
 * with a heading + description on the marketing scale. Server Component
 * (Rule #13); only the inner SectionHeader carries `"use client"` for its
 * canvas.
 *
 * Composes SectionRails (rails) + SectionHeader (label) + visual sub-components
 * (`./visuals/*`). Custom feature arrays are supported via the `features` prop.
 * Per Rule #15 the `sectionHeader` prop forwards every SectionHeader option
 * (incl. `showCanvas` / `canvasIntensity`) so callers can fully control the
 * label without bypassing the section.
 *
 * RTL-safe: cell separators use logical `border-s`/`border-e`; the grid's
 * column order is the same in LTR and RTL (the grid auto-mirrors visually).
 *
 * Adapted from Orion's `src/components/blocks/features-bento-grid/`
 * (re-skinned to Azeer tokens; visuals re-authored for a B2B-premium feel —
 * no `LetterGlitch` / continuous animations).
 */
export function FeaturesBentoGrid({
  features = DEFAULT_FEATURES,
  sectionHeader,
  id = "features",
  className,
}: FeaturesBentoGridProps) {
  const header = { ...DEFAULT_SECTION, ...sectionHeader };

  return (
    <SectionRails id={id} density="normal" className={className}>
      <SectionHeader
        title={header.title}
        description={header.description}
        showCanvas={sectionHeader?.showCanvas}
        canvasIntensity={sectionHeader?.canvasIntensity}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((cell, index) => (
          <article
            key={cell.id ?? cell.title}
            id={cell.id}
            className={cn(
              "flex flex-col gap-6 overflow-hidden py-6",
              CELL_CLASSES[index] ?? "border-border-subtle border-t sm:border-s",
              cell.gridSpan === "wide" && "sm:col-span-2",
            )}
          >
            {cell.visual}
            <div className="space-y-3 px-6 sm:px-8">
              <h3 className="text-mkt-heading-sm text-content-emphasis">{cell.title}</h3>
              <p className="text-mkt-body text-content-subtle">{cell.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionRails>
  );
}
