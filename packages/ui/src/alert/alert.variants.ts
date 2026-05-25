import { cva, type VariantProps } from "class-variance-authority";

/**
 * Alert — 5 variants. Background tints + 1px intent border; the icon and
 * title text color carry the intent. Body text stays neutral (fg-default /
 * fg-muted) — variant doesn't dictate body color, only signal.
 */
export const alertVariants = cva(
  [
    "relative",
    "rounded-lg border",
    "p-4",
    "flex items-start gap-3",
  ],
  {
    variants: {
      variant: {
        info: "bg-info-bg-subtle border-info-border",
        success: "bg-success-bg-subtle border-success-border",
        warning: "bg-warning-bg-subtle border-warning-border",
        destructive: "bg-danger-bg-subtle border-danger-border",
        ai: "bg-ai-bg-subtle border-ai-border",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
export type AlertVariant = NonNullable<AlertVariantProps["variant"]>;
