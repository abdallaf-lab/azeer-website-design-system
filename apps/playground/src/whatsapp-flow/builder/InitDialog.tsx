import * as React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@azeer/ui";
import { useLocale } from "../../i18n";
import type { FlowCategory } from "../data";
import { makeBlankDraft, type FlowDraft } from "./types";

interface InitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when the user clicks Save & Continue with a validated draft. */
  onSubmit: (draft: FlowDraft) => void;
}

const CATEGORY_KEYS: FlowCategory[] = ["service", "authentication", "marketing", "utility"];

export function InitDialog({ open, onOpenChange, onSubmit }: InitDialogProps) {
  const { t } = useLocale();
  /** Portal target for nested Select dropdowns — see PortalContext docs. */
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null);

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<FlowCategory>("service");
  const [withEndpoint, setWithEndpoint] = React.useState(false);
  const [endpointUrl, setEndpointUrl] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  /* Reset form when dialog closes — keeps state out of the parent. */
  React.useEffect(() => {
    if (!open) {
      setName("");
      setCategory("service");
      setWithEndpoint(false);
      setEndpointUrl("");
      setTouched(false);
    }
  }, [open]);

  const trimmedName = name.trim();
  const nameError =
    !touched
      ? undefined
      : trimmedName.length === 0
        ? t("waf.builder.init.name.error.required")
        : trimmedName.length < 2 || trimmedName.length > 50
          ? t("waf.builder.init.name.error.length")
          : undefined;
  const urlError =
    withEndpoint && endpointUrl.length > 0 && !endpointUrl.startsWith("https://")
      ? t("waf.builder.init.endpoint.url.error")
      : undefined;
  const canSubmit =
    trimmedName.length >= 2 &&
    trimmedName.length <= 50 &&
    (!withEndpoint || (endpointUrl.startsWith("https://") && endpointUrl.length > "https://".length));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    onSubmit(
      makeBlankDraft({
        name: trimmedName,
        category,
        withEndpoint,
        endpointUrl: withEndpoint ? endpointUrl.trim() : undefined,
      }),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" ref={setContentEl}>
        <DialogHeader>
          <DialogTitle>{t("waf.builder.init.title")}</DialogTitle>
          <DialogDescription>{t("waf.builder.init.subtitle")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="contents">
          <DialogBody className="flex flex-col gap-4 pb-4">
            <FormField
              label={t("waf.builder.init.name.label")}
              required
              helper={t("waf.builder.init.name.helper")}
              error={nameError}
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="e.g. Lead capture — Q3 campaign"
                autoFocus
                maxLength={60}
              />
            </FormField>

            <FormField
              label={t("waf.builder.init.category.label")}
              helper={t("waf.builder.init.category.helper")}
            >
              <Select value={category} onValueChange={(v) => setCategory(v as FlowCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                {/* Portal inside the DialogContent so Radix Dialog's focus-trap
                 *  doesn't intercept the trigger's pointer event. */}
                <SelectContent container={contentEl}>
                  {CATEGORY_KEYS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {t(`waf.category.${c}` as const)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="flex items-start justify-between gap-4 rounded-md border border-border-default bg-surface-subtle p-3">
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-label-md text-fg-default">{t("waf.builder.init.endpoint.label")}</span>
                <span className="text-body-xs text-fg-muted">{t("waf.builder.init.endpoint.helper")}</span>
              </div>
              <Switch
                checked={withEndpoint}
                onCheckedChange={setWithEndpoint}
                aria-label={t("waf.builder.init.endpoint.label")}
              />
            </div>

            {withEndpoint ? (
              <FormField
                label={t("waf.builder.init.endpoint.url.label")}
                helper={t("waf.builder.init.endpoint.url.helper")}
                error={urlError}
              >
                <Input
                  type="url"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  placeholder="https://api.example.com/flows/webhook"
                  dir="ltr"
                />
              </FormField>
            ) : null}
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t("waf.builder.init.cancel")}
            </Button>
            <Button type="submit" disabled={!canSubmit && touched}>
              {t("waf.builder.init.continue")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
