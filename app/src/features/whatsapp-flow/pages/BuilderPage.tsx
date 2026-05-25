import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Smartphone,
  Copy,
  ChevronLeft,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';
import { Content, ModuleHeader, PageBody } from '@/components/app-shell/Content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useFlowQuery, usePatchFlow } from '../api';
import type { Flow, FlowBlock, FlowBlockType, FlowScreen } from '../types';
import { ALL_BLOCKS, makeBlock } from '../components/builder/blockCatalog';
import { BlockPreview } from '../components/builder/BlockPreview';
import { BlockEditor } from '../components/builder/BlockEditor';
import { cn } from '@/lib/utils';

export function BuilderPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useFlowQuery(id);
  const patch = usePatchFlow();

  // Local working copy of screens (so undo and dirty-tracking work cleanly).
  const [draft, setDraft] = React.useState<Flow | null>(null);
  const [activeScreenId, setActiveScreenId] = React.useState<string | null>(null);
  const [unsavedOpen, setUnsavedOpen] = React.useState(false);
  const [pendingExitTo, setPendingExitTo] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (query.data && !draft) {
      setDraft(query.data);
      setActiveScreenId(query.data.screens[0]?.id ?? null);
    }
  }, [query.data, draft]);

  const dirty =
    draft && query.data
      ? JSON.stringify(draft.screens) !== JSON.stringify(query.data.screens)
      : false;

  // Block window beforeunload when dirty
  React.useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  if (query.isLoading || !draft) {
    return (
      <Content>
        <div className="flex h-full items-center justify-center text-[var(--color-fg-muted)]">
          {t('common.loading')}
        </div>
      </Content>
    );
  }

  if (query.isError) {
    return (
      <Content>
        <div className="flex h-full items-center justify-center text-[var(--color-danger-text)]">
          {(query.error as Error).message}
        </div>
      </Content>
    );
  }

  const activeScreen = draft.screens.find((s) => s.id === activeScreenId) ?? draft.screens[0];

  // Mutate helpers
  const updateScreens = (next: FlowScreen[]) => setDraft({ ...draft, screens: next });
  const updateActiveScreen = (mut: (s: FlowScreen) => FlowScreen) =>
    updateScreens(draft.screens.map((s) => (s.id === activeScreen.id ? mut(s) : s)));

  const addScreen = () => {
    const id = `screen_${draft.screens.length + 1}`;
    updateScreens([...draft.screens, { id, title: `Screen ${draft.screens.length + 1}`, blocks: [] }]);
    setActiveScreenId(id);
  };

  const removeScreen = (sid: string) => {
    if (draft.screens.length === 1) return;
    const remaining = draft.screens.filter((s) => s.id !== sid);
    updateScreens(remaining);
    if (activeScreenId === sid) setActiveScreenId(remaining[0].id);
  };

  const renameScreen = (sid: string, title: string) =>
    updateScreens(draft.screens.map((s) => (s.id === sid ? { ...s, title } : s)));

  const addBlock = (type: FlowBlockType) =>
    updateActiveScreen((s) => ({ ...s, blocks: [...s.blocks, makeBlock(type)] }));

  const updateBlock = (next: FlowBlock) =>
    updateActiveScreen((s) => ({
      ...s,
      blocks: s.blocks.map((b) => (b.id === next.id ? next : b)),
    }));

  const removeBlock = (bid: string) =>
    updateActiveScreen((s) => ({ ...s, blocks: s.blocks.filter((b) => b.id !== bid) }));

  const handleSaveExit = () => {
    patch.mutate(
      { id: draft.id, version: draft.version, body: { screens: draft.screens } },
      {
        onSuccess: () => {
          toast.success('Flow saved');
          navigate('/apps/whatsapp-flow');
        },
        onError: (err: Error) => {
          if ((err as any).status === 412) {
            toast.error(t('flow.errors.concurrentEdit'));
          } else {
            toast.error(err.message);
          }
        },
      },
    );
  };

  const handleCopyJson = () => {
    const meta = {
      version: '5.0',
      screens: draft.screens.map((s) => ({
        id: s.id,
        title: s.title,
        layout: {
          type: 'SingleColumnLayout',
          children: s.blocks.map((b) => ({ type: b.type, ...b.props })),
        },
      })),
    };
    navigator.clipboard.writeText(JSON.stringify(meta, null, 2));
    toast.success(t('flow.builder.copiedJson'));
  };

  const tryExit = () => {
    if (dirty) {
      setPendingExitTo('/apps/whatsapp-flow');
      setUnsavedOpen(true);
    } else {
      navigate('/apps/whatsapp-flow');
    }
  };

  return (
    <Content>
      <ModuleHeader
        breadcrumb={
          <button
            onClick={tryExit}
            className="inline-flex items-center gap-1 hover:text-[var(--color-fg-default)]"
          >
            <ChevronLeft className="size-3 rtl:hidden" strokeWidth={1.5} />
            {t('flow.title')}
          </button>
        }
        title={t('flow.builder.title', { name: draft.name })}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={handleCopyJson}>
              <Copy className="size-4" strokeWidth={1.5} />
              {t('flow.builder.copyJson')}
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveExit} disabled={patch.isPending}>
              <Save className="size-4" strokeWidth={1.5} />
              {t('flow.builder.saveExit')}
            </Button>
          </>
        }
      />

      <PageBody>
        <div
          className="grid h-full"
          style={{ gridTemplateColumns: '220px minmax(0, 1fr) 360px' }}
        >
          {/* ── Screens panel ── */}
          <aside className="flex flex-col border-e border-[var(--color-border-default)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border-default)] px-4 py-3">
              <span className="text-label-xs text-[var(--color-fg-muted)]">
                {t('flow.builder.screensPanel')}
              </span>
              <Button variant="ghost" size="icon" onClick={addScreen} aria-label={t('flow.builder.addScreen')}>
                <Plus className="size-4" strokeWidth={1.5} />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <ul className="flex flex-col gap-1 p-2">
                {draft.screens.map((s, i) => {
                  const active = s.id === activeScreen.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setActiveScreenId(s.id)}
                        className={cn(
                          'group relative flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-start',
                          active
                            ? 'bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-text)]'
                            : 'text-[var(--color-fg-default)] hover:bg-[var(--color-state-hover)]',
                        )}
                      >
                        <span className="flex size-5 items-center justify-center rounded-[4px] bg-[var(--color-bg-surface-sunken)] text-[10px] font-semibold tabular-nums text-[var(--color-fg-muted)]">
                          {i + 1}
                        </span>
                        <span className="flex-1 truncate text-[13px]">{s.title}</span>
                        {draft.screens.length > 1 && (
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeScreen(s.id);
                            }}
                            className="hidden size-5 items-center justify-center rounded-sm text-[var(--color-fg-muted)] hover:text-[var(--color-danger-text)] group-hover:flex"
                          >
                            <Trash2 className="size-3.5" strokeWidth={1.5} />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          </aside>

          {/* ── Editor (middle) ── */}
          <section className="flex flex-col bg-[var(--color-bg-surface-sunken)]">
            <div className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-5 py-3">
              <Input
                value={activeScreen.title}
                onChange={(e) => renameScreen(activeScreen.id, e.target.value)}
                className="h-9 max-w-md"
                dir="auto"
              />
            </div>

            <ScrollArea className="flex-1">
              <div className="grid gap-3 p-5">
                {activeScreen.blocks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-default)] bg-[var(--color-bg-surface)] py-12 text-center">
                    <p className="text-body-sm text-[var(--color-fg-muted)]">
                      No content yet. Add a block from the catalog below.
                    </p>
                  </div>
                ) : (
                  activeScreen.blocks.map((b, i) => (
                    <BlockEditor
                      key={b.id}
                      block={b}
                      index={i}
                      onChange={updateBlock}
                      onRemove={() => removeBlock(b.id)}
                    />
                  ))
                )}

                {/* Block catalog */}
                <div className="mt-3 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
                  <div className="mb-2.5 text-label-xs text-[var(--color-fg-muted)]">
                    {t('flow.builder.blocksPanel')}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    {ALL_BLOCKS.map((type) => (
                      <button
                        key={type}
                        onClick={() => addBlock(type)}
                        className="flex h-9 items-center justify-start gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-start text-[13px] text-[var(--color-fg-default)] hover:bg-[var(--color-accent-bg-subtle)] hover:text-[var(--color-accent-text)]"
                      >
                        <Plus className="size-3.5 text-[var(--color-fg-subtle)]" strokeWidth={1.5} />
                        {t(`flow.builder.blocks.${type}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </section>

          {/* ── Live preview (right) ── */}
          <aside className="flex flex-col border-s border-[var(--color-border-default)] bg-[var(--color-bg-surface-sunken)]">
            <div className="flex items-center gap-2 border-b border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3">
              <Smartphone className="size-4 text-[var(--color-fg-muted)]" strokeWidth={1.5} />
              <span className="text-label-xs text-[var(--color-fg-muted)]">
                {t('flow.builder.previewPanel')}
              </span>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex justify-center p-5">
                <DevicePreview screen={activeScreen} />
              </div>
            </ScrollArea>
          </aside>
        </div>
      </PageBody>

      {/* Unsaved-changes dialog */}
      <Dialog
        open={unsavedOpen}
        onOpenChange={(o) => {
          setUnsavedOpen(o);
          if (!o) setPendingExitTo(null);
        }}
      >
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>{t('flow.builder.unsaved.title')}</DialogTitle>
            <DialogDescription>{t('flow.builder.unsaved.description')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setUnsavedOpen(false)}>
              {t('flow.builder.unsaved.keep')}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setUnsavedOpen(false);
                if (pendingExitTo) navigate(pendingExitTo);
              }}
            >
              {t('flow.builder.unsaved.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Content>
  );
}

/** A WhatsApp-ish phone shell wrapping the screen preview. */
function DevicePreview({ screen }: { screen: FlowScreen }) {
  return (
    <div className="w-[300px] overflow-hidden rounded-[28px] border border-[#1d1d1f] bg-[#1d1d1f] p-1.5 shadow-xl">
      <div className="overflow-hidden rounded-[22px] bg-[#ece5dd]">
        {/* WhatsApp form sheet header */}
        <div className="flex items-center justify-between bg-white px-4 py-3 text-[13px] text-[#1d1d1f]">
          <span className="font-semibold">{screen.title}</span>
          <span className="text-[#717171]">×</span>
        </div>
        <div className="flex flex-col gap-3 bg-white p-4 min-h-[420px]">
          {screen.blocks.length === 0 ? (
            <p className="text-[12px] text-[#a1a1a1]">
              Add blocks to see the live preview.
            </p>
          ) : (
            screen.blocks.map((b) => <BlockPreview key={b.id} block={b} />)
          )}
        </div>
      </div>
    </div>
  );
}
