import type * as React from "react";
import { Icon } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";

export interface MegaMenuProductItem {
  icon: SectionIcon;
  title: string;
  description: string;
  href: string;
}

export interface MegaMenuProductProps {
  /** Primary product capabilities, rendered as a two-column icon grid. */
  items: MegaMenuProductItem[];
  /** Optional promoted card on the end side (e.g. "What's new"). */
  highlight?: React.ReactNode;
  className?: string;
}

/**
 * MegaMenuProduct — the "Product" dropdown panel. A grid of capability links
 * with an optional promo rail. Purely presentational; `Navbar` controls
 * open/close + focus, so this stays a Server Component.
 */
export function MegaMenuProduct({ items, highlight, className }: MegaMenuProductProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-[2fr_1fr]", className)}>
      <ul className="grid gap-1 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(
                "group flex items-start gap-3 rounded-lg p-3",
                "transition-colors duration-fast ease-standard",
                "hover:bg-state-hover",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center",
                  "rounded-md bg-accent-bg-subtle text-accent-text",
                )}
              >
                <Icon icon={item.icon} size={16} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-label-md text-fg-default group-hover:text-accent-text">
                  {item.title}
                </span>
                <span className="text-body-xs text-fg-muted">{item.description}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      {highlight ? (
        <div className="rounded-lg border border-border-default bg-surface-sunken p-4">
          {highlight}
        </div>
      ) : null}
    </div>
  );
}
