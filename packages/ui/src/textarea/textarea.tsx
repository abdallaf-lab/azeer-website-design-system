import * as React from "react";
import { cn } from "../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>;
}

/**
 * Azeer Textarea — multiline text-entry.
 *
 * Single canonical size (no size variants per Variants.md). Defaults to
 * 3 rows at body-md (14 / 20), vertically resizable only. Same state
 * matrix as Input — driven by `aria-invalid` / `disabled` / `readOnly`.
 */
export function Textarea({
  rows = 3,
  className,
  ref,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "block w-full min-h-20",
        "px-3 py-2",
        "border border-border-strong rounded-md",
        "bg-surface text-fg-default text-body-md",
        "placeholder:text-fg-subtle",
        "transition-colors duration-fast ease-standard",
        "outline-none focus:outline-none focus-visible:outline-none",
        "focus-visible:border-border-focus",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
        "read-only:bg-surface-sunken",
        "aria-invalid:border-danger-border",
        "aria-invalid:focus-visible:border-danger-fill",
        "resize-y",
        className,
      )}
      {...rest}
    />
  );
}
