import * as React from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check as CheckIcon,
  CircleAlert,
  CircleCheck,
  Import as ImportIcon,
} from "lucide-react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  EmptyState,
  FileInput,
  FormField,
  Icon,
  ModuleHeader,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@azeer/ui";
import { useLocale } from "../i18n";
import type { StringKey } from "../i18n/strings";

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB per CDP §4.2

interface ImportViewProps {
  onBack: () => void;
}

/* ─────── Mock CSV + targets + auto-mapping ────────────────────────────── */

const MOCK_CSV = {
  columns: ["Phone", "Name", "Email", "Tags", "Country", "Source"] as const,
  totalRows: 5_000,
};

interface TargetField {
  value: string;
  label: string;
  isIdentifier?: boolean;
}

const TARGET_FIELDS: ReadonlyArray<TargetField> = [
  { value: "skip", label: "— Skip (don't import) —" },
  { value: "name", label: "Name" },
  { value: "phone", label: "Phone (E.164)", isIdentifier: true },
  { value: "email", label: "Email", isIdentifier: true },
  { value: "country", label: "Country" },
  { value: "tags", label: "Tags (comma-separated)" },
  { value: "assignee", label: "Assignee" },
  { value: "cf_source", label: "Source (custom field)" },
];

const AUTO_MAP: Record<string, string> = {
  Phone: "phone",
  Name: "name",
  Email: "email",
  Tags: "tags",
  Country: "country",
  Source: "cf_source",
};

type ImportPurpose = "add_only" | "add_update" | "add_all";

const PURPOSE_OPTIONS: ReadonlyArray<{ value: ImportPurpose; labelKey: StringKey; descKey: StringKey }> = [
  { value: "add_only",   labelKey: "import.purpose.addOnly",   descKey: "import.purpose.addOnly.desc" },
  { value: "add_update", labelKey: "import.purpose.addUpdate", descKey: "import.purpose.addUpdate.desc" },
  { value: "add_all",    labelKey: "import.purpose.addAll",    descKey: "import.purpose.addAll.desc" },
];

/* ─────── Mock preview payload (CDP §7 / §14.1) ────────────────────────── */

const MOCK_PREVIEW = {
  total: 5_000,
  valid: 4_830,
  errors: 142,
  warnings: 28,
  sampleErrors: [
    { row: 12,  reason: "Invalid phone format: '12345'" },
    { row: 47,  reason: "Missing identifier (phone + email both empty)" },
    { row: 88,  reason: "Country code 'XX' is not ISO 3166-1 alpha-2" },
    { row: 142, reason: "Tag exceeds 32-char limit" },
    { row: 203, reason: "Email 'not-an-email' fails RFC 5322" },
  ],
  sampleWarnings: [
    { row: 4,   reason: "Name empty — defaulted to phone number" },
    { row: 19,  reason: "Duplicate phone — will update existing record" },
    { row: 56,  reason: "Custom field 'Source' value truncated to 64 chars" },
  ],
};

/* ─────── Wizard ───────────────────────────────────────────────────────── */

type ImportStatus = "idle" | "queued" | "processing" | "completed" | "failed";

