import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";

/**
 * Accordion — border-divider style.
 *
 * Each item separated by a 1 px `border-divider`. Trigger sits on its own
 * row; chevron rotates 180° on open via `data-[state=open]:rotate-180`.
 * Content height animates via Radix's `--radix-accordion-content-height`
 * CSS variable + the `accordion-down` / `accordion-up` keyframes registered
 * in tokens.css.
 *
 * `type="single"` + `collapsible` covers the FAQ pattern (only one open at
 * a time, all can be closed) — replaces both `Collapsible` and `Disclosure`
 * primitives (both banned per Components.md).
 */
export const Accordion = AccordionPrimitive.Root;

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Item>>;
}

export function AccordionItem({ className, ref, ...rest }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b border-border-divider", className)}
      {...rest}
    />
  );
}

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Trigger>>;
}

export function AccordionTrigger({
  className,
  children,
  ref,
  ...rest
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group/accordion-trigger",
          "flex flex-1 items-center justify-between gap-3",
          "py-3",
          "text-label-md text-fg-default text-start",
          "transition-colors duration-fast ease-standard",
          "cursor-pointer",
          "hover:text-accent-text",
          "outline-none",
          className,
        )}
        {...rest}
      >
        {children}
        <Icon
          icon={ChevronDown}
          size={16}
          aria-hidden="true"
          className={cn(
            "shrink-0 text-fg-muted",
            "transition-transform duration-fast ease-standard",
            "group-data-[state=open]/accordion-trigger:rotate-180",
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  ref?: React.Ref<React.ComponentRef<typeof AccordionPrimitive.Content>>;
}

export function AccordionContent({
  className,
  children,
  ref,
  ...rest
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "text-body-md text-fg-default",
        "data-[state=open]:animate-accordion-down",
        "data-[state=closed]:animate-accordion-up",
        className,
      )}
      {...rest}
    >
      <div className="pb-3">{children}</div>
    </AccordionPrimitive.Content>
  );
}
