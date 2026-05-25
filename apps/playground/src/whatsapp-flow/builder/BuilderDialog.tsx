import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Plus,
  Send,
  Trash2,
  Workflow,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  ConfirmDialog,
  Dialog,
  DialogContent,
  FormField,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
} from "@azeer/ui";
import { useLocale } from "../../i18n";
import type { StringKey } from "../../i18n/strings";
import { BlockEditor, KIND_ICON } from "./BlockEditor";
import { FlowPreview } from "./FlowPreview";
import { PortalContainerProvider, usePortalContainer } from "./PortalContext";
import {
  PALETTE_GROUPS,
  makeBlankScreen,
  makeBlock,
  sanitizeScreenId,
  toMetaFlowJSON,
  type Block,
  type BlockKind,
  type FlowDraft,
  type FlowScreen,
} from "./types";

interface BuilderDialogProps {
  open: boolean;
  /** The draft that's being edited. Parent owns the value so it survives close & re-open. */
  draft: FlowDraft | null;
  /**
   * Read-only mode (e.g. status is IN_REVIEW per [[SCR-WAF-001]] §6). The
   * builder still renders so reviewers can inspect content, but every mutating
   * affordance is disabled and the read-only banner appears at the top.
   */
  readOnly?: boolean;
  onOpenChange: (open: boolean) => void;
  /** Persist draft to the parent's flow list (status: DRAFT). */
  onSave: (next: FlowDraft) => void;
  /** Persist + transition status to IN_REVIEW. */
  onSubmitForReview: (next: FlowDraft) => void;
}

/**
 * BuilderDialog — full-screen 3-pane modal: Screens · Canvas · Preview.
 *
 * Layout pattern follows established flow-builder UX (Tally, Typeform, Jotform):
 * left tree of screens, center stack of inline-edited content blocks, right
 * live preview. We render via Radix Dialog with a width override (max
 * 1280px) since the DS Dialog only ships sm/md/lg sizes — sufficient for
 * forms but not workspace surfaces. The override is scoped to this consumer
 * so it doesn't leak into the primitive's contract.
 */
