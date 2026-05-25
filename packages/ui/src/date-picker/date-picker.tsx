import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps {
  /** Currently selected date. */
  value?: Date;
  defaultValue?: Date;
  /** Fires with the new date, or `undefined` when cleared. */
  onValueChange?: (date: Date | undefined) => void;
  /** Trigger placeholder when no date is selected. */
  placeholder?: string;
  /** Trigger size — matches Input scale. Default `"md"`. */
  size?: DatePickerSize;
  /** `date-fns` format string for display. Default `"PPP"` (e.g. `"May 16, 2026"`). */
  displayFormat?: string;
  /** Earliest selectable date. */
  fromDate?: Date;
  /** Latest selectable date. */
  toDate?: Date;
  /** Disable specific dates. Pass to `react-day-picker`'s `disabled` matcher. */
  disabledMatcher?: React.ComponentProps<typeof DayPicker>["disabled"];
  /** Disable the entire control. */
  disabled?: boolean;
  /** Default month shown when no date is selected. */
  defaultMonth?: Date;
  /** Locale passed to date-fns format + react-day-picker. */
  locale?: Locale;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-required"?: boolean | "true" | "false";
  "aria-describedby"?: string;
}

type Locale = NonNullable<Parameters<typeof format>[2]>["locale"];

/**
 * DatePicker — Gregorian-only single-date picker per Components.md v1.
 *
 * Built on `react-day-picker@9` + `date-fns@4` wrapped in a `Popover`.
 * The trigger renders Input-like with a `Calendar` icon; the popover
 * surface hosts the calendar grid styled to DS tokens:
 *
 *   - selected day → `accent-fill` + `fg-on-accent`
 *   - today       → `accent-bg-subtle` + `accent-text`
 *   - outside month → `fg-subtle` opacity-50
 *   - disabled    → `fg-disabled` opacity-50 cursor-not-allowed
 *
 * Hijri / Persian / Japanese imperial calendars are deferred per
 * Numerals.md §calendar (Gregorian only in v1).
 */
export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select date",
  size = "md",
  displayFormat = "PPP",
  fromDate,
  toDate,
  disabledMatcher,
  disabled,
  defaultMonth,
  locale,
  id,
  className,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  "aria-describedby": ariaDescribedBy,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (next: Date | undefined) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const sizeClass = {
    sm: "h-8 px-2.5 text-body-sm",
    md: "h-10 px-3 text-body-md",
    lg: "h-12 px-3.5 text-body-md",
  }[size];

  const displayText = currentValue
    ? format(currentValue, displayFormat, locale ? { locale } : undefined)
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-required={ariaRequired}
          aria-describedby={ariaDescribedBy}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "inline-flex w-full items-center justify-between gap-2",
            "border border-border-strong rounded-md",
            "bg-surface text-fg-default",
            "transition-colors duration-fast ease-standard",
            "outline-none focus:outline-none focus-visible:outline-none",
            "focus-visible:border-border-focus",
            "data-[state=open]:border-border-focus",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
            "aria-invalid:border-danger-border",
            "cursor-pointer",
            sizeClass,
            className,
          )}
        >
          <span
            className={cn(
              "flex-1 truncate text-start",
              !currentValue && "text-fg-subtle",
            )}
          >
            {displayText}
          </span>
          <Icon
            icon={CalendarIcon}
            size={14}
            className="text-fg-muted shrink-0"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-3 w-auto" align="start" sideOffset={4}>
        <DayPicker
          mode="single"
          selected={currentValue}
          onSelect={(date) => {
            setValue(date);
            if (date) setOpen(false);
          }}
          startMonth={fromDate}
          endMonth={toDate}
          defaultMonth={defaultMonth ?? currentValue}
          disabled={disabledMatcher}
          locale={locale}
          showOutsideDays
          classNames={dayPickerClassNames}
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Class-name overrides for `react-day-picker@9`. Each key maps to one of
 * the library's internal style scopes. We replace the default visuals
 * with DS-token utilities while keeping the layout structure DayPicker
 * provides (flex months / grid table / etc).
 */
const dayPickerClassNames = {
  root: "select-none",
  months: "flex flex-col sm:flex-row gap-4",
  month: "flex flex-col gap-3",
  month_caption: "flex items-center justify-between px-1",
  caption_label: "text-label-md text-fg-default",
  nav: "flex items-center gap-1",
  button_previous: cn(
    "inline-flex items-center justify-center",
    "h-7 w-7 rounded-md",
    "bg-transparent text-fg-muted",
    "hover:bg-state-hover active:bg-state-active",
    "transition-colors duration-fast ease-standard",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  ),
  button_next: cn(
    "inline-flex items-center justify-center",
    "h-7 w-7 rounded-md",
    "bg-transparent text-fg-muted",
    "hover:bg-state-hover active:bg-state-active",
    "transition-colors duration-fast ease-standard",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  ),
  month_grid: "border-collapse",
  weekdays: "flex",
  weekday: "text-label-xs uppercase text-fg-muted w-9 text-center pb-1",
  week: "flex mt-0.5",
  day: "relative inline-flex items-center justify-center h-9 w-9",
  day_button: cn(
    "inline-flex items-center justify-center h-9 w-9 rounded-md",
    "text-body-sm text-fg-default",
    "bg-transparent",
    "hover:bg-state-hover active:bg-state-active",
    "transition-colors duration-fast ease-standard",
    "cursor-pointer",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  selected: cn(
    "[&_button]:bg-accent-fill [&_button]:text-fg-on-accent",
    "[&_button:hover]:bg-accent-fill-hover [&_button:hover]:text-fg-on-accent",
  ),
  today: "[&_button]:bg-accent-bg-subtle [&_button]:text-accent-text [&_button]:font-medium",
  outside: "[&_button]:text-fg-subtle [&_button]:opacity-50",
  disabled: "[&_button]:text-fg-disabled [&_button]:cursor-not-allowed",
  hidden: "invisible",
};
