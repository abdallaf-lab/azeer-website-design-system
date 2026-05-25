import * as React from "react";
import type { Locale as DateFnsLocale } from "date-fns";
import { arSA } from "date-fns/locale/ar-SA";
import { type Locale, type StringKey, translate } from "./strings";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Translate a key with optional `{var}` interpolation. */
  t: (key: StringKey, params?: Record<string, string | number>) => string;
  /** date-fns locale matching the active UI locale (or undefined for EN — date-fns default). */
  dateFnsLocale: DateFnsLocale | undefined;
  isRtl: boolean;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

/**
 * LocaleProvider — owns the `locale` state, mirrors it onto `<html lang/dir>`,
 * and exposes `useT()` for translation. One source of truth for the whole app.
 *
 * Sets `<html dir>` directly per RTL.md — the native `dir` attribute drives
 * every DS logical utility (`ms-*` / `me-*` / `start-*` / `end-*`) and every
 * Radix primitive automatically. No component branching needed.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>("en");

  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = React.useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(key, locale, params),
      dateFnsLocale: locale === "ar" ? arSA : undefined,
      isRtl: locale === "ar",
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
