import * as React from 'react';
import {
  Inbox,
  Sparkles,
  BookOpen,
  BarChart3,
  Megaphone,
  Users,
  AppWindow,
  Search,
  Settings,
  Globe,
  PinIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { setLocale, type Locale } from '@/i18n';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import i18n from '@/i18n';

interface RailItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}

function RailItem({ icon, label, active, count, onClick }: RailItemProps) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-9 w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5',
        'text-[13.5px] leading-5 text-[var(--color-fg-default)]',
        'transition-colors duration-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]',
        active
          ? 'bg-[var(--color-state-active)] font-medium'
          : 'hover:bg-[var(--color-state-hover)]',
      )}
    >
      <span className="flex size-[17px] shrink-0 items-center justify-center text-[var(--color-fg-default)]">
        {icon}
      </span>
      <span className="flex-1 text-start truncate">{label}</span>
      {typeof count === 'number' && count > 0 && (
        <span
          className={cn(
            'inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5',
            'text-[11px] font-semibold tabular-nums',
            active
              ? 'bg-[var(--color-bg-inverse)] text-[var(--color-fg-on-inverse)]'
              : 'bg-[var(--color-bg-surface-sunken)] text-[var(--color-fg-muted)]',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * PrimaryRail — L1 chromeless rail (Appshell §5.1, Canon §11.3).
 *  - 196px wide, no surface bg (inherits canvas)
 *  - top: logo + module list
 *  - bottom: search + settings + locale + profile
 */
export function PrimaryRail() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isApps = location.pathname.startsWith('/apps');

  const modules = [
    { id: 'inbox', label: t('nav.modules.inbox'), icon: <Inbox className="size-[17px]" strokeWidth={1.5} />, count: 12, route: '/inbox' },
    { id: 'fin', label: t('nav.modules.fin'), icon: <Sparkles className="size-[17px]" strokeWidth={1.5} />, route: '/fin' },
    { id: 'knowledge', label: t('nav.modules.knowledge'), icon: <BookOpen className="size-[17px]" strokeWidth={1.5} />, route: '/knowledge' },
    { id: 'reports', label: t('nav.modules.reports'), icon: <BarChart3 className="size-[17px]" strokeWidth={1.5} />, route: '/reports' },
    { id: 'outbound', label: t('nav.modules.outbound'), icon: <Megaphone className="size-[17px]" strokeWidth={1.5} />, route: '/outbound' },
    { id: 'contacts', label: t('nav.modules.contacts'), icon: <Users className="size-[17px]" strokeWidth={1.5} />, route: '/contacts' },
    { id: 'apps', label: t('nav.modules.apps'), icon: <AppWindow className="size-[17px]" strokeWidth={1.5} />, route: '/apps/whatsapp-flow', activeMatch: 'apps' },
  ];

  return (
    <TooltipProvider delayDuration={400}>
      <nav
        aria-label={t('nav.primary')}
        className="flex h-full flex-col bg-[var(--color-bg-canvas)] px-[10px] py-3"
      >
        {/* Top cluster: logo + pin */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-fill)] text-white">
            <span className="text-[13px] font-bold tracking-tight">A</span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex size-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-fg-muted)] hover:bg-[var(--color-state-hover)]"
                aria-label="Pin sidebar"
              >
                <PinIcon className="size-4" strokeWidth={1.5} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Pin sidebar</TooltipContent>
          </Tooltip>
        </div>

        {/* Module list */}
        <div className="flex flex-col gap-0.5">
          {modules.map((m) => {
            const active = m.activeMatch ? location.pathname.includes(m.activeMatch) : location.pathname.startsWith(m.route);
            return (
              <RailItem
                key={m.id}
                icon={m.icon}
                label={m.label}
                count={m.count}
                active={active && (m.id === 'apps' ? isApps : true)}
                onClick={() => navigate(m.route)}
              />
            );
          })}
        </div>

        {/* Bottom cluster — pinned to bottom via mt-auto */}
        <div className="mt-auto flex flex-col gap-0.5">
          <RailItem
            icon={<Search className="size-[17px]" strokeWidth={1.5} />}
            label={t('nav.search')}
          />
          <RailItem
            icon={<Settings className="size-[17px]" strokeWidth={1.5} />}
            label={t('nav.settings')}
          />

          {/* Locale switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'flex h-9 w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5',
                  'text-[13.5px] leading-5 text-[var(--color-fg-default)]',
                  'hover:bg-[var(--color-state-hover)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)]',
                )}
              >
                <Globe className="size-[17px]" strokeWidth={1.5} />
                <span className="flex-1 text-start">{i18n.language === 'ar' ? t('common.arabic') : t('common.english')}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top">
              <DropdownMenuLabel>Language · اللغة</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={i18n.language}
                onValueChange={(v) => setLocale(v as Locale)}
              >
                <DropdownMenuRadioItem value="en">{t('common.english')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ar">{t('common.arabic')}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile avatar */}
          <button
            className="mt-1 flex h-9 w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-1.5 hover:bg-[var(--color-state-hover)]"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-[var(--color-accent-bg-subtle)] text-[12px] font-semibold text-[var(--color-accent-text)]">
              AF
            </span>
            <span className="flex-1 text-start text-[13px] leading-4 text-[var(--color-fg-default)] truncate">
              Abdullah F.
            </span>
          </button>
        </div>
      </nav>
    </TooltipProvider>
  );
}
