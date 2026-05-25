import type * as React from "react";
import { Icon, Separator } from "@azeer/ui";
import { cn, type SectionIcon } from "../lib";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  icon: SectionIcon;
  href: string;
  /** Accessible label, e.g. "Azeer on X". */
  label: string;
}

export interface FooterProps {
  /** Brand mark / wordmark. */
  logo?: React.ReactNode;
  /** Short brand blurb under the logo. */
  description?: React.ReactNode;
  /** Link columns (Product / Company / Resources / Legal…). */
  columns?: FooterColumn[];
  social?: FooterSocial[];
  /** Extra slot in the brand column — e.g. a `<NewsletterSignup />`. */
  brandSlot?: React.ReactNode;
  /** Bottom-start legal line (copyright). */
  legal?: React.ReactNode;
  /** Bottom-end secondary links (Privacy, Terms…). */
  bottomLinks?: FooterLink[];
  className?: string;
}

/**
 * Footer — the site footer: a brand column (logo, blurb, social, optional
 * newsletter slot), link columns, and a legal bottom bar. Presentational →
 * Server Component. Logical spacing throughout, so it mirrors under RTL.
 */
export function Footer({
  logo,
  description,
  columns = [],
  social,
  brandSlot,
  legal,
  bottomLinks,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-border-default bg-surface-sunken",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            {logo ? <div className="flex items-center">{logo}</div> : null}
            {description ? (
              <p className="max-w-sm text-body-sm text-fg-muted">{description}</p>
            ) : null}
            {brandSlot ? <div className="mt-2 max-w-sm">{brandSlot}</div> : null}
            {social && social.length > 0 ? (
              <ul className="mt-2 flex items-center gap-2">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-md",
                        "text-fg-muted transition-colors duration-fast ease-standard",
                        "hover:bg-state-hover hover:text-fg-default",
                      )}
                    >
                      <Icon icon={item.icon} size={20} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4"
          >
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h2 className="text-label-xs text-fg-subtle">{column.title}</h2>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "text-body-sm text-fg-muted",
                          "transition-colors duration-fast ease-standard hover:text-accent-text",
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {legal ? <p className="text-body-xs text-fg-muted">{legal}</p> : <span />}
          {bottomLinks && bottomLinks.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {bottomLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-xs text-fg-muted transition-colors duration-fast ease-standard hover:text-accent-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
