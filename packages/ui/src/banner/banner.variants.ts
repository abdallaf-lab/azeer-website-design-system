import { cva, type VariantProps } from "class-variance-authority";

/**
 * Banner — 5 intents. Surface gets the intent's bg-subtle + border tones;
 * body text stays neutral (`fg-default`) so prose reads cleanly. Icon
 * + border + bg together signal intent (never color alone — WCAG 1.4.1).
 *
 * `accent` (lavender) is the default — covers trial / upgrade / feature
 * announcement, the common case. Other intents pair with system / billing /
 * maintenance messages.
 */
export const bannerVariants = cva(
  [
    "flex items-center gap-3",
    "h-12 px-5",
    "border-b",
    "text-fg-default",
  ],
  {
    variants: {
      intent: {
        info: "bg-info-bg-subtle border-info-border",
        success: "bg-success-bg-subtle border-success-border",
        warning: "bg-warning-bg-subtle border-warning-border",
        destructive: "bg-danger-bg-subtle border-danger-border",
        accent: "bg-accent-bg-subtle border-accent-border",
      },
    },
    defaultVariants: {
      intent: "accent",
    },
  },
);

export type BannerVariantProps = VariantProps<typeof bannerVariants>;
export type BannerIntent = NonNullable<BannerVariantProps["intent"]>;
