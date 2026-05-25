import { cva, type VariantProps } from "class-variance-authority";

/**
 * Input — 1 visual style, state-driven, 3 sizes.
 *
 * Per Variants.md: Inputs are about content, not chrome. The single visual
 * style is a subtle border + white surface; state changes happen via
 * Tailwind state modifiers — never a `variant` prop.
 *
 * State matrix (from States.md, outlined-control row):
 *   focus     → border tints to border-focus + global :focus-visible ring
 *   invalid   → border tints to danger-border (paired with FormField error)
 *   disabled  → opacity 0.5 + bg surface-sunken
 *   read-only → bg surface-sunken (looks "set", not "disabled")
 *
 * Sizes per Sizes.md control scale: 32 / 40 / 48 px.
 */
export const inputVariants = cva(
  [
    "block w-full",
    "border border-border-strong rounded-md",
    "bg-surface text-fg-default",
    "placeholder:text-fg-subtle",
    "transition-colors duration-fast ease-standard",
    "outline-none focus:outline-none focus-visible:outline-none",
    "focus-visible:border-border-focus",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
    "read-only:bg-surface-sunken",
    "aria-invalid:border-danger-border",
    "aria-invalid:focus-visible:border-danger-fill",
  ],
  {
    variants: {
      inputSize: {
        sm: "h-ctrl-sm px-2.5 text-body-sm",
        md: "h-ctrl-md px-3 text-body-md",
        lg: "h-ctrl-lg px-3.5 text-body-md",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
