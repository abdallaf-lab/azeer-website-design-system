import * as React from "react";
import { cn } from "../lib/cn";
import { Label } from "../label";

type ControlElement = React.ReactElement<{
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-required"?: boolean | "true" | "false";
}>;

export interface FormFieldProps {
  /** Label text shown above the control. Required for accessibility unless the control has its own labeling. */
  label?: React.ReactNode;
  /**
   * Marks the field as required. Renders `*` in the label and sets
   * `aria-required="true"` on the control. Pick one of `required` / `optional`
   * per form (Forms.md §required-vs-optional).
   */
  required?: boolean;
  /**
   * Marks the field as optional (when most fields in a form are required).
   * Renders `(optional)` after the label. Pick one of `required` / `optional`
   * per form.
   */
  optional?: boolean;
  /**
   * Helper text shown below the control. Replaced by `error` when present.
   * Full sentence ending in a period when applicable.
   */
  helper?: React.ReactNode;
  /**
   * Validation error. When present, replaces `helper`, tints the control
   * border (`aria-invalid`), and announces via `aria-describedby`.
   */
  error?: React.ReactNode;
  /** Override the auto-generated control id. Rarely needed. */
  htmlFor?: string;
  className?: string;
  /** Exactly one child — the form control (Input / Textarea / Select / etc). */
  children: React.ReactNode;
}

/**
 * FormField — the canonical 4-slot form anatomy from Forms.md.
 *
 *   1. Label (top-aligned, text-label-sm)
 *   2. Control (Input / Textarea / Select / Combobox / etc)
 *   3a. Helper text (text-body-xs text-fg-muted)
 *   3b. Error message (text-body-xs text-danger-text) — replaces helper
 *
 * Auto-wires accessibility:
 *   - `htmlFor` ↔ child `id` (auto-generated via React.useId if not provided)
 *   - `aria-describedby` → helper-or-error message id
 *   - `aria-invalid="true"` when `error` is present
 *   - `aria-required="true"` when `required` is set
 *
 * The consumer's responsibility:
 *   - Pass exactly one child (the control)
 *   - Validate timing (blur for format, submit for required — Forms.md §4)
 *   - Decide between `required` and `optional` marking (one per form)
 */
export function FormField({
  label,
  required,
  optional,
  helper,
  error,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  const autoId = React.useId();
  const messageId = React.useId();
  const child = React.Children.only(children) as ControlElement;

  const inputId = htmlFor ?? child.props.id ?? autoId;
  const hasMessage = Boolean(error || helper);
  const existingDescribedBy = child.props["aria-describedby"];
  const ariaDescribedBy = hasMessage
    ? [existingDescribedBy, messageId].filter(Boolean).join(" ")
    : existingDescribedBy;

  const clonedChild = React.cloneElement(child, {
    id: inputId,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": error ? true : child.props["aria-invalid"],
    "aria-required": required ? true : child.props["aria-required"],
  });

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <Label htmlFor={inputId} required={required}>
          {label}
          {optional && !required ? (
            <span className="ms-1 text-body-xs text-fg-muted font-normal">
              (optional)
            </span>
          ) : null}
        </Label>
      ) : null}
      {clonedChild}
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
