import type * as React from "react";
import { Container, Section, cn, type CtaAction, type SectionIcon } from "../lib";
import { PromoPill } from "../promo-pill";
import { Eyebrow } from "../eyebrow";
import { PrimaryButton, SecondaryButton } from "../marketing-button";

export interface MarketingHeroProps {
  /** Announcement pill above the eyebrow; renders a linked `PromoPill`. */
  pill?: { label: React.ReactNode; href: string };
  /** Small eyebrow label above the title. */
  eyebrow?: React.ReactNode;
  eyebrowIcon?: SectionIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: CtaAction;
  secondaryCta?: CtaAction;
  /** Media slot below the CTAs (e.g. a `ProductFrame`). */
  children?: React.ReactNode;
  /** Lay the dot-grid texture under the brand wash. Default `true`. */
  dotGrid?: boolean;
  className?: string;
}

/**
 * MarketingHero — the Dub-grade centered hero on the Azeer brand: a brand
 * radial wash (`bg-hero-brand`, our #7B61FF) over an optional dot-grid, an
 * announcement pill, an eyebrow, the marketing display title
 * (`mkt-display-xl`, Medium), a `mkt-body-lg` subhead, the ring-expand
 * `PrimaryButton`/`SecondaryButton`, and a media slot.
 *
 * Presentational → Server Component. Logical spacing throughout (mirrors under
 * RTL); the CTA arrows flip via `flipOnRtl`.
 */
export function MarketingHero({
  pill,
  eyebrow,
  eyebrowIcon,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  dotGrid = true,
  className,
}: MarketingHeroProps) {
  return (
    <Section
      tone="canvas"
      className={cn("relative overflow-hidden", dotGrid && "bg-dot-grid", className)}
    >
      {/* Brand radial wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-brand" />

      <Container className="relative flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-5">
          {pill ? (
            <a href={pill.href} className="transition hover:opacity-80">
              <PromoPill>{pill.label}</PromoPill>
            </a>
          ) : null}
          {eyebrow ? <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow> : null}
          <h1 className="max-w-reading text-balance text-mkt-display-xl text-content-emphasis">
            {title}
          </h1>
          {description ? (
            <p className="max-w-reading text-pretty text-mkt-body-lg text-content-subtle">
              {description}
            </p>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? <PrimaryButton action={primaryCta} /> : null}
              {secondaryCta ? <SecondaryButton action={secondaryCta} /> : null}
            </div>
          ) : null}
        </div>

        {children ? <div className="mt-14 w-full">{children}</div> : null}
      </Container>
    </Section>
  );
}
