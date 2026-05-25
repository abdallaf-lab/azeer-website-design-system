"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@azeer/ui";
import { localeConfig, type Locale } from "@/i18n/config";

/**
 * LocaleSwitcher — toggles between the two supported locales by swapping the
 * first path segment (`/en/...` ⇄ `/ar/...`). The active locale's *other*
 * label is shown so the control always advertises where it will take you.
 */
export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale: Locale = locale === "en" ? "ar" : "en";

  function switchTo(next: Locale) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => switchTo(otherLocale)}
      aria-label={`Switch to ${localeConfig[otherLocale].name}`}
    >
      {localeConfig[otherLocale].label}
    </Button>
  );
}
