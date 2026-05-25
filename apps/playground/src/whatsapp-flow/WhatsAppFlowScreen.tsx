import * as React from "react";
import { getCoreRowModel, type RowSelectionState, useReactTable } from "@tanstack/react-table";
import {
  CheckCircle2,
  ClockAlert,
  FileEdit,
  HelpCircle,
  Home,
  Inbox,
  Languages,
  Megaphone,
  PieChart,
  Plus,
  Search as SearchIcon,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import {
  AppShell,
  Avatar,
  Badge,
  Banner,
  Button,
  Card,
  CardBody,
  cn,
  ConfirmDialog,
  DataTable,
  EmptyState,
  HelpBubble,
  Icon,
  ModuleHeader,
  Pagination,
  PrimaryRail,
  PrimaryRailItem,
  Progress,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
  usePrimaryRail,
} from "@azeer/ui";
import {
  type Flow,
  type FlowTemplate,
  type StatusFilter,
  FLOW_TEMPLATES,
  MOCK_FLOWS,
  PLAN_QUOTA,
  computeFlowCounts,
  filterFlows,
} from "./data";
import { buildFlowColumns } from "./columns";
import { useLocale } from "../i18n";
import type { StringKey } from "../i18n/strings";
import { InitDialog } from "./builder/InitDialog";
import { BuilderDialog } from "./builder/BuilderDialog";
import { makeBlankDraft, type FlowDraft } from "./builder/types";

const PAGE_SIZE = 10;
const coreRowModel = getCoreRowModel<Flow>();
const getFlowRowId = (row: Flow) => row.id;

export interface ScreenNavProps {
  currentScreen: "contacts" | "whatsapp-flow";
  onNavigate: (s: "contacts" | "whatsapp-flow") => void;
}

export function WhatsAppFlowScreen({ currentScreen, onNavigate }: ScreenNavProps) {
  const { t, dateFnsLocale } = useLocale();

  /* ─────── State ───────────────────────────────────────────────────── */

  const [flows, setFlows] = React.useState<Flow[]>(() => MOCK_FLOWS);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [page, setPage] = React.useState(1);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pendingDelete, setPendingDelete] = React.useState<Flow | null>(null);
  const [bannerDismissed, setBannerDismissed] = React.useState(false);

  /* Builder modals (SCR-WAF-003) — Init → Builder. Conditionally mounted to
   * dodge the always-mounted-portal freeze pattern seen with always-open
   * Radix dialogs. The draft is parent-owned so the Init step's submit
   * survives unmounting the Init dialog. */
  const [initOpen, setInitOpen] = React.useState(false);
  const [builderDraft, setBuilderDraft] = React.useState<FlowDraft | null>(null);
  const [builderReadOnly, setBuilderReadOnly] = React.useState(false);

  /* ─────── Derived ─────────────────────────────────────────────────── */

  const counts = React.useMemo(() => computeFlowCounts(flows), [flows]);
  const filtered = React.useMemo(
    () => filterFlows(flows, { search, status: statusFilter }),
    [flows, search, statusFilter],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = React.useMemo(
    () => filtered.slice(pageStart, pageStart + PAGE_SIZE),
    [filtered, pageStart],
  );

  /* Quota signals (brief §4.3). */
  const quotaPct = Math.round((counts.submissionsThisMonth / PLAN_QUOTA.monthlySubmissions) * 100);
  const isQuotaWarning = quotaPct >= 80 && quotaPct < 100;
  const isQuotaExceeded = quotaPct >= 100;
  const isPublishedCapHit = counts.published >= PLAN_QUOTA.maxPublishedFlows;
  const showPlanBanner = !bannerDismissed && (isQuotaWarning || isQuotaExceeded || isPublishedCapHit);

  /* Filter change → page reset (setPage(1) bails when already 1). */
  const onSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const onStatusChange = (s: StatusFilter) => {
    setStatusFilter(s);
    setPage(1);
  };

  /* ─────── Row-level actions ───────────────────────────────────────── */

  const transition = (id: string, next: Flow["status"], toastKey: StringKey) => {
    setFlows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: next, updatedAt: new Date() } : f)),
    );
    const f = flows.find((x) => x.id === id);
    if (f) toast.success(t(toastKey), { description: f.name });
  };

  const onAnalytics = (f: Flow) =>
    toast.info(t("waf.toast.analytics"), { description: t("waf.toast.analytics.body", { name: f.name }) });
  const onEdit = (f: Flow) => {
    setBuilderReadOnly(f.status === "in_review");
    setBuilderDraft(
      makeBlankDraft({
        name: f.name,
        category: f.category,
        originId: f.id,
      }),
    );
  };
  const onDuplicate = (f: Flow) => {
    setBuilderReadOnly(false);
    setBuilderDraft(
      makeBlankDraft({
        name: `${f.name} (copy)`,
        category: f.category,
      }),
    );
  };
  const onSubmit = (f: Flow) => transition(f.id, "in_review", "waf.toast.submitted");
  const onPublish = (f: Flow) => transition(f.id, "published", "waf.toast.published");
  const onUnpublish = (f: Flow) => transition(f.id, "draft", "waf.toast.unpublished");
  const onArchive = (f: Flow) => transition(f.id, "archived", "waf.toast.archived");
  const onRestore = (f: Flow) => transition(f.id, "draft", "waf.toast.restored");
  const onAppeal = (f: Flow) =>
    toast.info(t("waf.toast.appeal"), { description: t("waf.toast.appeal.body", { name: f.name }) });
  const onDelete = (f: Flow) => setPendingDelete(f);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setFlows((prev) => prev.filter((f) => f.id !== pendingDelete.id));
    toast.success(t("waf.toast.deleted"), { description: pendingDelete.name });
    setPendingDelete(null);
  };

  /* ─────── Builder modal handlers ──────────────────────────────────────── */

  /** Persist a builder draft to the flow list (or update if editing). */
  const persistDraft = (draft: FlowDraft, status: Flow["status"]) => {
    const existing = draft.originId ? flows.find((f) => f.id === draft.originId) : undefined;
    if (existing) {
      setFlows((prev) =>
        prev.map((f) =>
          f.id === draft.originId
            ? { ...f, name: draft.name, category: draft.category, status, updatedAt: new Date() }
            : f,
        ),
      );
    } else {
      const id = `WAF-${Math.floor(Math.random() * 9e12 + 1e12)}`;
      const newFlow: Flow = {
        id,
        name: draft.name,
        category: draft.category,
        status,
        submissions: 0,
        delivered: 0,
        opened: 0,
        completed: 0,
        completionRate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: { id: "u-sara", name: "Sara Khan" },
      };
      setFlows((prev) => [newFlow, ...prev]);
    }
  };

  const handleBuilderSave = (next: FlowDraft) => {
    persistDraft(next, "draft");
    toast.success(t("waf.builder.toast.saved"), { description: next.name });
    setBuilderDraft(null);
  };
  const handleBuilderSubmit = (next: FlowDraft) => {
    persistDraft(next, "in_review");
    toast.success(t("waf.builder.toast.submitted"), { description: next.name });
    setBuilderDraft(null);
  };

  const columns = React.useMemo(
    () =>
      buildFlowColumns({
        onAnalytics, onEdit, onDuplicate, onSubmit, onPublish, onUnpublish,
        onArchive, onRestore, onAppeal, onDelete,
        t, dateFnsLocale,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, dateFnsLocale, flows],
  );

  /* ─────── TanStack table ──────────────────────────────────────────── */

  const table = useReactTable({
    data: pageRows,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: getFlowRowId,
    getCoreRowModel: coreRowModel,
  });

  /* ─────── Rail navigation ─────────────────────────────────────────── */

  const navToast = (key: StringKey) =>
    toast.info(t(key), { description: t("toast.nav.other") });

  /* ─────── Empty state ─────────────────────────────────────────────── */

  const isEmpty = filtered.length === 0;
  const isFilteredEmpty = isEmpty && (search.length > 0 || statusFilter !== "all");

  /* ─────── Compose ─────────────────────────────────────────────────── */

  return (
    <AppShell
      primaryRail={
        <PrimaryRail
          logo={
            <img
              src="/azeer-brand.svg"
              alt="Azeer"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0"
            />
          }
          footer={<RailFooter onNavToast={navToast} />}
        >
          <PrimaryRailItem icon={Home}      label={t("rail.home")}      onClick={() => navToast("rail.home")} />
          <PrimaryRailItem icon={Inbox}     label={t("rail.inbox")}     onClick={() => navToast("rail.inbox")} badge={12} />
          <PrimaryRailItem icon={Sparkles}  label={t("rail.aiAgent")}   onClick={() => navToast("rail.aiAgent")} />
          <PrimaryRailItem icon={Users}     label={t("rail.contacts")}  active={currentScreen === "contacts"} onClick={() => onNavigate("contacts")} />
          <PrimaryRailItem icon={Megaphone} label={t("rail.broadcast")} onClick={() => navToast("rail.broadcast")} />
          <PrimaryRailItem icon={ShoppingBag} label={t("rail.ecommerce")} active={currentScreen === "whatsapp-flow"} onClick={() => onNavigate("whatsapp-flow")} />
        </PrimaryRail>
      }
      banner={
        showPlanBanner ? (
          <Banner
            intent={isQuotaExceeded || isPublishedCapHit ? "destructive" : "warning"}
            title={
              isPublishedCapHit
                ? t("waf.banner.publishedCap.title", { max: PLAN_QUOTA.maxPublishedFlows })
                : isQuotaExceeded
                  ? t("waf.banner.quotaExceeded.title")
                  : t("waf.banner.quotaWarning.title", {
                      used: counts.submissionsThisMonth.toLocaleString(),
                      max: PLAN_QUOTA.monthlySubmissions.toLocaleString(),
                    })
            }
            action={
              <Button
                size="sm"
                onClick={() => toast.info(t("toast.upgrade"), { description: t("toast.upgrade.body") })}
              >
                {t("banner.upgrade")}
              </Button>
            }
            dismissible
            onDismiss={() => setBannerDismissed(true)}
          >
            {isPublishedCapHit
              ? t("waf.banner.publishedCap.body")
              : isQuotaExceeded
                ? t("waf.banner.quotaExceeded.body")
                : t("waf.banner.quotaWarning.body")}
          </Banner>
        ) : undefined
      }
      helpBubble={
        <HelpBubble icon={HelpCircle} aria-label={t("waf.help.title")}>
          <div className="flex flex-col gap-2">
            <h3 className="text-heading-sm text-fg-default m-0">{t("waf.help.title")}</h3>
            <p className="text-body-md text-fg-muted m-0">{t("waf.help.body")}</p>
            <Button size="sm">{t("help.chat")}</Button>
          </div>
        </HelpBubble>
      }
    >
      <ModuleHeader
        title={t("waf.title")}
        meta={
          <span className="text-body-sm text-fg-muted">
            {t("waf.meta", {
              published: counts.published,
              inReview: counts.inReview,
              drafts: counts.draft,
            })}
          </span>
        }
        actions={
          <Button
            size="sm"
            disabled={isPublishedCapHit || isQuotaExceeded}
            onClick={() => setInitOpen(true)}
          >
            <Icon icon={Plus} size={14} aria-hidden="true" />
            {t("waf.action.create")}
          </Button>
        }
      />

      {/* Stats row — replaces the dimension a sidebar would have given.
       *  Four KPIs across the top: published / in-review / drafts / submissions (with quota progress). */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-5 py-4 border-b border-border-divider bg-surface">
        <StatCard
          icon={CheckCircle2}
          label={t("waf.stat.published")}
          value={counts.published}
          variant="success"
        />
        <StatCard
          icon={ClockAlert}
          label={t("waf.stat.inReview")}
          value={counts.inReview}
          variant="warning"
        />
        <StatCard
          icon={FileEdit}
          label={t("waf.stat.drafts")}
          value={counts.draft}
          variant="neutral"
        />
        <StatCard
          icon={PieChart}
          label={t("waf.stat.submissions")}
          value={counts.submissionsThisMonth}
          variant="accent"
          progress={Math.min(100, quotaPct)}
          progressLabel={t("waf.stat.submissions.quota", {
            used: counts.submissionsThisMonth.toLocaleString(),
            max: PLAN_QUOTA.monthlySubmissions.toLocaleString(),
            pct: quotaPct,
          })}
        />
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border-divider bg-surface">
        <div className="w-full max-w-sm">
          <SearchInput
            value={search}
            onValueChange={onSearchChange}
            placeholder={t("waf.search.placeholder")}
            aria-label={t("waf.search.placeholder")}
          />
        </div>
        <div className="w-44">
          <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("waf.filter.allStatuses")}</SelectItem>
              <SelectItem value="draft">{t("waf.status.draft")}</SelectItem>
              <SelectItem value="in_review">{t("waf.status.in_review")}</SelectItem>
              <SelectItem value="approved">{t("waf.status.approved")}</SelectItem>
              <SelectItem value="published">{t("waf.status.published")}</SelectItem>
              <SelectItem value="rejected">{t("waf.status.rejected")}</SelectItem>
              <SelectItem value="throttled">{t("waf.status.throttled")}</SelectItem>
              <SelectItem value="blocked">{t("waf.status.blocked")}</SelectItem>
              <SelectItem value="archived">{t("waf.status.archived")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="ms-auto text-body-sm text-fg-muted tabular-nums">
          {t(filtered.length === 1 ? "waf.matches.one" : "waf.matches", { n: filtered.length.toLocaleString() })}
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        {isEmpty ? (
          isFilteredEmpty ? (
            <div className="flex items-center justify-center min-h-full">
              <EmptyState
                icon={SearchIcon}
                title={t("waf.empty.filtered.title")}
                description={t("waf.empty.filtered.body")}
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      onStatusChange("all");
                    }}
                  >
                    {t("waf.empty.filtered.action")}
                  </Button>
                }
                size="inline"
              />
            </div>
          ) : (
            <NoFlowsEmptyState
              onCreate={() => setInitOpen(true)}
              onUseTemplate={(tpl) =>
                setBuilderDraft(
                  makeBlankDraft({ name: tpl.name, category: tpl.category }),
                )
              }
            />
          )
        ) : (
          <DataTable<Flow> table={table} />
        )}
      </div>

      <footer className="px-5 py-3 border-t border-border-divider bg-surface flex items-center justify-between gap-3">
        <span className="text-body-sm text-fg-muted">
          {filtered.length === 0
            ? t("waf.footer.empty")
            : t("waf.footer.showing", {
                from: (pageStart + 1).toLocaleString(),
                to: (pageStart + pageRows.length).toLocaleString(),
                total: filtered.length.toLocaleString(),
              })}
        </span>
        {totalPages > 1 ? (
          <Pagination page={safePage} pageCount={totalPages} onPageChange={setPage} />
        ) : null}
      </footer>

      {pendingDelete ? (
        <ConfirmDialog
          open
          onOpenChange={(open) => {
            if (!open) setPendingDelete(null);
          }}
          title={t("waf.confirm.delete.title", { name: pendingDelete.name })}
          description={t("waf.confirm.delete.body")}
          confirmLabel={t("waf.row.delete")}
          cancelLabel={t("common.cancel")}
          destructive
          onConfirm={confirmDelete}
        />
      ) : null}

      {/* Step 1: Init dialog. On submit, seed a new draft and open the builder. */}
      <InitDialog
        open={initOpen}
        onOpenChange={setInitOpen}
        onSubmit={(draft) => {
          setInitOpen(false);
          setBuilderReadOnly(false);
          setBuilderDraft(draft);
        }}
      />

      {/* Step 2: Builder dialog. Conditionally mounted via the draft itself —
       *  passing `open={!!builderDraft}` plus a null draft would still mount
       *  the Radix portal each render. */}
      {builderDraft ? (
        <BuilderDialog
          open
          draft={builderDraft}
          readOnly={builderReadOnly}
          onOpenChange={(o) => {
            if (!o) setBuilderDraft(null);
          }}
          onSave={handleBuilderSave}
          onSubmitForReview={handleBuilderSubmit}
        />
      ) : null}
    </AppShell>
  );
}

