import { cva, type VariantProps } from "class-variance-authority";

/**
 * Locked Badge variant surface — 7 variants × 2 sizes.
 *
 * Variants encode intent (success / warning / destructive / info / accent /
 * neutral / outline). The `ai` look = `accent` + Sparkles prefix at the
 * usage site; there is no separate `ai` Badge variant.
 *
 * Sizes are sm (h-5 = 20px) and md (h-6 = 24px, default). No `lg` — the
 * metadata tier doesn't earn a hero size.
 */
export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "border border-transparent",
    "whitespace-nowrap select-none",
    "rounded-md",
  ],
  {
    variants: {
      variant: {
        neutral: "bg-surface-sunken border-border-default text-fg-default",
        info: "bg-info-bg-subtle text-info-text",
        success: "bg-success-bg-subtle text-success-text",
        warning: "bg-warning-bg-subtle text-warning-text",
        destructive: "bg-danger-bg-subtle text-danger-text",
        accent: "bg-accent-bg-subtle text-accent-text",
        outline: "bg-transparent border-border-default text-fg-default",
      },
      size: {
        sm: "h-5 px-2 text-body-xs",
        md: "h-6 px-2.5 text-body-xs",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
