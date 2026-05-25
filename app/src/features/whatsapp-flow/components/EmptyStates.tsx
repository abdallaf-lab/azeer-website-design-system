import { useTranslation } from 'react-i18next';
import {
  CalendarPlus,
  UserPlus,
  Star,
  LifeBuoy,
  MessageSquareHeart,
  Plus,
  Inbox as InboxIcon,
  FilterX,
  Lock,
  Plug,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardEmptyProps {
  onCreate: () => void;
}

/** Empty (no flows yet) — illustration-less; icon + 5 starter cards (brief §7). */
export function NoFlowsEmpty({ onCreate }: CardEmptyProps) {
  const { t } = useTranslation();
  const starters = [
    { id: 'appointment', icon: <CalendarPlus className="size-5" strokeWidth={1.5} /> },
    { id: 'lead', icon: <UserPlus className="size-5" strokeWidth={1.5} /> },
    { id: 'nps', icon: <Star className="size-5" strokeWidth={1.5} /> },
    { id: 'support', icon: <LifeBuoy className="size-5" strokeWidth={1.5} /> },
    { id: 'feedback', icon: <MessageSquareHeart className="size-5" strokeWidth={1.5} /> },
  ];
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-text)]">
        <InboxIcon className="size-6" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-heading-md text-[var(--color-fg-default)]">{t('flow.empty.title')}</h3>
      <p className="mt-1.5 max-w-md text-body-sm text-[var(--color-fg-muted)]">
        {t('flow.empty.description')}
      </p>
      <div className="mt-5">
        <Button variant="primary" size="md" onClick={onCreate}>
          <Plus className="size-4" /> {t('flow.create')}
        </Button>
      </div>

      <div className="mt-10 w-full max-w-3xl">
        <div className="mb-3 text-label-xs text-[var(--color-fg-muted)]">{t('flow.empty.starters')}</div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {starters.map((s) => (
            <button
              key={s.id}
              onClick={onCreate}
              className="group flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 text-start transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-bg-subtle)]/40"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-text)] transition-colors group-hover:bg-[var(--color-bg-surface)]">
                {s.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-heading-xs text-[var(--color-fg-default)]">
                  {t(`flow.empty.templates.${s.id}.title`)}
                </span>
                <span className="mt-0.5 block text-body-sm text-[var(--color-fg-muted)]">
                  {t(`flow.empty.templates.${s.id}.description`)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FilteredEmpty({ onClear }: { onClear: () => void }) {
  const { t } = useTranslation();
  return (
    <SmallEmpty
      icon={<FilterX className="size-5" strokeWidth={1.5} />}
      title={t('flow.filteredEmpty.title')}
      description={t('flow.filteredEmpty.description')}
      action={
        <Button variant="secondary" size="sm" onClick={onClear}>
          {t('flow.filters.clear')}
        </Button>
      }
    />
  );
}

export function PermissionEmpty() {
  const { t } = useTranslation();
  return (
    <SmallEmpty
      icon={<Lock className="size-5" strokeWidth={1.5} />}
      title={t('flow.permissionEmpty.title')}
      description={t('flow.permissionEmpty.description')}
    />
  );
}

export function NoWabaEmpty() {
  const { t } = useTranslation();
  return (
    <SmallEmpty
      icon={<Plug className="size-5" strokeWidth={1.5} />}
      title={t('flow.noWaba.title')}
      description={t('flow.noWaba.description')}
      action={
        <Button variant="primary" size="sm">
          {t('flow.noWaba.cta')}
        </Button>
      }
    />
  );
}

export function ErrorEmpty({ onRetry, message }: { onRetry: () => void; message?: string }) {
  const { t } = useTranslation();
  return (
    <SmallEmpty
      icon={<AlertTriangle className="size-5" strokeWidth={1.5} />}
      title={t('flow.errors.load')}
      description={message}
      action={
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {t('flow.errors.retry')}
        </Button>
      }
    />
  );
}

function SmallEmpty({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="flex size-10 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-surface-sunken)] text-[var(--color-fg-muted)]">
        {icon}
      </div>
      <h3 className="mt-3 text-heading-sm text-[var(--color-fg-default)]">{title}</h3>
      {description && (
        <p className="mt-1 max-w-md text-body-sm text-[var(--color-fg-muted)]">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
