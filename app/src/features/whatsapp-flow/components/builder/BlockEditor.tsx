import { useTranslation } from 'react-i18next';
import { Trash2, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import type { FlowBlock } from '../../types';

interface BlockEditorProps {
  block: FlowBlock;
  index: number;
  onChange: (next: FlowBlock) => void;
  onRemove: () => void;
}

/**
 * BlockEditor — exposes the editable props for one block. Updates flow upward
 * synchronously so the right-panel preview stays in sync per brief §7 row.
 */
export function BlockEditor({ block, index, onChange, onRemove }: BlockEditorProps) {
  const { t } = useTranslation();
  const p = block.props as any;
  const set = (patch: Record<string, unknown>) => onChange({ ...block, props: { ...p, ...patch } });

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <GripVertical className="size-3.5 text-[var(--color-fg-subtle)]" strokeWidth={1.5} />
          <span className="text-label-xs text-[var(--color-fg-muted)]">
            #{index + 1} · {t(`flow.builder.blocks.${block.type}`)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          aria-label="Remove block"
          className="text-[var(--color-fg-muted)]"
        >
          <Trash2 className="size-3.5" strokeWidth={1.5} />
        </Button>
      </div>

      <div className="grid gap-2.5">
        {('text' in p) && (
          <div className="grid gap-1">
            <Label>Text</Label>
            <Input value={p.text ?? ''} onChange={(e) => set({ text: e.target.value })} dir="auto" />
          </div>
        )}
        {('label' in p) && (
          <div className="grid gap-1">
            <Label>Label</Label>
            <Input value={p.label ?? ''} onChange={(e) => set({ label: e.target.value })} dir="auto" />
          </div>
        )}
        {('placeholder' in p) && (
          <div className="grid gap-1">
            <Label>Placeholder</Label>
            <Input value={p.placeholder ?? ''} onChange={(e) => set({ placeholder: e.target.value })} dir="auto" />
          </div>
        )}
        {('options' in p) && (
          <div className="grid gap-1">
            <Label>Options (one per line)</Label>
            <Textarea
              value={(p.options ?? []).join('\n')}
              onChange={(e) =>
                set({
                  options: e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              dir="auto"
              rows={3}
            />
          </div>
        )}
        {('url' in p) && (
          <div className="grid gap-1">
            <Label>URL</Label>
            <Input value={p.url ?? ''} onChange={(e) => set({ url: e.target.value })} type="url" dir="ltr" />
          </div>
        )}
        {('required' in p) && (
          <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--color-bg-surface-sunken)] px-2.5 py-1.5">
            <Label className="cursor-pointer">Required</Label>
            <Switch checked={!!p.required} onCheckedChange={(v) => set({ required: v })} />
          </div>
        )}
      </div>
    </div>
  );
}
