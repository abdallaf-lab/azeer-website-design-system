import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button — locked variants per Twerlo Canon §12.1 / §12.2
 *  - primary  → black pill (#1a1a1a) — default workhorse CTA
 *  - brand    → indigo pill — for brand moments only
 *  - secondary → ghost rounded-md (8px), 1px border
 *  - ghost    → no border, hover bg state
 *  - danger   → red fill, rounded-md
 *  - link     → text-only, no chrome
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'transition-colors duration-150',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--color-accent-fill)]',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-bg-inverse)] text-[var(--color-fg-on-inverse)] rounded-[var(--radius-pill)] hover:bg-black',
        brand:
          'bg-[var(--color-accent-fill)] text-[var(--color-fg-on-accent)] rounded-[var(--radius-pill)] hover:bg-[var(--color-accent-fill-hover)] active:bg-[var(--color-accent-fill-active)]',
        secondary:
          'bg-transparent text-[var(--color-fg-default)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] hover:bg-[var(--color-state-hover)]',
        ghost:
          'bg-transparent text-[var(--color-fg-default)] rounded-[var(--radius-md)] hover:bg-[var(--color-state-hover)]',
        danger:
          'bg-[var(--color-danger-fill)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-danger-fill-hover)]',
        link: 'bg-transparent text-[var(--color-info-text)] hover:underline underline-offset-2 px-0',
      },
      size: {
        sm: 'h-8 px-4 text-[13px] font-medium [&_svg]:size-4',
        md: 'h-10 px-5 text-[14px] font-semibold [&_svg]:size-4',
        lg: 'h-12 px-6 text-[14px] font-semibold [&_svg]:size-5',
        icon: 'h-8 w-8 [&_svg]:size-4',
        'icon-md': 'h-10 w-10 [&_svg]:size-[18px]',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'sm' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
