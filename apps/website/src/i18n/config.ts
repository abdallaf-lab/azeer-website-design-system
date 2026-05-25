export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

export const localeConfig = {
  en: { name: "English", dir: "ltr", label: "EN" },
  ar: { name: "العربية", dir: "rtl", label: "العربية" },
} as const;
