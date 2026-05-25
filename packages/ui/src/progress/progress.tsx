import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../lib/cn";

export type ProgressIntent = "primary" | "success" | "warning" | "destructive";

const intentClass: Record<ProgressIntent, string> = {
  primary: "bg-accent-fill",
  success: "bg-success-fill",
  warning: "bg-warning-fill",
  destructive: "bg-danger-fill",
};

export interface ProgressProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    "value"
  > {
  /** 0–100 for determinate, `null` for indeterminate. */
  value?: number | null;
  intent?: ProgressIntent;
  ref?: React.Ref<React.ComponentRef<typeof ProgressPrimitive.Root>>;
}

/**
 * Progress — linear bar built on `@radix-ui/react-progress`.
 *
 * Determinate (0–100): width transitions smoothly. Indeterminate (`value`
 * is `null`): bar animates via `animate-pulse` to signal activity without
 * a measurable percentage.
 *
 * Per Loading.md Rule 3: use Progress when the operation has a **known
 * duration** OR a **known number of steps**. For <2 s actions use Spinner;
 * for content-shaped >2 s loads use Skeleton.
 */
export function Progress({
  value,
  intent = "primary",
  className,
  ref,
  ...rest
}: ProgressProps) {
  const isIndeterminate = value === null || value === undefined;
  const clamped = isIndeterminate ? null : Math.max(0, Math.min(100, value));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={clamped ?? undefined}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        "bg-surface-sunken",
        className,
      )}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full rounded-full",
          intentClass[intent],
          isIndeterminate
            ? "w-1/3 animate-pulse"
            : "w-full transition-transform duration-base ease-standard",
        )}
        style={
          isIndeterminate
            ? undefined
            : { transform: `translateX(-${100 - (clamped ?? 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}
