"use client";

import { useState, type ReactNode } from "react";

import { cn } from "../../lib";
import { SectionRails } from "../../layout/section-rails";
import { SectionHeader } from "../../layout/section-header";
import { BillingToggle, type BillingPeriod } from "./BillingToggle";
import { PlanCard, type PricingSectionPlan } from "./PlanCard";

export interface PricingSectionProps {
  /** 2–4 plans. */
  plans: PricingSectionPlan[];
  /** Inner h3 headline. Default revenue-framed Azeer copy. */
  title?: ReactNode;
  /** Inner sub-headline. */
  description?: ReactNode;
  /** Forwarded to SectionHeader (Rule #15). */
  sectionHeader?: {
    title?: string;
    description?: string;
    showCanvas?: boolean;
    canvasIntensity?: "subtle" | "normal";
  };
  /** Show the monthly/yearly toggle. Default true. */
  showBillingToggle?: boolean;
  /** Initial billing period. Default `"monthly"`. */
  defaultBillingPeriod?: BillingPeriod;
  /** Section id (anchor). Default `"pricing"`. */
  id?: string;
  className?: string;
}

const TITLE_ID = "pricing-title";

const DEFAULT_SECTION = {
  title: "Pricing",
  description: "Flexible plans tailored to scale with your customer-conversation revenue.",
};
const DEFAULT_TITLE = "Plans that scale with your revenue";
const DEFAULT_DESCRIPTION =
  "Pick the plan that matches where your team is today — upgrade only when you outgrow it.";

/**
 * PricingSection — the high-conversion pricing block: SectionHeader + headline
 * + monthly/yearly toggle + plan grid. Client Component (holds the toggle
 * state). Composes `SectionRails`, `SectionHeader`, `BillingToggle`, `PlanCard`.
 *
 * Component boundaries (Rule #17 — `"use client"` is component-scoped):
 *   • PricingSection — `"use client"` (useState for billingPeriod)
 *   • BillingToggle  — `"use client"` (click handlers)
 *   • PlanCard       — Server Component (pure presentation; bundles client-side
 *                      here because parent is client, but stays server-compatible)
 *
 * Forwards every `SectionHeader` prop via `sectionHeader` (Rule #15).
 * Highlighted plans get a `BorderBeam` calibrated for card scale (size 80,
 * duration 10) — Rule #16 brand-signature exception.
 *
 * RTL-safe: logical `md:border-e` between cards (`md:last:border-e-0` drops
 * the trailing separator in both LTR and RTL); currency-first price ordering
 * works in both scripts via flex direction.
 *
 * Adapted from Orion's `src/components/blocks/pricing-section/pricing-section.tsx`
 * (`NumberTicker` dropped per Rule #16; savings Badge `destructive` → `success`
 * per Rule #8; tokens re-mapped; type renamed `PricingSectionPlan` to avoid
 * colliding with the existing `PricingPlan` from `pricing/PricingCards.tsx`).
 */
export function PricingSection({
  plans,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  sectionHeader,
  showBillingToggle = true,
  defaultBillingPeriod = "monthly",
  id = "pricing",
  className,
}: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(defaultBillingPeriod);
  const header = { ...DEFAULT_SECTION, ...sectionHeader };

  return (
    <SectionRails
      id={id}
      ariaLabelledby={TITLE_ID}
      density="normal"
      className={cn(className)}
    >
      <SectionHeader
        title={header.title}
        description={header.description}
        showCanvas={sectionHeader?.showCanvas}
        canvasIntensity={sectionHeader?.canvasIntensity}
      />

      <div className="flex flex-col items-center gap-5 py-12 text-center md:py-16 lg:py-24">
        <h3
          id={TITLE_ID}
          className="max-w-3xl text-balance text-mkt-display-md text-content-emphasis"
        >
          {title}
        </h3>
        <p className="max-w-2xl text-pretty text-mkt-body-lg text-content-subtle">{description}</p>

        {showBillingToggle ? (
          <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingPeriod={billingPeriod} />
        ))}
      </div>
    </SectionRails>
  );
}
