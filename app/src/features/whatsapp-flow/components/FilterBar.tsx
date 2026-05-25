import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ListFilter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { FlowStatus } from '../types';

interface FilterBarProps {
  search: string;
  onSearch: (s: string) => void;
  statusFilter: FlowStatus[];
  onStatusFilter: (s: FlowStatus[]) => void;
}

const statusOptions: FlowStatus[] = [
  'DRAFT',
  'IN_REVIEW',
  'APPROVED',
  'PUBLISHED',
  'REJECTED',
  'THROTTLED',
  'BLOCKED',
];

export function FilterBar({ search, onSearch, statusFilter, onStatusFilter }: FilterBarProps) {
  const { t } = useTranslation();

  const toggleStatus = (s: FlowStatus) => {
    onStatusFilter(
      statusFilter.includes(s) ? statusFilter.filter((x) => x !== s) : [...statusFilter, s],
    );
  };

  const hasFilters = statusFilter.length > 0 || search.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[260px] max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-[var(--color-fg-subtle)]"
          style={{ insetInlineStart: '12px' }}
          strokeWidth={1.5}
        />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t('flow.search')}
          className="ps-9"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="h-10">
            <ListFilter className="size-4" strokeWidth={1.5} />
            {t('flow.filters.addFilter')}
            {statusFilter.length > 0 && (
              <span className="ms-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent-fill)] px-1.5 text-[11px] font-semibold text-white tabular-nums">
                {statusFilter.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[260px] p-0">
          <div className="border-b border-[var(--color-border-default)] px-3 py-2">
            <span className="text-label-xs text-[var(--color-fg-muted)]">
              {t('flow.filters.status')}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 p-1">
            {statusOptions.map((s) => (
              <Label
                key={s}
                className="flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 hover:bg-[var(--color-state-hover)]"
              >
                <Checkbox checked={statusFilter.includes(s)} onCheckedChange={() => toggleStatus(s)} />
                <span className="text-[13px] font-normal">{t(`flow.status.${s}`)}</span>
              </Label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-10 text-[var(--color-fg-muted)]"
          onClick={() => {
            onStatusFilter([]);
            onSearch('');
          }}
        >
          <X className="size-4" strokeWidth={1.5} />
          {t('flow.filters.clear')}
        </Button>
      )}
    </div>
  );
}
