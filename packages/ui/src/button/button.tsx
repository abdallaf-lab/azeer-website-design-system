import * as React from "react";
import { cn } from "../lib/cn";
import { buttonVariants, type ButtonVariantProps } from "./button.variants";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariantProps {
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * Azeer Button — the locked action primitive.
 *
 * Defaults to `variant="primary"` + `size="md"` per the system canon. Always
 * renders a real `<button>` (no `<div role="button">`). Focus ring comes from
 * the global `:focus-visible` rule in tokens.css — passing `outline-none`
 * here would silently break keyboard accessibility.
 */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
