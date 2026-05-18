import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNowStrict, format, type Locale as DateFnsLocale } from "date-fns";
import {
  Archive,
  Ban,
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Play,
  RotateCcw,
  Send,
  Trash2,
} from "lucide-react";
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  toast,
} from "@azeer/ui";
import type { Flow, FlowStatus } from "./data";
import type { StringKey } from "../i18n/strings";

const STATUS_VARIANT: Record<
  FlowStatus,
  "neutral" | "warning" | "info" | "success" | "destructive" | "outline"
> = {
  draft:      "neutral",
  in_review:  "warning",
  approved:   "info",
  published:  "success",
  rejected:   "destructive",
  throttled:  "warning",
  blocked:    "destructive",
  archived:   "outline",
};

interface ColumnContext {
  /** Row-level action handlers — parent owns side effects. */
  onEdit: (f: Flow) => void;
  onAnalytics: (f: Flow) => void;
  onSubmit: (f: Flow) => void;
  onPublish: (f: Flow) => void;
  onUnpublish: (f: Flow) => void;
  onArchive: (f: Flow) => void;
  onRestore: (f: Flow) => void;
  onDuplicate: (f: Flow) => void;
  onDelete: (f: Flow) => void;
  onAppeal: (f: Flow) => void;
  t: (key: StringKey, params?: Record<string, string | number>) => string;
  dateFnsLocale: DateFnsLocale | undefined;
}

