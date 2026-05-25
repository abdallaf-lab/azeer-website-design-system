import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SystemBannerProps {
  intent?: 'trial' | 'warn' | 'danger' | 'info';
  message: React.ReactNode;
  cta?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/**
 * SystemBanner — content-level (Appshell §5.7)
 *  - 49px tall, sits at the top of Workspace, never over PrimaryRail
 *  - 16px radius, 0/16 padding
 */
export function SystemBanner({
  intent = 'trial',
  message,
  cta,
  onDismiss,
  className,
}: SystemBannerProps) {
  const intentClasses = {
    trial: 'bg-[var(--color-premium-bg-subtle)] text-[var(--color-premium-text)]',
    warn: 'bg-[var(--color-warning-bg-subtle)] text-[var(--color-warning-text)]',
    danger: 'bg-[var(--color-danger-bg-subtle)] text-[var(--color-danger-text)]',
    info: 'bg-[var(--color-info-bg-subtle)] text-[var(--color-info-text)]',
  }[intent];

  return (
    <div
      role="status"
      className={cn(
        'flex shrink-0 items-center justify-between gap-3 px-4',
        'rounded-[var(--radius-xl)]',
        intentClasses,
        className,
      )}
      style={{ height: 'var(--banner-h)' }}
    >
      <p className="text-[13px] leading-5 truncate">{message}</p>
      <div className="flex shrink-0 items-center gap-2">
        {cta}
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-state-hover)]"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
