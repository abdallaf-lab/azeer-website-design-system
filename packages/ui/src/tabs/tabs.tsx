import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";

/**
 * Tabs — underline-only style (per DS Variants.md, **pill tabs are banned**).
 *
 *   TabsList has a 1 px `border-divider` bottom.
 *   TabsTrigger has its own 2 px transparent bottom border + `-mb-px` so it
 *     overlaps the list border by 1 px. On `data-[state=active]`, the
 *     trigger's border swaps to `accent-fill` and the label color shifts to
 *     `accent-text` — both signals together per States.md.
 *
 * Used at page-level (route tabs) and component-level (inspector tabs).
 * Same primitive either way — usage pattern only.
 */
export const Tabs = TabsPrimitive.Root;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.List>>;
}

export function TabsList({ className, ref, ...rest }: TabsListProps) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-stretch",
        "border-b border-border-divider",
        "gap-1",
        className,
      )}
      {...rest}
    />
  );
}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Trigger>>;
}

export function TabsTrigger({ className, ref, ...rest }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center",
        "h-full px-3 -mb-px",
        "text-label-md text-fg-muted",
        "border-b-2 border-transparent",
        "bg-transparent",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        // Hover (inactive only)
        "hover:text-fg-default",
        // Selected — fill swap on the underline + accent text
        "data-[state=active]:text-accent-text",
        "data-[state=active]:border-accent-fill",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Focus visible — covered by global :focus-visible rule (Trigger is a button)
        className,
      )}
      {...rest}
    />
  );
}

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Content>>;
}

export function TabsContent({ className, ref, ...rest }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("mt-4 outline-none", className)}
      {...rest}
    />
  );
}
