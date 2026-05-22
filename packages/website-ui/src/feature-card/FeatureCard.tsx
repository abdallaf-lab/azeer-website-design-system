import type * as React from "react";
import { Icon } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";

export interface FeatureCardProps {
  /** Optional leading mark, rendered in an accent chip. */
  icon?: SectionIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Make the whole card a link. */
  href?: string;
  className?: string;
}

/**
 * FeatureCard — a single capability card on the marketing scale: accent icon
 * chip, `mkt-heading-sm` title, `mkt-body-sm` body, on a white surface with a
 * subtle neutral border. With `href` the card becomes a link with the
 * signature ring-expand hover (never a lift). Presentational → Server Component.
 *
 * Used standalone, or rendered for each item by `<FeatureGrid marketing>`.
 */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const inner = (
    <>
      {icon ? (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bg-subtle text-accent-text">
          <Icon icon={icon} size={20} aria-hidden="true" />
        </span>
      ) : null}
      <h3 className="text-mkt-heading-sm text-content-emphasis">{title}</h3>
      {description ? (
        <p className="text-mkt-body-sm text-content-subtle">{description}</p>
      ) : null}
    </>
  );

  const base =
    "flex flex-col gap-3 rounded-2xl border border-border-subtle bg-bg-default p-6";

  return href ? (
    <a
      href={href}
      className={cn(
        base,
        "transition hover:border-border-emphasis hover:ring-4 hover:ring-border-subtle",
        className,
      )}
    >
      {inner}
    </a>
  ) : (
    <div className={cn(base, className)}>{inner}</div>
  );
}
