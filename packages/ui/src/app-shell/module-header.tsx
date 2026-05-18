import * as React from "react";
import { cn } from "../lib/cn";

export interface ModuleHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: React.ReactNode;
  /** Optional meta line below the title — `text-body-sm fg-muted`. */
  meta?: React.ReactNode;
  /** Trailing action group — `<Button size="sm" />` row, etc. */
  actions?: React.ReactNode;
  /** Optional leading slot — back arrow, breadcrumb, avatar. */
  leading?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

/**
 * ModuleHeader — 64 px header at the top of the Main card.
 *
 * Per Shell.md: NOT a topbar. It lives INSIDE the Main card and scrolls
 * with the card body when content overflows. Apply `sticky top-0
 * bg-surface` from the consumer when sticky-on-scroll is desired (then it
 * lands at the `--z-sticky` tier per Z-Index canon).
 *
 * Spacing per Spacing.md per-surface defaults:
 *   - Height 64 (`h-16`)
 *   - Padding `px-5` (20)
 *   - Action-group gap 3 (`gap-3`)
 */
export function ModuleHeader({
  title,
  meta,
  actions,
  leading,
  className,
  ref,
  ...rest
}: ModuleHeaderProps) {
  return (
    <header
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4",
        "h-16 px-5 shrink-0",
        "border-b border-border-default bg-surface",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-3 min-w-0">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div className="flex flex-col gap-0.5 min-w-0">
          <h2 className="text-heading-md text-fg-default truncate m-0">
            {title}
          </h2>
          {meta ? (
            <div className="text-body-sm text-fg-muted truncate">{meta}</div>
          ) : null}
        </div>
      </div>
      {actions ? (
        <div className="flex items-center gap-3 shrink-0">{actions}</div>
      ) : null}
    </header>
  );
}
