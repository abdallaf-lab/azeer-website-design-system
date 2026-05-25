import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { Content, ModuleHeader, PageBody } from '@/components/app-shell/Content';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useFlowsQuery } from '../api';
import type { Flow, FlowStatus } from '../types';
import { FilterBar } from '../components/FilterBar';
import { FlowsTable } from '../components/FlowsTable';
import { TableSkeleton } from '../components/TableSkeleton';
import {
  ErrorEmpty,
  FilteredEmpty,
  NoFlowsEmpty,
  NoWabaEmpty,
} from '../components/EmptyStates';
import { CreateFlowModal } from '../components/CreateFlowModal';
import { DeleteFlowDialog } from '../components/DeleteFlowDialog';
import { PlanBanners } from '../components/PlanBanners';

const PAGE_SIZE = 10;

export function FlowsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [tab, setTab] = React.useState<'active' | 'archived' | 'all'>('active');
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<FlowStatus[]>([]);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<{ key: 'lastUpdated' | 'status' | 'name'; dir: 'asc' | 'desc' }>(
    { key: 'lastUpdated', dir: 'desc' },
  );
  const [createOpen, setCreateOpen] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<Flow | null>(null);

  // Reset page on filter change
  React.useEffect(() => {
    setPage(1);
  }, [tab, search, statusFilter, sort]);

  const debouncedSearch = useDebounced(search, 250);

  const query = useFlowsQuery({
    tab,
    search: debouncedSearch,
    status: statusFilter,
    page,
    pageSize: PAGE_SIZE,
    sort: `${sort.key}:${sort.dir}`,
  });

  const quota = query.data?.quota;
  const flows = query.data?.data ?? [];
  const total = query.data?.pagination.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Detect mobile (<768px) for the read-only notice (brief §2)
  const isMobile = useIsMobile();

  // ── Render ──
  const showNoFlowsEmpty =
    !query.isLoading && !query.isError && total === 0 && !debouncedSearch && statusFilter.length === 0;
  const showFilteredEmpty =
    !query.isLoading && !query.isError && total === 0 && (debouncedSearch !== '' || statusFilter.length > 0);

  const publishedAtCap =
    !!quota && quota.publishedFlowsCap !== -1 && quota.publishedFlows >= quota.publishedFlowsCap;

  return (
    <Content>
      <ModuleHeader
        breadcrumb={
          <span className="flex items-center gap-1">
            <span>{t('flow.breadcrumb.apps')}</span>
            <span aria-hidden>/</span>
            <span className="text-[var(--color-fg-default)]">{t('flow.breadcrumb.flow')}</span>
          </span>
        }
        title={t('flow.title')}
        icon={
          <span className="flex size-4 items-center justify-center rounded-sm bg-[var(--color-channel-whatsapp)]">
            <span className="size-2 rounded-full bg-white" />
          </span>
        }
        actions={
          <>
            {publishedAtCap ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button variant="primary" size="sm" disabled>
                      <Plus className="size-4" />
                      {t('flow.create')}
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {t('flow.banners.publishedCap', { cap: quota?.publishedFlowsCap ?? 0 })}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCreateOpen(true)}
                disabled={isMobile || !quota?.wabaConnected}
              >
                <Plus className="size-4" />
                {t('flow.create')}
              </Button>
            )}
          </>
        }
      />

      <PageBody>
        {/* Mobile read-only notice (brief §2) */}
        {isMobile && (
          <div className="mx-6 mt-5 flex items-start gap-2.5 rounded-[var(--radius-lg)] border border-[var(--color-info-border)] bg-[var(--color-info-bg-subtle)] p-3 text-[var(--color-info-text)]">
            <Smartphone className="size-4 mt-0.5" strokeWidth={1.5} />
            <p className="text-[12px] leading-4">
              Read-only on mobile. Switch to a larger screen to create or edit flows.
            </p>
          </div>
        )}

        {/* Plan banners (capability gating) */}
        {quota && (
          <div className="mx-6 mt-5 [&:has(>*)]:block">
            <PlanBanners quota={quota} />
          </div>
        )}

        <div className="px-6 pt-5 pb-8">
          {/* Tabs */}
          <Tabs value={tab} onValueChange={(v) => setTab(v as 'active' | 'archived' | 'all')}>
            <TabsList>
              <TabsTrigger value="active">{t('flow.tabs.active')}</TabsTrigger>
              <TabsTrigger value="archived">{t('flow.tabs.archived')}</TabsTrigger>
              <TabsTrigger value="all">{t('flow.tabs.all')}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters */}
          <div className="mt-5">
            <FilterBar
              search={search}
              onSearch={setSearch}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
            />
          </div>

          {/* Body */}
          <div className="mt-5">
            {query.isLoading ? (
              <TableSkeleton />
            ) : query.isError ? (
              <ErrorEmpty
                onRetry={() => query.refetch()}
                message={(query.error as Error).message}
              />
            ) : !quota?.wabaConnected ? (
              <NoWabaEmpty />
            ) : showNoFlowsEmpty ? (
              <NoFlowsEmpty onCreate={() => setCreateOpen(true)} />
            ) : showFilteredEmpty ? (
              <FilteredEmpty
                onClear={() => {
                  setSearch('');
                  setStatusFilter([]);
                }}
              />
            ) : (
              <>
                <FlowsTable
                  flows={flows}
                  onEdit={(f) => navigate(`/apps/whatsapp-flow/${f.id}/builder`)}
                  onDelete={setPendingDelete}
                  sort={sort}
                  onSortChange={setSort}
                />
                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[12px] text-[var(--color-fg-muted)]">
                    {t('flow.table.showing', {
                      from: (page - 1) * PAGE_SIZE + 1,
                      to: Math.min(page * PAGE_SIZE, total),
                      total,
                    })}
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      aria-label="Previous page"
                    >
                      {/* Manual chevron flip for RTL */}
                      <ChevronLeft className="size-4 rtl:hidden" strokeWidth={1.5} />
                      <ChevronRight className="size-4 ltr:hidden" strokeWidth={1.5} />
                    </Button>
                    <span className="px-2 text-[12px] text-[var(--color-fg-muted)] tabular-nums">
                      {t('flow.table.page', { current: page, total: totalPages })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      aria-label="Next page"
                    >
                      <ChevronRight className="size-4 rtl:hidden" strokeWidth={1.5} />
                      <ChevronLeft className="size-4 ltr:hidden" strokeWidth={1.5} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </PageBody>

      {/* Modals */}
      {quota && (
        <CreateFlowModal open={createOpen} onOpenChange={setCreateOpen} quota={quota} />
      )}
      <DeleteFlowDialog
        flow={pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      />
    </Content>
  );
}

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}
