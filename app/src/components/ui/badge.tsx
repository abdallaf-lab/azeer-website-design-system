import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge — pill, intent-coloured. Used for status (DRAFT, IN_REVIEW, …).
 * Maps to Twerlo Canon §12.6.
 */
const badgeVariants = cva(
  [
    'inline-flex items-center gap-1 whitespace-nowrap',
    'rounded-[var(--radius-pill)] font-semibold',
    'text-[11px] leading-4 tracking-wide',
  ].join(' '),
  {
    variants: {
      intent: {
        neutral: 'bg-[var(--color-bg-surface-sunken)] text-[var(--color-fg-muted)] border border-[var(--color-border-default)]',
        accent: 'bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-text)]',
        success: 'bg-[var(--color-success-bg-subtle)] text-[var(--color-success-text)]',
        warning: 'bg-[var(--color-warning-bg-subtle)] text-[var(--color-warning-text)]',
        danger: 'bg-[var(--color-danger-bg-subtle)] text-[var(--color-danger-text)]',
        info: 'bg-[var(--color-info-bg-subtle)] text-[var(--color-info-text)]',
        premium: 'bg-[var(--color-premium-bg-subtle)] text-[var(--color-premium-text)]',
      },
      size: {
        sm: 'h-5 px-2',
        md: 'h-6 px-2.5',
      },
    },
    defaultVariants: { intent: 'neutral', size: 'sm' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, intent, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ intent, size }), className)} {...props} />;
}
