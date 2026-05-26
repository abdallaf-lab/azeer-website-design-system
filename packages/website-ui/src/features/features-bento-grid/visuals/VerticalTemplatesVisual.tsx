import { ShoppingBag, SmilePlus, Stethoscope, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function TemplateBadge({
  icon: Icon,
  label,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-bg-default p-4 shadow-elev-1">
      <div className="rounded-lg bg-accent-bg-subtle p-2 text-accent-text">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="text-center">
        <div className="text-mkt-body-sm font-medium text-content-emphasis">{label}</div>
        <div className="text-mkt-caption text-content-muted">{sub}</div>
      </div>
    </div>
  );
}

/**
 * VerticalTemplatesVisual — a four-badge row of pre-built vertical templates.
 * Shows the e-commerce (Salla, Zid) and healthcare (clinics, dental) coverage
 * at a glance. Static (Rule #16).
 */
export function VerticalTemplatesVisual() {
  return (
    <div className="flex h-57 items-center justify-center px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <TemplateBadge icon={Store} label="Salla" sub="E-commerce" />
        <TemplateBadge icon={ShoppingBag} label="Zid" sub="E-commerce" />
        <TemplateBadge icon={Stethoscope} label="Clinics" sub="Healthcare" />
        <TemplateBadge icon={SmilePlus} label="Dental" sub="Healthcare" />
      </div>
    </div>
  );
}
