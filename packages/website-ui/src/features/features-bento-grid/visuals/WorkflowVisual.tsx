import { ArrowRight } from "lucide-react";

import { cn } from "../../../lib";

const STEP_TONE = {
  info: "bg-bg-info text-content-info",
  attention: "bg-bg-attention text-content-attention",
  success: "bg-bg-success text-content-success",
} as const;

function MiniStep({ tone, label }: { tone: keyof typeof STEP_TONE; label: string }) {
  return (
    <span
      className={cn(
        "rounded-md border border-border-subtle px-3 py-1.5 text-mkt-caption font-medium",
        STEP_TONE[tone],
      )}
    >
      {label}
    </span>
  );
}

/**
 * WorkflowVisual — three tone-coded pills (trigger / action / result) joined by
 * decorative arrows. Conveys the workflow concept without the full WorkflowItem
 * machinery. Calm, static (Rule #16).
 */
export function WorkflowVisual() {
  return (
    <div className="flex h-57 items-center justify-center px-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <MiniStep tone="info" label="Trigger" />
        {/*
         * Rule #12 exception: rtl:rotate-180 is acceptable for a purely
         * decorative inline arrow icon (no animation, no direction API).
         * ConnectorArrow's no-rotate rule targets components with direction
         * ergonomics — not 16px lucide glyphs.
         */}
        <ArrowRight className="size-4 text-content-muted rtl:rotate-180" aria-hidden="true" />
        <MiniStep tone="attention" label="Action" />
        <ArrowRight className="size-4 text-content-muted rtl:rotate-180" aria-hidden="true" />
        <MiniStep tone="success" label="Result" />
      </div>
    </div>
  );
}
