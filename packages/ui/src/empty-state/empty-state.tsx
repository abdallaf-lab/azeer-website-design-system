import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";

export interface EmptyStateProps {
  /** Lucide icon component — the system icon wrapper renders it. */
  icon: LucideIcon;
  /** Headline — sentence case, 3–7 words, no end punctuation per Empty.md. */
  title: React.ReactNode;
  /** One sentence body, ~80–120 chars, period at end (when applicable). */
  description?: React.ReactNode;
  /** Primary CTA — typically `<Button>Connect a channel</Button>`. Omit when there's no clear next action. */
  action?: React.ReactNode;
  /**
   * Optional secondary link below the primary CTA — usually
   * `<Button variant="link">` or an inline `<a>` styled to accent. Use for
   * "Learn more" / "Clear filter" / "Contact admin".
   */
  secondaryAction?: React.ReactNode;
  /**
   * `inline` — for empty list panels / cards (40 px icon container, py-12).
   * `page` — for whole-route empty states (64 px icon container, py-24).
   */
  size?: "inline" | "page";
  className?: string;
}

/**
 * EmptyState — locked 5-slot canonical structure per Empty.md.
 *
 *   1. Icon (Lucide, muted-gray on `surface-sunken` circle)
 *   2. Headline (heading-md inline / heading-xl page)
 *   3. Body (one sentence, body-md, fg-muted)
 *   4. Primary CTA (optional)
 *   5. Secondary link (optional)
 *
 * If your empty state needs more than these slots, the feature has a UX
 * problem — redesign the feature, not the empty state.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = "inline",
  className,
}: EmptyStateProps) {
  const isPage = size === "page";
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center mx-auto",
        isPage ? "py-24 max-w-[480px] gap-4" : "py-12 max-w-[360px] gap-3",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          "bg-surface-sunken text-fg-muted",
          isPage ? "h-16 w-16" : "h-10 w-10",
        )}
      >
        <Icon
          icon={icon}
          size={isPage ? 24 : 20}
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3
          className={cn(
            isPage ? "text-heading-lg" : "text-heading-md",
            "text-fg-default m-0",
          )}
        >
          {title}
        </h3>
        {description ? (
          <p className="text-body-md text-fg-muted m-0">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
      {secondaryAction ? <div>{secondaryAction}</div> : null}
    </div>
  );
}
