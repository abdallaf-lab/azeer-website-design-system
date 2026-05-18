import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  ref?: React.Ref<React.ComponentRef<typeof PopoverPrimitive.Content>>;
  /**
   * Portal container override. Defaults to `document.body`. Pass a
   * DialogContent / SheetContent DOM ref when nesting a Popover inside a
   * modal — see SelectContent's `container` prop for the full rationale.
   */
  container?: HTMLElement | null;
}

/**
 * PopoverContent — white surface (overlay tint) + elev-2 + rounded-lg.
 * **No arrow** per Components.md. Default 288 px width and 4 px offset
 * from the trigger — override per-usage when content demands more space.
 */
export function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  container,
  ref,
  ...rest
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal container={container ?? undefined}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-popover",
          "w-72 p-4",
          "rounded-lg",
          "bg-surface-overlay text-fg-default",
          "shadow-elev-2",
          "outline-none",
          // Enter / exit transitions.
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
}
