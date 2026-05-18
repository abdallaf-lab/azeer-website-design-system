import * as React from "react";
import type { CountryCode } from "libphonenumber-js";
import {
  Button,
  FormField,
  Input,
  PhoneInput,
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
import { useLocale } from "../i18n";

interface AddContactSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COUNTRIES: ReadonlyArray<{ code: CountryCode; name: string }> = [
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "EG", name: "Egypt" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
] as const;

const AGENTS = [
  { id: "u-lina", name: "Lina Yousef" },
  { id: "u-sara", name: "Sara Khan" },
  { id: "u-omar", name: "Omar Said" },
  { id: "u-maya", name: "Maya Adel" },
] as const;

/**
 * AddContactSheet — single-contact add flow as a right-side `Sheet`.
 *
 * Sheets are the DS-canon container for create / edit affordances that
 * have multiple fields and need persistent visibility while the user
 * works (vs Dialog, which interrupts and shouldn't be tall). Sheet from
 * the `end` side mirrors automatically to the start side under `dir="rtl"`.
 *
 * CDP § 2: bulk import lives at SCR-CDP-001c; this Sheet covers the
 * "one contact at a time" path (lead capture, manual support handoff).
 */
export function AddContactSheet({ open, onOpenChange }: AddContactSheetProps) {
  const { t } = useLocale();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState<string | undefined>(undefined);
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState<CountryCode>("SA");
  const [assigneeId, setAssigneeId] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const nameError = touched && !name.trim() ? t("form.required") : undefined;
  const phoneError = touched && !phone ? t("form.required") : undefined;
  const emailError =
    touched && email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? t("form.invalidEmail")
      : undefined;

  const reset = () => {
    setName("");
    setPhone(undefined);
    setEmail("");
    setCountry("SA");
    setAssigneeId("");
    setTouched(false);
  };

  const submit = () => {
    setTouched(true);
    if (!name.trim() || !phone || emailError) return;
    toast.success(t("toast.added"), { description: name });
    reset();
    onOpenChange(false);
  };

  // Portal target for nested Select dropdowns — see PortalContext docs.
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null);

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <SheetContent side="end" ref={setContentEl}>
        <SheetHeader>
          <SheetTitle>{t("add.title")}</SheetTitle>
          <SheetDescription>
            {t("add.body")}{" "}
            <span className="text-fg-default font-medium">{t("add.body.import")}</span>.
          </SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="flex flex-col gap-3">
            <FormField label={t("add.field.name")} required error={nameError}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mahmoud Twerlo"
                autoFocus
              />
            </FormField>

            <FormField
              label={t("add.field.phone")}
              required
              helper={t("add.field.phoneHelp")}
              error={phoneError}
            >
              <PhoneInput
                value={phone}
                onValueChange={setPhone}
                defaultCountry={country}
                placeholder="+966 50 555 0142"
              />
            </FormField>

            <FormField label={t("add.field.email")} optional error={emailError}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mahmoud@example.com"
              />
            </FormField>

            <FormField label={t("add.field.country")} optional>
              <Select value={country} onValueChange={(v) => setCountry(v as CountryCode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                {/* Portal inside the SheetContent — Radix Sheet's focus-trap
                 *  intercepts the trigger pointer event when content portals
                 *  to <body>. See SelectContent.container docs. */}
                <SelectContent container={contentEl}>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label={t("add.field.assignee")} optional helper={t("add.assignee.help")}>
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger>
                  <SelectValue placeholder={t("row.unassigned")} />
                </SelectTrigger>
                <SelectContent container={contentEl}>
                  {AGENTS.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button size="sm" onClick={submit}>
            {t("add.submit")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
