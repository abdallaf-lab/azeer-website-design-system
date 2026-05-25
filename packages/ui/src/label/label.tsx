import * as React from "react";
import { cn } from "../lib/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Renders the required `*` marker after the label text. The `*` is
   * `aria-hidden` — pair with `aria-required` on the control itself so
   * screen readers announce "required" without reading the asterisk.
   */
  required?: boolean;
  ref?: React.Ref<HTMLLabelElement>;
}

/**
 * Label — the canonical form-field label.
 *
 * Per Forms.md anatomy: `text-label-sm` (13 / 16 / 500), `text-fg-default`,
 * sentence case, no end punctuation. Always sits *above* its control
 * (top-aligned) — the system bans left-aligned, floating, and
 * placeholder-as-label patterns.
 *
 * `htmlFor` is the consumer's responsibility unless this Label is wrapped
 * in `FormField`, which auto-wires it.
 */
export function Label({
  required,
  className,
  children,
  ref,
  ...rest
}: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1",
        "text-label-sm text-fg-default",
        className,
      )}
      {...rest}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-danger-text">
          *
        </span>
      ) : null}
    </label>
  );
}
