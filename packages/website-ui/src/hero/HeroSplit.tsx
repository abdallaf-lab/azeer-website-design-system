import type * as React from "react";
import { Badge } from "@azeer/ui";
import { Container, CtaButton, Section, cn, type CtaAction } from "../lib";

export interface HeroSplitProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: CtaAction;
  secondaryCta?: CtaAction;
  /** Media column (screenshot, illustration, product shot). */
  media: React.ReactNode;
  /** Place the media on the start side instead of the end. Default `false`. */
  mediaStart?: boolean;
  className?: string;
}

/**
 * HeroSplit — two-column hero: copy on one side, media on the other. Stacks to
 * a single column below `lg`. `mediaStart` swaps the column order (the grid
 * reorders logically, so it stays correct under RTL).
 */
export function HeroSplit({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  mediaStart = false,
  className,
}: HeroSplitProps) {
  return (
    <Section tone="canvas" className={cn("overflow-hidden", className)}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn("flex flex-col", mediaStart && "lg:order-2")}>
          {eyebrow ? (
            <Badge variant="accent" size="md" className="mb-5 self-start">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="text-heading-xl text-balance text-fg-default md:text-display">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl text-body-md text-pretty text-fg-muted">
              {description}
            </p>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <CtaButton action={primaryCta} variant="primary" />
              ) : null}
              {secondaryCta ? (
                <CtaButton action={secondaryCta} variant="secondary" />
              ) : null}
            </div>
          ) : null}
        </div>
        <div className={cn("w-full", mediaStart && "lg:order-1")}>{media}</div>
      </Container>
    </Section>
  );
}
