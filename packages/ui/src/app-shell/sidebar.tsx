import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";

export interface SidebarProps {
  /** Title shown at the top — uppercase eyebrow tier (`text-label-xs`). */
  title?: React.ReactNode;
  /** Section nav items. */
  children?: React.ReactNode;
  /** Optional footer separated by a 1 px divider. */
  footer?: React.ReactNode;
  className?: string;
  /** `aria-label` for the `<aside>` landmark. Default `"Secondary navigation"`. */
  ariaLabel?: string;
}

/**
 * Sidebar — L2 secondary nav island.
 *
 * Locked anatomy (Shell.md):
 *   - 230 px white island, `rounded-xl`, 1 px `border-default`
 *   - Top: optional uppercase eyebrow title
 *   - Body: nav list
 *   - Bottom: optional footer separated by `border-divider`
 *   - `--z-nav` (20)
 */
export function Sidebar({
  title,
  children,
  footer,
  className,
  ariaLabel = "Secondary navigation",
}: SidebarProps) {
  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        "flex flex-col shrink-0",
        "w-[230px] h-full",
        "rounded-xl border border-border-default bg-surface",
        "p-2 gap-2",
        "z-nav",
        className,
      )}
    >
      {title ? (
        <div className="px-2 py-1.5 text-label-xs text-fg-muted">
          {title}
        </div>
      ) : null}
      <div className="flex-1 flex flex-col gap-1 min-h-0 overflow-y-auto">
        {children}
      </div>
      {footer ? (
        <div className="-mx-2 px-2 pt-2 border-t border-border-divider">
          {footer}
        </div>
      ) : null}
    </aside>
  );
}

export interface SidebarItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  icon?: LucideIcon;
  label: string;
  /** Active route indicator. */
  active?: boolean;
  /** Optional trailing slot (count, badge). */
  trailing?: React.ReactNode;
  flipIconOnRtl?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * SidebarItem — single row inside `Sidebar`. 32 px tall per Shell.md
 * (Sidebar row height 32). Active state matches PrimaryRailItem: bg +
 * start-bar + text color, three signals.
 */
export function SidebarItem({
  icon,
  label,
  active,
  trailing,
  flipIconOnRtl,
  className,
  ref,
  ...rest
}: SidebarItemProps) {
  return (
    <button
      ref={ref}
      type="button"
      data-active={active}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative",
        "inline-flex items-center gap-2",
        "h-ctrl-sm px-3 rounded-md",
        "text-body-md text-fg-default",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        "hover:bg-state-hover",
        "data-[active=true]:bg-accent-bg-subtle data-[active=true]:text-accent-text",
        className,
      )}
      {...rest}
    >
      {active ? (
        <span
          aria-hidden="true"
          className="absolute start-0 top-1.5 bottom-1.5 w-0.5 rounded-e-full bg-accent-fill"
        />
      ) : null}
      {icon ? (
        <Icon icon={icon} size={14} flipOnRtl={flipIconOnRtl} aria-hidden="true" />
      ) : null}
      <span className="flex-1 text-start truncate">{label}</span>
      {trailing ? (
        <span className="shrink-0 text-fg-muted text-body-xs">{trailing}</span>
      ) : null}
    </button>
  );
}
