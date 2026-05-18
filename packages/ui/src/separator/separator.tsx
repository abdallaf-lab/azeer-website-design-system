import * as React from "react";
import { cn } from "../lib/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `horizontal` (default) or `vertical`. */
  orientation?: "horizontal" | "vertical";
  /**
   * `true` (default) renders with `role="none"` — hidden from the a11y tree.
   * `false` renders with `role="separator"` + `aria-orientation` so screen
   * readers announce the boundary. Use semantic mode only when the divider
   * conveys grouping that isn't obvious from layout (e.g. tab-group split
   * inside a long menu).
   */
  decorative?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * 1px divider between sections or inline items.
 *
 * Single token (`--color-border-divider`) drives the color system-wide —
 * never re-roll the divider color per surface. Horizontal stretches full
 * width; vertical stretches full height of its parent.
 */
export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ref,
  ...rest
}: SeparatorProps) {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border-divider",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...rest}
    />
  );
}
