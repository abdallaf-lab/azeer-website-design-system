import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Card — locked surface defaults per Spacing §locked per-surface defaults:
 *   default → p-5 (20) · gap-3 (12)   ★ canonical
 *   compact → p-4 (16) · gap-2 (8)
 *   none    → no padding / no gap (composer owns the layout)
 *
 * Resting elevation is `--elev-1` (border only — borders-first per the
 * Elevation canon). Floating cards (popovers, dialogs) use different
 * primitives — never apply shadow to a Card.
 */

const cardLayout = {
  default: "p-5 gap-3",
  compact: "p-4 gap-2",
  none: "",
} as const;

export type CardPadding = keyof typeof cardLayout;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

export function Card({ padding = "default", className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        "rounded-xl border border-border-default bg-surface",
        cardLayout[padding],
        className,
      )}
      {...rest}
    />
  );
}

/**
 * CardHeader — title + description block. Tight gap (1.5 = 6 px) between
 * the two label tiers, matching Form §label-to-control rhythm.
 */
export function CardHeader({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...rest} />;
}

export function CardTitle({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-heading-sm text-fg-default", className)}
      {...rest}
    />
  );
}

export function CardDescription({
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-body-sm text-fg-muted", className)}
      {...rest}
    />
  );
}

/**
 * CardBody — primary content slot. Inherits the Card's column layout via
 * flex; consumers can override `gap-*` here for denser content rhythm.
 */
export function CardBody({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-3 text-fg-default text-body-md", className)}
      {...rest}
    />
  );
}

/**
 * CardFooter — action row, end-aligned by default (primary action sits at
 * the logical end side per Forms §submit-button placement).
 */
export function CardFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-end gap-2", className)}
      {...rest}
    />
  );
}
