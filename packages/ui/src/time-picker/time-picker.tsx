import { cn } from "../lib/cn";
import { Input, type InputProps } from "../input";

export interface TimePickerProps
  extends Omit<InputProps, "type" | "value" | "onChange"> {
  /** HH:MM (or HH:MM:SS when `step` < 60) in 24-hour clock. Empty string when unset. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /**
   * Step in seconds. Default `60` (minute resolution). Pass `1`–`59` to expose
   * a seconds field in the native picker. The 12 / 24-hour display format is
   * decided by the browser locale — we do not override it.
   */
  step?: number;
  /** Earliest selectable time as HH:MM[:SS]. */
  min?: string;
  /** Latest selectable time as HH:MM[:SS]. */
  max?: string;
}

/**
 * TimePicker — minute-precision time entry.
 *
 * Thin wrapper around `<input type="time">` rendered with Azeer Input chrome
 * (border, focus tint, disabled / aria-invalid plumbing, `tabular-nums` for
 * HH:MM digit alignment). The browser provides the picker UI on focus —
 * consistent across Chrome / Safari / Firefox modulo locale, and native on
 * iOS / Android (wheel pickers).
 *
 * Per Components.md a fully custom popover-based TimePicker is deferred to
 * v1.2+. This primitive ships the native control with DS styling around it
 * so consumers don't have to choose between "DS-shaped" and "works on every
 * platform".
 */
export function TimePicker({
  value,
  defaultValue,
  onValueChange,
  step = 60,
  min,
  max,
  className,
  ...rest
}: TimePickerProps) {
  return (
    <Input
      type="time"
      value={value}
      defaultValue={defaultValue}
      onChange={(ev) => onValueChange?.(ev.target.value)}
      step={step}
      min={min}
      max={max}
      className={cn("tabular-nums", className)}
      {...rest}
    />
  );
}
