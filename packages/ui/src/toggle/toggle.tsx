import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../lib/cn";
import { toggleVariants, type ToggleVariantProps } from "./toggle.variants";

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, "size">,
    ToggleVariantProps {
  ref?: React.Ref<React.ComponentRef<typeof TogglePrimitive.Root>>;
}

/**
 * Toggle — a single pressable that holds two states (off / on). Common in
 * composer toolbars (Bold, Italic, Link) and inline filters that toggle a
 * binary view. For mutually exclusive choices use `ToggleGroup type="single"`.
 *
 * **Pressed state = filter-chip pattern** (`accent-bg-subtle` + `accent-text` +
 * `accent-border`) per States.md, never just a color tint — the border is
 * the second visual signal alongside color.
 */
export function Toggle({
  size,
  className,
  ref,
  ...rest
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...rest}
    />
  );
}

/* ─── ToggleGroup ──────────────────────────────────────────────────────── */

export interface ToggleGroupProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> {
  ref?: React.Ref<React.ComponentRef<typeof ToggleGroupPrimitive.Root>>;
}

/**
 * ToggleGroup — segmented control container. `type="single"` enforces one
 * selection (e.g. text-align: left / center / right); `type="multiple"`
 * lets each item toggle independently (composer toolbar).
 *
 * Default layout: `inline-flex gap-1`. Items share the Toggle visual + size
 * variants — pass a `size` on the group and every item inherits it via
 * context (or set per-item).
 */
export function ToggleGroup({
  className,
  ref,
  ...rest
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("inline-flex gap-1", className)}
      {...rest}
    />
  );
}

export interface ToggleGroupItemProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
      "size"
    >,
    ToggleVariantProps {
  ref?: React.Ref<React.ComponentRef<typeof ToggleGroupPrimitive.Item>>;
}

export function ToggleGroupItem({
  size,
  className,
  ref,
  ...rest
}: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...rest}
    />
  );
}
