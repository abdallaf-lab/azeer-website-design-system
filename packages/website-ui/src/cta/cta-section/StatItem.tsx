import { cn } from "../../lib";

export interface CTAStat {
  /** Stable key. */
  id: string;
  /**
   * The full stat value as a string — handles percentages ("38%"),
   * multipliers ("2.4x"), abbreviated counts ("100K+"), time ("<2 min"),
   * ranges ("2–3x"), and custom labels ("First-class") without per-shape
   * parsing. Use Western digits in both languages for cross-locale consistency.
   */
  value: string;
  /** Supporting line ("reduction in no-shows"). */
  description: string;
}

export interface StatItemProps {
  stat: CTAStat;
  /** When false, renders a bottom hairline. The last stat omits it. */
  isLast?: boolean;
  className?: string;
}

/**
 * StatItem — one row in the CTA stats column: prominent value
 * (`text-mkt-display-md`, weight 500) above a muted description. Pure
 * presentation, Server Component (no hooks, no `"use client"`). Static —
 * no `NumberTicker`, no continuous animation (Rule #16).
 */
export function StatItem({ stat, isLast, className }: StatItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 py-6 md:py-8",
        !isLast && "border-b border-border-subtle",
        className,
      )}
    >
      <div className="text-mkt-display-md text-content-emphasis">{stat.value}</div>
      <p className="text-mkt-body text-content-subtle">{stat.description}</p>
    </div>
  );
}
