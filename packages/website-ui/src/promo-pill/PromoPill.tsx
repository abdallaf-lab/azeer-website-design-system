import type * as React from "react";
import { cn } from "../lib";

export interface PromoPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}

/**
 * PromoPill — the small top eyebrow pill (Dub anatomy): white surface, subtle
 * neutral border, fully rounded, a touch of `shadow-xs`. Houses an eyebrow,
 * a "new" tag, or an icon + label. Presentational → Server Component.
 *
 * Logical padding (`px`) only, so it mirrors cleanly under RTL.
 */
export function PromoPill({ className, children, ref, ...rest }: PromoPillProps) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full",
        "border border-border-subtle bg-bg-default shadow-xs",
        "px-3 py-1 text-mkt-body-sm font-medium text-content-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
