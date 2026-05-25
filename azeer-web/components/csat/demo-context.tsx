"use client";

import * as React from "react";
import { LeadDialog } from "./LeadDialog";
import { buttonClasses } from "@/components/primitives";

type DemoCtx = { open: (source?: string) => void };
const Ctx = React.createContext<DemoCtx | null>(null);

export function useDemo() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useDemo must be used within <DemoProvider>");
  return ctx;
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [openState, setOpenState] = React.useState(false);
  const [source, setSource] = React.useState<string>("unknown");

  const open = React.useCallback((src = "unknown") => {
    setSource(src);
    setOpenState(true);
    // Analytics hook (GA4 / Meta Pixel) — fire on intent.
    if (typeof window !== "undefined") {
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: "demo_intent",
        source: src,
      });
    }
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <LeadDialog open={openState} onClose={() => setOpenState(false)} source={source} />
    </Ctx.Provider>
  );
}

/** A CTA button that opens the demo dialog from anywhere on the page. */
export function DemoButton({
  children,
  variant = "brand",
  size = "lg",
  source = "cta",
  className,
}: {
  children: React.ReactNode;
  variant?: "brand" | "secondary" | "ghost" | "inverse";
  size?: "md" | "lg";
  source?: string;
  className?: string;
}) {
  const { open } = useDemo();
  return (
    <button
      type="button"
      onClick={() => open(source)}
      className={buttonClasses({ variant, size, className })}
    >
      {children}
    </button>
  );
}
