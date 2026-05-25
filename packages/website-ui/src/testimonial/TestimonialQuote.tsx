"use client";

import type * as React from "react";
import { Avatar } from "@azeer/ui";
import { Container, Section, cn, type SectionTone } from "../lib";

export interface TestimonialQuoteProps {
  quote: React.ReactNode;
  authorName: string;
  authorRole?: string;
  authorAvatarSrc?: string;
  /** Optional brand logo rendered above the quote. */
  logo?: React.ReactNode;
  /**
   * Render the quote on the marketing display scale (`mkt-display-md`) with the
   * neutral semantic text color. Opt-in; default `false` (app scale).
   */
  marketing?: boolean;
  tone?: SectionTone;
  className?: string;
}

/**
 * TestimonialQuote — a single large pull-quote spotlight. Centered logo, quote
 * in the heading tier, then the attributed author with avatar. Client (Avatar).
 */
export function TestimonialQuote({
  quote,
  authorName,
  authorRole,
  authorAvatarSrc,
  logo,
  marketing = false,
  tone = "canvas",
  className,
}: TestimonialQuoteProps) {
  return (
    <Section tone={tone} className={className}>
      <Container className="flex max-w-3xl flex-col items-center gap-8 text-center">
        {logo ? <div className="flex items-center justify-center">{logo}</div> : null}
        <blockquote
          className={cn(
            "text-balance",
            marketing
              ? "text-mkt-display-md text-content-emphasis"
              : "text-heading-lg text-fg-default md:text-heading-xl",
          )}
        >
          {quote}
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar size="lg" src={authorAvatarSrc} alt={authorName} />
          <span className="flex flex-col text-start">
            <span className="text-label-md text-fg-default">{authorName}</span>
            {authorRole ? (
              <span className="text-body-sm text-fg-muted">{authorRole}</span>
            ) : null}
          </span>
        </figcaption>
      </Container>
    </Section>
  );
}
