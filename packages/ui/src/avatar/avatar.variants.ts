import { cva, type VariantProps } from "class-variance-authority";

/**
 * Avatar — 2 shapes × 6 sizes (orthogonal axes).
 *
 *   shape: circle (people, default) · rounded (organizations)
 *   size:  xs 20 · sm 24 · md 32 (default) · lg 40 · xl 48 · 2xl 64
 *
 * The type token per size feeds initials-fallback rendering. label-xs gives
 * uppercase initials at the smallest size (matches the eyebrow tier).
 */
export const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 overflow-hidden",
    "select-none",
    "bg-surface-sunken text-fg-default",
  ],
  {
    variants: {
      shape: {
        circle: "rounded-full",
        rounded: "rounded-lg",
      },
      size: {
        xs: "h-5 w-5 text-label-xs",
        sm: "h-6 w-6 text-body-xs",
        md: "h-8 w-8 text-body-sm",
        lg: "h-10 w-10 text-body-md",
        xl: "h-12 w-12 text-label-md",
        "2xl": "h-16 w-16 text-heading-sm",
      },
    },
    defaultVariants: {
      shape: "circle",
      size: "md",
    },
  },
);

/**
 * Presence dot — overlays the bottom-end corner of the Avatar.
 * Size scales with the parent Avatar; status maps to intent fills.
 */
export const presenceVariants = cva(
  [
    "absolute end-0 bottom-0",
    "rounded-full",
    "ring-2 ring-surface",
  ],
  {
    variants: {
      size: {
        xs: "h-1.5 w-1.5",
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
        xl: "h-3.5 w-3.5",
        "2xl": "h-4 w-4",
      },
      status: {
        online: "bg-success-fill",
        away: "bg-warning-fill",
        busy: "bg-danger-fill",
        offline: "bg-fg-subtle",
      },
    },
    defaultVariants: {
      size: "md",
      status: "online",
    },
  },
);

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export type PresenceVariantProps = VariantProps<typeof presenceVariants>;
