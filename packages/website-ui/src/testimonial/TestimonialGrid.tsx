"use client";

import type * as React from "react";
import { Star } from "lucide-react";
import { Avatar, Card, Icon } from "@azeer/ui";
import { Container, Section, SectionHeading, cn } from "../lib";

export interface Testimonial {
  quote: React.ReactNode;
  authorName: string;
  authorRole?: string;
  authorAvatarSrc?: string;
  /** 1–5 star rating. Omit to hide the rating row. */
  rating?: number;
}

export interface TestimonialGridProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  testimonials: Testimonial[];
  /** Columns at `lg`. Default 3. */
  columns?: 2 | 3;
  className?: string;
}

function Rating({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${clamped} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          icon={Star}
          size={16}
          aria-hidden="true"
          className={cn(
            i < clamped ? "fill-current text-warning-fill" : "text-fg-disabled",
          )}
        />
      ))}
    </div>
  );
}

/**
 * TestimonialGrid — a grid of customer quotes, each with an avatar, name, role,
 * and optional star rating. Uses the DS Avatar (Radix) → client component.
 */
export function TestimonialGrid({
  eyebrow,
  title,
  description,
  testimonials,
  columns = 3,
  className,
}: TestimonialGridProps) {
  return (
    <Section tone="sunken" className={className}>
      <Container className="flex flex-col gap-12">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            className="mx-auto"
          />
        ) : null}
        <div
          className={cn(
            "grid gap-6",
            columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {testimonials.map((t, index) => (
            <Card key={index} className="h-full justify-between gap-6">
              <div className="flex flex-col gap-4">
                {typeof t.rating === "number" ? <Rating value={t.rating} /> : null}
                <blockquote className="text-body-md text-fg-default text-pretty">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3">
                <Avatar
                  size="md"
                  src={t.authorAvatarSrc}
                  alt={t.authorName}
                />
                <span className="flex flex-col">
                  <span className="text-label-md text-fg-default">{t.authorName}</span>
                  {t.authorRole ? (
                    <span className="text-body-xs text-fg-muted">{t.authorRole}</span>
                  ) : null}
                </span>
              </figcaption>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
