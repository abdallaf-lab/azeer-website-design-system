import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Skeleton family — content-shaped placeholders that reserve layout while
 * data loads. Per Loading.md, the skeleton must match the shape of the
 * content that will replace it, so the layout doesn't shift on data arrival.
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "full";
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Base Skeleton — pass `h-N w-N` (or `style`) for dimensions. Default radius
 * is `md` (matches the surrounding content's edge style); pass `rounded="full"`
 * for avatar-shaped placeholders.
 */
export function Skeleton({
  rounded = "md",
  className,
  ref,
  ...rest
}: SkeletonProps) {
  const radiusClass =
    rounded === "sm" ? "rounded-sm" : rounded === "full" ? "rounded-full" : "rounded-md";
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-surface-sunken",
        radiusClass,
        className,
      )}
      {...rest}
    />
  );
}

export interface SkeletonTextProps {
  lines?: number;
  lineHeight?: "sm" | "md" | "lg";
  gap?: "tight" | "default" | "loose";
  /** Width of the final line as a percentage of full width. Default 70. */
  lastLineWidth?: 60 | 70 | 80;
  className?: string;
}

/**
 * SkeletonText — stack of skeleton lines mimicking prose. Widths cycle
 * (100% / ~90% / ~75%) so 4+ lines feel natural rather than uniform; the
 * last line uses `lastLineWidth` to suggest paragraph ending.
 */
export function SkeletonText({
  lines = 3,
  lineHeight = "md",
  gap = "default",
  lastLineWidth = 70,
  className,
}: SkeletonTextProps) {
  const heightClass = lineHeight === "sm" ? "h-3" : lineHeight === "lg" ? "h-5" : "h-4";
  const gapClass = gap === "tight" ? "gap-2" : gap === "loose" ? "gap-4" : "gap-3";
  const cycle = [100, 90, 75];
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex flex-col", gapClass, className)}
    >
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        const width = isLast ? lastLineWidth : cycle[i % cycle.length];
        return (
          <div
            key={i}
            className={cn(
              "animate-pulse bg-surface-sunken rounded-md",
              heightClass,
            )}
            style={{ width: `${width}%` }}
          />
        );
      })}
    </div>
  );
}

export interface SkeletonAvatarProps {
  /** Matches the Avatar component's 6 sizes. Default `md` (32 px). */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** `circle` for people (default), `rounded` for orgs. */
  shape?: "circle" | "rounded";
  className?: string;
}

export function SkeletonAvatar({
  size = "md",
  shape = "circle",
  className,
}: SkeletonAvatarProps) {
  const sizeClass = {
    xs: "h-5 w-5",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
    "2xl": "h-16 w-16",
  }[size];
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-surface-sunken shrink-0",
        sizeClass,
        shapeClass,
        className,
      )}
    />
  );
}

export interface SkeletonCardProps {
  avatarSize?: SkeletonAvatarProps["size"];
  lines?: number;
  /** Render a short tail (timestamp-shaped) on the first row. Default true. */
  withTail?: boolean;
  /** Pad the card (`p-4`). Set false when nested inside an existing row. */
  padded?: boolean;
  className?: string;
}

/**
 * SkeletonCard — composed of SkeletonAvatar + tail + SkeletonText. Standardized
 * shape for conversation rows, contact rows, list rows.
 */
export function SkeletonCard({
  avatarSize = "md",
  lines = 2,
  withTail = true,
  padded = true,
  className,
}: SkeletonCardProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-start gap-3", padded && "p-4", className)}
    >
      <SkeletonAvatar size={avatarSize} />
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 flex-1 max-w-[60%]" />
          {withTail ? <Skeleton className="h-3 w-12" /> : null}
        </div>
        <SkeletonText lines={lines} lineHeight="sm" gap="tight" />
      </div>
    </div>
  );
}