export function buildFlowColumns(ctx: ColumnContext): ColumnDef<Flow>[] {
  const { t, dateFnsLocale } = ctx;
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select page"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={`Select ${row.original.name}`}
        />
      ),
      enableSorting: false,
      size: 32,
    },
    {
      id: "name",
      accessorKey: "name",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("waf.col.name")}</span>
      ),
      cell: ({ row }) => {
        const f = row.original;
        return (
          <div className="flex flex-col min-w-0">
            <span className="text-body-md text-fg-default font-medium truncate">{f.name}</span>
            <span className="text-body-xs text-fg-muted capitalize">
              {t(`waf.category.${f.category}` as StringKey)}
            </span>
          </div>
        );
      },
      size: 280,
    },
    {
      id: "flowId",
      accessorKey: "id",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("waf.col.id")}</span>
      ),
      cell: ({ row }) => (
        // Flow IDs are always-LTR mono per RTL doc — `dir="ltr"` forces LTR even inside RTL prose.
        <code dir="ltr" className="font-mono text-body-xs text-fg-muted tabular-nums">
          {row.original.id}
        </code>
      ),
      size: 180,
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("waf.col.status")}</span>
      ),
      cell: ({ row }) => {
        const f = row.original;
        return (
          <div className="flex flex-col items-start gap-1 min-w-0">
            <Badge size="sm" variant={STATUS_VARIANT[f.status]}>
              {t(`waf.status.${f.status}` as StringKey)}
            </Badge>
            {f.status === "rejected" && f.rejectionReason ? (
              <span className="text-body-xs text-danger-text line-clamp-1" title={f.rejectionReason}>
                {f.rejectionReason}
              </span>
            ) : null}
            {f.status === "throttled" && f.throttledUntil ? (
              <span className="text-body-xs text-warning-text">
                {t("waf.throttledUntil", {
                  when: formatDistanceToNowStrict(f.throttledUntil, { addSuffix: true, locale: dateFnsLocale }),
                })}
              </span>
            ) : null}
            {f.status === "blocked" && f.blockedReason ? (
              <span className="text-body-xs text-danger-text line-clamp-1" title={f.blockedReason}>
                {f.blockedReason}
              </span>
            ) : null}
          </div>
        );
      },
      size: 200,
    },
    {
      id: "submissions",
      accessorKey: "submissions",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("waf.col.submissions")}</span>
      ),
      cell: ({ row }) => {
        const n = row.original.submissions;
        return n > 0 ? (
          <span className="text-body-md text-fg-default">{n.toLocaleString()}</span>
        ) : (
          <EmptyDash />
        );
      },
      size: 120,
    },
    {
      id: "completionRate",
      accessorKey: "completionRate",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("waf.col.rate")}</span>
      ),
      cell: ({ row }) => {
        const r = row.original.completionRate;
        if (r === null) return <EmptyDash />;
        return <span className="text-body-md text-fg-default">{r}%</span>;
      },
      size: 110,
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("waf.col.updated")}</span>
      ),
      cell: ({ row }) => {
        const d = row.original.updatedAt;
        const absolute = format(d, "PPp", { locale: dateFnsLocale });
        return (
          <span className="text-body-md text-fg-default" title={absolute}>
            {formatDistanceToNowStrict(d, { addSuffix: true, locale: dateFnsLocale })}
          </span>
        );
      },
      size: 140,
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const f = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${f.name}`}>
                  <Icon icon={MoreHorizontal} size={14} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* Always-available core actions */}
                <DropdownMenuItem onSelect={() => ctx.onAnalytics(f)}>
                  <Icon icon={Eye} size={14} aria-hidden="true" />
                  {t("waf.row.analytics")}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => ctx.onEdit(f)} disabled={f.status === "in_review"}>
                  <Icon icon={Edit3} size={14} aria-hidden="true" />
                  {t("waf.row.edit")}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => ctx.onDuplicate(f)}>
                  <Icon icon={Copy} size={14} aria-hidden="true" />
                  {t("waf.row.duplicate")}
                </DropdownMenuItem>

                {/* State-specific transitions */}
                {f.status === "draft" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => ctx.onSubmit(f)}>
                      <Icon icon={Send} size={14} aria-hidden="true" flipOnRtl />
                      {t("waf.row.submit")}
                    </DropdownMenuItem>
                  </>
                ) : null}
                {f.status === "approved" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => ctx.onPublish(f)}>
                      <Icon icon={Play} size={14} aria-hidden="true" flipOnRtl />
                      {t("waf.row.publish")}
                    </DropdownMenuItem>
                  </>
                ) : null}
                {f.status === "published" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => ctx.onUnpublish(f)}>
                      <Icon icon={Ban} size={14} aria-hidden="true" />
                      {t("waf.row.unpublish")}
                    </DropdownMenuItem>
                  </>
                ) : null}
                {f.status === "blocked" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => ctx.onAppeal(f)}>
                      <Icon icon={ExternalLink} size={14} aria-hidden="true" flipOnRtl />
                      {t("waf.row.appeal")}
                    </DropdownMenuItem>
                  </>
                ) : null}
                {f.status === "archived" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => ctx.onRestore(f)}>
                      <Icon icon={RotateCcw} size={14} aria-hidden="true" flipOnRtl />
                      {t("waf.row.restore")}
                    </DropdownMenuItem>
                  </>
                ) : null}

                {/* Soft-destructive */}
                {f.status !== "archived" && f.status !== "in_review" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => ctx.onArchive(f)}>
                      <Icon icon={Archive} size={14} aria-hidden="true" />
                      {t("waf.row.archive")}
                    </DropdownMenuItem>
                  </>
                ) : null}

                {/* Hard delete (Admin only per brief §3 — gated by archived ≥ 30d in real impl) */}
                <DropdownMenuItem destructive onSelect={() => ctx.onDelete(f)}>
                  <Icon icon={Trash2} size={14} aria-hidden="true" />
                  {t("waf.row.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableSorting: false,
      size: 56,
    },
  ];
}

function EmptyDash() {
  return <span className="text-body-xs text-fg-subtle" aria-hidden="true">—</span>;
}

/* Convenience handler used by row actions that aren't wired to side effects yet. */
export function defaultActionToast(
  t: (key: StringKey, params?: Record<string, string | number>) => string,
  key: StringKey,
  description?: string,
) {
  toast.info(t(key), description ? { description } : undefined);
}
