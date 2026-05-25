import { cva, type VariantProps } from "class-variance-authority";

/**
 * Sheet content variants by side.
 *
 * Sides per Components.md: `start` / `end` / `bottom`. **No top** — sheets
 * are anchored to one of the three edges below the visual rhythm.
 *
 * RTL handling: `start` and `end` are logical (`inset-inline-*`); the slide
 * direction uses physical animation utilities (`slide-in-from-left/right`)
 * with `rtl:` overrides so the motion mirrors with the document direction.
 */
export const sheetContentVariants = cva(
  [
    "fixed z-modal",
    "flex flex-col",
    "bg-surface text-fg-default",
    "shadow-elev-3",
    "outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
  ],
  {
    variants: {
      side: {
        start: [
          "inset-y-0 start-0",
          "h-full",
          "w-3/4 max-w-md",
          "border-e border-border-default",
          "rounded-e-xl",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
          "rtl:data-[state=open]:slide-in-from-right rtl:data-[state=closed]:slide-out-to-right",
        ],
        end: [
          "inset-y-0 end-0",
          "h-full",
          "w-3/4 max-w-md",
          "border-s border-border-default",
          "rounded-s-xl",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
          "rtl:data-[state=open]:slide-in-from-left rtl:data-[state=closed]:slide-out-to-left",
        ],
        bottom: [
          "inset-x-0 bottom-0",
          "w-full",
          "max-h-[80vh]",
          "border-t border-border-default",
          "rounded-t-xl",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        ],
      },
    },
    defaultVariants: {
      side: "end",
    },
  },
);

export type SheetContentVariantProps = VariantProps<typeof sheetContentVariants>;
export type SheetSide = NonNullable<SheetContentVariantProps["side"]>;
