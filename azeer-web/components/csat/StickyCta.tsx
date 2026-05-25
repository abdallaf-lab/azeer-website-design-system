"use client";

import * as React from "react";
import { DemoButton } from "./demo-context";
import { useLocale } from "./locale-context";

/** Mobile-only sticky CTA bar that appears after the hero scrolls away. */
export function StickyCta() {
  const { t } = useLocale();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[1090] border-t border-zinc-200 bg-white/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <DemoButton size="lg" source="sticky-mobile" className="w-full">
        {t.sticky}
      </DemoButton>
    </div>
  );
}
