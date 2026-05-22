import type * as React from "react";
import {
  Container,
  Section,
  SectionHeading,
  cn,
  type SectionTone,
} from "../lib";

export interface Stat {
  /** Headline figure, e.g. "99.99%" or "2.4B". */
  value: React.ReactNode;
  label: string;
  description?: string;
}

export interface StatsBandProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  stats: Stat[];
  tone?: SectionTone;
  className?: string;
}

const columnClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

/**
 * StatsBand — a row of headline metrics (uptime, volume, customers). The figure
 * uses the display tier in accent; the label sits muted beneath. Presentational.
 */
export function StatsBand({
  eyebrow,
  title,
  description,
  stats,
  tone = "canvas",
  className,
}: StatsBandProps) {
  const cols = columnClass[stats.length] ?? "grid-cols-2 lg:grid-cols-4";
  return (
    <Section tone={tone} className={className}>
      <Container className="flex flex-col gap-12">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            className="mx-auto"
          />
        ) : null}
        <dl className={cn("grid gap-8 text-center", cols)}>
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <dd className="text-display text-accent-text">{stat.value}</dd>
              <dt className="text-label-md text-fg-default">{stat.label}</dt>
              {stat.description ? (
                <p className="text-body-xs text-fg-muted">{stat.description}</p>
              ) : null}
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
