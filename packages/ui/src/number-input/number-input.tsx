import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Input, type InputProps } from "../input";

export interface NumberInputProps
  extends Omit<InputProps, "type" | "value" | "onChange" | "inputMode"> {
  /** Numeric value. `undefined` represents an empty field. */
  value?: number;
  /** Fires with the new value, or `undefined` when cleared. */
  onValueChange?: (value: number | undefined) => void;
  /** Minimum allowed value. Enforced on blur via clamp. */
  min?: number;
  /** Maximum allowed value. Enforced on blur via clamp. */
  max?: number;
  /** Step for stepper buttons + arrow-key nudges. Default 1. */
  step?: number;
  /** Render +/− buttons on the end side. Default true. */
  showStepper?: boolean;
}

/**
 * NumberInput — wraps `Input` with numeric semantics.
 *
 * Uses `type="text"` + `inputMode="numeric"` rather than `type="number"`
 * per Forms.md (scroll-wheel hazards, inconsistent browser UX, locale
 * decimal-separator quirks). The browser still surfaces the numeric
 * keyboard on mobile via `inputMode`.
 *
 * Min/max are clamped on blur (not on every keystroke — hostile UX). The
 * stepper buttons are optional but on by default; arrow-key nudges from
 * the keyboard work without the visible buttons.
 *
 * Use for quotas, durations, counts, currency amounts. For currency,
 * format the *display* value yourself via `Intl.NumberFormat` at the
 * consumer level — NumberInput stores raw numbers.
 */
export function NumberInput({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  showStepper = true,
  className,
  onBlur,
  onKeyDown,
  ...rest
}: NumberInputProps) {
  const [text, setText] = React.useState<string>(value !== undefined ? String(value) : "");

  // Sync text when controlled value changes externally.
  React.useEffect(() => {
    setText(value !== undefined ? String(value) : "");
  }, [value]);

  const clamp = (n: number): number => {
    let v = n;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  };

  const commit = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      onValueChange?.(undefined);
      return;
    }
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed)) {
      // Revert to last good value
      setText(value !== undefined ? String(value) : "");
      return;
    }
    const clamped = clamp(parsed);
    setText(String(clamped));
    onValueChange?.(clamped);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    commit(text);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const current = value ?? 0;
      const next = clamp(current + step);
      setText(String(next));
      onValueChange?.(next);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const current = value ?? 0;
      const next = clamp(current - step);
      setText(String(next));
      onValueChange?.(next);
    }
    onKeyDown?.(e);
  };

  const handleStep = (delta: number) => {
    const current = value ?? 0;
    const next = clamp(current + delta);
    setText(String(next));
    onValueChange?.(next);
  };

  const atMin = value !== undefined && min !== undefined && value <= min;
  const atMax = value !== undefined && max !== undefined && value >= max;

  return (
    <div className="relative inline-flex w-full">
      <Input
        type="text"
        inputMode="numeric"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "tabular-nums text-end",
          showStepper && "pe-16",
          className,
        )}
        {...rest}
      />
      {showStepper ? (
        <div className="absolute end-1 top-1/2 -translate-y-1/2 inline-flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Decrement"
            disabled={rest.disabled || atMin}
            onClick={() => handleStep(-step)}
            className={cn(
              "inline-flex items-center justify-center h-7 w-7 rounded-sm",
              "text-fg-muted hover:bg-state-hover active:bg-state-active",
              "transition-colors duration-fast ease-standard",
              "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <Icon icon={Minus} size={12} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Increment"
            disabled={rest.disabled || atMax}
            onClick={() => handleStep(step)}
            className={cn(
              "inline-flex items-center justify-center h-7 w-7 rounded-sm",
              "text-fg-muted hover:bg-state-hover active:bg-state-active",
              "transition-colors duration-fast ease-standard",
              "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <Icon icon={Plus} size={12} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
