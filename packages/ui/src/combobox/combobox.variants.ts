import { cva, type VariantProps } from "class-variance-authority";

/**
 * Trigger variants for Combobox + MultiSelect.
 *
 * Visual ↔ Input parity: same border, same focus border tint, same disabled
 * + aria-invalid behavior. Uses `min-h-*` (not `h-*`) so MultiSelect can grow
 * vertically when many values are selected.
 */
export const comboboxTriggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between gap-2",
    "border border-border-strong rounded-md",
    "bg-surface text-fg-default",
    "transition-colors duration-fast ease-standard",
    "outline-none focus:outline-none focus-visible:outline-none",
    "focus-visible:border-border-focus",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
    "aria-invalid:border-danger-border",
    "aria-invalid:focus-visible:border-danger-fill",
    "data-[state=open]:border-border-focus",
    "cursor-pointer",
  ],
  {
    variants: {
      comboboxSize: {
        sm: "min-h-8 px-2.5 py-1 text-body-sm",
        md: "min-h-10 px-3 py-1.5 text-body-md",
        lg: "min-h-12 px-3.5 py-2 text-body-md",
      },
    },
    defaultVariants: {
      comboboxSize: "md",
    },
  },
);

export type ComboboxTriggerVariantProps = VariantProps<
  typeof comboboxTriggerVariants
>;
export type ComboboxSize = NonNullable<
  ComboboxTriggerVariantProps["comboboxSize"]
>;
