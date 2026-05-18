import { cva, type VariantProps } from "class-variance-authority";

/**
 * Dialog content variants.
 *
 * Locked widths (Components.md): sm 480 / md 640 / lg 800. Per Spacing
 * §locked-defaults, body padding is `p-6` (24 px) and inter-section gap is
 * `gap-4` (16 px) — set on `DialogContent` itself.
 *
 * Positioning: `fixed` + `start-1/2 top-1/2` with translate-by-half to
 * center. `rtl:translate-x-1/2` mirrors the X-axis translate under RTL so
 * the center math stays correct in both directions.
 */
export const dialogContentVariants = cva(
  [
    "fixed start-1/2 top-1/2",
    "-translate-x-1/2 -translate-y-1/2",
    "rtl:translate-x-1/2",
    "z-modal",
    "w-[calc(100vw-2rem)]",
    "max-h-[calc(100vh-2rem)]",
    "flex flex-col",
    "rounded-xl border border-border-default bg-surface text-fg-default",
    "shadow-elev-3",
    "outline-none",
    // Enter / exit animations.
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2",
  ],
  {
    variants: {
      size: {
        sm: "sm:max-w-[480px]",
        md: "sm:max-w-[640px]",
        lg: "sm:max-w-[800px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type DialogContentVariantProps = VariantProps<typeof dialogContentVariants>;
export type DialogSize = NonNullable<DialogContentVariantProps["size"]>;
