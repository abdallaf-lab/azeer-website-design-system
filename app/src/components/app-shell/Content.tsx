import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Content — the main white content card (Appshell §5.5, Canon §11.5)
 *  - flex-1, white surface, 16px radius, min-w-0 so it can shrink in grid
 *  - Owns scrolling for the page body
 */
export function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        'flex flex-col min-h-0 min-w-0',
        'bg-[var(--color-bg-surface)] rounded-[var(--radius-xl)]',
        'overflow-hidden',
        className,
      )}
    >
      {children}
    </main>
  );
}

/**
 * ModuleHeader — locked 64px tall (Appshell §5.5)
 * Title left + actions right, bottom border.
 */
export interface ModuleHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export function ModuleHeader({ title, subtitle, breadcrumb, actions, icon }: ModuleHeaderProps) {
  return (
    <header
      className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-border-default)] px-5"
      style={{ height: 'var(--module-header-h)' }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-text)]">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          {breadcrumb && <div className="text-body-xs text-[var(--color-fg-muted)] truncate">{breadcrumb}</div>}
          <div className="flex items-center gap-2">
            <h1 className="text-heading-xl text-[var(--color-fg-default)] truncate">{title}</h1>
          </div>
          {subtitle && (
            <div className="text-body-xs text-[var(--color-fg-muted)] truncate">{subtitle}</div>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

/** Body — the scrollable region under the module header. Default padding 28/24. */
export function PageBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex-1 min-h-0 min-w-0 overflow-y-auto', className)}>{children}</div>
  );
}
