import * as React from "react";
import { Plus, Trash2, Users } from "lucide-react";
import {
  Badge,
  Button,
  FormField,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  toast,
} from "@azeer/ui";
import {
  type Contact,
  MOCK_CONTACTS,
  type Segment,
  type SegmentType,
} from "./data";
import { useLocale } from "../i18n";
import type { StringKey } from "../i18n/strings";

/* ─────── Condition model ──────────────────────────────────────────────── */

type ConditionField =
  | "status"
  | "tags"
  | "country"
  | "last_interacted"
  | "has_email"
  | "assignee";

export interface SegmentCondition {
  id: string;
  field: ConditionField;
  operator: string;
  value: string;
}

interface FieldDef {
  labelKey: StringKey;
  operators: ReadonlyArray<{ value: string; labelKey: StringKey }>;
  /** When set, value is picked from a Select; when omitted, value is the operator itself. */
  valueOptions?: ReadonlyArray<{ value: string; labelKey?: StringKey; label?: string }>;
  /** Operators where the value is implicit (no value picker). */
  valuelessOperators?: ReadonlySet<string>;
}

const FIELD_DEFS: Record<ConditionField, FieldDef> = {
  status: {
    labelKey: "field.status",
    operators: [
      { value: "equals",     labelKey: "op.equals" },
      { value: "not_equals", labelKey: "op.notEquals" },
    ],
    valueOptions: [
      { value: "active",   labelKey: "status.active" },
      { value: "archived", labelKey: "status.archived" },
      { value: "blocked",  labelKey: "status.blocked" },
    ],
  },
  tags: {
    labelKey: "field.tags",
    operators: [
      { value: "contains",     labelKey: "op.contains" },
      { value: "not_contains", labelKey: "op.notContains" },
    ],
    // Tag labels stay as the raw tag string (data, not UI copy).
    valueOptions: [
      { value: "vip",        label: "vip" },
      { value: "engaged",    label: "engaged" },
      { value: "gmail",      label: "gmail" },
      { value: "new-lead",   label: "new-lead" },
      { value: "trial",      label: "trial" },
      { value: "inactive",   label: "inactive" },
      { value: "enterprise", label: "enterprise" },
      { value: "support",    label: "support" },
    ],
  },
  country: {
    labelKey: "field.country",
    operators: [
      { value: "equals",     labelKey: "op.equals" },
      { value: "not_equals", labelKey: "op.notEquals" },
    ],
    // Country names rendered untranslated for v1 — would route through Intl.DisplayNames in v1.1.
    valueOptions: [
      { value: "SA", label: "Saudi Arabia" },
      { value: "AE", label: "United Arab Emirates" },
      { value: "EG", label: "Egypt" },
      { value: "US", label: "United States" },
      { value: "GB", label: "United Kingdom" },
      { value: "FR", label: "France" },
    ],
  },
  last_interacted: {
    labelKey: "field.lastInteracted",
    operators: [{ value: "within", labelKey: "op.within" }],
    valueOptions: [
      { value: "24h", labelKey: "win.24h" },
      { value: "7d",  labelKey: "win.7d" },
      { value: "30d", labelKey: "win.30d" },
      { value: "90d", labelKey: "win.90d" },
      { value: "1y",  labelKey: "win.1y" },
    ],
  },
  has_email: {
    labelKey: "field.hasEmail",
    operators: [
      { value: "is_set",     labelKey: "op.isSet" },
      { value: "is_not_set", labelKey: "op.isNotSet" },
    ],
    valuelessOperators: new Set(["is_set", "is_not_set"]),
  },
  assignee: {
    labelKey: "field.assignee",
    operators: [
      { value: "equals",         labelKey: "op.equals" },
      { value: "is_unassigned",  labelKey: "op.isUnassigned" },
    ],
    valueOptions: [
      { value: "u-lina", label: "Lina Yousef" },
      { value: "u-sara", label: "Sara Khan" },
      { value: "u-omar", label: "Omar Said" },
      { value: "u-maya", label: "Maya Adel" },
    ],
    valuelessOperators: new Set(["is_unassigned"]),
  },
};

const WINDOW_MS: Record<string, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
  "1y": 365 * 24 * 60 * 60 * 1000,
};

/* ─────── Predicate engine ─────────────────────────────────────────────── */

