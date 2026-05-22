"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { Badge, Icon } from "@azeer/ui";
import { Container, CtaButton, Section, cn, type CtaAction } from "../lib";

export interface HeroSplitVideoProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: CtaAction;
  secondaryCta?: CtaAction;
  /** Poster image shown before playback. */
  posterSrc: string;
  posterAlt: string;
  /** Video source loaded on first play (kept off the critical path). */
  videoSrc: string;
  /** Accessible label for the play button. Default "Play video". */
  playLabel?: string;
  /** Place the media on the start side instead of the end. Default `false`. */
  mediaStart?: boolean;
  className?: string;
}

/**
 * HeroSplitVideo — split hero whose media column is a click-to-play video. The
 * poster carries a play affordance; the `<video>` only mounts on first play, so
 * the network cost stays off the initial render. Interactive → client component.
 */
export function HeroSplitVideo({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  posterSrc,
  posterAlt,
  videoSrc,
  playLabel = "Play video",
  mediaStart = false,
  className,
}: HeroSplitVideoProps) {
  const [playing, setPlaying] = React.useState(false);

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

        <div className={cn("w-full", mediaStart && "lg:order-1")}>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border-default bg-surface-sunken shadow-elev-2">
            {playing ? (
              <video
                src={videoSrc}
                poster={posterSrc}
                controls
                autoPlay
                className="h-full w-full object-cover"
              >
                <track kind="captions" />
              </video>
            ) : (
              <button
                type="button"
                aria-label={playLabel}
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                <img
                  src={posterSrc}
                  alt={posterAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  className={cn(
                    "relative flex h-16 w-16 items-center justify-center rounded-full",
                    "bg-accent-fill text-fg-on-accent shadow-elev-3",
                    "transition-transform duration-fast ease-standard group-hover:scale-105",
                  )}
                >
                  <Icon icon={Play} size={24} aria-hidden="true" className="ms-0.5" />
                </span>
              </button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