export function ImportView({ onBack }: ImportViewProps) {
  const { t } = useLocale();
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  // Step 1: file
  const [file, setFile] = React.useState<File | null>(null);
  const [parsing, setParsing] = React.useState(false);

  // Step 2: mapping + purpose
  const [mapping, setMapping] = React.useState<Record<string, string>>(AUTO_MAP);
  const [purpose, setPurpose] = React.useState<ImportPurpose>("add_update");
  const [identifiers, setIdentifiers] = React.useState<Set<string>>(new Set(["Phone"]));

  // Step 4: processing simulation
  const [status, setStatus] = React.useState<ImportStatus>("idle");
  const [processed, setProcessed] = React.useState(0);

  /* Simulated CSV parse on upload. */
  React.useEffect(() => {
    if (!file) {
      setParsing(false);
      return;
    }
    setParsing(true);
    const id = setTimeout(() => setParsing(false), 800);
    return () => clearTimeout(id);
  }, [file]);

  /* Processing simulation — ticks ~200 rows / 100 ms. */
  React.useEffect(() => {
    if (status !== "processing") return;
    if (processed >= MOCK_PREVIEW.total) {
      setStatus("completed");
      return;
    }
    const id = setTimeout(
      () => setProcessed((p) => Math.min(p + 250, MOCK_PREVIEW.total)),
      80,
    );
    return () => clearTimeout(id);
  }, [status, processed]);

  /* Step navigation guards. */
  const canAdvanceFromStep1 = file !== null && !parsing && file.size <= MAX_SIZE_BYTES;
  const mappedTargets = Object.values(mapping).filter((v) => v !== "skip");
  const hasIdentifierMapped = identifiers.size > 0 && Array.from(identifiers).some((csvCol) => {
    const target = mapping[csvCol];
    const tf = TARGET_FIELDS.find((t) => t.value === target);
    return tf?.isIdentifier;
  });
  const duplicateTargets = mappedTargets.filter((t, i) => mappedTargets.indexOf(t) !== i);
  const canAdvanceFromStep2 =
    mappedTargets.length > 0 &&
    duplicateTargets.length === 0 &&
    (purpose === "add_all" || hasIdentifierMapped);

  const startImport = () => {
    setStatus("queued");
    setTimeout(() => {
      setStatus("processing");
      setProcessed(0);
    }, 500);
  };

  const renderStepBody = () => {
    switch (step) {
      case 1:
        return (
          <Step1Upload
            file={file}
            onFileChange={setFile}
            parsing={parsing}
            totalRows={MOCK_CSV.totalRows}
          />
        );
      case 2:
        return (
          <Step2Mapping
            csvColumns={MOCK_CSV.columns}
            mapping={mapping}
            onMappingChange={(col, val) => setMapping((m) => ({ ...m, [col]: val }))}
            identifiers={identifiers}
            onIdentifierToggle={(col) =>
              setIdentifiers((prev) => {
                const next = new Set(prev);
                next.has(col) ? next.delete(col) : next.add(col);
                return next;
              })
            }
            purpose={purpose}
            onPurposeChange={setPurpose}
            duplicateTargets={duplicateTargets}
            hasIdentifierMapped={hasIdentifierMapped}
          />
        );
      case 3:
        return <Step3Preview mapping={mapping} csvColumns={MOCK_CSV.columns} />;
      case 4:
        return (
          <Step4Confirm
            status={status}
            processed={processed}
            total={MOCK_PREVIEW.total}
          />
        );
    }
  };

  return (
    <>
      <ModuleHeader
        title={t("import.title")}
        meta={t("import.body")}
        leading={
          <Button variant="ghost" size="icon-sm" onClick={onBack} aria-label={t("import.back")}>
            <Icon icon={ArrowLeft} size={14} flipOnRtl aria-hidden="true" />
          </Button>
        }
      />

      <div className="px-5 py-4 border-b border-border-divider bg-surface">
        <Stepper currentStep={step} />
      </div>

      <div className="flex-1 overflow-auto p-5">
        <div className="max-w-3xl mx-auto">{renderStepBody()}</div>
      </div>

      <footer className="px-5 py-3 border-t border-border-divider bg-surface flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (step === 1) onBack();
            else setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
          }}
          disabled={status === "processing"}
        >
          <Icon icon={ArrowLeft} size={14} flipOnRtl aria-hidden="true" />
          {step === 1 ? t("import.btn.cancel") : t("import.btn.back")}
        </Button>

        {step === 1 && (
          <Button size="sm" disabled={!canAdvanceFromStep1} onClick={() => setStep(2)}>
            {t("import.btn.continue")}
            <Icon icon={ArrowRight} size={14} flipOnRtl aria-hidden="true" />
          </Button>
        )}
        {step === 2 && (
          <Button size="sm" disabled={!canAdvanceFromStep2} onClick={() => setStep(3)}>
            {t("import.btn.preview")}
            <Icon icon={ArrowRight} size={14} flipOnRtl aria-hidden="true" />
          </Button>
        )}
        {step === 3 && (
          <Button
            size="sm"
            onClick={() => {
              setStep(4);
              startImport();
            }}
          >
            {t("import.btn.confirm")}
            <Icon icon={ArrowRight} size={14} flipOnRtl aria-hidden="true" />
          </Button>
        )}
        {step === 4 && (
          <Button
            size="sm"
            disabled={status !== "completed"}
            onClick={() => {
              toast.success(t("toast.import.complete"), {
                description: t("toast.import.complete.body", { n: MOCK_PREVIEW.valid.toLocaleString() }),
              });
              onBack();
            }}
          >
            {t("import.btn.done")}
          </Button>
        )}
      </footer>
    </>
  );
}

