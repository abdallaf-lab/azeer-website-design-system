import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../lib/cn";

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  ref?: React.Ref<React.ComponentRef<typeof ScrollAreaPrimitive.Root>>;
}

/**
 * ScrollArea — themed scrollbar built on `@radix-ui/react-scroll-area`.
 *
 * Tracks the DS `--color-scrollbar-*` tokens (8 px thumb, transparent track,
 * hover-darken + active-darken thumb states). Use wherever the native
 * browser scrollbar isn't acceptable — most often inside fixed-height
 * lists, popover content, and the Inbox panes.
 */
export function ScrollArea({
  className,
  children,
  ref,
  ...rest
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...rest}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  ref?: React.Ref<React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}

export function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...rest
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none",
        "transition-colors duration-fast ease-standard",
        orientation === "vertical" &&
          "h-full w-2 border-s border-s-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2 flex-col border-t border-t-transparent p-[1px]",
        className,
      )}
      {...rest}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative flex-1 rounded-full",
          "bg-scrollbar-thumb",
          "hover:bg-scrollbar-thumb-hover",
          "active:bg-scrollbar-thumb-active",
          "transition-colors duration-fast ease-standard",
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}