/* ─────── Stat card — composes Card + Icon + Progress ──────────────────── */

interface StatCardProps {
  icon: typeof CheckCircle2;
  label: string;
  value: number;
  variant: "success" | "warning" | "neutral" | "accent";
  progress?: number;
  progressLabel?: string;
}

function StatCard({ icon, label, value, variant, progress, progressLabel }: StatCardProps) {
  const iconColor = {
    success: "text-success-text",
    warning: "text-warning-text",
    neutral: "text-fg-muted",
    accent:  "text-accent-text",
  }[variant];
  return (
    <Card padding="default">
      <CardBody>
        <div className="flex items-center gap-2">
          <Icon icon={icon} size={16} className={iconColor} aria-hidden="true" />
          <span className="text-label-xs uppercase tracking-wide text-fg-muted">{label}</span>
        </div>
        <div className="mt-1 text-heading-md text-fg-default font-semibold tabular-nums">
          {value.toLocaleString()}
        </div>
        {progress !== undefined ? (
          <div className="mt-2 flex flex-col gap-1.5">
            <Progress value={progress} intent={progress >= 100 ? "destructive" : progress >= 80 ? "warning" : "primary"} />
            <span className="text-body-xs text-fg-muted">{progressLabel}</span>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}

/* ─────── No-flows empty state (5 starter templates) ───────────────────── */

interface NoFlowsEmptyStateProps {
  onCreate: () => void;
  onUseTemplate: (tpl: FlowTemplate) => void;
}
function NoFlowsEmptyState({ onCreate, onUseTemplate }: NoFlowsEmptyStateProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 gap-8">
      <EmptyState
        icon={Workflow}
        title={t("waf.empty.title")}
        description={t("waf.empty.body")}
        action={
          <Button onClick={onCreate}>
            <Icon icon={Plus} size={14} aria-hidden="true" />
            {t("waf.action.create")}
          </Button>
        }
        size="page"
      />
      <div className="w-full max-w-3xl">
        <h3 className="text-label-xs uppercase tracking-wide text-fg-muted mb-3">
          {t("waf.empty.startWithTemplate")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FLOW_TEMPLATES.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} onUse={() => onUseTemplate(tpl)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, onUse }: { template: FlowTemplate; onUse: () => void }) {
  const { t } = useLocale();
  return (
    <Card padding="default" className="hover:border-border-focus transition-colors duration-fast cursor-pointer">
      <CardBody>
        <div className="flex items-center gap-2 mb-2">
          <Icon icon={Workflow} size={14} className="text-accent-text" aria-hidden="true" />
          <Badge size="sm" variant="outline" className="capitalize">
            {t(`waf.category.${template.category}` as StringKey)}
          </Badge>
        </div>
        <h4 className="text-heading-sm text-fg-default m-0">{template.name}</h4>
        <p className="text-body-sm text-fg-muted mt-1 m-0">{template.description}</p>
        <Button variant="secondary" size="sm" className="mt-3" onClick={onUse}>
          {t("waf.template.use")}
        </Button>
      </CardBody>
    </Card>
  );
}

/* ─────── Rail-footer button helper ─────────────────────────────────────
 *  Matches the helper used in ContactsScreen — kept locally instead of
 *  exporting from a shared module to avoid premature abstraction. */
function railFooterBtn(collapsed: boolean): string {
  return cn(
    "inline-flex items-center gap-3 h-ctrl-md rounded-md cursor-pointer",
    "hover:bg-state-hover transition-colors duration-fast ease-standard",
    collapsed ? "justify-center w-ctrl-md px-0" : "px-3",
  );
}

/* ─────── Rail footer ───────────────────────────────────────────────────
 *  Lives inside `PrimaryRail`'s footer slot so it can read the live
 *  `collapsed` state via `usePrimaryRail()` — the rail auto-expands on
 *  hover and re-collapses on hover-out (when not pinned), so the footer
 *  has to react. The pin affordance lives at the top of the rail next to
 *  the brand logo — collapse toggle is no longer needed here. */
function RailFooter({ onNavToast }: { onNavToast: (key: StringKey) => void }) {
  const { t, locale, setLocale } = useLocale();
  const { collapsed } = usePrimaryRail();
  return (
    <>
      <PrimaryRailItem
        icon={Settings}
        label={t("rail.settings")}
        onClick={() => onNavToast("rail.settings")}
      />

      {/* Language switcher — regular rail-tab pattern. Label shows the
       *  language you'd switch TO. */}
      <PrimaryRailItem
        icon={Languages}
        label={locale === "en" ? "العربية" : "English"}
        onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      />

      <button
        type="button"
        onClick={() => onNavToast("toast.profile")}
        className={railFooterBtn(collapsed)}
        aria-label={collapsed ? "Sara Khan" : undefined}
      >
        <Avatar size="sm" alt="Sara Khan" name="Sara Khan" presence="online" />
        {!collapsed ? (
          <span className="flex-1 text-start truncate text-body-md text-fg-default">
            Sara Khan
          </span>
        ) : null}
      </button>
    </>
  );
}

