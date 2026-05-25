import * as React from "react";
import { cn } from "../lib/cn";

export interface FieldGroupProps {
  /** Group label — `text-label-md` (slightly heavier than FormField's `text-label-sm`). */
  label?: React.ReactNode;
  /** Marks the group as required — renders `*` after the label. */
  required?: boolean;
  /** Marks the group as optional — renders `(optional)` after the label. Mutually exclusive with `required`. */
  optional?: boolean;
  /** Helper text shown below the group. Replaced by `error` when present. */
  helper?: React.ReactNode;
  /** Validation error. Replaces helper. */
  error?: React.ReactNode;
  /** ARIA grouping label (only used when `label` is undefined and the visible context already names the group). */
  ariaLabel?: string;
  /** Layout direction inside the group. Default `"row"`. */
  direction?: "row" | "column";
  /** Inter-control gap. Maps to Tailwind `gap-*`. Default `2` (8 px). */
  gap?: 1 | 2 | 3 | 4;
  /** The grouped controls — typically 2–4 form inputs. */
  children: React.ReactNode;
  className?: string;
}

/**
 * FieldGroup — groups related fields under a single label + helper / error.
 *
 * Different from `FormField` in three ways:
 *   1. **Heavier label tier** — `text-label-md` (14 / 16 / 600) per Forms.md §7,
 *      signaling the group as a logical unit.
 *   2. **Multiple children** — `FormField` clones a single child to wire ARIA;
 *      `FieldGroup` doesn't auto-wire, just lays out the controls.
 *   3. **Helper / error span the whole group** — one error for the group
 *      (e.g. "Enter a complete phone number"), not per-field.
 *
 * Single-level only — nesting `FieldGroup` inside `FieldGroup` is forbidden.
 *
 * Common use cases (Forms.md §7):
 *   - Phone (country code + number)
 *   - Date range (start + end)
 *   - Address (street + city + postal + country)
 *   - Currency (amount + currency code)
 */
export function FieldGroup({
  label,
  required,
  optional,
  helper,
  error,
  ariaLabel,
  direction = "row",
  gap = 2,
  children,
  className,
}: FieldGroupProps) {
  const labelId = React.useId();
  const messageId = React.useId();
  const hasMessage = Boolean(error || helper);
  const gapClass = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4" }[gap];

  return (
    <div
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-label={!label && ariaLabel ? ariaLabel : undefined}
      aria-describedby={hasMessage ? messageId : undefined}
      className={cn("flex flex-col gap-1.5", className)}
    >
      {label ? (
        <div
          id={labelId}
          className="inline-flex items-center gap-1 text-label-md text-fg-default"
        >
          <span>{label}</span>
          {required ? (
            <span aria-hidden="true" className="text-danger-text">
              *
            </span>
          ) : null}
          {optional && !required ? (
            <span className="ms-1 text-body-xs text-fg-muted font-normal">
              (optional)
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          "flex",
          direction === "row" ? "flex-row items-start" : "flex-col",
          gapClass,
        )}
      >
        {children}
      </div>
      {error ? (
        <p id={messageId} className="text-body-xs text-danger-text">
          {error}
        </p>
      ) : helper ? (
        <p id={messageId} className="text-body-xs text-fg-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
