"use client";

import * as React from "react";
import { WhatsAppIcon } from "@/components/icons";
import { useLocale } from "./locale-context";

const WA_LINK =
  "https://wa.me/9665XXXXXXXX?text=Hi%20Azeer%2C%20I%27d%20like%20to%20learn%20about%20CSAT";

export function WhatsAppFab() {
  const { t } = useLocale();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      aria-label={t.fab}
      className="group fixed bottom-5 end-5 z-[1100] inline-flex h-14 items-center gap-3 rounded-full bg-[#25D366] px-4 text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all hover:bg-[#1ebe5b]"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span
        className={`overflow-hidden whitespace-nowrap text-[15px] font-medium transition-all duration-300 ${
          expanded ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        {t.fab}
      </span>
    </a>
  );
}
