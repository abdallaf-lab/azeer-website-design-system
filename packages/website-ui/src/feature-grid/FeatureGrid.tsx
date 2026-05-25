import type * as React from "react";
import { Card, Icon } from "@azeer/ui";
import {
  Container,
  Section,
  SectionHeading,
  cn,
  type SectionIcon,
  type SectionTone,
} from "../lib";
import { FeatureCard } from "../feature-card";

export interface FeatureGridItem {
  icon: SectionIcon;
  title: string;
  description: string;
  /** Optional link making the whole card a destination. */
  href?: string;
}

export interface FeatureGridProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: FeatureGridItem[];
  /** Columns at the `lg` breakpoint. Default 3. */
  columns?: 2 | 3 | 4;
  /**
   * Render on the marketing scale: a `display` heading + `FeatureCard` cells
   * (neutral semantic tokens, `mkt-*` type). Opt-in; default `false`.
   */
  marketing?: boolean;
  tone?: SectionTone;
  className?: string;
}

const columnClass: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * FeatureGrid — an icon-led grid of capabilities. Each cell is a Card with an
 * accent-tinted icon chip, title, and copy; pass `href` to make a cell a link.
 * `marketing` switches the cells to `FeatureCard` and the heading to the
 * marketing display scale. Presentational → Server Component.
 */
export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  marketing = false,
  tone = "canvas",
  className,
}: FeatureGridProps) {
  return (
    <Section tone={tone} className={className}>
      <Container className="flex flex-col gap-12">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            display={marketing}
            className="mx-auto"
          />
        ) : null}
        <div className={cn("grid gap-6", columnClass[columns])}>
          {items.map((item) =>
            marketing ? (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ) : (
              renderAppCard(item)
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}

/** The original app-scale cell (Card / linked Card). */
function renderAppCard(item: FeatureGridItem) {
  const body = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bg-subtle text-accent-text">
        <Icon icon={item.icon} size={20} aria-hidden="true" />
      </span>
      <h3 className="text-heading-sm text-fg-default">{item.title}</h3>
      <p className="text-body-sm text-fg-muted">{item.description}</p>
    </>
  );
  return item.href ? (
    <a
      key={item.title}
      href={item.href}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-border-default bg-surface p-5",
        "transition-colors duration-fast ease-standard hover:border-border-strong",
      )}
    >
      {body}
    </a>
  ) : (
    <Card key={item.title}>{body}</Card>
  );
}
