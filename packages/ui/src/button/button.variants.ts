import { cva, type VariantProps } from "class-variance-authority";

/**
 * Locked Button variant surface.
 *
 *   variant: primary · secondary · ghost · destructive
 *   size:    sm · md (default) · lg · icon-sm · icon-md · icon-lg
 *
 * Shape encodes hierarchy: `rounded-full` for high-priority actions (primary,
 * destructive); `rounded-md` for alternative/tertiary (secondary, ghost).
 *
 * Token map (single source — tokens.css):
 *   bg-accent-fill / -hover / -active     primary fill swap
 *   bg-surface / -sunken                  secondary resting / hover
 *   border-border-strong                  secondary outline
 *   bg-state-hover / -active              ghost overlay
 *   bg-danger-fill / -hover               destructive fill swap
 *   text-fg-on-accent / -on-danger        white on intent fills
 *   text-label-sm / -label-md             type tokens by size
 *   h-ctrl-sm / -md / -lg                 control heights — density-flippable
 *   w-ctrl-sm / -md / -lg                 square icon-button widths
 *   px-pad-sm / -md / -lg                 control inline padding — density-flippable
 *   duration-fast + ease-standard         transition shorthand
 *
 * Focus ring is the global `:focus-visible` rule from tokens.css — components
 * never re-roll it.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "border border-transparent",
    "cursor-pointer whitespace-nowrap select-none",
    "transition-colors duration-fast ease-standard",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "rounded-full",
          "bg-accent-fill text-fg-on-accent",
          "hover:bg-accent-fill-hover",
          "active:bg-accent-fill-active",
        ],
        secondary: [
          "rounded-md",
          "bg-surface text-fg-default border-border-strong",
          "hover:bg-surface-sunken",
        ],
        ghost: [
          "rounded-md",
          "bg-transparent text-fg-default",
          "hover:bg-state-hover",
          "active:bg-state-active",
        ],
        destructive: [
          "rounded-full",
          "bg-danger-fill text-fg-on-danger",
          "hover:bg-danger-fill-hover",
        ],
      },
      size: {
        sm: "h-ctrl-sm px-pad-sm text-label-md",
        md: "h-ctrl-md px-pad-md text-label-md",
        lg: "h-ctrl-lg px-pad-lg text-label-md",
        "icon-sm": "h-ctrl-sm w-ctrl-sm px-0",
        "icon-md": "h-ctrl-md w-ctrl-md px-0",
        "icon-lg": "h-ctrl-lg w-ctrl-lg px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
