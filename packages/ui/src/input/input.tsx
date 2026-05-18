import * as React from "react";
import { cn } from "../lib/cn";
import { inputVariants, type InputVariantProps } from "./input.variants";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  /**
   * Control size — locked to `sm` (32 px) / `md` (40 px, default) / `lg` (48 px).
   * Named `size` in the public API even though the cva variant key is
   * `inputSize` (the native `<input>` `size` attribute uses the same name).
   */
  size?: InputVariantProps["inputSize"];
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * Azeer Input — the text-entry primitive.
 *
 * Always pair with a `Label` (via `FormField` preferred). Validation
 * appearance is driven by ARIA attributes (`aria-invalid`, `aria-required`)
 * which the parent `FormField` wires automatically — components downstream
 * shouldn't manage the `aria-invalid` flag themselves.
 *
 * Adornments (leading / trailing icons, clear button) are deferred to
 * SearchInput / PhoneInput primitives — the base Input stays content-only.
 */
export function Input({
  size,
  className,
  type = "text",
  ref,
  ...rest
}: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ inputSize: size }), className)}
      {...rest}
    />
  );
}
