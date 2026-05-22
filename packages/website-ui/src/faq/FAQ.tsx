"use client";

import type * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@azeer/ui";
import { Container, Section, SectionHeading, cn } from "../lib";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: FAQItem[];
  /** Allow multiple panels open at once. Default `false` (single, collapsible). */
  multiple?: boolean;
  className?: string;
}

/**
 * FAQ — question/answer list on the DS Accordion. Defaults to single-open +
 * collapsible (the canonical FAQ pattern). Radix-backed → client component.
 */
export function FAQ({
  eyebrow,
  title = "Frequently asked questions",
  description,
  items,
  multiple = false,
  className,
}: FAQProps) {
  return (
    <Section tone="canvas" className={className}>
      <Container className="flex max-w-3xl flex-col gap-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          centered
          className="mx-auto"
        />
        {multiple ? (
          <Accordion type="multiple" className={cn("w-full border-t border-border-divider")}>
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-md text-fg-muted">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Accordion
            type="single"
            collapsible
            className={cn("w-full border-t border-border-divider")}
          >
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-body-md text-fg-muted">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Container>
    </Section>
  );
}
