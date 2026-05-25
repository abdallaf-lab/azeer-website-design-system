"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type Faq = { q: string; a: React.ReactNode; id: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-zinc-200 overflow-hidden rounded-md border border-zinc-200 bg-white">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-trigger-${item.id}`}
                onClick={() => {
                  const next = isOpen ? null : item.id;
                  setOpen(next);
                  if (next && typeof window !== "undefined") {
                    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
                      event: "objection_faq_expand",
                      faq: item.id,
                    });
                  }
                }}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="text-[16px] font-medium text-zinc-900 sm:text-[17px]">
                  {item.q}
                </span>
                <Plus
                  className={cn(
                    "size-5 shrink-0 text-brand transition-transform duration-200",
                    isOpen && "rotate-45"
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <div className="max-w-2xl text-[15px] leading-relaxed text-zinc-600">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
