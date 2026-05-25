import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../lib/cn";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  ref?: React.Ref<React.ComponentRef<typeof CheckboxPrimitive.Root>>;
}

/**
 * Azeer Checkbox — built on @radix-ui/react-checkbox.
 *
 * Locked single size 16 × 16. Three states beyond default:
 *   checked        → bg + border = accent-fill, white Check icon
 *   indeterminate  → bg + border = accent-fill, white Minus icon
 *   disabled       → opacity 0.5 + cursor-not-allowed
 *
 * The two state-icons coexist inside the Indicator — visibility is driven by
 * the parent Root's `data-state` attribute via `group-data-[state=…]`
 * Tailwind modifiers. This avoids the controlled-state plumbing required to
 * branch in React but works with uncontrolled + controlled instances alike.
 */
export function Checkbox({ className, ref, ...rest }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "group",
        "h-4 w-4 shrink-0",
        "inline-flex items-center justify-center",
        "rounded-sm border border-border-strong bg-surface",
        "text-fg-on-accent",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        "data-[state=checked]:bg-accent-fill data-[state=checked]:border-accent-fill",
        "data-[state=indeterminate]:bg-accent-fill data-[state=indeterminate]:border-accent-fill",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className="inline-flex items-center justify-center">
        <Check
          aria-hidden="true"
          size={12}
          strokeWidth={2.5}
          className="group-data-[state=indeterminate]:hidden"
        />
        <Minus
          aria-hidden="true"
          size={12}
          strokeWidth={2.5}
          className="hidden group-data-[state=indeterminate]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
