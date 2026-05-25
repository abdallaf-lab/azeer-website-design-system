import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavSection {
  label?: string;
  items: NavItemSpec[];
}

export interface NavItemSpec {
  id: string;
  label: string;
  icon?: React.ReactNode;
  route: string;
  count?: number;
  badge?: 'new' | 'beta';
}

export interface SecondaryNavProps {
  title: string;
  sections: NavSection[];
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
}

/**
 * SecondaryNav — L2 panel (Appshell §5.2, Canon §11.4)
 *  - 230px wide, sunken bg, 16px radius, 16/10 padding
 *  - Header: 18px module title + optional trailing action
 *  - Vertical sections with optional UPPERCASE label
 *  - Active item: indigo bg + 2-3px left accent bar
 */
export function SecondaryNav({ title, sections, footer, headerAction }: SecondaryNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      aria-label={title}
      className="flex h-full flex-col bg-[var(--color-bg-surface-sunken)] rounded-[var(--radius-xl)] py-4 px-2.5"
    >
      {/* Header row */}
      <header className="mb-3.5 flex items-center justify-between px-2.5">
        <h2 className="text-heading-lg text-[var(--color-fg-default)]">{title}</h2>
        {headerAction}
      </header>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className={cn(sectionIdx > 0 && 'mt-3.5')}>
            {section.label && (
              <div className="px-2.5 pt-3.5 pb-1">
                <span className="text-label-xs text-[var(--color-fg-muted)]">{section.label}</span>
              </div>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active =
                  location.pathname === item.route ||
                  (item.route !== '/' && location.pathname.startsWith(item.route));
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => navigate(item.route)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative flex h-9 w-full items-center gap-2.5',
                        'rounded-[var(--radius-sm)] ps-2.5 pe-2 text-[13px] leading-5',
                        'text-[var(--color-fg-default)] transition-colors duration-100',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]',
                        active
                          ? 'bg-[var(--color-accent-bg-subtle)] font-medium text-[var(--color-accent-text)]'
                          : 'hover:bg-[var(--color-state-hover)]',
                      )}
                    >
                      {/* Active accent bar (RTL-safe via inset-inline-start) */}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute top-1.5 bottom-1.5 w-[3px] rounded-e-sm bg-[var(--color-accent-fill)]"
                          style={{ insetInlineStart: 0 }}
                        />
                      )}
                      {item.icon && <span className="flex size-4 shrink-0 items-center justify-center">{item.icon}</span>}
                      <span className="flex-1 text-start truncate">{item.label}</span>
                      {item.badge === 'new' && (
                        <span className="rounded-[var(--radius-sm)] bg-[var(--color-success-bg-subtle)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-success-text)]">
                          New
                        </span>
                      )}
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span className="text-[12px] tabular-nums text-[var(--color-fg-muted)]">
                          {item.count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {footer && (
        <footer className="mt-2 border-t border-[var(--color-border-default)] pt-2 px-1">
          {footer}
        </footer>
      )}
    </aside>
  );
}
