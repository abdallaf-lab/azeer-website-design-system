import type { ReactNode } from "react";

import { cn } from "../../lib";
import { PrimaryButton, SecondaryButton } from "../../marketing-button";
import { BorderBeam } from "../../motion/border-beam";

export interface PricingSectionPlan {
  /** Stable id for keys and anchor links. */
  id: string;
  name: string;
  description: string;
  /** Monthly price (currency units). Ignored when `customPriceLabel` is set. */
  monthlyPrice: number;
  /** Yearly per-period price (currency units). Ignored when `customPriceLabel` is set. */
  yearlyPrice: number;
  /** Currency tag rendered before the number ("SAR", "USD", "AED"). Empty string → no currency. */
  currency: string;
  /** Period suffix ("user/month", "month"). Empty string → no suffix. */
  period: string;
  /** When set, replaces the currency/number/period line entirely (e.g. "Contact sales"). */
  customPriceLabel?: string;
  /**
   * Optional "inheritance" line shown above the feature bullets (e.g.
   * `"Everything in Growth, plus:"`). Rendered as a muted paragraph — NOT a
   * bullet — so it reads as a section break, not a feature.
   */
  inheritanceLabel?: string;
  features: ReactNode[];
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
  /** Apply visual emphasis (BorderBeam frame). */
  highlighted?: boolean;
  /** Top metadata pill (e.g. "Most popular"). */
  badge?: string;
}

export interface PlanCardProps {
  plan: PricingSectionPlan;
  billingPeriod: "monthly" | "yearly";
  className?: string;
}

/**
 * PlanCard — one column of the pricing grid: name + description, price block
 * (currency / number / period or `customPriceLabel`), CTA, optional
 * `inheritanceLabel` separator, then a features list with brand-indigo dot
 * bullets. When `highlighted`, the card carries a calibrated BorderBeam
 * (size 80 / duration 10 — brand-signature exception to Rule #16).
 *
 * **Server Component** (no `"use client"`) — pure presentation. Bundled
 * client-side here because the parent `PricingSection` holds state, but stays
 * server-compatible elsewhere (Rule #17: `"use client"` is component-scoped,
 * not tree-scoped).
 *
 * RTL: logical `md:border-e` separator; the last card drops it via
 * `md:last:border-e-0`. The flex price row preserves currency-first ordering
 * in both LTR and RTL (Arabic reads "ر.س ٢٩٩" right-to-left, currency first).
 *
 * Price typography uses the marketing scale (`text-mkt-display-md`, weight 500)
 * — no `font-semibold` override (Rule #11: trust the type scale).
 */
export function PlanCard({ plan, billingPeriod, className }: PlanCardProps) {
  const price = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <article
      className={cn(
        "flex flex-col border-t border-border-subtle bg-bg-default md:border-e md:last:border-e-0",
        plan.highlighted && "relative isolate overflow-hidden",
        className,
      )}
    >
      <div className="space-y-4 border-b border-border-subtle px-6 pb-6 pt-8 sm:px-8">
        {plan.badge ? (
          <span className="inline-flex items-center rounded-full bg-accent-bg-subtle px-2.5 py-1 text-mkt-caption font-medium text-accent-text">
            {plan.badge}
          </span>
        ) : null}
        <div className="space-y-3">
          <h3 className="text-mkt-heading-lg text-content-emphasis">{plan.name}</h3>
          <p className="text-mkt-body-sm text-content-subtle">{plan.description}</p>
        </div>

        {/*
         * Price block. Currency-first ordering works in both LTR and RTL:
         * flex-row reverses visually under `dir="rtl"`, putting the currency
         * at the right (first read in Arabic).
         */}
        <div className="flex items-baseline gap-1">
          {plan.customPriceLabel ? (
            // Same `text-mkt-display-md` size as the number → "Contact sales"
            // doesn't shrink the card height vs a numeric plan.
            <span className="text-mkt-display-md text-content-emphasis">
              {plan.customPriceLabel}
            </span>
          ) : (
            <>
              {plan.currency ? (
                <span className="text-mkt-body-lg text-content-muted">{plan.currency}</span>
              ) : null}
              <span className="text-mkt-display-md text-content-emphasis">
                {Math.floor(price)}
              </span>
              {plan.period ? (
                <span className="text-mkt-body-lg text-content-muted">/{plan.period}</span>
              ) : null}
            </>
          )}
        </div>

        {plan.cta.variant === "primary" ? (
          <PrimaryButton action={{ label: plan.cta.label, href: plan.cta.href }} />
        ) : (
          <SecondaryButton action={{ label: plan.cta.label, href: plan.cta.href }} />
        )}
      </div>

      <div className="space-y-3 px-6 py-6 sm:px-8">
        {plan.inheritanceLabel ? (
          <p className="text-mkt-body-sm text-content-muted">{plan.inheritanceLabel}</p>
        ) : null}
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-2 size-2 shrink-0 rounded-full bg-brand-primary"
                aria-hidden="true"
              />
              <span className="text-mkt-body-sm text-content-default">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.highlighted ? <BorderBeam size={80} duration={10} /> : null}
    </article>
  );
}
