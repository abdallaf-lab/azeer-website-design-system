import type * as React from "react";
import { Icon } from "@azeer/ui";
import {
  Container,
  CtaButton,
  Section,
  cn,
  type CtaAction,
  type SectionIcon,
  type SectionTone,
} from "../lib";
import { SecondaryButton } from "../marketing-button";

export interface FeatureSplitBullet {
  icon?: SectionIcon;
  title: string;
  description?: string;
}

export interface FeatureSplitProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  bullets?: FeatureSplitBullet[];
  cta?: CtaAction;
  /** Media column (screenshot / illustration). */
  media: React.ReactNode;
  /** Place media on the start side. Default `false` (media on end). */
  mediaStart?: boolean;
  /**
   * Render on the marketing type scale (`mkt-display-md` heading, `mkt-body`
   * copy) with the neutral semantic colors and a ring-expand CTA. Opt-in so
   * existing pages are unchanged. Default `false` (app scale).
   */
  marketing?: boolean;
  /** Anchor id on the section wrapper (for in-page links like `#how-it-works`). */
  id?: string;
  tone?: SectionTone;
  className?: string;
}

/**
 * FeatureSplit — a single feature told as a two-column story: copy + checklist
 * on one side, media on the other. Alternate `mediaStart` down a page to get
 * the classic zig-zag. Column order is logical, so it mirrors under RTL.
 */
export function FeatureSplit({
  eyebrow,
  title,
  description,
  bullets,
  cta,
  media,
  mediaStart = false,
  marketing = false,
  id,
  tone = "canvas",
  className,
}: FeatureSplitProps) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn("flex flex-col", mediaStart && "lg:order-2")}>
          {eyebrow ? (
            <span
              className={cn(
                "mb-3 text-accent-text",
                marketing ? "text-mkt-caption uppercase" : "text-label-xs",
              )}
            >
              {eyebrow}
            </span>
          ) : null}
          <h2
            className={cn(
              "text-balance",
              marketing
                ? "text-mkt-display-md text-content-emphasis"
                : "text-heading-lg text-fg-default md:text-heading-xl",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-4 max-w-xl text-pretty",
                marketing
                  ? "text-mkt-body text-content-subtle"
                  : "text-body-md text-fg-muted",
              )}
            >
              {description}
            </p>
          ) : null}

          {bullets && bullets.length > 0 ? (
            <ul className="mt-6 flex flex-col gap-4">
              {bullets.map((bullet) => (
                <li key={bullet.title} className="flex items-start gap-3">
                  {bullet.icon ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-bg-subtle text-accent-text">
                      <Icon icon={bullet.icon} size={16} aria-hidden="true" />
                    </span>
                  ) : null}
                  <span className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        marketing
                          ? "text-mkt-body-sm font-medium text-content-emphasis"
                          : "text-label-md text-fg-default",
                      )}
                    >
                      {bullet.title}
                    </span>
                    {bullet.description ? (
                      <span
                        className={cn(
                          marketing
                            ? "text-mkt-body-sm text-content-subtle"
                            : "text-body-sm text-fg-muted",
                        )}
                      >
                        {bullet.description}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {cta ? (
            <div className="mt-8">
              {marketing ? (
                <SecondaryButton action={cta} />
              ) : (
                <CtaButton action={cta} variant="secondary" size="md" />
              )}
            </div>
          ) : null}
        </div>

        <div className={cn("w-full", mediaStart && "lg:order-1")}>{media}</div>
      </Container>
    </Section>
  );
}
