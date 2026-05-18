import * as React from "react";
import { getCoreRowModel, type RowSelectionState, useReactTable } from "@tanstack/react-table";
import {
  Archive,
  Ban,
  Filter as FilterIcon,
  Hash,
  Import,
  Plus,
  Search as SearchIcon,
  Users,
} from "lucide-react";
import {
  Badge,
  Button,
  ConfirmDialog,
  DataTable,
  EmptyState,
  Icon,
  ModuleHeader,
  Pagination,
  SearchInput,
  toast,
  ToggleGroup,
  ToggleGroupItem,
} from "@azeer/ui";
import {
  type Contact,
  MOCK_CONTACTS,
  type Segment,
  type StatusView,
  filterContacts,
} from "./data";
import { buildContactColumns } from "./columns";
import { AddContactSheet } from "./AddContactSheet";
import { useLocale } from "../i18n";
import type { StringKey } from "../i18n/strings";

const PAGE_SIZE = 25;
const BULK_CAP = 100;
const coreRowModel = getCoreRowModel<Contact>();
const getContactRowId = (row: Contact) => row.id;

type PendingAction =
  | { kind: "block"; ids: string[]; unblock: boolean }
  | { kind: "archive"; ids: string[]; unarchive: boolean };

type QuickFilterId = "vip" | "engaged" | "last-7-days" | "no-email" | "unassigned";
const QUICK_FILTERS: Record<QuickFilterId, { labelKey: StringKey; matches: (c: Contact) => boolean }> = {
  "vip":         { labelKey: "contacts.filter.vip",        matches: (c) => c.tags.some((t) => t.label === "vip") },
  "engaged":     { labelKey: "contacts.filter.engaged",    matches: (c) => c.tags.some((t) => t.label === "engaged") },
  "last-7-days": { labelKey: "contacts.filter.last7Days",  matches: (c) => !!c.lastInteractedAt && Date.now() - c.lastInteractedAt.getTime() <= 7 * 24 * 60 * 60 * 1000 },
  "no-email":    { labelKey: "contacts.filter.noEmail",    matches: (c) => !c.email },
  "unassigned":  { labelKey: "contacts.filter.unassigned", matches: (c) => !c.assignee },
};

interface ContactsListViewProps {
  /** Sidebar-driven status filter. Owned by parent (ContactsScreen). */
  statusView: StatusView;
  /** Sidebar-driven segment filter. Owned by parent. */
  activeSegment: string | null;
  /** Live segments list (built-ins + user-created). Owned by parent. */
  segments: Segment[];
  /** Parent-owned counts so the sidebar and this view stay in sync. */
  counts: { total: number; active: number; archived: number; blocked: number };
  /** Reset sidebar filters from inside the list (EmptyState "Clear filters"). */
  onStatusChange: (next: StatusView) => void;
  /** Clear segment from inside the list (active-filter Badge). */
  onSegmentChange: (id: string | null) => void;
  /** Navigate to Segments sub-view. */
  onGoToSegments: () => void;
  /** Navigate to Import sub-view. */
  onGoToImport: () => void;
}

