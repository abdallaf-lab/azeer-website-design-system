import { ShieldCheck } from "lucide-react";

/**
 * ComplianceVisual — ShieldCheck framed by a subtle brand-indigo radial glow,
 * with three compliance pills below. Trustworthy, static (Rule #16).
 */
export function ComplianceVisual() {
  return (
    <div className="relative flex h-57 items-center justify-center px-6">
      {/* Subtle indigo radial glow — static arbitrary class, JIT-safe. */}
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--brand-primary)_15%,transparent),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-border-subtle bg-bg-default p-4 shadow-elev-2">
          <ShieldCheck className="size-12 text-accent-text" aria-hidden="true" />
        </div>
        <div className="flex gap-2">
          <span className="rounded-md bg-bg-muted px-2 py-1 text-mkt-caption text-content-emphasis">
            GDPR
          </span>
          <span className="rounded-md bg-bg-muted px-2 py-1 text-mkt-caption text-content-emphasis">
            HIPAA
          </span>
          <span className="rounded-md bg-bg-muted px-2 py-1 text-mkt-caption text-content-emphasis">
            SOC 2
          </span>
        </div>
      </div>
    </div>
  );
}
