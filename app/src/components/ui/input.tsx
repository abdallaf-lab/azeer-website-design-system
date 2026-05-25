import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full bg-[var(--color-bg-surface)] text-[14px] leading-5 text-[var(--color-fg-default)]',
        'rounded-[var(--radius-md)] border border-[var(--color-border-default)]',
        'px-3 placeholder:text-[var(--color-fg-subtle)]',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:border-[var(--color-border-focus)]',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        invalid && 'border-[var(--color-danger-border)] focus-visible:ring-[var(--color-danger-bg-subtle)]',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
