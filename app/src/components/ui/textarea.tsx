import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[80px] w-full rounded-[var(--radius-lg)]',
      'border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]',
      'px-3 py-2 text-[14px] leading-5 text-[var(--color-fg-default)]',
      'placeholder:text-[var(--color-fg-subtle)]',
      'focus-visible:outline-none focus-visible:border-[var(--color-border-focus)]',
      'focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