function evaluateCondition(c: Contact, cond: SegmentCondition): boolean {
  switch (cond.field) {
    case "status":
      return cond.operator === "equals" ? c.status === cond.value : c.status !== cond.value;
    case "tags": {
      const has = c.tags.some((t) => t.label === cond.value);
      return cond.operator === "contains" ? has : !has;
    }
    case "country":
      return cond.operator === "equals" ? c.country === cond.value : c.country !== cond.value;
    case "last_interacted": {
      if (!c.lastInteractedAt) return false;
      const win = WINDOW_MS[cond.value];
      if (win == null) return false;
      return Date.now() - c.lastInteractedAt.getTime() <= win;
    }
    case "has_email":
      return cond.operator === "is_set" ? !!c.email : !c.email;
    case "assignee":
      if (cond.operator === "is_unassigned") return !c.assignee;
      return c.assignee?.id === cond.value;
  }
}

export function buildSegmentPredicate(conditions: SegmentCondition[]): (c: Contact) => boolean {
  if (conditions.length === 0) return () => false;
  return (c) => conditions.every((cond) => evaluateCondition(c, cond));
}

function newCondition(): SegmentCondition {
  return { id: Math.random().toString(36).slice(2, 9), field: "status", operator: "equals", value: "active" };
}

/* ─────── Component ────────────────────────────────────────────────────── */

interface SegmentRuleBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pre-existing segments — used for name-uniqueness validation (CDP §14.1 — case-insensitive within a business). */
  existing: Segment[];
  /** Called when the user saves a valid segment. Parent handles persistence. */
  onSave: (segment: Segment) => void;
}

