import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Link as LinkIcon,
  ListChecks,
  ListOrdered,
  MousePointerClick,
  ShieldCheck,
  Square,
  TextCursorInput,
  Trash2,
  Type,
  Calendar as CalendarIcon,
  AlignLeft,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  FormField,
  Icon,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@azeer/ui";
import { useLocale } from "../../i18n";
import type { StringKey } from "../../i18n/strings";
import {
  fieldNameFromLabel,
  type Block,
  type BlockKind,
  type ChoiceBlock,
  type ChoiceOption,
} from "./types";
import { usePortalContainer } from "./PortalContext";

export const KIND_ICON: Record<BlockKind, typeof Type> = {
  heading:        Heading1,
  subheading:     Heading2,
  body:           Type,
  caption:        AlignLeft,
  "text-input":   TextCursorInput,
  "text-area":    AlignLeft,
  dropdown:       ListOrdered,
  radio:          Square,
  checkbox:       ListChecks,
  "date-picker":  CalendarIcon,
  "opt-in":       ShieldCheck,
  image:          ImageIcon,
  "embedded-link":LinkIcon,
  button:         MousePointerClick,
};

interface BlockEditorProps {
  block: Block;
  index: number;
  total: number;
  onChange: (next: Block) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

/**
 * BlockEditor — one card per content block on the canvas.
 *
 * Renders a per-kind inline form. Mutations are local to the block (parent
 * stores screens via index — we patch via `onChange`). Field name auto-derives
 * from the label until the user manually edits the name field — matches the
 * implementation default from [[WhatsApp Flow Manager — Product Gaps]] §3
 * (Field name generation row).
 */
export function BlockEditor({
  block, index, total, onChange, onMoveUp, onMoveDown, onDuplicate, onDelete,
}: BlockEditorProps) {
  const { t } = useLocale();
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Card padding="default" className="border-border-default">
      <CardBody className="gap-3">
        {/* Top toolbar: kind badge + reorder/duplicate/delete */}
        <div className="flex items-center justify-between gap-2">
          <Badge size="sm" variant="outline" className="gap-1">
            <Icon icon={KIND_ICON[block.kind]} size={12} aria-hidden="true" />
            {t(`waf.builder.kind.${block.kind}` as StringKey)}
          </Badge>
          <div className="flex items-center gap-0.5">
            <Button
              size="icon-sm" variant="ghost"
              disabled={isFirst}
              onClick={onMoveUp}
              aria-label={t("waf.builder.block.moveUp")}
            >
              <Icon icon={ChevronUp} size={14} aria-hidden="true" />
            </Button>
            <Button
              size="icon-sm" variant="ghost"
              disabled={isLast}
              onClick={onMoveDown}
              aria-label={t("waf.builder.block.moveDown")}
            >
              <Icon icon={ChevronDown} size={14} aria-hidden="true" />
            </Button>
            <Button
              size="icon-sm" variant="ghost"
              onClick={onDuplicate}
              aria-label={t("waf.builder.block.duplicate")}
            >
              <Icon icon={Copy} size={14} aria-hidden="true" />
            </Button>
            <Button
              size="icon-sm" variant="ghost"
              onClick={onDelete}
              aria-label={t("waf.builder.block.delete")}
              className="text-danger-text hover:bg-danger-surface"
            >
              <Icon icon={Trash2} size={14} aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Kind-specific inline form */}
        <BlockFields block={block} onChange={onChange} />
      </CardBody>
    </Card>
  );
}

/* ─────── Kind-specific fields ─────────────────────────────────────────── */