/* ─────── Stepper ──────────────────────────────────────────────────────── */

const STEP_KEYS: ReadonlyArray<{ id: 1 | 2 | 3 | 4; key: StringKey }> = [
  { id: 1, key: "import.step.upload" },
  { id: 2, key: "import.step.map" },
  { id: 3, key: "import.step.preview" },
  { id: 4, key: "import.step.confirm" },
];

function Stepper({ currentStep }: { currentStep: number }) {
  const { t } = useLocale();
  return (
    <ol className="flex items-center gap-2" aria-label={t("import.title")}>
      {STEP_KEYS.map((s, i) => {
        const isCompleted = s.id < currentStep;
        const isActive = s.id === currentStep;
        return (
          <React.Fragment key={s.id}>
            <li className="flex items-center gap-2" aria-current={isActive ? "step" : undefined}>
              <span
                className={cn(
                  "inline-flex items-center justify-center h-6 w-6 rounded-full",
                  "text-body-xs font-medium tabular-nums",
                  "transition-colors duration-fast ease-standard",
                  isCompleted
                    ? "bg-success-fill text-fg-on-success"
                    : isActive
                      ? "bg-accent-fill text-fg-on-accent"
                      : "bg-surface-sunken border border-border-default text-fg-muted",
                )}
                aria-hidden="true"
              >
                {isCompleted ? <Icon icon={CheckIcon} size={12} /> : s.id}
              </span>
              <span
                className={cn(
                  "text-body-sm",
                  isActive
                    ? "text-fg-default font-medium"
                    : isCompleted
                      ? "text-fg-default"
                      : "text-fg-muted",
                )}
              >
                {t(s.key)}
              </span>
            </li>
            {i < STEP_KEYS.length - 1 ? (
              <div
                className={cn(
                  "flex-1 h-px transition-colors duration-fast ease-standard",
                  isCompleted ? "bg-success-fill" : "bg-border-default",
                )}
                aria-hidden="true"
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

/* ─────── Step 1 — Upload ──────────────────────────────────────────────── */

function Step1Upload({
  file,
  onFileChange,
  parsing,
  totalRows,
}: {
  file: File | null;
  onFileChange: (f: File | null) => void;
  parsing: boolean;
  totalRows: number;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-4">
      <FormField
        label={t("import.file.label")}
        helper={t("import.file.help", { mb: (MAX_SIZE_BYTES / 1024 / 1024).toFixed(0) })}
      >
        <FileInput
          accept=".csv,text/csv"
          value={file}
          onValueChange={onFileChange}
          maxSize={MAX_SIZE_BYTES}
          aria-label={t("import.file.label")}
        />
      </FormField>

      {file && !parsing ? (
        <Alert variant="info" title={file.name}>
          {t("import.parsed.body", {
            rows: totalRows.toLocaleString(),
            size: (file.size / 1024 / 1024).toFixed(2),
          })}
        </Alert>
      ) : null}

      {parsing ? (
        <div className="flex items-center gap-3 p-3 rounded-md border border-border-default bg-surface-sunken">
          <Progress value={null} className="flex-1" />
          <span className="text-body-sm text-fg-muted tabular-nums shrink-0">{t("import.parsing")}</span>
        </div>
      ) : null}
    </div>
  );
}

/* ─────── Step 2 — Map columns ─────────────────────────────────────────── */

function Step2Mapping({
  csvColumns,
  mapping,
  onMappingChange,
  identifiers,
  onIdentifierToggle,
  purpose,
  onPurposeChange,
  duplicateTargets,
  hasIdentifierMapped,
}: {
  csvColumns: ReadonlyArray<string>;
  mapping: Record<string, string>;
  onMappingChange: (col: string, val: string) => void;
  identifiers: Set<string>;
  onIdentifierToggle: (col: string) => void;
  purpose: ImportPurpose;
  onPurposeChange: (p: ImportPurpose) => void;
  duplicateTargets: string[];
  hasIdentifierMapped: boolean;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-4">
      <FormField label={t("import.purpose")}>
        <Select value={purpose} onValueChange={(v) => onPurposeChange(v as ImportPurpose)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PURPOSE_OPTIONS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                <span className="font-medium">{t(p.labelKey)}</span>
                <span className="text-body-xs text-fg-muted ms-2">{t(p.descKey)}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <Card>
        <CardHeader>
          <CardTitle>{t("import.map.title")}</CardTitle>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("import.map.csvColumn")}</TableHead>
                <TableHead>{t("import.map.mapsTo")}</TableHead>
                <TableHead className="text-center">{t("import.map.identifier")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {csvColumns.map((col) => {
                const target = mapping[col] ?? "skip";
                const targetDef = TARGET_FIELDS.find((f) => f.value === target);
                const canBeIdentifier = !!targetDef?.isIdentifier;
                return (
                  <TableRow key={col}>
                    <TableCell className="font-medium">{col}</TableCell>
                    <TableCell>
                      <Select value={target} onValueChange={(v) => onMappingChange(col, v)}>
                        <SelectTrigger size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TARGET_FIELDS.map((f) => (
                            <SelectItem key={f.value} value={f.value}>
                              {f.value === "skip" ? t("import.map.skip") : f.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={canBeIdentifier && identifiers.has(col)}
                        onCheckedChange={() => onIdentifierToggle(col)}
                        disabled={!canBeIdentifier}
                        aria-label={t("import.map.identifier")}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {duplicateTargets.length > 0 ? (
        <Alert variant="destructive" title={t("import.dup.title")}>
          {t("import.dup.body")}
        </Alert>
      ) : null}

      {!hasIdentifierMapped && purpose !== "add_all" ? (
        <Alert variant="warning" title={t("import.noId.title")}>
          {t("import.noId.body", { addAll: t("import.purpose.addAll") })}
        </Alert>
      ) : null}
    </div>
  );
}

/* ─────── Step 3 — Preview ─────────────────────────────────────────────── */

function Step3Preview({
  mapping,
  csvColumns,
}: {
  mapping: Record<string, string>;
  csvColumns: ReadonlyArray<string>;
}) {
  const { t } = useLocale();
  const unmappedColumns = csvColumns.filter((c) => (mapping[c] ?? "skip") === "skip");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard label={t("import.preview.total")}    value={MOCK_PREVIEW.total}    variant="neutral" />
        <SummaryCard label={t("import.preview.valid")}    value={MOCK_PREVIEW.valid}    variant="success" />
        <SummaryCard label={t("import.preview.errors")}   value={MOCK_PREVIEW.errors}   variant="destructive" />
        <SummaryCard label={t("import.preview.warnings")} value={MOCK_PREVIEW.warnings} variant="warning" />
      </div>

      {unmappedColumns.length > 0 ? (
        <Alert variant="warning" title={t("import.preview.unmappedTitle")}>
          {t("import.preview.unmappedBody", { cols: unmappedColumns.join(", ") })}
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>
            <span className="inline-flex items-center gap-2">
              <Icon icon={CircleAlert} size={14} className="text-danger-text" aria-hidden="true" />
              {t("import.preview.firstNErrors", { n: MOCK_PREVIEW.sampleErrors.length })}
              <Badge variant="destructive" size="sm">{MOCK_PREVIEW.errors}</Badge>
            </span>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="flex flex-col gap-1.5">
            {MOCK_PREVIEW.sampleErrors.map((e) => (
              <li key={e.row} className="flex items-baseline gap-2 text-body-sm">
                <span className="text-fg-muted tabular-nums shrink-0">{t("import.row", { n: e.row })}</span>
                <span className="text-fg-subtle">·</span>
                <span className="text-fg-default">{e.reason}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <span className="inline-flex items-center gap-2">
              <Icon icon={AlertTriangle} size={14} className="text-warning-text" aria-hidden="true" />
              {t("import.preview.firstNWarnings", { n: MOCK_PREVIEW.sampleWarnings.length })}
              <Badge variant="warning" size="sm">{MOCK_PREVIEW.warnings}</Badge>
            </span>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="flex flex-col gap-1.5">
            {MOCK_PREVIEW.sampleWarnings.map((w) => (
              <li key={w.row} className="flex items-baseline gap-2 text-body-sm">
                <span className="text-fg-muted tabular-nums shrink-0">{t("import.row", { n: w.row })}</span>
                <span className="text-fg-subtle">·</span>
                <span className="text-fg-default">{w.reason}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "neutral" | "success" | "destructive" | "warning";
}) {
  const tones = {
    neutral:     "bg-surface-sunken border-border-default text-fg-default",
    success:     "bg-success-bg-subtle border-success-border text-success-text",
    destructive: "bg-danger-bg-subtle border-danger-border text-danger-text",
    warning:     "bg-warning-bg-subtle border-warning-border text-warning-text",
  } as const;
  return (
    <div className={cn("flex flex-col gap-1 p-3 rounded-lg border", tones[variant])}>
      <span className="text-label-xs uppercase tracking-wide">{label}</span>
      <span className="text-heading-md font-semibold tabular-nums">{value.toLocaleString()}</span>
    </div>
  );
}

/* ─────── Step 4 — Confirm / Processing ────────────────────────────────── */

function Step4Confirm({
  status,
  processed,
  total,
}: {
  status: ImportStatus;
  processed: number;
  total: number;
}) {
  const { t } = useLocale();

  if (status === "completed") {
    return (
      <EmptyState
        icon={CircleCheck}
        title={t("import.completed.title")}
        description={t("import.completed.body", {
          valid: MOCK_PREVIEW.valid.toLocaleString(),
          errors: MOCK_PREVIEW.errors.toLocaleString(),
          warnings: MOCK_PREVIEW.warnings.toLocaleString(),
        })}
        size="page"
      />
    );
  }

  if (status === "failed") {
    return (
      <Alert variant="destructive" title={t("import.failed.title")}>
        {t("import.failed.body")}
      </Alert>
    );
  }

  const pct = Math.round((processed / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="inline-flex items-center gap-2">
            <Icon icon={ImportIcon} size={14} className="text-accent-text" aria-hidden="true" />
            {status === "queued" ? t("import.queued") : t("import.processing")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-body-sm text-fg-muted tabular-nums">
            <span>
              <span className="text-fg-default font-medium">{processed.toLocaleString()}</span> /{" "}
              {total.toLocaleString()}
            </span>
            <span>{pct}%</span>
          </div>
          <Progress value={status === "queued" ? null : pct} />
          <p className="text-body-xs text-fg-muted">{t("import.processing.body")}</p>
        </div>
      </CardBody>
    </Card>
  );
}
