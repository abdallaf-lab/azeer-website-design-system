import { Icon } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";

export interface MegaMenuSolutionsGroup {
  /** Uppercase group label (e.g. "By industry", "By team"). */
  label: string;
  items: { icon?: SectionIcon; label: string; href: string }[];
}

export interface MegaMenuSolutionsProps {
  /** Solutions grouped into labelled columns. */
  groups: MegaMenuSolutionsGroup[];
  className?: string;
}

/**
 * MegaMenuSolutions — the "Solutions" dropdown panel. Columns of grouped
 * links (by industry / by team / by use case). Presentational.
 */
export function MegaMenuSolutions({ groups, className }: MegaMenuSolutionsProps) {
  return (
    <div
      className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}
      role="presentation"
    >
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <span className="text-label-xs text-fg-subtle">{group.label}</span>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5",
                    "text-label-md text-fg-default",
                    "transition-colors duration-fast ease-standard",
                    "hover:bg-state-hover hover:text-accent-text",
                  )}
                >
                  {item.icon ? (
                    <Icon
                      icon={item.icon}
                      size={16}
                      aria-hidden="true"
                      className="text-fg-muted"
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
