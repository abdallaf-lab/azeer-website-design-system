import { Icon } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";

export interface TrustBadgeItem {
  label: string;
  /** Optional leading mark (16px). */
  icon?: SectionIcon;
}

export interface TrustBadgesProps {
  items: TrustBadgeItem[];
  /**
   * `light` for light surfaces (neutral border + subtle text), `dark` for
   * inverted surfaces like `DarkCTA` (translucent white). Default `light`.
   */
  tone?: "light" | "dark";
  className?: string;
}

const toneClass: Record<NonNullable<TrustBadgesProps["tone"]>, string> = {
  light: "border-border-subtle text-content-subtle",
  dark: "border-content-inverted/20 text-content-inverted/80",
};

/**
 * TrustBadges — a centered, wrapping row of compliance/partner badges (SOC 2,
 * HIPAA, Meta Business Partner …). Each badge is a bordered pill with an
 * optional icon. Presentational → Server Component. Logical padding mirrors
 * under RTL.
 */
export function TrustBadges({ items, tone = "light", className }: TrustBadgesProps) {
  return (
    <ul className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      {items.map((item) => (
        <li
          key={item.label}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1",
            "text-mkt-body-sm font-medium",
            toneClass[tone],
          )}
        >
          {item.icon ? <Icon icon={item.icon} size={16} aria-hidden="true" /> : null}
          {item.label}
        </li>
      ))}
    </ul>
  );
}
