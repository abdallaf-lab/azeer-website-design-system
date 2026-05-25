import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNowStrict, type Locale as DateFnsLocale } from "date-fns";
import { Archive, Ban, MoreHorizontal, UserCircle } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
} from "@azeer/ui";
import type { Contact, ContactStatus } from "./data";
import type { StringKey } from "../i18n/strings";

const STATUS_VARIANT: Record<ContactStatus, "success" | "neutral" | "destructive"> = {
  active: "success",
  archived: "neutral",
  blocked: "destructive",
};

interface ColumnContext {
  onRowBlock: (id: string) => void;
  onRowArchive: (id: string) => void;
  onRowOpen: (id: string) => void;
  /** Translation function from `useLocale()`. Lets cells render localized labels. */
  t: (key: StringKey, params?: Record<string, string | number>) => string;
  /** date-fns locale for relative-time strings ("hace 2 días" / "منذ يومين"). */
  dateFnsLocale: DateFnsLocale | undefined;
}

export function buildContactColumns(ctx: ColumnContext): ColumnDef<Contact>[] {
  const { t, dateFnsLocale } = ctx;
  return [
    {
      id: "select",
      header: ({ table }) => {
        const all = table.getIsAllPageRowsSelected();
        const some = table.getIsSomePageRowsSelected();
        return (
          <Checkbox
            checked={all ? true : some ? "indeterminate" : false}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select page"
          />
        );
      },
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
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.name")}</span>
      ),
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar size="sm" alt={c.name} name={c.name} />
            <div className="min-w-0 flex flex-col">
              <span className="text-body-md text-fg-default font-medium truncate">{c.name}</span>
              {/* Country code is always Latin 2-letter — bidi-isolate keeps it left-to-right
                  even when the contact's name above is Arabic and the document is RTL. */}
              <span className="text-body-xs text-fg-muted bidi-isolate">{c.country}</span>
            </div>
          </div>
        );
      },
      size: 260,
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.phone")}</span>
      ),
      cell: ({ row }) => (
        // Phone is always-LTR per RTL.md — `bidi-isolate` ensures the +country prefix
        // and the number render left-to-right inside RTL prose without reflow.
        <span className="bidi-isolate font-mono tabular-nums text-body-md text-fg-default">
          {row.original.phone}
        </span>
      ),
      size: 160,
    },
    {
      id: "email",
      accessorKey: "email",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.email")}</span>
      ),
      cell: ({ row }) =>
        row.original.email ? (
          // Email is always-LTR per RTL.md — TLD on the right is a global invariant.
          <span className="bidi-isolate text-body-md text-fg-default truncate block">
            {row.original.email}
          </span>
        ) : (
          <EmptyDash />
        ),
      size: 220,
    },
    {
      id: "tags",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.tags")}</span>
      ),
      cell: ({ row }) => {
        const tags = row.original.tags;
        if (tags.length === 0) return <EmptyDash />;
        const visible = tags.slice(0, 2);
        const remainder = tags.length - visible.length;
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {visible.map((t) => (
              <Badge key={t.id} size="sm" variant="outline">{t.label}</Badge>
            ))}
            {remainder > 0 ? (
              <Badge size="sm" variant="neutral">+{remainder}</Badge>
            ) : null}
          </div>
        );
      },
      enableSorting: false,
      size: 160,
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.status")}</span>
      ),
      cell: ({ row }) => (
        <Badge size="sm" variant={STATUS_VARIANT[row.original.status]}>
          {t(`status.${row.original.status}` as StringKey)}
        </Badge>
      ),
      size: 100,
    },
    {
      id: "lastInteractedAt",
      accessorKey: "lastInteractedAt",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.lastInteracted")}</span>
      ),
      cell: ({ row }) => {
        const d = row.original.lastInteractedAt;
        return d ? (
          <span className="text-body-md text-fg-default">
            {formatDistanceToNowStrict(d, { addSuffix: true, locale: dateFnsLocale })}
          </span>
        ) : (
          <EmptyDash />
        );
      },
      size: 140,
    },
    {
      id: "assignee",
      header: () => (
        <span className="text-label-xs uppercase tracking-wide text-fg-muted">{t("col.assignee")}</span>
      ),
      cell: ({ row }) => {
        const a = row.original.assignee;
        if (!a) return <span className="text-body-xs text-fg-subtle">{t("row.unassigned")}</span>;
        return (
          <div className="flex items-center gap-2 min-w-0">
            <Avatar size="sm" alt={a.name} name={a.name} />
            <span className="text-body-md text-fg-default truncate">{a.name}</span>
          </div>
        );
      },
      enableSorting: false,
      size: 160,
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${c.name}`}>
                  <Icon icon={MoreHorizontal} size={14} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => ctx.onRowOpen(c.id)}>
                  <Icon icon={UserCircle} size={14} aria-hidden="true" />
                  {t("row.viewProfile")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => ctx.onRowArchive(c.id)}>
                  <Icon icon={Archive} size={14} aria-hidden="true" />
                  {c.status === "archived" ? t("row.unarchive") : t("row.archive")}
                </DropdownMenuItem>
                <DropdownMenuItem destructive onSelect={() => ctx.onRowBlock(c.id)}>
                  <Icon icon={Ban} size={14} aria-hidden="true" />
                  {c.status === "blocked" ? t("row.unblock") : t("row.block")}
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
