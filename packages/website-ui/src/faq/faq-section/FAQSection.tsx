"use client";

import { useMemo, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@azeer/ui";

import { cn, type CtaAction } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { PrimaryButton, SecondaryButton } from "../../marketing-button";

export interface FAQSectionItem {
  id: string;
  question: string;
  /** Accepts strings or rich `ReactNode` (lists, links, paragraphs). */
  answer: string | ReactNode;
  /** Used to group items into columns. */
  category: string;
}

export interface FAQSectionProps {
  /** 4–12 items recommended. */
  faqs: FAQSectionItem[];
  /** Forwarded to SectionHeader when shown (Rule #15). */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /** Show the SectionHeader label. Default true. */
  showSectionHeader?: boolean;
  /** Hero h2/h3 above the columns. */
  heroTitle?: ReactNode;
  /** Hero supporting line. */
  heroDescription?: ReactNode;
  /**
   * Override category column assignment. By default we auto-detect the first
   * two unique `category` values in source order. Use this prop to pin
   * specific category names to specific columns regardless of source order.
   */
  categories?: { left: string; right?: string };
  /** Show the Docs + Contact CTAs. Default true. */
  showCTAs?: boolean;
  primaryCTA?: CtaAction;
  secondaryCTA?: CtaAction | null;
  /** Section id (anchor). Default `"faq"`. */
  id?: string;
  className?: string;
}

const TITLE_ID = "faq-title";

const DEFAULT_SECTION_HEADER = {
  title: "FAQ",
  description: "Essential answers about setup, pricing, and how Azeer handles your conversations.",
};
const DEFAULT_HERO_TITLE = "Got questions? We've got answers.";
const DEFAULT_HERO_DESCRIPTION =
  "Browse the most common questions about Azeer's setup, AI agents, and pricing — or talk to our team if you need something specific.";
const DEFAULT_PRIMARY: CtaAction = { label: "Docs", href: "/docs" };
const DEFAULT_SECONDARY: CtaAction = { label: "Contact us", href: "/contact" };

/**
 * Group FAQs by category in source order. Preserves first-seen ordering of
 * category names so the columns reflect the data shape the caller provided.
 */
function groupByCategory(faqs: FAQSectionItem[]): {
  categoriesInOrder: string[];
  groups: Map<string, FAQSectionItem[]>;
} {
  const groups = new Map<string, FAQSectionItem[]>();
  const categoriesInOrder: string[] = [];
  for (const faq of faqs) {
    if (!groups.has(faq.category)) {
      groups.set(faq.category, []);
      categoriesInOrder.push(faq.category);
    }
    groups.get(faq.category)!.push(faq);
  }
  return { categoriesInOrder, groups };
}

interface FAQColumnProps {
  /** Visual label above the column; rendered as a styled `<p>`, not a heading. */
  category?: string;
  items: FAQSectionItem[];
}

function FAQColumn({ category, items }: FAQColumnProps) {
  if (items.length === 0) return null;
  return (
    <div>
      {category ? (
        <p className="pb-2.5 text-start text-mkt-heading-sm font-medium text-accent-text">
          {category}
        </p>
      ) : null}
      <Accordion type="single" collapsible className="w-full" defaultValue={items[0]?.id}>
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="py-4 text-mkt-body font-medium text-content-emphasis">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-mkt-body text-content-muted">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

/**
 * FAQSection — two-column accordion FAQ that closes Phase 2 of Stage 2B.
 * Reduces conversion friction by addressing common buyer concerns before the
 * final CTA. Composes `SectionRails` + `SectionHeader` + hero block + paired
 * `@azeer/ui` Accordions.
 *
 * Auto-grouping: items are bucketed by `category` field in source order; the
 * first two unique categories become the left/right columns. With a single
 * unique category the layout collapses to one column. With 3+ unique
 * categories only the first two render (over-specification ignored silently
 * — split into multiple FAQSection instances or consolidate categories).
 *
 * Auto-expand: the first item in each column is open by default (via Radix
 * `defaultValue`) so the section presents one already-answered question per
 * column — gives the reader an immediate signal that questions get real
 * answers, not just collapsed headers.
 *
 * Heading hierarchy (locked-in Stage-2B convention): when
 * `showSectionHeader=true` (default), SectionHeader provides `<h2>` and the
 * hero is `<h3>`. When `false`, hero is `<h2>`. Same polymorphic `Heading`
 * pattern as CTASection (Turn 3) and UseCasesSection (Turn 4).
 *
 * Category labels render as `<p>` with strong visual treatment — visual
 * group markers, not semantic headings — so the document outline stays
 * clean (no skipped levels between h2/h3 and an accordion-trigger button).
 * Rule #11 sub-rule from Turn 5: HTML semantics match content type, not
 * visual prominence.
 *
 * Tokens (Rule #11): hero `text-mkt-display-md lg:text-mkt-display-lg`;
 * body `text-mkt-body`; category `text-mkt-heading-sm text-accent-text`.
 * Weight 500 throughout. No `text-balance` (Rule #20).
 *
 * Accordion: DS `@azeer/ui` Accordion (ChevronDown rotates 180° on open).
 * Orion's PlusIcon→minus morph is dropped — Rule #4 sub-rule (prefer DS
 * treatment over Orion when both exist; consistency compounds). The DS
 * Accordion's height transition plays regardless of reduced-motion: it's
 * INTERACTION motion conveying "content is appearing/disappearing", not
 * decorative. Rule #3 sub-rule: respect DS reduced-motion decisions on
 * its own primitives.
 *
 * Component boundaries (Rule #13 / #17): the section is `"use client"`
 * (Radix Accordion needs DOM hooks). The FAQColumn helper is internal
 * and bundles client-side here.
 *
 * RTL: symmetric two-column content — no `order` swap (Rule #19 applies to
 * asymmetric content like text+visual). ChevronDown auto-positions to
 * end-side via flex `justify-between` in the DS Trigger. Category label is
 * `text-start` (logical).
 *
 * Adapted from Orion's `faq-section.tsx`. Dropped: numeric prefixes
 * (cleaner; FAQs are self-contained, not sequential), plus-morph icon
 * technique (DS ChevronDown for system consistency). Tokens re-mapped
 * throughout.
 */
export function FAQSection({
  faqs,
  sectionHeader,
  showSectionHeader = true,
  heroTitle = DEFAULT_HERO_TITLE,
  heroDescription = DEFAULT_HERO_DESCRIPTION,
  categories,
  showCTAs = true,
  primaryCTA = DEFAULT_PRIMARY,
  secondaryCTA = DEFAULT_SECONDARY,
  id = "faq",
  className,
}: FAQSectionProps) {
  const { categoriesInOrder, groups } = useMemo(() => groupByCategory(faqs), [faqs]);

  // Resolve column category names (override via `categories` prop, else auto-detect).
  const leftCategoryName = categories?.left ?? categoriesInOrder[0];
  const rightCategoryName = categories?.right ?? categoriesInOrder[1];

  const leftItems = leftCategoryName ? (groups.get(leftCategoryName) ?? []) : [];
  const rightItems = rightCategoryName ? (groups.get(rightCategoryName) ?? []) : [];
  const isSingleColumn = !rightCategoryName || rightItems.length === 0;

  const header = { ...DEFAULT_SECTION_HEADER, ...sectionHeader };
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

      {/* Hero block */}
      <div className="flex flex-col items-center gap-5 border-b border-border-subtle py-12 text-center md:py-16 lg:py-24">
        <Heading
          id={TITLE_ID}
          className="text-mkt-display-md text-content-emphasis lg:text-mkt-display-lg"
        >
          {heroTitle}
        </Heading>
        <p className="max-w-2xl text-mkt-body text-content-muted">{heroDescription}</p>
        {showCTAs ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <PrimaryButton action={primaryCTA} />
            {secondaryCTA ? <SecondaryButton action={secondaryCTA} /> : null}
          </div>
        ) : null}
      </div>

      {/* Accordions grid */}
      <div
        className={cn(
          "grid grid-cols-1 gap-8 py-12 md:py-16 lg:gap-12 lg:py-24",
          !isSingleColumn && "lg:grid-cols-2",
        )}
      >
        <FAQColumn category={leftCategoryName} items={leftItems} />
        {!isSingleColumn ? (
          <FAQColumn category={rightCategoryName} items={rightItems} />
        ) : null}
      </div>
    </SectionRails>
  );
}
