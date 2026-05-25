import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../lib/cn";

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

/**
 * RadioGroup — built on @radix-ui/react-radio-group.
 *
 * Orchestrates focus + arrow-key navigation across child RadioGroupItems
 * (Radix handles all keyboard / ARIA wiring). Default layout is vertical
 * with 8 px (`gap-2`) between items per Forms canon.
 */
export function RadioGroup({ className, ref, ...rest }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...rest}
    />
  );
}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

/**
 * RadioGroupItem — single radio button. Always rendered inside a RadioGroup.
 *
 * DS canon (States.md): checked state = outer `accent-fill` + inner white
 * dot. This is the inverse of the Shadcn default — we follow DS, not
 * Shadcn — so the indicator is a `bg-surface` dot on an `accent-fill`
 * outer circle, never an indigo dot on a white outer.
 */
export function RadioGroupItem({ className, ref, ...rest }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "h-4 w-4 shrink-0",
        "inline-flex items-center justify-center",
        "rounded-full border border-border-strong bg-surface",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        "data-[state=checked]:bg-accent-fill data-[state=checked]:border-accent-fill",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className="inline-flex items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-surface" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
