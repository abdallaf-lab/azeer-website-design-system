"use client";

import { Badge } from "@azeer/ui";

import { cn } from "../../lib";

export type BillingPeriod = "monthly" | "yearly";

export interface BillingToggleProps {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
  /** Savings pill label for the Yearly option. Default `"Save 35%"`. */
  savingsLabel?: string;
  /** Visually-hidden label for the segmented group. Default `"Billing period"`. */
  ariaLabel?: string;
  className?: string;
}

/**
 * BillingToggle — a two-option segmented control for monthly/yearly. The
 * inactive option is muted; the active option uses an elevated surface with
 * `shadow-elev-1`. The Yearly option includes a `Badge variant="success"`
 * savings pill (Rule #8: intent tokens for signaling — savings is a positive
 * outcome, not a destructive one).
 *
 * Accessibility: `role="group"` + `aria-pressed` on each button (segmented
 * control pattern). Order is Monthly then Yearly — works in both LTR (Monthly
 * left, Yearly right) and RTL (Monthly right, Yearly left), reading-natural in
 * both scripts.
 */
export function BillingToggle({
  value,
  onChange,
  savingsLabel = "Save 35%",
  ariaLabel = "Billing period",
  className,
}: BillingToggleProps) {
  const base =
    "inline-flex items-center gap-2 rounded-sm px-5 py-2 text-mkt-body-sm font-medium transition-colors duration-fast cursor-pointer";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center gap-1 rounded-md bg-bg-muted p-1", className)}
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        aria-pressed={value === "monthly"}
        className={cn(
          base,
          value === "monthly"
            ? "bg-bg-default text-content-emphasis shadow-elev-1"
            : "text-content-muted hover:text-content-emphasis",
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        aria-pressed={value === "yearly"}
        className={cn(
          base,
          value === "yearly"
            ? "bg-bg-default text-content-emphasis shadow-elev-1"
            : "text-content-muted hover:text-content-emphasis",
        )}
      >
        Yearly
        <Badge variant="success" size="sm">
          {savingsLabel}
        </Badge>
      </button>
    </div>
  );
}