export function ContactsListView({
  statusView,
  activeSegment,
  segments,
  counts,
  onStatusChange,
  onSegmentChange,
  onGoToSegments,
  onGoToImport,
}: ContactsListViewProps) {
  const { t, dateFnsLocale } = useLocale();
  const [search, setSearch] = React.useState("");
  const [quickFilters, setQuickFilters] = React.useState<Set<QuickFilterId>>(new Set());
  const [page, setPage] = React.useState(1);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pending, setPending] = React.useState<PendingAction | null>(null);
  const [addOpen, setAddOpen] = React.useState(false);

  /* Sidebar nav (statusView / activeSegment prop change) resets pagination
   * to page 1. setPage(1) bails when page is already 1 (Object.is), so the
   * common case where the user is on page 1 incurs zero extra render. Fires
   * only on sidebar click — NOT on every keystroke, so the freeze pattern
   * from the original screen (useEffect depending on `search`) is avoided. */
  React.useEffect(() => {
    setPage(1);
  }, [statusView, activeSegment]);

  /* ─────── Derived data ────────────────────────────────────────────── */

  const filtered = React.useMemo(() => {
    const base = filterContacts(MOCK_CONTACTS, {
      search,
      statusView,
      segmentId: activeSegment,
      segments,
    });
    if (quickFilters.size === 0) return base;
    return base.filter((c) => Array.from(quickFilters).every((q) => QUICK_FILTERS[q].matches(c)));
  }, [search, statusView, activeSegment, quickFilters, segments]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = React.useMemo(
    () => filtered.slice(pageStart, pageStart + PAGE_SIZE),
    [filtered, pageStart],
  );

  const onSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  /* ─────── Row-level actions ───────────────────────────────────────── */

  const onRowBlock = React.useCallback((id: string) => {
    const c = MOCK_CONTACTS.find((x) => x.id === id);
    if (!c) return;
    setPending({ kind: "block", ids: [id], unblock: c.status === "blocked" });
  }, []);

  const onRowArchive = React.useCallback((id: string) => {
    const c = MOCK_CONTACTS.find((x) => x.id === id);
    if (!c) return;
    const unarchive = c.status === "archived";
    toast.success(t(unarchive ? "toast.row.unarchived" : "toast.row.archived"), {
      description: c.name,
    });
  }, [t]);

  const onRowOpen = React.useCallback((id: string) => {
    const c = MOCK_CONTACTS.find((x) => x.id === id);
    if (!c) return;
    toast.info(t("toast.openProfile"), {
      description: t("toast.openProfile.body", { name: c.name }),
    });
  }, [t]);

  const columns = React.useMemo(
    () => buildContactColumns({ onRowBlock, onRowArchive, onRowOpen, t, dateFnsLocale }),
    [onRowBlock, onRowArchive, onRowOpen, t, dateFnsLocale],
  );

  const table = useReactTable({
    data: pageRows,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: getContactRowId,
    getCoreRowModel: coreRowModel,
  });

  const selectedCount = Object.keys(rowSelection).length;
  const hasSelection = selectedCount > 0;

  /* ─────── Bulk actions ────────────────────────────────────────────── */

  const onBulkBlock = () => {
    const ids = Object.keys(rowSelection);
    if (ids.length > BULK_CAP) {
      toast.error(t("toast.bulk.cap", { cap: BULK_CAP }));
      return;
    }
    setPending({ kind: "block", ids, unblock: false });
  };
  const onBulkArchive = () => {
    const ids = Object.keys(rowSelection);
    if (ids.length > BULK_CAP) {
      toast.error(t("toast.bulk.cap", { cap: BULK_CAP }));
      return;
    }
    setPending({ kind: "archive", ids, unarchive: false });
  };
  const onConfirmPending = () => {
    if (!pending) return;
    const n = pending.ids.length;
    const toastKey: StringKey =
      pending.kind === "block" ? "toast.bulk.blocked" : "toast.bulk.archived";
    toast.success(t(toastKey, { n }));
    setPending(null);
    if (n > 1) setRowSelection({});
  };

  /* ─────── Empty state ─────────────────────────────────────────────── */

  const isEmpty = filtered.length === 0;
  const isFilteredEmpty =
    isEmpty && (search.length > 0 || statusView !== "all" || activeSegment !== null || quickFilters.size > 0);

  /* ─────── Render ──────────────────────────────────────────────────── */

  return (
    <>
      <ModuleHeader
        title={t("contacts.title")}
        meta={
          <span className="text-body-sm text-fg-muted">
            {t("contacts.meta", {
              total: counts.total.toLocaleString(),
              active: counts.active.toLocaleString(),
              archived: counts.archived.toLocaleString(),
              blocked: counts.blocked.toLocaleString(),
            })}
          </span>
        }
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={onGoToSegments}>
              <Icon icon={FilterIcon} size={14} aria-hidden="true" />
              {t("contacts.action.newSegment")}
            </Button>
            <Button variant="secondary" size="sm" onClick={onGoToImport}>
              <Icon icon={Import} size={14} aria-hidden="true" />
              {t("contacts.action.import")}
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Icon icon={Plus} size={14} aria-hidden="true" />
              {t("contacts.action.add")}
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 px-5 py-3 border-b border-border-divider bg-surface">
        <div className="flex items-center gap-3">
          <div className="w-full max-w-sm">
            <SearchInput
              value={search}
              onValueChange={onSearchChange}
              placeholder={t("contacts.search.placeholder")}
              aria-label={t("contacts.search.placeholder")}
            />
          </div>
          <div className="ms-auto flex items-center gap-2 text-body-sm text-fg-muted">
            {activeSegment ? (
              <Badge
                variant="outline"
                size="sm"
                removable
                onRemove={() => onSegmentChange(null)}
                removeLabel={segments.find((s) => s.id === activeSegment)?.name ?? ""}
              >
                <Icon icon={Hash} size={12} aria-hidden="true" />
                {segments.find((s) => s.id === activeSegment)?.name ?? ""}
              </Badge>
            ) : null}
            <span className="tabular-nums">
              {t(filtered.length === 1 ? "contacts.search.match" : "contacts.search.matches", {
                n: filtered.length.toLocaleString(),
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-label-xs uppercase tracking-wide text-fg-muted">
            {t("contacts.quickFilters")}
          </span>
          <ToggleGroup
            {...({
              type: "multiple",
              "aria-label": t("contacts.quickFilters"),
              value: Array.from(quickFilters),
              onValueChange: (values: string[]) => {
                setQuickFilters(new Set(values as QuickFilterId[]));
                setPage(1);
              },
            } as any)}
          >
            {(Object.keys(QUICK_FILTERS) as QuickFilterId[]).map((id) => (
              <ToggleGroupItem key={id} value={id} size="sm">
                {t(QUICK_FILTERS[id].labelKey)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {quickFilters.size > 0 ? (
            <button
              type="button"
              onClick={() => { setQuickFilters(new Set()); setPage(1); }}
              className="text-body-xs text-accent-text underline-offset-2 hover:underline cursor-pointer"
            >
              {t("contacts.filter.clear")}
            </button>
          ) : null}
        </div>
      </div>

      {hasSelection ? (
        <div
          role="region"
          aria-label={t("contacts.bulk.selected", { n: selectedCount })}
          className="flex items-center justify-between gap-3 px-5 py-2.5 bg-accent-bg-subtle border-b border-accent-border"
        >
          <div className="flex items-center gap-3 text-body-sm text-accent-text">
            <span className="font-medium">{t("contacts.bulk.selected", { n: selectedCount })}</span>
            <span className="text-fg-muted">·</span>
            <button
              type="button"
              onClick={() => setRowSelection({})}
              className="text-body-sm text-accent-text underline-offset-2 hover:underline cursor-pointer"
            >
              {t("contacts.bulk.clear")}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onBulkArchive}>
              <Icon icon={Archive} size={14} aria-hidden="true" />
              {t("contacts.bulk.archive")}
            </Button>
            <Button variant="destructive" size="sm" onClick={onBulkBlock}>
              <Icon icon={Ban} size={14} aria-hidden="true" />
              {t("contacts.bulk.block")}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex-1 overflow-auto">
        {isEmpty ? (
          <div className="flex items-center justify-center min-h-full">
            {isFilteredEmpty ? (
              <EmptyState
                icon={SearchIcon}
                title={t("empty.filtered.title")}
                description={t("empty.filtered.body")}
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setQuickFilters(new Set());
                      onStatusChange("all");
                    }}
                  >
                    {t("empty.filtered.action")}
                  </Button>
                }
                size="inline"
              />
            ) : (
              <EmptyState
                icon={Users}
                title={t("empty.noData.title")}
                description={t("empty.noData.body")}
                action={
                  <Button onClick={() => setAddOpen(true)}>
                    <Icon icon={Plus} size={14} aria-hidden="true" />
                    {t("contacts.action.add")}
                  </Button>
                }
                size="page"
              />
            )}
          </div>
        ) : (
          <DataTable<Contact> table={table} />
        )}
      </div>

      <footer className="px-5 py-3 border-t border-border-divider bg-surface flex items-center justify-between gap-3">
        <span className="text-body-sm text-fg-muted">
          {filtered.length === 0
            ? t("contacts.footer.empty")
            : t("contacts.footer.showing", {
                from: (pageStart + 1).toLocaleString(),
                to: (pageStart + pageRows.length).toLocaleString(),
                total: filtered.length.toLocaleString(),
              })}
        </span>
        {totalPages > 1 ? (
          <Pagination page={safePage} pageCount={totalPages} onPageChange={setPage} />
        ) : null}
      </footer>

      {pending ? (() => {
        const n = pending.ids.length;
        const isSingle = n === 1;
        let titleKey: StringKey;
        let descKey: StringKey;
        let confirmKey: StringKey;
        if (pending.kind === "block") {
          if (pending.unblock) {
            titleKey = isSingle ? "confirm.unblock.title" : "confirm.unblock.titlePl";
            descKey  = "confirm.unblock.desc";
            confirmKey = "row.unblock";
          } else {
            titleKey = isSingle ? "confirm.block.title" : "confirm.block.titlePl";
            descKey  = "confirm.block.desc";
            confirmKey = "row.block";
          }
        } else {
          if (pending.unarchive) {
            titleKey = isSingle ? "confirm.unarchive.title" : "confirm.unarchive.titlePl";
            descKey  = "confirm.unarchive.desc";
            confirmKey = "row.unarchive";
          } else {
            titleKey = isSingle ? "confirm.archive.title" : "confirm.archive.titlePl";
            descKey  = "confirm.archive.desc";
            confirmKey = "row.archive";
          }
        }
        return (
          <ConfirmDialog
            open
            onOpenChange={(open) => {
              if (!open) setPending(null);
            }}
            title={t(titleKey, { n })}
            description={t(descKey)}
            confirmLabel={t(confirmKey)}
            cancelLabel={t("common.cancel")}
            destructive={pending.kind === "block" && !pending.unblock}
            onConfirm={onConfirmPending}
          />
        );
      })() : null}

      <AddContactSheet open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
