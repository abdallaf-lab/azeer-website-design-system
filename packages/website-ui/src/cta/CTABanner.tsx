import type * as React from "react";
import { Container, CtaButton, Section, cn, type CtaAction } from "../lib";

export type CTABannerTone = "inverse" | "accent" | "surface";

export interface CTABannerProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: CtaAction;
  secondaryCta?: CtaAction;
  /** Surface band. Default `inverse` (dark indigo). */
  tone?: CTABannerTone;
  /** Center the content. Default `true`. */
  centered?: boolean;
  className?: string;
}

const toneText: Record<CTABannerTone, { title: string; description: string }> = {
  inverse: { title: "text-fg-on-inverse", description: "text-fg-on-inverse opacity-80" },
  accent: { title: "text-fg-default", description: "text-fg-muted" },
  surface: { title: "text-fg-default", description: "text-fg-muted" },
};

/**
 * CTABanner — the closing conversion band. A title, supporting line, and one or
 * two CTAs on an inverse (default), accent, or surface band. Presentational.
 */
export function CTABanner({
  title,
  description,
  primaryCta,
  secondaryCta,
  tone = "inverse",
  centered = true,
  className,
}: CTABannerProps) {
  const text = toneText[tone];

  return (
    <Section tone={tone} className={className}>
      <Container
        className={cn(
          "flex flex-col gap-6",
          centered ? "items-center text-center" : "items-start",
        )}
      >
        <div className={cn("flex flex-col gap-4", centered && "items-center")}>
          <h2 className={cn("text-heading-xl text-balance md:text-display", text.title)}>
            {title}
          </h2>
          {description ? (
            <p className={cn("max-w-2xl text-body-md text-pretty", text.description)}>
              {description}
            </p>
          ) : null}
        </div>
        {primaryCta || secondaryCta ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {primaryCta ? <CtaButton action={primaryCta} variant="primary" /> : null}
            {secondaryCta ? (
              <CtaButton action={secondaryCta} variant="secondary" />
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
