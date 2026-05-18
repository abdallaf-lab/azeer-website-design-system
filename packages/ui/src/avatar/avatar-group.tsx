import * as React from "react";
import { cn } from "../lib/cn";
import { avatarVariants } from "./avatar.variants";
import type { AvatarProps, AvatarSize } from "./avatar";

export interface AvatarGroupProps {
  /** Maximum visible Avatars before collapsing to an overflow chip. Default 3. */
  max?: number;
  /** Forces the size on every child Avatar — group overrides any per-child size. */
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
}

/**
 * AvatarGroup — overlapping row of Avatars with an overflow chip.
 *
 * Logical-property negative spacing (`-space-x-* rtl:space-x-reverse`) so the
 * overlap direction mirrors under RTL. Each child gets a 2px surface-colored
 * ring so the overlap reads as separation rather than collision.
 */
export function AvatarGroup({
  max = 3,
  size = "md",
  children,
  className,
}: AvatarGroupProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  const visible = items.slice(0, max);
  const overflow = Math.max(0, items.length - max);

  return (
    <div
      role="group"
      className={cn("flex items-center -space-x-2 rtl:space-x-reverse", className)}
    >
      {visible.map((child, i) => (
        <span key={i} className="relative inline-flex ring-2 ring-surface rounded-full">
          {React.cloneElement(child as React.ReactElement<AvatarProps>, {
            size,
          })}
        </span>
      ))}
      {overflow > 0 ? (
        <span
          aria-label={`${overflow} more`}
          className={cn(
            avatarVariants({ shape: "circle", size }),
            "ring-2 ring-surface inline-flex items-center justify-center",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
