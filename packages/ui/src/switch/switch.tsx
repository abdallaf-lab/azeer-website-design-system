import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/cn";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  ref?: React.Ref<React.ComponentRef<typeof SwitchPrimitive.Root>>;
}

/**
 * Azeer Switch — built on @radix-ui/react-switch.
 *
 * Locked anatomy per Variants.md: 36 × 20 track, 16 × 16 thumb. Single
 * canonical size — no `size` prop. State change is the only signal:
 *
 *   off (resting)   → track = border-strong  (gray)
 *   off (hover)     → track darkens (state-hover overlay via opacity)
 *   on (data-state=checked)  → track = accent-fill (indigo)
 *
 * Thumb slides 16 px logical-end on check. `rtl:-translate-x-4` mirrors
 * the slide direction under `dir="rtl"`.
 *
 * Focus indicator comes from the global `:focus-visible` rule — Switch
 * carries `role="switch"`, which is covered.
 */
export function Switch({ className, ref, ...rest }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "inline-flex h-5 w-9 shrink-0 items-center",
        "rounded-full",
        "border-2 border-transparent",
        "bg-border-strong",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        "data-[state=checked]:bg-accent-fill",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full",
          "bg-surface shadow-control",
          "translate-x-0",
          "transition-transform duration-fast ease-standard",
          "data-[state=checked]:translate-x-4",
          "rtl:data-[state=checked]:-translate-x-4",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
