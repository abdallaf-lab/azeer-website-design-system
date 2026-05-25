import type * as React from "react";
import { Check } from "lucide-react";
import { Badge, Card, Icon } from "@azeer/ui";
import {
  Container,
  CtaButton,
  Section,
  SectionHeading,
  cn,
  type CtaAction,
} from "../lib";

export interface PricingPlan {
  name: string;
  /** Headline price, e.g. "$29" or "Custom". */
  price: React.ReactNode;
  /** Trailing period/qualifier, e.g. "/mo per seat". */
  period?: string;
  description?: string;
  features: string[];
  cta: CtaAction;
  /** Highlight as the recommended plan (accent border + badge). */
  featured?: boolean;
  /** Badge label shown when `featured`. Default "Most popular". */
  badge?: string;
}

export interface PricingCardsProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  plans: PricingPlan[];
  className?: string;
}

/**
 * PricingCards — a row of plan cards. Featured plans take an accent border +
 * "Most popular" badge (never a shadow — Cards are borders-first per the
 * Elevation canon). Each card's CTA is a full-width anchor.
 */
export function PricingCards({
  eyebrow,
  title,
  description,
  plans,
  className,
}: PricingCardsProps) {
  return (
    <Section tone="canvas" className={className}>
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
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "h-full",
                plan.featured && "border-accent-border",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-heading-sm text-fg-default">{plan.name}</h3>
                {plan.featured ? (
                  <Badge variant="accent" size="sm">
                    {plan.badge ?? "Most popular"}
                  </Badge>
                ) : null}
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-heading-xl text-fg-default">{plan.price}</span>
                {plan.period ? (
                  <span className="text-body-sm text-fg-muted">{plan.period}</span>
                ) : null}
              </div>

              {plan.description ? (
                <p className="text-body-sm text-fg-muted">{plan.description}</p>
              ) : null}

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Icon
                      icon={Check}
                      size={16}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent-text"
                    />
                    <span className="text-body-sm text-fg-default">{feature}</span>
                  </li>
                ))}
              </ul>

              <CtaButton
                action={plan.cta}
                variant={plan.featured ? "primary" : "secondary"}
                size="md"
                className="mt-auto w-full"
              />
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
