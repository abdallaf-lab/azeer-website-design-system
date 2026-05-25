import * as React from "react";
import parsePhoneNumber, { type CountryCode } from "libphonenumber-js";
import { cn } from "../lib/cn";
import { Input, type InputProps } from "../input";

export interface PhoneInputProps
  extends Omit<InputProps, "type" | "value" | "onChange" | "inputMode"> {
  /** E.164 phone number, e.g. "+966505550142". Pass `undefined` for empty. */
  value?: string;
  /** Fires with the new E.164 string (or `undefined` when cleared / invalid). */
  onValueChange?: (e164: string | undefined) => void;
  /**
   * Default country for parsing national-format input (e.g. "SA" for Saudi
   * Arabia, "US", "GB"). The user can paste E.164 directly to override.
   */
  defaultCountry?: CountryCode;
  /** Fires on blur with the parsed validity. */
  onValidityChange?: (isValid: boolean) => void;
}

/**
 * PhoneInput — CPaaS-critical phone-number entry.
 *
 * **Storage = E.164 always** (per Numerals.md). Display shows
 * international format on blur (`+966 50 555 0142`). The input is
 * `bidi-isolated` + `font-mono` + `tabular-nums` so it reads LTR
 * regardless of document direction.
 *
 * Validation runs on blur via `libphonenumber-js`:
 *   - Valid → emit E.164 via `onValueChange`, reformat display
 *   - Empty → emit `undefined`
 *   - Invalid → `aria-invalid="true"` (FormField will pair with red border + error message)
 */
export function PhoneInput({
  value,
  onValueChange,
  onValidityChange,
  defaultCountry = "SA",
  className,
  onBlur,
  ...rest
}: PhoneInputProps) {
  // Local display state — formatted for humans; canonical value is E.164 via onValueChange.
  const [display, setDisplay] = React.useState<string>(() => {
    if (!value) return "";
    const parsed = parsePhoneNumber(value);
    return parsed?.formatInternational() ?? value;
  });
  const [invalid, setInvalid] = React.useState(false);

  // Sync display when controlled value changes externally.
  React.useEffect(() => {
    if (value === undefined) {
      setDisplay("");
      return;
    }
    const parsed = parsePhoneNumber(value);
    setDisplay(parsed?.formatInternational() ?? value);
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = display.trim();
    if (trimmed === "") {
      setInvalid(false);
      onValueChange?.(undefined);
      onValidityChange?.(true);
    } else {
      const parsed = parsePhoneNumber(trimmed, defaultCountry);
      if (parsed?.isValid()) {
        setInvalid(false);
        setDisplay(parsed.formatInternational());
        onValueChange?.(parsed.format("E.164"));
        onValidityChange?.(true);
      } else {
        setInvalid(true);
        onValueChange?.(undefined);
        onValidityChange?.(false);
      }
    }
    onBlur?.(e);
  };

  return (
    <Input
      type="tel"
      inputMode="tel"
      value={display}
      onChange={(e) => setDisplay(e.target.value)}
      onBlur={handleBlur}
      aria-invalid={invalid || undefined}
      className={cn("bidi-isolate font-mono tabular-nums", className)}
      {...rest}
    />
  );
}
