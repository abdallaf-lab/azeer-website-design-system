"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { dict, type Dict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleCtx = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dict;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const Ctx = React.createContext<LocaleCtx | null>(null);

export function useLocale() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}

const STORAGE_KEY = "azeer-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Always start "en" so SSR and first client render match (no hydration drift).
  const [locale, setLocaleState] = React.useState<Locale>("en");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "ar" || stored === "en") setLocaleState(stored);
  }, []);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const dir = locale === "ar" ? "rtl" : "ltr";

  // Reflect locale on <html> so RTL, fonts, and fixed elements flip globally.
  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dir;
  }, [locale, dir]);

  const value = React.useMemo<LocaleCtx>(
    () => ({
      locale,
      dir,
      t: dict[locale],
      setLocale,
      toggle: () => setLocale(locale === "en" ? "ar" : "en"),
    }),
    [locale, dir, setLocale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function LanguageToggle({ className }: { className?: string }) {
  const { t, toggle } = useLocale();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900",
        className
      )}
      aria-label={`Switch language to ${t.nav.toggle}`}
    >
      <Languages className="size-[18px]" strokeWidth={1.5} />
      {t.nav.toggle}
    </button>
  );
}
