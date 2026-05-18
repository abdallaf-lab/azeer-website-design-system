import * as React from "react";
import { cn } from "../lib/cn";

export type PinInputSize = "sm" | "md" | "lg";

export interface PinInputProps {
  /** Number of digit boxes. Default `6`. Typical: 4–8. */
  length?: number;
  /** Controlled value. Always contiguous from the start — no internal gaps. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fires when all `length` digits are filled. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  /** Mask digits (password-style). Default `false`. */
  mask?: boolean;
  /** Auto-focus the first empty box on mount. */
  autoFocus?: boolean;
  /** Box size — slightly taller than wide per OTP convention. Default `"md"`. */
  size?: PinInputSize;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-required"?: boolean | "true" | "false";
  "aria-describedby"?: string;
}

const boxSizes: Record<PinInputSize, string> = {
  sm: "h-10 w-9 text-body-md",
  md: "h-12 w-11 text-heading-sm",
  lg: "h-14 w-12 text-heading-md",
};

/**
 * PinInput — N-digit code entry primitive for 2FA / OTP / verification flows.
 *
 * Per-digit `<input>` boxes wired so:
 *   - typing a digit auto-focuses the next box
 *   - Backspace clears the current digit (or focuses+clears previous if empty)
 *   - ArrowLeft / ArrowRight navigate boxes (auto-mirrors under RTL since
 *     these are real inputs and the browser handles that)
 *   - Home / End jump to first / last box
 *   - paste spreads digits across boxes (non-digit characters stripped)
 *   - filled boxes tint their border to `accent-fill`
 *
 * Value is always contiguous — clearing box index N drops everything from N
 * onward. That keeps the model simple and matches what most OTP UIs do.
 *
 * Use `mask` for sensitive codes (recovery / passcodes). Use the default
 * un-masked mode for SMS / email OTPs where the digits are user-visible.
 */
export function PinInput({
  length = 6,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onComplete,
  disabled,
  mask,
  autoFocus,
  size = "md",
  id,
  className,
  "aria-label": ariaLabel = "Verification code",
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  "aria-describedby": ariaDescribedBy,
}: PinInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const completedRef = React.useRef(false);

  const commit = React.useCallback(
    (next: string) => {
      const clamped = next.slice(0, length);
      if (!isControlled) setInternalValue(clamped);
      onValueChange?.(clamped);
      if (clamped.length === length) {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.(clamped);
        }
      } else {
        completedRef.current = false;
      }
    },
    [isControlled, length, onValueChange, onComplete],
  );

  const focusBox = (index: number) => {
    const target = inputsRef.current[index];
    if (!target) return;
    target.focus();
    target.select();
  };

  const handleChange = (
    index: number,
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = ev.target.value;
    if (raw === "") {
      commit(value.slice(0, index));
      return;
    }
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const next = value.slice(0, index) + digit;
    commit(next);
    if (index < length - 1) focusBox(index + 1);
  };

  const handleKeyDown = (
    index: number,
    ev: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (ev.key === "Backspace") {
      if (value[index]) {
        commit(value.slice(0, index));
      } else if (index > 0) {
        commit(value.slice(0, index - 1));
        focusBox(index - 1);
      }
      ev.preventDefault();
      return;
    }
    if (ev.key === "ArrowLeft" && index > 0) {
      focusBox(index - 1);
      ev.preventDefault();
    } else if (ev.key === "ArrowRight" && index < length - 1) {
      focusBox(index + 1);
      ev.preventDefault();
    } else if (ev.key === "Home") {
      focusBox(0);
      ev.preventDefault();
    } else if (ev.key === "End") {
      focusBox(Math.min(value.length, length - 1));
      ev.preventDefault();
    }
  };

  const handlePaste = (ev: React.ClipboardEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const pasted = ev.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    commit(pasted);
    requestAnimationFrame(() => {
      focusBox(Math.min(pasted.length, length - 1));
    });
  };

  return (
    <div
      role="group"
      id={id}
      aria-label={ariaLabel}
      aria-invalid={ariaInvalid}
      aria-required={ariaRequired}
      aria-describedby={ariaDescribedBy}
      className={cn("inline-flex items-center gap-2", className)}
      dir="ltr"
    >
      {Array.from({ length }).map((_, i) => {
        const digit = value[i] ?? "";
        const filled = digit !== "";
        return (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type={mask ? "password" : "text"}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            pattern="\d"
            value={digit}
            onChange={(ev) => handleChange(i, ev)}
            onKeyDown={(ev) => handleKeyDown(i, ev)}
            onPaste={i === 0 ? handlePaste : undefined}
            onFocus={(ev) => ev.target.select()}
            autoFocus={autoFocus && i === 0}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={ariaInvalid}
            className={cn(
              "text-center font-semibold tabular-nums",
              "border border-border-strong rounded-md",
              "bg-surface text-fg-default",
              "transition-colors duration-fast ease-standard",
              "outline-none focus:outline-none focus-visible:outline-none",
              "focus-visible:border-border-focus",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
              "aria-invalid:border-danger-border",
              "aria-invalid:focus-visible:border-danger-fill",
              filled && "border-accent-fill",
              boxSizes[size],
            )}
          />
        );
      })}
    </div>
  );
}
