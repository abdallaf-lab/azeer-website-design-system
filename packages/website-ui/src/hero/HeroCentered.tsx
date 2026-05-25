import type * as React from "react";
import { Badge } from "@azeer/ui";
import { Container, CtaButton, Section, cn, type CtaAction } from "../lib";

export interface HeroCenteredProps {
  /** Optional pill above the title (e.g. "New · AI agents"). */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: CtaAction;
  secondaryCta?: CtaAction;
  /** Slot below the CTAs — screenshot, logo cloud, etc. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * HeroCentered — centered, single-column hero. The default landing-page hero:
 * eyebrow badge, display title, supporting copy, a primary + secondary CTA,
 * and an optional media slot underneath.
 */
export function HeroCentered({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  className,
}: HeroCenteredProps) {
  return (
    <Section tone="canvas" className={cn("overflow-hidden", className)}>
      <Container className="flex flex-col items-center text-center">
        {eyebrow ? (
          <Badge variant="accent" size="md" className="mb-5">
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="max-w-3xl text-heading-xl text-balance text-fg-default md:text-display">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-body-md text-pretty text-fg-muted">
            {description}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            {primaryCta ? <CtaButton action={primaryCta} variant="primary" /> : null}
            {secondaryCta ? (
              <CtaButton action={secondaryCta} variant="secondary" />
            ) : null}
          </div>
        ) : null}
        {children ? <div className="mt-14 w-full">{children}</div> : null}
      </Container>
    </Section>
  );
}
