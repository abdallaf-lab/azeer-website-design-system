import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../../lib";

export interface IntegrationsSectionItem {
  id: string;
  name: string;
  /** Logo as a ReactNode (preferred — pass a `currentColor` SVG) or URL string. */
  logo: ReactNode | string;
  /** Group label (also shown as a per-card badge unless grouping is active). */
  category: string;
  /** 1–2 sentence customer-facing summary (rendered as a `line-clamp-3` `<p>`). */
  description: string;
  /** Link target for the "Learn more" anchor. */
  link: {
    /** Default `"Learn more"`. */
    label?: string;
    href: string;
    /** Adds `target="_blank" rel="noopener noreferrer"`. Default false. */
    external?: boolean;
  };
  /**
   * Apply a subtle accent ring to highlight strategic partners. Use sparingly
   * (1–2 cards per section) — Rule #22: featured states on items in
   * lists/grids use subtle treatment; BorderBeam is reserved for
   * single-emphasis conversion moments (the pricing highlight, the hero).
   */
  featured?: boolean;
}

export interface IntegrationCardProps {
  integration: IntegrationsSectionItem;
  /** Heading level for the integration name. Default `h4`. */
  headingAs?: "h2" | "h3" | "h4" | "h5";
  /** Hide the per-card category badge (used when the parent section groups by category). */
  hideCategory?: boolean;
  className?: string;
}

function renderLogo(logo: ReactNode | string, alt: string): ReactNode {
  if (typeof logo === "string") {
    return <img src={logo} alt={alt} className="size-full object-contain" />;
  }
  return logo;
}

/**
 * IntegrationCard — single curated integration tile: logo + name + (optional)
 * category badge + description + Learn-more link. Server Component (pure
 * presentation, no hooks).
 *
 * Card-name heading level is polymorphic via `headingAs` so the parent section
 * can produce a clean document outline whether or not it shows a SectionHeader
 * above (h2 → h3 → h4 with SectionHeader; h2 → h3 without). Rule #11 sub-rule:
 * card names are headings (item identifiers carry navigational semantics for
 * screen readers); category group labels are `<p>` (group markers, not
 * navigational items).
 *
 * `featured` adds `ring-1 ring-accent-border` — subtle, calm. Use sparingly
 * per Rule #22.
 *
 * RTL: logical `gap-*` / `items-*`; the Learn-more arrow mirrors via
 * `rtl:rotate-180` + sign-flipped hover translate (Rule #12 refinement + the
 * Turn-4 paired-transform sub-rule — decorative inline arrow icon in a
 * non-button context).
 */
export function IntegrationCard({
  integration,
  headingAs = "h4",
  hideCategory = false,
  className,
}: IntegrationCardProps) {
  const NameHeading = headingAs;
  const linkLabel = integration.link.label ?? "Learn more";

  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border-subtle bg-bg-default p-6 transition-colors duration-200 hover:border-border-emphasis",
        integration.featured && "ring-1 ring-accent-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-bg-muted p-1.5">
            {renderLogo(integration.logo, integration.name)}
          </span>
          <NameHeading className="text-mkt-heading-sm font-medium text-content-emphasis">
            {integration.name}
          </NameHeading>
        </div>
        {!hideCategory ? (
          <span className="shrink-0 rounded-full bg-accent-bg-subtle px-2.5 py-0.5 text-mkt-caption font-medium text-accent-text">
            {integration.category}
          </span>
        ) : null}
      </div>

      <p className="line-clamp-3 text-mkt-body-sm text-content-muted">
        {integration.description}
      </p>

      <a
        href={integration.link.href}
        target={integration.link.external ? "_blank" : undefined}
        rel={integration.link.external ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-1.5 text-mkt-body-sm font-medium text-accent-text hover:underline"
      >
        {linkLabel}
        {/*
         * Rule #12 refinement + Turn-4 paired-transform sub-rule (Rule #18
         * scope): decorative arrow not inside a button primitive. `rtl:rotate-180`
         * mirrors the icon; `ltr:group-hover:translate-x-0.5` +
         * `rtl:group-hover:-translate-x-0.5` preserves "arrow slides toward
         * where it points" in both directions.
         */}
        <ArrowRight
          className="size-4 transition-transform duration-200 ltr:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </article>
  );
}
