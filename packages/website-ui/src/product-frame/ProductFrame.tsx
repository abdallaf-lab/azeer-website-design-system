import type * as React from "react";
import { cn } from "../lib";

export interface ProductFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * ProductFrame — the screenshot / product-visual container (Dub anatomy):
 * `rounded-2xl`, subtle neutral border, soft `shadow-sm`, clipped corners, on a
 * white surface. Wrap a screenshot, video, or the in-house `ProductMock`.
 *
 * Borders-first: the shadow is intentionally light (a floating-surface hint),
 * never a heavy drop shadow.
 */
export function ProductFrame({ className, children, ref, ...rest }: ProductFrameProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border border-border-subtle bg-bg-default shadow-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