export function BuilderDialog({
  open,
  draft,
  readOnly,
  onOpenChange,
  onSave,
  onSubmitForReview,
}: BuilderDialogProps) {
  const { t } = useLocale();
  /** Portal target for nested Select/Popover so Radix Dialog's focus-trap
   *  doesn't intercept their trigger pointer events. See PortalContext docs. */
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null);

  // Local working copy. Reset when a new draft is loaded.
  const [local, setLocal] = React.useState<FlowDraft | null>(draft);
  const [activeScreen, setActiveScreen] = React.useState(0);
  const [dirty, setDirty] = React.useState(false);
  const [confirmClose, setConfirmClose] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setLocal(draft);
    setActiveScreen(0);
    setDirty(false);
  }, [open, draft]);

  if (!local) return null;

  const screen: FlowScreen | undefined = local.screens[activeScreen];

  /* ─── Draft mutators ─────────────────────────────────────────────────── */

  const patchScreen = (idx: number, patch: Partial<FlowScreen>) => {
    setLocal((d) =>
      d ? { ...d, screens: d.screens.map((s, i) => (i === idx ? { ...s, ...patch } : s)) } : d,
    );
    setDirty(true);
  };

  const addScreen = () => {
    setLocal((d) => {
      if (!d) return d;
      const nextScreens = [...d.screens, makeBlankScreen(d.screens.map((s) => s.id))];
      return { ...d, screens: nextScreens };
    });
    setActiveScreen(local.screens.length);
    setDirty(true);
  };

  const removeScreen = (idx: number) => {
    setLocal((d) => {
      if (!d || d.screens.length <= 1) return d;
      const nextScreens = d.screens.filter((_, i) => i !== idx);
      return { ...d, screens: nextScreens };
    });
    setActiveScreen((i) => Math.max(0, Math.min(i, local.screens.length - 2)));
    setDirty(true);
  };

  const moveScreen = (idx: number, dir: -1 | 1) => {
    setLocal((d) => {
      if (!d) return d;
      const j = idx + dir;
      if (j < 0 || j >= d.screens.length) return d;
      const next = [...d.screens];
      [next[idx], next[j]] = [next[j], next[idx]];
      return { ...d, screens: next };
    });
    setActiveScreen((i) => i + dir);
    setDirty(true);
  };

  /* ─── Block mutators ─────────────────────────────────────────────────── */

  const replaceBlocks = (mapper: (blocks: Block[]) => Block[]) => {
    if (!screen) return;
    patchScreen(activeScreen, { blocks: mapper(screen.blocks) });
  };
  const addBlock = (kind: BlockKind) => replaceBlocks((blocks) => [...blocks, makeBlock(kind)]);
  const updateBlock = (idx: number, next: Block) =>
    replaceBlocks((blocks) => blocks.map((b, i) => (i === idx ? next : b)));
  const moveBlock = (idx: number, dir: -1 | 1) =>
    replaceBlocks((blocks) => {
      const j = idx + dir;
      if (j < 0 || j >= blocks.length) return blocks;
      const next = [...blocks];
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  const duplicateBlock = (idx: number) =>
    replaceBlocks((blocks) => {
      const orig = blocks[idx];
      const copy = { ...orig, id: `${orig.id}_dup_${Date.now().toString(36)}` };
      return [...blocks.slice(0, idx + 1), copy as Block, ...blocks.slice(idx + 1)];
    });
  const deleteBlock = (idx: number) =>
    replaceBlocks((blocks) => blocks.filter((_, i) => i !== idx));

  /* ─── Top-bar actions ────────────────────────────────────────────────── */

  const handleCopyJson = async () => {
    if (!local) return;
    const json = JSON.stringify(toMetaFlowJSON(local), null, 2);
    try {
      await navigator.clipboard.writeText(json);
      toast.success(t("waf.builder.toast.copied"));
    } catch {
      // Surface a soft failure rather than swallowing — common in iframes / strict permissions.
      toast.info(t("waf.builder.action.copyJson"));
    }
  };

  const handleSave = () => {
    if (!local) return;
    onSave(local);
    setDirty(false);
  };
  const handleSubmit = () => {
    if (!local) return;
    onSubmitForReview(local);
    setDirty(false);
  };

  const requestClose = () => {
    if (dirty && !readOnly) setConfirmClose(true);
    else onOpenChange(false);
  };
  const confirmDiscard = () => {
    setConfirmClose(false);
    setDirty(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : requestClose())}>
      <DialogContent
        hideCloseButton
        ref={setContentEl}
        className="!max-w-none !w-[min(1280px,calc(100vw-2rem))] !h-[calc(100vh-2rem)] p-0 gap-0"
      >
        <PortalContainerProvider value={contentEl}>
        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-border-divider bg-surface">
          <Icon icon={Workflow} size={16} className="text-accent-text" aria-hidden="true" />
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="text-heading-sm text-fg-default m-0 truncate" dir="auto">
              {local.name || t("waf.builder.title.untitled")}
            </h2>
            <span className="text-body-xs text-fg-muted">
              {t(`waf.category.${local.category}` as StringKey)}
              {local.withEndpoint ? " · endpoint" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleCopyJson}>
              <Icon icon={Copy} size={14} aria-hidden="true" />
              {t("waf.builder.action.copyJson")}
            </Button>
            {readOnly ? null : (
              <>
                <Button size="sm" variant="secondary" onClick={handleSave}>
                  {t("waf.builder.action.saveExit")}
                </Button>
                <Button size="sm" onClick={handleSubmit}>
                  <Icon icon={Send} size={14} aria-hidden="true" flipOnRtl />
                  {t("waf.builder.action.submit")}
                </Button>
              </>
            )}
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={requestClose}
              aria-label={t("waf.builder.action.close")}
            >
              <Icon icon={X} size={14} aria-hidden="true" />
            </Button>
          </div>
        </div>

        {readOnly ? (
          <div className="bg-warning-surface text-warning-text px-5 py-2 text-body-sm border-b border-warning-border">
            {t("waf.builder.readonly.banner")}
          </div>
        ) : null}

        {/* 3-pane body */}
        <div className="flex-1 min-h-0 grid grid-cols-[220px_1fr_320px] gap-0">
          {/* Left: screen list */}
          <aside className="border-e border-border-divider bg-surface-subtle overflow-y-auto p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 pb-1">
              <span className="text-label-xs uppercase tracking-wide text-fg-muted">
                {t("waf.builder.screens.heading")}
              </span>
              <span className="text-body-xs text-fg-muted tabular-nums">
                {local.screens.length}
              </span>
            </div>
            <ul className="flex flex-col gap-1 m-0 p-0 list-none">
              {local.screens.map((s, idx) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActiveScreen(idx)}
                    className={`w-full flex flex-col items-start gap-0.5 px-2.5 py-2 rounded-md border text-start transition-colors duration-fast ${
                      idx === activeScreen
                        ? "border-border-focus bg-surface"
                        : "border-transparent hover:bg-state-hover"
                    }`}
                  >
                    <span className="text-body-sm text-fg-default font-medium truncate w-full" dir="auto">
                      {s.title || t("waf.builder.title.untitled")}
                    </span>
                    <span dir="ltr" className="text-body-xs text-fg-muted font-mono truncate w-full">
                      {s.id}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {!readOnly ? (
              <Button variant="ghost" size="sm" onClick={addScreen} className="justify-start">
                <Icon icon={Plus} size={14} aria-hidden="true" />
                {t("waf.builder.screens.add")}
              </Button>
            ) : null}
          </aside>

          {/* Center: active-screen canvas */}
          <main className="overflow-y-auto p-5 bg-surface min-h-0">
            {screen ? (
              <ScreenCanvas
                screen={screen}
                screenIndex={activeScreen}
                totalScreens={local.screens.length}
                readOnly={!!readOnly}
                onTitleChange={(title) => patchScreen(activeScreen, { title })}
                onScreenIdChange={(id) => patchScreen(activeScreen, { id: sanitizeScreenId(id) })}
                onMoveUp={() => moveScreen(activeScreen, -1)}
                onMoveDown={() => moveScreen(activeScreen, 1)}
                onDelete={() => removeScreen(activeScreen)}
                onAddBlock={addBlock}
                onUpdateBlock={updateBlock}
                onMoveBlock={moveBlock}
                onDuplicateBlock={duplicateBlock}
                onDeleteBlock={deleteBlock}
              />
            ) : null}
          </main>

          {/* Right: live preview */}
          <aside className="border-s border-border-divider bg-surface-subtle overflow-y-auto p-4 flex justify-center">
            <FlowPreview
              screen={screen}
              screenIndex={activeScreen}
              totalScreens={local.screens.length}
            />
          </aside>
        </div>
        </PortalContainerProvider>
      </DialogContent>

      {/* Unsaved-changes guard. Conditionally mounted per freeze-avoidance rule. */}
      {confirmClose ? (
        <ConfirmDialog
          open
          onOpenChange={(o) => {
            if (!o) setConfirmClose(false);
          }}
          title={t("waf.builder.unsaved.title")}
          description={t("waf.builder.unsaved.body")}
          confirmLabel={t("waf.builder.unsaved.discard")}
          cancelLabel={t("waf.builder.unsaved.keep")}
          destructive
          onConfirm={confirmDiscard}
        />
      ) : null}
    </Dialog>
  );
}

/* ─────── Center canvas ────────────────────────────────────────────────── */

interface ScreenCanvasProps {
  screen: FlowScreen;
  screenIndex: number;
  totalScreens: number;
  readOnly: boolean;
  onTitleChange: (v: string) => void;
  onScreenIdChange: (v: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onAddBlock: (kind: BlockKind) => void;
  onUpdateBlock: (idx: number, next: Block) => void;
  onMoveBlock: (idx: number, dir: -1 | 1) => void;
  onDuplicateBlock: (idx: number) => void;
  onDeleteBlock: (idx: number) => void;
}

function ScreenCanvas({
  screen, screenIndex, totalScreens, readOnly,
  onTitleChange, onScreenIdChange,
  onMoveUp, onMoveDown, onDelete,
  onAddBlock, onUpdateBlock, onMoveBlock, onDuplicateBlock, onDeleteBlock,
}: ScreenCanvasProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {/* Screen-level header */}
      <div className="flex items-start gap-3">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-3">
          <FormField label={t("waf.builder.screen.title.label")}>
            <Input
              value={screen.title}
              onChange={(e) => onTitleChange(e.target.value)}
              disabled={readOnly}
              dir="auto"
            />
          </FormField>
          <FormField label={t("waf.builder.screen.id.label")} helper={t("waf.builder.screen.id.helper")}>
            <Input
              value={screen.id}
              onChange={(e) => onScreenIdChange(e.target.value)}
              disabled={readOnly}
              dir="ltr"
              className="font-mono text-body-sm"
              maxLength={32}
            />
          </FormField>
        </div>
        {!readOnly ? (
          <div className="flex items-center gap-0.5 pt-7">
            <Button
              size="icon-sm" variant="ghost"
              disabled={screenIndex === 0}
              onClick={onMoveUp}
              aria-label={t("waf.builder.screen.moveUp")}
            >
              <Icon icon={ChevronUp} size={14} aria-hidden="true" />
            </Button>
            <Button
              size="icon-sm" variant="ghost"
              disabled={screenIndex === totalScreens - 1}
              onClick={onMoveDown}
              aria-label={t("waf.builder.screen.moveDown")}
            >
              <Icon icon={ChevronDown} size={14} aria-hidden="true" />
            </Button>
            <Button
              size="icon-sm" variant="ghost"
              disabled={totalScreens <= 1}
              onClick={onDelete}
              aria-label={t("waf.builder.screen.delete")}
              className="text-danger-text hover:bg-danger-surface"
            >
              <Icon icon={Trash2} size={14} aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>

      {/* Blocks */}
      <div className="flex flex-col gap-3">
        {screen.blocks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border-default p-6 flex flex-col items-center text-center gap-2">
            <div className="text-heading-sm text-fg-default">{t("waf.builder.canvas.empty.title")}</div>
            <div className="text-body-sm text-fg-muted">{t("waf.builder.canvas.empty.body")}</div>
          </div>
        ) : (
          screen.blocks.map((b, idx) => (
            <BlockEditor
              key={b.id}
              block={b}
              index={idx}
              total={screen.blocks.length}
              onChange={(next) => onUpdateBlock(idx, next)}
              onMoveUp={() => onMoveBlock(idx, -1)}
              onMoveDown={() => onMoveBlock(idx, 1)}
              onDuplicate={() => onDuplicateBlock(idx)}
              onDelete={() => onDeleteBlock(idx)}
            />
          ))
        )}

        {!readOnly ? <BlockPalette onPick={onAddBlock} /> : null}
      </div>
    </div>
  );
}

/* ─────── Block palette (Popover with grouped cards) ───────────────────── */

function BlockPalette({ onPick }: { onPick: (kind: BlockKind) => void }) {
  const { t } = useLocale();
  const container = usePortalContainer();
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="self-start">
          <Icon icon={Plus} size={14} aria-hidden="true" />
          {t("waf.builder.canvas.addBlock")}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        container={container}
        className="w-[340px] max-h-[480px] overflow-y-auto p-3"
      >
        <div className="text-label-xs uppercase tracking-wide text-fg-muted mb-2">
          {t("waf.builder.palette.title")}
        </div>
        <div className="flex flex-col gap-3">
          {PALETTE_GROUPS.map((group) => (
            <div key={group.groupKey} className="flex flex-col gap-1.5">
              <div className="text-label-xs text-fg-muted">{t(group.groupKey as StringKey)}</div>
              <div className="grid grid-cols-2 gap-1.5">
                {group.kinds.map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => { onPick(kind); setOpen(false); }}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-border-default hover:bg-state-hover transition-colors duration-fast text-start"
                  >
                    <Icon icon={KIND_ICON[kind]} size={14} className="text-fg-muted shrink-0" aria-hidden="true" />
                    <span className="text-body-sm text-fg-default truncate">
                      {t(`waf.builder.kind.${kind}` as StringKey)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* Re-export pre-imported icons used in JSX to dodge tree-shake warnings. */
void [Check, Badge];
