import * as React from "react";
import { format } from "date-fns";
import { ArrowLeft, Copy, Filter as FilterIcon, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Icon,
  ModuleHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@azeer/ui";
import type { Segment, SegmentType } from "./data";
import { SegmentRuleBuilder } from "./SegmentRuleBuilder";
import { useLocale } from "../i18n";
import type { StringKey } from "../i18n/strings";

const TYPE_VARIANT: Record<SegmentType, "accent" | "info" | "neutral"> = {
  marketing: "accent",
  lifecycle: "info",
  custom: "neutral",
};
const TYPE_LABEL_KEY: Record<SegmentType, StringKey> = {
  marketing: "segments.type.marketing",
  lifecycle: "segments.type.lifecycle",
  custom: "segments.type.custom",
};

interface SegmentsViewProps {
  onBack: () => void;
  segments: Segment[];
  /** Adds a newly-created segment to the parent's segment list (sidebar reflects it immediately). */
  onCreate: (segment: Segment) => void;
  /** Soft-delete per CDP doc §6.2 — playground treats it as a hard remove. */
  onDelete: (id: string) => void;
  /** Apply a segment as a list filter — navigates back to /contacts. */
  onApply: (id: string) => void;
}

/**
 * SCR-CDP-001b — Segments management surface.
 *
 * Lists every saved segment with its type, contact count, owner, and audit
 * date. Create-flow goes through the canonical right-side Sheet
 * (`SegmentRuleBuilder`). All chrome inherits from the DS: Table primitives,
 * Badge for type chip, DropdownMenu for row actions, ConfirmDialog for
 * destructive delete.
 */
export function SegmentsView({ onBack, segments, onCreate, onDelete, onApply }: SegmentsViewProps) {
  const { t, dateFnsLocale } = useLocale();
  const [builderOpen, setBuilderOpen] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<Segment | null>(null);

  const isEmpty = segments.length === 0;

  return (
    <>
      <ModuleHeader
        title={t("segments.title")}
        meta={
          <span className="text-body-sm text-fg-muted">
            {t("segments.meta", { n: segments.length })}
          </span>
        }
        leading={
          <Button variant="ghost" size="icon-sm" onClick={onBack} aria-label={t("segments.back")}>
            <Icon icon={ArrowLeft} size={14} flipOnRtl aria-hidden="true" />
          </Button>
        }
        actions={
          <Button size="sm" onClick={() => setBuilderOpen(true)}>
            <Icon icon={Plus} size={14} aria-hidden="true" />
            {t("segments.create")}
          </Button>
        }
      />

      <div className="flex-1 overflow-auto">
        {isEmpty ? (
          <div className="flex items-center justify-center min-h-full">
            <EmptyState
              icon={FilterIcon}
              title={t("segments.empty.title")}
              description={t("segments.empty.body")}
              action={
                <Button onClick={() => setBuilderOpen(true)}>
                  <Icon icon={Plus} size={14} aria-hidden="true" />
                  {t("segments.create")}
                </Button>
              }
              size="page"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("segments.col.name")}</TableHead>
                <TableHead>{t("segments.col.type")}</TableHead>
                <TableHead className="text-end">{t("segments.col.contacts")}</TableHead>
                <TableHead>{t("segments.col.createdBy")}</TableHead>
                <TableHead>{t("segments.col.created")}</TableHead>
                <TableHead aria-label="actions" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {segments.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => onApply(s.id)}
                      className="text-fg-default font-medium hover:text-accent-text cursor-pointer text-start"
                    >
                      {s.name}
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge size="sm" variant={TYPE_VARIANT[s.type]}>
                      {t(TYPE_LABEL_KEY[s.type])}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end font-medium">
                    {s.contactCount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar size="sm" alt={s.createdBy.name} name={s.createdBy.name} />
                      <span className="truncate">{s.createdBy.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-fg-muted">
                      {format(s.createdAt, "PP", { locale: dateFnsLocale })}
                    </span>
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={s.name}>
                          <Icon icon={MoreHorizontal} size={14} aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onApply(s.id)}>
                          <Icon icon={FilterIcon} size={14} aria-hidden="true" />
                          {t("segments.action.apply")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            toast.info(t("toast.segment.edit"), { description: t("toast.segment.edit.body") })
                          }
                        >
                          {t("segments.action.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            toast.info(t("toast.segment.duplicate"), { description: `${s.name} (copy)` })
                          }
                        >
                          <Icon icon={Copy} size={14} aria-hidden="true" />
                          {t("segments.action.dup")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem destructive onSelect={() => setPendingDelete(s)}>
                          <Icon icon={Trash2} size={14} aria-hidden="true" />
                          {t("segments.action.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <SegmentRuleBuilder
        open={builderOpen}
        onOpenChange={setBuilderOpen}
        existing={segments}
        onSave={onCreate}
      />

      {pendingDelete ? (
        <ConfirmDialog
          open
          onOpenChange={(open) => {
            if (!open) setPendingDelete(null);
          }}
          title={t("segments.confirm.delete.title", { name: pendingDelete.name })}
          description={t("segments.confirm.delete.body")}
          confirmLabel={t("segments.confirm.delete.action")}
          cancelLabel={t("common.cancel")}
          destructive
          onConfirm={() => {
            onDelete(pendingDelete.id);
            toast.success(t("toast.segment.deleted"), { description: pendingDelete.name });
            setPendingDelete(null);
          }}
        />
      ) : null}
    </>
  );
}
