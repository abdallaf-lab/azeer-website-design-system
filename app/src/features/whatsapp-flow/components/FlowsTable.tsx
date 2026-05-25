import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpDown,
  Copy,
  Edit3,
  ExternalLink,
  MoreHorizontal,
  Send,
  Archive,
  ArchiveRestore,
  Trash2,
  Globe,
  GlobeLock,
  PauseCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FlowStatusBadge } from './FlowStatusBadge';
import type { Flow, FlowStatus } from '../types';
import { useDeleteFlow, useFlowAction } from '../api';
import { formatRelative, formatAbsolute } from '../utils';

interface FlowsTableProps {
  flows: Flow[];
  onEdit: (flow: Flow) => void;
  onDelete: (flow: Flow) => void;
  sort: { key: 'lastUpdated' | 'status' | 'name'; dir: 'asc' | 'desc' };
  onSortChange: (next: FlowsTableProps['sort']) => void;
}

export function FlowsTable({ flows, onEdit, onDelete, sort, onSortChange }: FlowsTableProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const submit = useFlowAction('submit');
  const publish = useFlowAction('publish');
  const unpublish = useFlowAction('unpublish');
  const archive = useFlowAction('archive');
  const restore = useFlowAction('restore');

  const sortBy = (key: FlowsTableProps['sort']['key']) => {
    if (sort.key === key) {
      onSortChange({ key, dir: sort.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      onSortChange({ key, dir: 'desc' });
    }
  };

  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-default)]">
      <table className="w-full text-start text-[13px]">
        <thead className="bg-[var(--color-bg-surface-sunken)]">
          <tr className="border-b border-[var(--color-border-default)]">
            <SortableTh label={t('flow.table.name')} active={sort.key === 'name'} dir={sort.dir} onClick={() => sortBy('name')} />
            <Th label={t('flow.table.id')} className="w-[200px]" />
            <SortableTh label={t('flow.table.status')} active={sort.key === 'status'} dir={sort.dir} onClick={() => sortBy('status')} className="w-[140px]" />
            <Th label={t('flow.table.deliveries')} className="w-[110px] text-end" />
            <Th label={t('flow.table.completionRate')} className="w-[140px] text-end" />
            <SortableTh label={t('flow.table.lastUpdated')} active={sort.key === 'lastUpdated'} dir={sort.dir} onClick={() => sortBy('lastUpdated')} className="w-[180px]" />
            <th className="w-[44px]" aria-label={t('common.actions')} />
          </tr>
        </thead>
        <tbody>
          {flows.map((flow) => (
            <tr
              key={flow.id}
              className="group border-b border-[var(--color-border-subtle)] transition-colors last:border-b-0 hover:bg-[var(--color-state-hover)]"
            >
              {/* Name + endpoint chip + rejection reason */}
              <td className="px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <div className="min-w-0">
                    <button
                      onClick={() => navigate(`/apps/whatsapp-flow/${flow.id}`)}
                      className="block max-w-[280px] truncate text-start font-medium text-[var(--color-fg-default)] hover:text-[var(--color-accent-text)]"
                      title={flow.name}
                      // bidi-isolate so AR names don't bleed direction
                      dir="auto"
                    >
                      {flow.name}
                    </button>
                    {flow.rejectionReason && (
                      <p className="mt-1 max-w-[420px] truncate text-[12px] text-[var(--color-danger-text)]" title={flow.rejectionReason}>
                        {flow.rejectionReason}
                      </p>
                    )}
                    {flow.metaCategoryChange && (
                      <p className="mt-1 max-w-[420px] truncate text-[12px] text-[var(--color-warning-text)]">
                        {t('flow.banners.metaCategoryChange', { category: t(`flow.categories.${flow.metaCategoryChange}`) })}
                      </p>
                    )}
                  </div>
                  {flow.withEndpoint && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="mt-0.5 flex size-5 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-text)]">
                          <Globe className="size-3" strokeWidth={1.5} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>with endpoint · webhook on submit</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </td>

              {/* Flow ID — monospace, tabular */}
              <td className="px-4 py-3 font-mono text-[12px] tabular-nums text-[var(--color-fg-muted)]" dir="ltr">
                {flow.id}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <FlowStatusBadge status={flow.status} />
              </td>

              {/* Deliveries */}
              <td className="px-4 py-3 text-end tabular-nums text-[var(--color-fg-default)]">
                {flow.analytics?.delivered?.toLocaleString(i18n.language) ?? '—'}
              </td>

              {/* Completion rate — must include % symbol per brief §7.1 */}
              <td className="px-4 py-3 text-end tabular-nums text-[var(--color-fg-default)]">
                {flow.analytics ? `${flow.analytics.completionRate}%` : '—'}
              </td>

              {/* Last updated — relative + absolute tooltip */}
              <td className="px-4 py-3 text-[var(--color-fg-muted)]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help" dir="ltr">
                      {formatRelative(flow.lastUpdatedAt, i18n.language)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{formatAbsolute(flow.lastUpdatedAt, i18n.language)}</TooltipContent>
                </Tooltip>
              </td>

              {/* Row overflow */}
              <td className="px-2 py-3 text-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100"
                      aria-label={t('common.actions')}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/apps/whatsapp-flow/${flow.id}`)}>
                      <ExternalLink /> {t('flow.rowMenu.open')}
                    </DropdownMenuItem>
                    {flow.status !== 'IN_REVIEW' && flow.status !== 'ARCHIVED' && (
                      <DropdownMenuItem onClick={() => onEdit(flow)}>
                        <Edit3 /> {t('flow.rowMenu.edit')}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => {
                      navigator.clipboard.writeText(flow.id);
                      toast.success('Flow ID copied');
                    }}>
                      <Copy /> {t('flow.rowMenu.copyId')}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {(flow.status === 'DRAFT' || flow.status === 'REJECTED') && (
                      <DropdownMenuItem
                        onClick={() => submit.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.submitted')) })}
                      >
                        <Send /> {t('flow.rowMenu.submitForReview')}
                      </DropdownMenuItem>
                    )}
                    {flow.status === 'APPROVED' && (
                      <DropdownMenuItem
                        onClick={() => publish.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.published')) })}
                      >
                        <Globe /> {t('flow.rowMenu.publish')}
                      </DropdownMenuItem>
                    )}
                    {flow.status === 'PUBLISHED' && (
                      <DropdownMenuItem
                        onClick={() => unpublish.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.unpublished')) })}
                      >
                        <GlobeLock /> {t('flow.rowMenu.unpublish')}
                      </DropdownMenuItem>
                    )}
                    {flow.status === 'THROTTLED' && (
                      <DropdownMenuItem disabled>
                        <PauseCircle /> Auto-recovers when throttle window passes
                      </DropdownMenuItem>
                    )}

                    {flow.status !== 'ARCHIVED' && (
                      <DropdownMenuItem
                        onClick={() => archive.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.archived')) })}
                      >
                        <Archive /> {t('flow.rowMenu.archive')}
                      </DropdownMenuItem>
                    )}
                    {flow.status === 'ARCHIVED' && (
                      <DropdownMenuItem
                        onClick={() => restore.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.restored')) })}
                      >
                        <ArchiveRestore /> {t('flow.rowMenu.restore')}
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem intent="danger" onClick={() => onDelete(flow)}>
                      <Trash2 /> {t('flow.rowMenu.delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ label, className }: { label: string; className?: string }) {
  return (
    <th
      scope="col"
      className={`px-4 py-2.5 text-start text-label-xs text-[var(--color-fg-muted)] ${className ?? ''}`}
    >
      {label}
    </th>
  );
}

function SortableTh({
  label,
  active,
  dir,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  dir: 'asc' | 'desc';
  onClick: () => void;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-2.5 text-start text-label-xs text-[var(--color-fg-muted)] ${className ?? ''}`}
    >
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1 hover:text-[var(--color-fg-default)]"
      >
        {label}
        <ArrowUpDown
          className={`size-3 transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}
          strokeWidth={1.5}
        />
        {active && (
          <span className="sr-only">
            sorted {dir === 'asc' ? 'ascending' : 'descending'}
          </span>
        )}
      </button>
    </th>
  );
}
