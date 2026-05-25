import type * as React from "react";
import { Icon } from "@azeer/ui";
import { Container, cn, type CtaAction } from "../lib";

export interface DarkCTAProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta: CtaAction;
  secondaryCta?: CtaAction;
  /** Optional slot below the CTAs — e.g. a `<TrustBadges tone="dark" />` row. */
  badges?: React.ReactNode;
  className?: string;
}

/**
 * DarkCTA — the closing dark conversion panel (Dub anatomy): a `rounded-3xl`
 * inverted surface with a brand-colored radial wash (`bg-hero-brand`, OUR
 * #7B61FF at 15% — never a generic accent), a white pill primary, and a
 * translucent-outline secondary. The `rounded-3xl` top reads as the "curved
 * top edge" without an arbitrary SVG.
 *
 * Presentational → Server Component. Logical padding throughout; the trailing
 * arrow flips under RTL.
 */
export function DarkCTA({
  title,
  description,
  primaryCta,
  secondaryCta,
  badges,
  className,
}: DarkCTAProps) {
  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-bg-inverted px-6 py-16 text-center sm:px-12">
          {/* Brand radial wash */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-brand" />

          <div className="relative mx-auto flex max-w-reading flex-col items-center gap-6">
            <h2 className="text-balance text-mkt-display-md text-content-inverted">
              {title}
            </h2>
            {description ? (
              <p className="text-pretty text-mkt-body-lg text-content-inverted/70">
                {description}
              </p>
            ) : null}

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              {/* White pill primary */}
              <a
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2",
                  "text-mkt-body-sm font-medium",
                  "bg-bg-default text-content-emphasis transition",
                  "hover:ring-4 hover:ring-content-inverted/30",
                )}
              >
                {primaryCta.label}
                {primaryCta.icon ? (
                  <Icon icon={primaryCta.icon} size={16} flipOnRtl aria-hidden="true" />
                ) : null}
              </a>

              {/* Translucent-outline secondary */}
              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2",
                    "text-mkt-body-sm font-medium",
                    "border border-content-inverted/20 text-content-inverted transition",
                    "hover:bg-content-inverted/10",
                  )}
                >
                  {secondaryCta.label}
                  {secondaryCta.icon ? (
                    <Icon
                      icon={secondaryCta.icon}
                      size={16}
                      flipOnRtl
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              ) : null}
            </div>

            {badges ? <div className="mt-2">{badges}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