function BlockFields({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  switch (block.kind) {
    case "heading":
    case "subheading":
    case "body":
    case "caption":
      return <TextFields block={block} onChange={onChange} />;

    case "text-input":
    case "text-area":
      return <TextInputFields block={block} onChange={onChange} />;

    case "dropdown":
    case "radio":
    case "checkbox":
      return <ChoiceFields block={block} onChange={onChange} />;

    case "date-picker":
    case "opt-in":
      return <SimpleLabeledFields block={block} onChange={onChange} />;

    case "image":
      return <ImageFields block={block} onChange={onChange} />;

    case "embedded-link":
      return <LinkFields block={block} onChange={onChange} />;

    case "button":
      return <ButtonFields block={block} onChange={onChange} />;
  }
}

function TextFields({
  block,
  onChange,
}: {
  block: Extract<Block, { kind: "heading" | "subheading" | "body" | "caption" }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  return (
    <FormField label={t("waf.builder.block.text.label")}>
      {block.kind === "body" || block.kind === "caption" ? (
        <Textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          rows={2}
        />
      ) : (
        <Input
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Enter text"
        />
      )}
    </FormField>
  );
}

function TextInputFields({
  block,
  onChange,
}: {
  block: Extract<Block, { kind: "text-input" | "text-area" }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  const [nameTouched, setNameTouched] = React.useState(false);
  const updateLabel = (v: string) => {
    onChange({
      ...block,
      label: v,
      name: nameTouched ? block.name : fieldNameFromLabel(v),
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <FormField label={t("waf.builder.block.label.label")}>
        <Input value={block.label} onChange={(e) => updateLabel(e.target.value)} />
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField label={t("waf.builder.block.name.label")} helper={t("waf.builder.block.name.helper")}>
          <Input
            value={block.name}
            onChange={(e) => { setNameTouched(true); onChange({ ...block, name: e.target.value }); }}
            dir="ltr"
            className="font-mono text-body-sm"
          />
        </FormField>
        <FormField label={t("waf.builder.block.placeholder.label")}>
          <Input
            value={block.placeholder ?? ""}
            onChange={(e) => onChange({ ...block, placeholder: e.target.value })}
          />
        </FormField>
      </div>
      <RequiredToggle block={block} onChange={onChange} />
    </div>
  );
}

function ChoiceFields({
  block,
  onChange,
}: {
  block: ChoiceBlock;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  const [nameTouched, setNameTouched] = React.useState(false);

  const updateOption = (idx: number, patch: Partial<ChoiceOption>) => {
    const next = block.options.map((o, i) => (i === idx ? { ...o, ...patch } : o));
    onChange({ ...block, options: next });
  };
  const addOption = () => {
    const n = block.options.length + 1;
    onChange({
      ...block,
      options: [...block.options, { id: `opt_${Date.now().toString(36)}${n}`, label: `Option ${n}`, value: `option_${n}` }],
    });
  };
  const removeOption = (idx: number) => {
    onChange({ ...block, options: block.options.filter((_, i) => i !== idx) });
  };

  return (
    <div className="flex flex-col gap-3">
      <FormField label={t("waf.builder.block.label.label")}>
        <Input
          value={block.label}
          onChange={(e) => onChange({
            ...block,
            label: e.target.value,
            name: nameTouched ? block.name : fieldNameFromLabel(e.target.value),
          })}
        />
      </FormField>
      <FormField label={t("waf.builder.block.name.label")} helper={t("waf.builder.block.name.helper")}>
        <Input
          value={block.name}
          onChange={(e) => { setNameTouched(true); onChange({ ...block, name: e.target.value }); }}
          dir="ltr"
          className="font-mono text-body-sm"
        />
      </FormField>

      <div className="flex flex-col gap-2">
        <Label>{t("waf.builder.block.options.heading")}</Label>
        <div className="flex flex-col gap-2">
          {block.options.map((opt, idx) => (
            <div key={opt.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <Input
                value={opt.label}
                onChange={(e) => updateOption(idx, { label: e.target.value })}
                placeholder={t("waf.builder.block.options.label")}
              />
              <Input
                value={opt.value}
                onChange={(e) => updateOption(idx, { value: e.target.value })}
                placeholder={t("waf.builder.block.options.value")}
                dir="ltr"
                className="font-mono text-body-sm"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeOption(idx)}
                disabled={block.options.length <= 1}
                aria-label={t("waf.builder.block.options.remove")}
              >
                <Icon icon={Trash2} size={14} aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={addOption} className="self-start">
          + {t("waf.builder.block.options.add")}
        </Button>
      </div>
      <RequiredToggle block={block} onChange={onChange} />
    </div>
  );
}

function SimpleLabeledFields({
  block,
  onChange,
}: {
  block: Extract<Block, { kind: "date-picker" | "opt-in" }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  const [nameTouched, setNameTouched] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <FormField label={t("waf.builder.block.label.label")}>
        <Input
          value={block.label}
          onChange={(e) => onChange({
            ...block,
            label: e.target.value,
            name: nameTouched ? block.name : fieldNameFromLabel(e.target.value),
          })}
        />
      </FormField>
      <FormField label={t("waf.builder.block.name.label")} helper={t("waf.builder.block.name.helper")}>
        <Input
          value={block.name}
          onChange={(e) => { setNameTouched(true); onChange({ ...block, name: e.target.value }); }}
          dir="ltr"
          className="font-mono text-body-sm"
        />
      </FormField>
      <RequiredToggle block={block} onChange={onChange} />
    </div>
  );
}

function ImageFields({
  block,
  onChange,
}: {
  block: Extract<Block, { kind: "image" }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-3">
      <FormField label={t("waf.builder.block.src.label")}>
        <Input
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
          dir="ltr"
          type="url"
        />
      </FormField>
      <FormField label={t("waf.builder.block.alt.label")}>
        <Input value={block.alt} onChange={(e) => onChange({ ...block, alt: e.target.value })} />
      </FormField>
    </div>
  );
}

function LinkFields({
  block,
  onChange,
}: {
  block: Extract<Block, { kind: "embedded-link" }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-3">
      <FormField label={t("waf.builder.block.label.label")}>
        <Input value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
      </FormField>
      <FormField label={t("waf.builder.block.url.label")}>
        <Input
          value={block.url}
          onChange={(e) => onChange({ ...block, url: e.target.value })}
          type="url"
          dir="ltr"
        />
      </FormField>
    </div>
  );
}

function ButtonFields({
  block,
  onChange,
}: {
  block: Extract<Block, { kind: "button" }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  const container = usePortalContainer();
  return (
    <div className="flex flex-col gap-3">
      <FormField label={t("waf.builder.block.label.label")}>
        <Input value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
      </FormField>
      <FormField label={t("waf.builder.block.action.label")}>
        <Select
          value={block.action}
          onValueChange={(v) => onChange({ ...block, action: v as "next" | "submit" })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent container={container}>
            <SelectItem value="next">{t("waf.builder.block.action.next")}</SelectItem>
            <SelectItem value="submit">{t("waf.builder.block.action.submit")}</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  );
}

function RequiredToggle({
  block,
  onChange,
}: {
  block: Extract<Block, { required?: boolean }>;
  onChange: (b: Block) => void;
}) {
  const { t } = useLocale();
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="text-label-md text-fg-default">{t("waf.builder.block.required")}</span>
      <Switch
        checked={!!block.required}
        onCheckedChange={(v) => onChange({ ...block, required: v } as Block)}
        aria-label={t("waf.builder.block.required")}
      />
    </label>
  );
}
