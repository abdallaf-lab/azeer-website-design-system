import { cva, type VariantProps } from "class-variance-authority";

/**
 * Toggle + ToggleGroupItem share variants.
 *
 * Visually a Button-ghost in resting state; on `data-[state=on]` (Radix's
 * pressed marker) it picks up the filter-chip pattern from States.md:
 * `accent-bg-subtle` background + `accent-text` color + `accent-border`.
 *
 * Sizes match the control scale — sm / md / lg labels + icon-sm/md/lg
 * squares for composer-toolbar-style icon toggles.
 */
export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "border border-transparent rounded-md",
    "bg-transparent text-fg-default",
    "cursor-pointer whitespace-nowrap select-none",
    "transition-colors duration-fast ease-standard",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Hover (resting state)
    "hover:bg-state-hover",
    // Active (pressed momentarily)
    "active:bg-state-active",
    // Pressed (data-[state=on]) — uses the filter-chip pattern from States.md
    "data-[state=on]:bg-accent-bg-subtle data-[state=on]:text-accent-text data-[state=on]:border-accent-border",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-label-sm",
        md: "h-10 px-4 text-label-md",
        lg: "h-12 px-5 text-label-md",
        "icon-sm": "h-8 w-8 px-0",
        "icon-md": "h-10 w-10 px-0",
        "icon-lg": "h-12 w-12 px-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
