import { cva, type VariantProps } from "class-variance-authority";

/**
 * Select trigger variants — matches Input's size scale (32 / 40 / 48 px)
 * and state matrix. Placeholder text tints to `fg-subtle` via Radix's
 * `data-[placeholder]` attribute (set on the trigger when no value chosen).
 */
export const selectTriggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between gap-2",
    "border border-border-strong rounded-md",
    "bg-surface text-fg-default",
    "transition-colors duration-fast ease-standard",
    "outline-none focus:outline-none focus-visible:outline-none",
    "focus-visible:border-border-focus",
    "data-[placeholder]:text-fg-subtle",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
    "aria-invalid:border-danger-border",
    "aria-invalid:focus-visible:border-danger-fill",
    "cursor-pointer",
  ],
  {
    variants: {
      selectSize: {
        sm: "h-8 px-2.5 text-body-sm",
        md: "h-10 px-3 text-body-md",
        lg: "h-12 px-3.5 text-body-md",
      },
    },
    defaultVariants: {
      selectSize: "md",
    },
  },
);

export type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;
