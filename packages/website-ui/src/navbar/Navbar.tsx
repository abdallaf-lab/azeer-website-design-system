"use client";

import * as React from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button, Icon } from "@azeer/ui";
import { cn } from "../lib";

export interface NavbarItem {
  label: string;
  /** Destination for a plain link item. Ignored when `menu` is present. */
  href?: string;
  /** Mega-menu panel content. When set, the item becomes a dropdown trigger. */
  menu?: React.ReactNode;
  /** Marks this item as the current section (accent label + `aria-current`). */
  active?: boolean;
}

export interface NavbarProps {
  /** Brand mark / wordmark. Wrap it in your own link to home. */
  logo: React.ReactNode;
  /** Primary navigation items (plain links or mega-menu triggers). */
  items?: NavbarItem[];
  /** End-aligned actions — typically a "Log in" link + a "Get started" button. */
  actions?: React.ReactNode;
  /** Pin the bar to the viewport top. Default `true`. */
  sticky?: boolean;
  className?: string;
}

/**
 * Navbar — the marketing top bar. Composes plain links and mega-menu triggers
 * (the `MegaMenu*` panels) with a responsive mobile drawer.
 *
 * Open state lives here so the panels stay presentational. Triggers expose
 * `aria-expanded` / `aria-controls`; Escape, outside-pointer, and pointer-leave
 * (with a short grace period to bridge the trigger→panel gap) all close.
 * RTL-safe: logical spacing only; the chevron is non-directional (no flip).
 */
export function Navbar({
  logo,
  items = [],
  actions,
  sticky = true,
  className,
}: NavbarProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navId = React.useId();
  const headerRef = React.useRef<HTMLElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  }, [cancelClose]);

  React.useEffect(() => cancelClose, [cancelClose]);

  // Escape closes any open surface.
  React.useEffect(() => {
    if (openIndex === null && !mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenIndex(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openIndex, mobileOpen]);

  // Outside pointer closes the mega menu.
  React.useEffect(() => {
    if (openIndex === null) return;
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openIndex]);

  const activeMenu = openIndex !== null ? items[openIndex]?.menu : null;

  return (
    <header
      ref={headerRef}
      className={cn(
        "relative w-full border-b border-border-default bg-surface",
        sticky && "sticky top-0 z-nav",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center">{logo}</div>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {items.map((item, index) =>
            item.menu ? (
              <button
                key={item.label}
                type="button"
                aria-expanded={openIndex === index}
                aria-controls={`${navId}-panel`}
                onClick={() => setOpenIndex((cur) => (cur === index ? null : index))}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenIndex(index);
                }}
                onMouseLeave={scheduleClose}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center gap-1 rounded-md px-3",
                  "text-label-md text-fg-default",
                  "transition-colors duration-fast ease-standard",
                  "hover:bg-state-hover",
                  openIndex === index && "bg-state-hover text-accent-text",
                  item.active && "text-accent-text",
                  "cursor-pointer",
                )}
              >
                {item.label}
                <Icon
                  icon={ChevronDown}
                  size={14}
                  aria-hidden="true"
                  className={cn(
                    "text-fg-muted transition-transform duration-fast ease-standard",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-md px-3",
                  "text-label-md text-fg-default",
                  "transition-colors duration-fast ease-standard",
                  "hover:bg-state-hover hover:text-accent-text",
                  item.active && "text-accent-text",
                )}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">{actions}</div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon-md"
          className="lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((cur) => !cur)}
        >
          <Icon icon={mobileOpen ? X : Menu} size={20} aria-hidden="true" />
        </Button>
      </div>

      {/* Mega-menu panel — full-bleed under the bar, content centered */}
      {activeMenu ? (
        <div
          id={`${navId}-panel`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className={cn(
            "absolute inset-x-0 top-full z-popover hidden lg:block",
            "border-b border-border-default bg-surface-overlay shadow-elev-2",
            "animate-in fade-in-0 slide-in-from-top-1 duration-base ease-out",
          )}
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {activeMenu}
          </div>
        </div>
      ) : null}

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="border-t border-border-divider bg-surface lg:hidden">
          <nav
            aria-label="Primary"
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {items.map((item) =>
              item.href && !item.menu ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex min-h-11 items-center rounded-md px-3 py-2 text-label-md text-fg-default hover:bg-state-hover"
                >
                  {item.label}
                </a>
              ) : (
                <div key={item.label} className="flex flex-col">
                  <span className="px-3 py-2 text-label-xs text-fg-subtle">
                    {item.label}
                  </span>
                  {item.menu ? <div className="px-3 pb-2">{item.menu}</div> : null}
                </div>
              ),
            )}
            {actions ? (
              <div className="mt-2 flex flex-col gap-2 border-t border-border-divider pt-4">
                {actions}
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
