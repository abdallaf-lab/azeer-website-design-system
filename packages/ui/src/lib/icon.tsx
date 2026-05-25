import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "./cn";

export type IconSize = 12 | 14 | 16 | 20 | 24;

export interface IconProps extends Omit<LucideProps, "size" | "strokeWidth" | "ref"> {
  /** The Lucide icon component to render. Import from `lucide-react`. */
  icon: LucideIcon;
  /** Pixel size — locked to the DS scale (12 / 14 / 16 / 20 / 24). Default 16. */
  size?: IconSize;
  /**
   * Mirror horizontally under `dir="rtl"`. Set on directional icons
   * (chevrons, arrows, send, reply, indent/outdent). Default false.
   */
  flipOnRtl?: boolean;
  /** Forwarded ref to the underlying SVG element. */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * System icon wrapper around Lucide React.
 *
 *   - Locks `strokeWidth` to 1.5 (DS canon — Foundation §6).
 *   - Restricts `size` to the 12 / 14 / 16 / 20 / 24 px scale.
 *   - Adds opt-in RTL mirroring via `flipOnRtl` (uses `rtl:` Tailwind variant).
 *
 * A11y contract:
 *   - Pass `aria-label` when the icon is the only label (icon-only Button).
 *   - Pass `aria-hidden="true"` when a sibling text label is present so
 *     screen readers don't double-announce.
 *
 * ESLint forbids importing `lucide-react` directly outside `@azeer/ui` —
 * components and apps both reach for `<Icon icon={X} />` instead.
 */
export function Icon({
  icon: IconComponent,
  size = 16,
  flipOnRtl = false,
  className,
  ref,
  ...rest
}: IconProps) {
  return (
    <IconComponent
      ref={ref}
      size={size}
      strokeWidth={1.5}
      className={cn(flipOnRtl && "rtl:-scale-x-100", className)}
      {...rest}
    />
  );
}
