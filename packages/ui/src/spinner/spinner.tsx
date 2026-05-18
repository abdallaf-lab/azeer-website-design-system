import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type SpinnerSize = keyof typeof sizeMap;

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "role" | "aria-live"> {
  /** 16 / 20 / 24 px — locked to the DS icon scale. Default `md` (20px). */
  size?: SpinnerSize;
  /** Visually-hidden label announced by screen readers. Default `"Loading"`. */
  label?: string;
}

/**
 * Action-feedback loader for ≤2-second operations.
 *
 * Beyond 2 seconds the loader is mismatched to the situation — switch to
 * `Skeleton` (when shaping incoming content) or `Progress` (when duration is
 * known). One spinner per action; never stacked with Skeleton on the same
 * surface (see Loading canon).
 *
 * The visible icon is `aria-hidden`; the `sr-only` label inside the
 * `role="status"` + `aria-live="polite"` wrapper announces the loading
 * intent. `prefers-reduced-motion` collapses the spin animation via the
 * global CSS rule in `tokens.css`.
 */
export function Spinner({
  size = "md",
  label = "Loading",
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center justify-center text-fg-muted", className)}
      {...rest}
    >
      <Loader2
        size={sizeMap[size]}
        strokeWidth={1.5}
        className="animate-spin"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
