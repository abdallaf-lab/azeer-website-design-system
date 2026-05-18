import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";

/**
 * TooltipProvider — DS-locked delays.
 *
 * Per Components.md: 500 ms open / 100 ms close-and-reopen. Mount **once**
 * near the app root. Storybook's `withGlobals` decorator already mounts one
 * so every story has access without re-wrapping.
 */
export function TooltipProvider({
  delayDuration = 500,
  skipDelayDuration = 100,
  ...rest
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...rest}
    />
  );
}

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  ref?: React.Ref<React.ComponentRef<typeof TooltipPrimitive.Content>>;
}

/**
 * Dark surface tooltip — surface-inverse + fg-on-inverse, max 240 px,
 * text-body-sm. Enter/exit transitions driven by Radix data-state attributes
 * via tw-animate-css utilities.
 */
export function TooltipContent({
  className,
  sideOffset = 6,
  ref,
  ...rest
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-tooltip",
          "max-w-[240px]",
          "px-2 py-1.5",
          "rounded-md",
          "bg-surface-inverse text-fg-on-inverse",
          "text-body-sm",
          "shadow-elev-2",
          "select-none",
          // Enter / exit transitions via Radix data-state.
          "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-1",
          "data-[side=left]:slide-in-from-right-1",
          "data-[side=right]:slide-in-from-left-1",
          "data-[side=top]:slide-in-from-bottom-1",
          className,
        )}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  );
}
