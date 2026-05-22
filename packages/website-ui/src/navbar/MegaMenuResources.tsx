import { Icon } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";

export interface MegaMenuResourceLink {
  icon: SectionIcon;
  title: string;
  description?: string;
  href: string;
}

export interface MegaMenuResourcesProps {
  /** Resource destinations (docs, blog, guides, changelog…). */
  links: MegaMenuResourceLink[];
  /** Optional "Featured" list rendered in an end column. */
  featured?: { label: string; items: { label: string; href: string }[] };
  className?: string;
}

/**
 * MegaMenuResources — the "Resources" dropdown panel. An icon link list plus
 * an optional featured-articles column. Presentational.
 */
export function MegaMenuResources({ links, featured, className }: MegaMenuResourcesProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        featured ? "md:grid-cols-[2fr_1fr]" : "",
        className,
      )}
    >
      <ul className="grid gap-1 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={cn(
                "group flex items-start gap-3 rounded-lg p-3",
                "transition-colors duration-fast ease-standard",
                "hover:bg-state-hover",
              )}
            >
              <Icon
                icon={link.icon}
                size={20}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-fg-muted group-hover:text-accent-text"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-label-md text-fg-default group-hover:text-accent-text">
                  {link.title}
                </span>
                {link.description ? (
                  <span className="text-body-xs text-fg-muted">{link.description}</span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {featured ? (
        <div className="flex flex-col gap-2 border-s border-border-divider ps-6">
          <span className="text-label-xs text-fg-subtle">{featured.label}</span>
          <ul className="flex flex-col gap-2">
            {featured.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-body-sm text-fg-muted",
                    "transition-colors duration-fast ease-standard",
                    "hover:text-accent-text",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
