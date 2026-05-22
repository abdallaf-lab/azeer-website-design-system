import type * as React from "react";
import { Icon } from "@azeer/ui";
import {
  Container,
  Section,
  cn,
  type SectionIcon,
  type SectionTone,
} from "../lib";

export interface ComplianceItem {
  icon: SectionIcon;
  label: string;
  description?: string;
}

export interface ComplianceBandProps {
  title?: React.ReactNode;
  items: ComplianceItem[];
  tone?: SectionTone;
  className?: string;
}

/**
 * ComplianceBand — a trust strip of certifications/standards (SOC 2, GDPR,
 * ISO 27001, HIPAA…). Each item is a shielded chip with a short label.
 * Presentational → Server Component.
 */
export function ComplianceBand({
  title,
  items,
  tone = "sunken",
  className,
}: ComplianceBandProps) {
  return (
    <Section tone={tone} className={cn("py-12 md:py-16", className)}>
      <Container className="flex flex-col items-center gap-8">
        {title ? <p className="text-label-xs text-fg-subtle">{title}</p> : null}
        <ul className="flex flex-wrap items-stretch justify-center gap-4">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-border-default bg-surface px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-success-bg-subtle text-success-text">
                <Icon icon={item.icon} size={20} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-label-md text-fg-default">{item.label}</span>
                {item.description ? (
                  <span className="text-body-xs text-fg-muted">{item.description}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
