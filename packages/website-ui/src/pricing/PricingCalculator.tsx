"use client";

import * as React from "react";
import { Card, FormField, Input, Switch } from "@azeer/ui";
import {
  Container,
  CtaButton,
  Section,
  SectionHeading,
  type CtaAction,
} from "../lib";

export interface PricingCalculatorProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Price per seat / month. */
  seatPrice?: number;
  /** Price per conversation. */
  conversationPrice?: number;
  /** ISO currency code for `Intl.NumberFormat`. Default "USD". */
  currency?: string;
  /** BCP-47 locale for number formatting. Defaults to the runtime locale. */
  locale?: string;
  /** Fractional discount applied when billed annually (e.g. 0.2 = 20%). */
  annualDiscount?: number;
  defaultSeats?: number;
  defaultConversations?: number;
  cta?: CtaAction;
  className?: string;
}

function clampNumber(value: string, min = 0): number {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return min;
  return Math.max(min, parsed);
}

/**
 * PricingCalculator — interactive usage estimator. Two number inputs (seats +
 * conversations) and an annual-billing switch drive a live monthly estimate.
 * State-driven → client component. All controls are DS primitives (Input,
 * Switch, FormField); the result panel is a Card.
 */
export function PricingCalculator({
  eyebrow,
  title,
  description,
  seatPrice = 29,
  conversationPrice = 0.02,
  currency = "USD",
  locale,
  annualDiscount = 0.2,
  defaultSeats = 5,
  defaultConversations = 5000,
  cta,
  className,
}: PricingCalculatorProps) {
  const [seats, setSeats] = React.useState(defaultSeats);
  const [conversations, setConversations] = React.useState(defaultConversations);
  const [annual, setAnnual] = React.useState(false);
  const annualLabelId = React.useId();

  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [locale, currency],
  );

  const monthlyBase = seats * seatPrice + conversations * conversationPrice;
  const monthly = annual ? monthlyBase * (1 - annualDiscount) : monthlyBase;
  const annualTotal = monthly * 12;

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

        <Card className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Inputs */}
          <div className="flex flex-col gap-5">
            <FormField label="Team seats" helper="Agents who handle conversations.">
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                value={seats}
                onChange={(e) => setSeats(clampNumber(e.target.value))}
              />
            </FormField>
            <FormField
              label="Monthly conversations"
              helper="Estimated inbound + outbound threads per month."
            >
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                step={100}
                value={conversations}
                onChange={(e) => setConversations(clampNumber(e.target.value))}
              />
            </FormField>

            <div className="flex items-center justify-between gap-3">
              <span className="flex flex-col">
                <span id={annualLabelId} className="text-label-sm text-fg-default">
                  Bill annually
                </span>
                <span className="text-body-xs text-fg-muted">
                  Save {Math.round(annualDiscount * 100)}% with yearly billing.
                </span>
              </span>
              <Switch
                checked={annual}
                onCheckedChange={(checked) => setAnnual(checked === true)}
                aria-labelledby={annualLabelId}
              />
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col gap-3 rounded-xl bg-surface-sunken p-6 text-center">
            <span className="text-label-xs text-fg-subtle">Estimated cost</span>
            <span className="flex items-baseline justify-center gap-1.5">
              <span className="text-display text-fg-default">
                {formatter.format(monthly)}
              </span>
              <span className="text-body-sm text-fg-muted">/mo</span>
            </span>
            <span className="text-body-xs text-fg-muted">
              {annual
                ? `${formatter.format(annualTotal)} billed yearly`
                : "Billed monthly"}
            </span>
            {cta ? (
              <CtaButton
                action={cta}
                variant="primary"
                size="md"
                className="mt-3 w-full"
              />
            ) : null}
          </div>
        </Card>
      </Container>
    </Section>
  );
}
