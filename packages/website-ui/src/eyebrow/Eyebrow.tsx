import type * as React from "react";
import { Icon } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";
import { PromoPill } from "../promo-pill";

export interface EyebrowProps {
  /** Optional leading mark (16px), rendered through the system `<Icon />`. */
  icon?: SectionIcon;
  children: React.ReactNode;
  /** Render inside a bordered `PromoPill` instead of inline text. */
  pill?: boolean;
  className?: string;
}

/**
 * Eyebrow — the small label above a heading. Inline (uppercase, accent-tinted)
 * by default, or a bordered pill via `pill`. A 16px icon sits before the label
 * with a `gap-2`. Decorative icon → `aria-hidden`.
 */
export function Eyebrow({ icon, children, pill = false, className }: EyebrowProps) {
  const inner = (
    <>
      {icon ? <Icon icon={icon} size={16} aria-hidden="true" /> : null}
      <span>{children}</span>
    </>
  );

  if (pill) {
    return <PromoPill className={className}>{inner}</PromoPill>;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        "text-mkt-caption uppercase text-accent-text",
        className,
      )}
    >
      {inner}
    </span>
  );
}
