import * as React from "react";
import { HelpCircle, type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export interface HelpBubbleProps {
  /** Lucide icon for the trigger. Default `HelpCircle`. */
  icon?: LucideIcon;
  /** Required accessible name for the icon-only trigger. */
  "aria-label": string;
  /** Renders a small `danger-fill` notification dot in the corner. */
  hasNotification?: boolean;
  /** Popover content. */
  children: React.ReactNode;
  /** Popover side. Default `"top"` — content opens above the bubble. */
  side?: "top" | "right" | "bottom" | "left";
  /** Popover alignment. Default `"end"` — content end-aligns with the bubble. */
  align?: "start" | "center" | "end";
  /** Popover gap from the bubble. Default 12 px. */
  sideOffset?: number;
  /** Extra classes for the trigger button (e.g. `bottom-6 end-6` to override default offset). */
  className?: string;
  /** Class names for the Popover content panel. */
  contentClassName?: string;
}

/**
 * HelpBubble — fixed bottom-end help / chat affordance.
 *
 * Locked anatomy per Shell.md: 44 × 44 round button, `--z-bubble` (60),
 * positioned at the logical bottom-end of the viewport (mirrors under RTL).
 * Brand-filled (`accent-fill` + `fg-on-accent`) with `--elev-2` shadow so it
 * reads as the persistent always-available help affordance.
 *
 * **Shell-level singleton** — mount exactly once near the app root. Features
 * cannot render their own; they signal help through this single instance.
 */
export function HelpBubble({
  icon: IconComponent = HelpCircle,
  "aria-label": ariaLabel,
  hasNotification,
  children,
  side = "top",
  align = "end",
  sideOffset = 12,
  className,
  contentClassName,
}: HelpBubbleProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            "fixed bottom-4 end-4 z-bubble",
            "inline-flex items-center justify-center",
            "h-11 w-11 rounded-full",
            "bg-accent-fill text-fg-on-accent",
            "shadow-elev-2",
            "transition-colors duration-fast ease-standard",
            "cursor-pointer",
            "hover:bg-accent-fill-hover",
            "active:bg-accent-fill-active",
            className,
          )}
        >
          <Icon icon={IconComponent} size={20} aria-hidden="true" />
          {hasNotification ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1 end-1",
                "h-2.5 w-2.5 rounded-full",
                "bg-danger-fill",
                "ring-2 ring-surface",
              )}
            />
          ) : null}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn("w-80", contentClassName)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
