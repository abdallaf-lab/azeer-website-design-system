import { Fragment, type ReactNode } from "react";
import { ArrowUpRight, DollarSign, Sparkles } from "lucide-react";

import type { CtaAction } from "../lib";
import { SectionRails } from "../layout/section-rails";
import { DottedCanvas } from "../layout/dotted-canvas";
import { MotionPreset } from "../motion/motion-preset";
import { BorderBeam } from "../motion/border-beam";
import { ConnectorArrow } from "../motion/connector-arrow";
import { PrimaryButton, SecondaryButton } from "../marketing-button";
import { WorkflowItem, type WorkflowItemProps } from "./workflow-item";

export interface HeroEyebrowBadge {
  /** Leading element (a Lucide icon element). */
  icon?: ReactNode;
  label: string;
  /** Frame the badge with a BorderBeam. Default true. */
  accent?: boolean;
}

export interface HeroWithWorkflowProps {
  /** Top pill. Default: Sparkles · "New · AI agents" with a BorderBeam. */
  eyebrowBadge?: HeroEyebrowBadge;
  /** Headline (h1). */
  title?: ReactNode;
  /** Sub-headline. */
  description?: ReactNode;
  /** Accent CTA (icon is a Lucide component, RTL-flipped automatically). */
  primaryCTA?: CtaAction;
  /** Neutral CTA. Pass `null` to omit. */
  secondaryCTA?: CtaAction | null;
  /** The workflow cards (2–4). */
  workflow: WorkflowItemProps[];
  /** When the connector arrows start drawing (s). Default 0.6. */
  workflowConnectorDelay?: number;
  /** SectionRails vertical rhythm. Default `normal`. */
  density?: "compact" | "normal" | "spacious";
  /** Render the dotted background texture. Default true. */
  showDottedCanvas?: boolean;
  className?: string;
}

const TITLE_ID = "hero-title";

const DEFAULT_BADGE: HeroEyebrowBadge = {
  icon: <Sparkles className="size-4 text-accent-text" aria-hidden="true" />,
  label: "New · AI agents",
  accent: true,
};
const DEFAULT_TITLE = "Turn every conversation into closed revenue";
const DEFAULT_DESCRIPTION =
  "Azeer unifies WhatsApp, Voice, SMS, email, and social into one AI-assisted workspace — so your team replies faster and customers stay happy.";
const DEFAULT_PRIMARY: CtaAction = { label: "Get started", href: "/signup", icon: ArrowUpRight };
const DEFAULT_SECONDARY: CtaAction = { label: "View pricing", href: "/pricing", icon: DollarSign };

/**
 * HeroWithWorkflow — the full Path-C hero: SectionRails (rails) + DottedCanvas
 * (texture) + staggered MotionPreset entrances (badge / headline / description /
 * CTAs) + a WorkflowItem row chained with ConnectorArrows. Composes every
 * Stage-2A primitive on the Azeer brand.
 *
 * Static Server Component — the client primitives (MotionPreset, BorderBeam,
 * WorkflowItem, ConnectorArrow) carry their own `"use client"` boundaries and
 * their own `prefers-reduced-motion` handling. Keeping this a Server Component
 * ships the smallest possible JS for a marketing hero.
 *
 * Brand-sacred typography: the `mkt-display` scale (weight 500, letter-spacing 0)
 * — never `tracking-tight` (breaks Arabic) or raw text sizes.
 *
 * RTL-safe: logical properties throughout; CTA icons flip via `<Icon flipOnRtl>`;
 * the desktop connector auto-mirrors, and the mobile connector is a
 * script-independent `direction="down"`.
 *
 * a11y: the section is named via `aria-labelledby` pointing at the `<h1>`.
 *
 * Adapted from Orion's `hero-section.tsx` (text + badge + CTAs) and
 * `lead-qualifier.tsx` (the chained workflow), re-skinned to Azeer tokens.
 */
export function HeroWithWorkflow({
  eyebrowBadge = DEFAULT_BADGE,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  primaryCTA = DEFAULT_PRIMARY,
  secondaryCTA = DEFAULT_SECONDARY,
  workflow,
  workflowConnectorDelay = 0.6,
  density = "normal",
  showDottedCanvas = true,
  className,
}: HeroWithWorkflowProps) {
  const content = (
    <>
      {/* Hero text */}
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <MotionPreset fade>
          <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border-subtle bg-bg-default ps-2 pe-3 py-1">
            {eyebrowBadge.icon}
            <span className="text-mkt-body-sm font-medium text-content-emphasis">
              {eyebrowBadge.label}
            </span>
            {eyebrowBadge.accent ? <BorderBeam size={35} /> : null}
          </div>
        </MotionPreset>

        <MotionPreset fade blur delay={0.1}>
          <h1
            id={TITLE_ID}
            className="max-w-3xl text-balance text-mkt-display-md text-content-emphasis lg:text-mkt-display-xl"
          >
            {title}
          </h1>
        </MotionPreset>

        <MotionPreset fade delay={0.2}>
          <p className="max-w-2xl text-pretty text-mkt-body-lg text-content-subtle">{description}</p>
        </MotionPreset>

        <MotionPreset fade delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton action={primaryCTA} />
            {secondaryCTA ? <SecondaryButton action={secondaryCTA} /> : null}
          </div>
        </MotionPreset>
      </div>

      {/* Workflow visualization */}
      <div className="flex items-stretch justify-center gap-0 pb-12 max-md:flex-col max-md:items-center max-md:gap-6">
        {workflow.map((item, index) => {
          const cardDelay = workflowConnectorDelay + index * 0.2;
          const arrowDelay = cardDelay + 0.3;
          return (
            <Fragment key={item.id ?? index}>
              <WorkflowItem {...item} delay={cardDelay} />
              {index < workflow.length - 1 ? (
                <>
                  {/* desktop: horizontal (auto-mirrors in RTL) */}
                  <div className="flex items-center max-md:hidden">
                    <ConnectorArrow direction="right" delay={arrowDelay} />
                  </div>
                  {/* mobile: vertical, script-independent */}
                  <div className="flex justify-center md:hidden">
                    <ConnectorArrow direction="down" delay={arrowDelay} />
                  </div>
                </>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </>
  );

  return (
    <SectionRails id="hero" ariaLabelledby={TITLE_ID} density={density} className={className}>
      {showDottedCanvas ? (
        <DottedCanvas density="normal" intensity={10} fade>
          {content}
        </DottedCanvas>
      ) : (
        content
      )}
    </SectionRails>
  );
}
