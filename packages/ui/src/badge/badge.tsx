import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { badgeVariants, type BadgeVariantProps } from "./badge.variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {
  /**
   * Adds an X dismiss control on the end side. This is how Tag/Chip are
   * expressed in the system — there is no separate `Tag` primitive.
   */
  removable?: boolean;
  /** Fires when the X is clicked. Required if `removable`. */
  onRemove?: () => void;
  /**
   * `aria-label` for the remove button. Default `"Remove"`. Override per
   * usage when context helps screen-reader users (e.g. `"Remove WhatsApp filter"`).
   */
  removeLabel?: string;
  ref?: React.Ref<HTMLSpanElement>;
}

/**
 * The canonical inline-metadata primitive. Use for status, role tags,
 * channel labels, counts, AI labels (with a `Sparkles` icon prefix).
 *
 * Composition over inheritance: `<Badge variant="outline" removable />`
 * is the system's "filter chip" — a separate Tag/Chip primitive is forbidden.
 */
export function Badge({
  variant,
  size,
  removable,
  onRemove,
  removeLabel = "Remove",
  className,
  children,
  ref,
  ...rest
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
      {removable ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className={cn(
            "inline-flex items-center justify-center",
            "-me-1 ms-0.5",
            "h-4 w-4 rounded-sm",
            "bg-transparent text-current",
            "hover:bg-state-hover active:bg-state-active",
            "transition-colors duration-fast ease-standard",
            "cursor-pointer",
          )}
        >
          <Icon icon={X} size={12} aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}