export function SegmentRuleBuilder({ open, onOpenChange, existing, onSave }: SegmentRuleBuilderProps) {
  const { t } = useLocale();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState<SegmentType>("custom");
  const [conditions, setConditions] = React.useState<SegmentCondition[]>([newCondition()]);
  const [touched, setTouched] = React.useState(false);

  const reset = () => {
    setName("");
    setType("custom");
    setConditions([newCondition()]);
    setTouched(false);
  };

  const trimmedName = name.trim();
  const nameError =
    touched && !trimmedName
      ? t("form.required")
      : touched && existing.some((s) => s.name.toLowerCase() === trimmedName.toLowerCase())
        ? t("builder.error.dup")
        : undefined;
  const conditionsError = touched && conditions.length === 0 ? t("builder.error.condReq") : undefined;

  const matchCount = React.useMemo(() => {
    if (conditions.length === 0) return 0;
    const predicate = buildSegmentPredicate(conditions);
    return MOCK_CONTACTS.filter(predicate).length;
  }, [conditions]);

  const handleFieldChange = (id: string, nextField: ConditionField) => {
    setConditions((cs) =>
      cs.map((c) => {
        if (c.id !== id) return c;
        const def = FIELD_DEFS[nextField];
        const op = def.operators[0].value;
        const valueless = def.valuelessOperators?.has(op);
        const val = valueless ? "" : def.valueOptions?.[0]?.value ?? "";
        return { ...c, field: nextField, operator: op, value: val };
      }),
    );
  };

  const handleOperatorChange = (id: string, nextOp: string) => {
    setConditions((cs) =>
      cs.map((c) => {
        if (c.id !== id) return c;
        const def = FIELD_DEFS[c.field];
        const valueless = def.valuelessOperators?.has(nextOp);
        const val = valueless ? "" : c.value || def.valueOptions?.[0]?.value || "";
        return { ...c, operator: nextOp, value: val };
      }),
    );
  };

  const handleValueChange = (id: string, nextVal: string) => {
    setConditions((cs) => cs.map((c) => (c.id === id ? { ...c, value: nextVal } : c)));
  };

  const addCondition = () => {
    if (conditions.length >= 5) {
      toast.error(t("builder.cap.title"), { description: t("builder.cap.body") });
      return;
    }
    setConditions((cs) => [...cs, newCondition()]);
  };

  const removeCondition = (id: string) => {
    setConditions((cs) => cs.filter((c) => c.id !== id));
  };

  const save = () => {
    setTouched(true);
    if (!trimmedName) return;
    if (existing.some((s) => s.name.toLowerCase() === trimmedName.toLowerCase())) return;
    if (conditions.length === 0) return;

    const segment: Segment = {
      id: `seg-${Math.random().toString(36).slice(2, 9)}`,
      name: trimmedName,
      type,
      contactCount: matchCount,
      createdBy: { id: "u-sara", name: "Sara Khan" },
      createdAt: new Date(),
      matches: buildSegmentPredicate(conditions),
    };
    onSave(segment);
    toast.success(t("toast.segment.created"), { description: trimmedName });
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <SheetContent side="end">
        <SheetHeader>
          <SheetTitle>{t("builder.title")}</SheetTitle>
          <SheetDescription>
            {t("builder.body")}{" "}
            <span className="text-fg-default font-medium">{t("builder.body.all")}</span>{" "}
            {t("builder.body.conditions")}
          </SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="flex flex-col gap-4">
            <FormField label={t("builder.name")} required error={nameError}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </FormField>

            <FormField label={t("builder.type")} helper={t("builder.type.help")}>
              <Select value={type} onValueChange={(v) => setType(v as SegmentType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">{t("segments.type.marketing")}</SelectItem>
                  <SelectItem value="lifecycle">{t("segments.type.lifecycle")}</SelectItem>
                  <SelectItem value="custom">{t("segments.type.custom")}</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-label-sm text-fg-default font-medium">{t("builder.conditions")}</span>
                <span className="text-body-xs text-fg-muted tabular-nums">
                  {t("builder.count", { cur: conditions.length, max: 5 })}
                </span>
              </div>

              <div className="flex flex-col gap-2 p-3 rounded-lg border border-border-default bg-surface-sunken">
                {conditions.length === 0 ? (
                  <p className="text-body-sm text-fg-muted text-center py-2">
                    {t("builder.empty")}
                  </p>
                ) : (
                  conditions.map((cond, i) => {
                    const def = FIELD_DEFS[cond.field];
                    const valueless = def.valuelessOperators?.has(cond.operator);
                    return (
                      <div key={cond.id} className="flex items-center gap-2">
                        {i === 0 ? (
                          <Badge variant="neutral" size="sm" className="shrink-0">{t("builder.where")}</Badge>
                        ) : (
                          <Badge variant="accent" size="sm" className="shrink-0">{t("builder.and")}</Badge>
                        )}

                        <Select
                          value={cond.field}
                          onValueChange={(v) => handleFieldChange(cond.id, v as ConditionField)}
                        >
                          <SelectTrigger size="sm" className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(FIELD_DEFS) as ConditionField[]).map((f) => (
                              <SelectItem key={f} value={f}>
                                {t(FIELD_DEFS[f].labelKey)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={cond.operator}
                          onValueChange={(v) => handleOperatorChange(cond.id, v)}
                        >
                          <SelectTrigger size="sm" className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {def.operators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {t(op.labelKey)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {valueless ? (
                          <span className="flex-1 text-body-sm text-fg-subtle px-2">—</span>
                        ) : def.valueOptions ? (
                          <Select
                            value={cond.value}
                            onValueChange={(v) => handleValueChange(cond.id, v)}
                          >
                            <SelectTrigger size="sm" className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {def.valueOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.labelKey ? t(opt.labelKey) : opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            size="sm"
                            value={cond.value}
                            onChange={(e) => handleValueChange(cond.id, e.target.value)}
                            className="flex-1"
                          />
                        )}

                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeCondition(cond.id)}
                          aria-label={t("segments.action.delete")}
                        >
                          <Icon icon={Trash2} size={14} aria-hidden="true" />
                        </Button>
                      </div>
                    );
                  })
                )}

                <div className="flex items-center justify-between pt-1">
                  <Button variant="secondary" size="sm" onClick={addCondition}>
                    <Icon icon={Plus} size={14} aria-hidden="true" />
                    {t("builder.add")}
                  </Button>
                  {conditionsError ? (
                    <span className="text-body-xs text-danger-text">{conditionsError}</span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent-bg-subtle border border-accent-border">
              <Icon icon={Users} size={14} className="text-accent-text" aria-hidden="true" />
              <span className="text-body-sm text-accent-text">
                {t(matchCount === 1 ? "builder.preview.one" : "builder.preview", {
                  n: matchCount.toLocaleString(),
                })}
              </span>
            </div>
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button size="sm" onClick={save}>
            {t("builder.save")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
