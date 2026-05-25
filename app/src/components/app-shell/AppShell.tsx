import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * AppShell — root grid that holds [PrimaryRail | Workspace].
 * Per Appshell §6.3 and Canon §11.1:
 *   - 100vh, padding 4px (gutter), bg canvas lavender (#f4f3fb)
 *   - grid-template-columns: var(--rail-w) 1fr
 *   - 4px gap between all panels
 */
export function AppShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'grid h-screen w-screen overflow-hidden',
        'p-[var(--gutter)] gap-[var(--gutter)]',
        'bg-[var(--color-bg-canvas)]',
        className,
      )}
      style={{ gridTemplateColumns: 'var(--rail-w) 1fr' }}
    >
      {children}
    </div>
  );
}

/**
 * Workspace — the right-hand column. Stacks Banner (optional) above the module body.
 * Per Appshell §11.5: vertical flex, 4px gap.
 */
export function Workspace({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col min-w-0 min-h-0',
        'gap-[var(--gutter)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * ModuleBody — the L2 + Content row. Standard 3-zone variant (no Inbox 5-zone here).
 * Per Appshell §6.3 (variant A): grid-template-columns: var(--subnav-w) 1fr, gap 4px.
 */
export function ModuleBody({
  children,
  className,
  variant = 'standard',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'standard' | 'noSecondary';
}) {
  return (
    <div
      className={cn('grid flex-1 min-h-0 min-w-0 gap-[var(--gutter)]', className)}
      style={{
        gridTemplateColumns: variant === 'standard' ? 'var(--subnav-w) 1fr' : '1fr',
      }}
    >
      {children}
    </div>
  );
}
