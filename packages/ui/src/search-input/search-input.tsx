import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Input, type InputProps } from "../input";

export interface SearchInputProps
  extends Omit<InputProps, "type" | "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Fires when the user clicks the X clear button. Receives an empty string via `onValueChange` first. */
  onClear?: () => void;
  /** Visually-hidden label for the clear button. Default `"Clear search"`. */
  clearLabel?: string;
}

/**
 * SearchInput — `Input` + leading Search icon + trailing X clear.
 *
 * Use as the default search affordance throughout the product (filter bars,
 * list headers, command-palette triggers when the modal isn't a fit).
 * Native `type="search"` enables platform search UX (Enter submits, Esc
 * clears in some browsers).
 *
 * The leading icon uses logical `start-3` and the clear button uses logical
 * `end-2` so the layout flips correctly under `dir="rtl"`.
 */
export function SearchInput({
  value = "",
  onValueChange,
  onClear,
  clearLabel = "Clear search",
  className,
  size,
  ...rest
}: SearchInputProps) {
  const hasValue = value.length > 0;
  const iconStart = size === "lg" ? "start-3.5" : size === "sm" ? "start-2.5" : "start-3";

  return (
    <div className="relative w-full">
      <Icon
        icon={Search}
        size={14}
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          "text-fg-muted pointer-events-none",
          iconStart,
        )}
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        size={size}
        className={cn(
          "ps-9",
          hasValue && "pe-9",
          className,
        )}
        {...rest}
      />
      {hasValue ? (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => {
            onValueChange?.("");
            onClear?.();
          }}
          className={cn(
            "absolute end-2 top-1/2 -translate-y-1/2",
            "inline-flex items-center justify-center",
            "h-5 w-5 rounded-sm",
            "bg-transparent text-fg-muted",
            "hover:bg-state-hover active:bg-state-active",
            "transition-colors duration-fast ease-standard",
            "cursor-pointer",
          )}
        >
          <Icon icon={X} size={12} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
