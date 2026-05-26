import { Sparkles } from "lucide-react";

/**
 * AIAgentsVisual — a single accent "Azeer AI" badge above a chat reply, with a
 * caption noting bilingual support. Focused, not gimmicky (Rule #16).
 */
export function AIAgentsVisual() {
  return (
    <div className="flex h-57 flex-col items-center justify-center gap-3 px-6">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg-subtle px-2.5 py-1 text-accent-text">
        <Sparkles className="size-3.5" aria-hidden="true" />
        <span className="text-mkt-caption font-medium">Azeer AI</span>
      </div>
      <div className="max-w-xs rounded-2xl border border-border-subtle bg-bg-default px-4 py-3 shadow-elev-1">
        <p className="text-mkt-body-sm text-content-emphasis">
          Yes — your order shipped this morning. Track it: orders.azeer.io/8421
        </p>
      </div>
      <p className="text-mkt-caption text-content-muted">
        Bilingual responses in Arabic &amp; English
      </p>
    </div>
  );
}
