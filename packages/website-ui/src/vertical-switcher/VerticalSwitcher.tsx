"use client";

import type * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@azeer/ui";
import { Container, Section, SectionHeading, type SectionTone } from "../lib";

export interface VerticalSwitcherItem {
  /** Stable value for the tab. */
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface VerticalSwitcherProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  verticals: VerticalSwitcherItem[];
  /** Initially selected value. Defaults to the first vertical. */
  defaultValue?: string;
  tone?: SectionTone;
  className?: string;
}

/**
 * VerticalSwitcher — tabbed section that swaps tailored content per industry
 * vertical (e.g. Retail / Banking / Healthcare). Built on the DS Tabs
 * (underline style, Radix-backed) → client component.
 */
export function VerticalSwitcher({
  eyebrow,
  title,
  description,
  verticals,
  defaultValue,
  tone = "canvas",
  className,
}: VerticalSwitcherProps) {
  const initial = defaultValue ?? verticals[0]?.value;

  return (
    <Section tone={tone} className={className}>
      <Container className="flex flex-col gap-10">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            className="mx-auto"
          />
        ) : null}

        <Tabs defaultValue={initial} className="flex flex-col gap-8">
          <TabsList className="mx-auto max-w-full flex-wrap justify-center">
            {verticals.map((vertical) => (
              <TabsTrigger key={vertical.value} value={vertical.value}>
                {vertical.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {verticals.map((vertical) => (
            <TabsContent key={vertical.value} value={vertical.value}>
              {vertical.content}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
}
