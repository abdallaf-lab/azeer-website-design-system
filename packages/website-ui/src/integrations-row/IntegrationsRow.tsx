import type * as React from "react";
import { Icon } from "@azeer/ui";
import {
  Container,
  CtaButton,
  Section,
  SectionHeading,
  cn,
  type CtaAction,
  type SectionIcon,
  type SectionTone,
} from "../lib";

export interface IntegrationItem {
  name: string;
  /** Icon component (passed to `<Icon />`). Use `logo` for an image instead. */
  icon?: SectionIcon;
  /** Image URL for a brand logo, used when `icon` is not provided. */
  logo?: string;
  href?: string;
}

export interface IntegrationsRowProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  integrations: IntegrationItem[];
  cta?: CtaAction;
  tone?: SectionTone;
  className?: string;
}

/**
 * IntegrationsRow — a tile grid of supported integrations (icon/logo + name)
 * with an optional "See all" CTA. Tiles become links when `href` is set.
 * Presentational → Server Component.
 */
export function IntegrationsRow({
  eyebrow,
  title,
  description,
  integrations,
  cta,
  tone = "canvas",
  className,
}: IntegrationsRowProps) {
  return (
    <Section tone={tone} className={className}>
      <Container className="flex flex-col items-center gap-12">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            className="mx-auto"
          />
        ) : null}

        <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((item) => {
            const inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-sunken text-fg-default">
                  {item.icon ? (
                    <Icon icon={item.icon} size={20} aria-hidden="true" />
                  ) : item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 object-contain"
                    />
                  ) : null}
                </span>
                <span className="text-label-md text-fg-default">{item.name}</span>
              </>
            );
            return (
              <li key={item.name}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border border-border-default bg-surface p-4",
                      "transition-colors duration-fast ease-standard hover:border-border-strong",
                    )}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-border-default bg-surface p-4">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {cta ? <CtaButton action={cta} variant="secondary" size="md" /> : null}
      </Container>
    </Section>
  );
}
