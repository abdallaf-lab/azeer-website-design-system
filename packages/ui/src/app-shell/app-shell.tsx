import * as React from "react";
import { cn } from "../lib/cn";

export type AppShellVariant = "standard" | "objectDetail";

export interface AppShellProps {
  /** Layout variant. `"standard"` = 3-zone (L1 + L2 + Main). `"objectDetail"` = 5-zone (L1 + Folders + List + Main + Details, Inbox-only). */
  variant?: AppShellVariant;
  /** L1 PrimaryRail — required for both variants. */
  primaryRail: React.ReactNode;
  /** Trial / maintenance / system Banner. Sits above the body row, NOT spanning L1. */
  banner?: React.ReactNode;
  /** Floating bottom-end HelpBubble. */
  helpBubble?: React.ReactNode;
  /** `variant="standard"` — L2 Sidebar (optional). */
  sidebar?: React.ReactNode;
  /** `variant="objectDetail"` — folders panel (200 px). */
  folders?: React.ReactNode;
  /** `variant="objectDetail"` — list panel (280 px). */
  list?: React.ReactNode;
  /** `variant="objectDetail"` — details panel (320 px). */
  details?: React.ReactNode;
  /** Main content — module body. Wrapped in a white card with `rounded-xl` + border. */
  children: React.ReactNode;
  className?: string;
}

/**
 * AppShell — the canonical workspace chassis.
 *
 * Two variants only (no 4-zone or custom — DS-locked):
 *
 *   standard:     [L1] [L2] [Main]                      ← Knowledge / Reports / Outbound / Contacts / Settings
 *   objectDetail: [L1] [Folders] [List] [Main] [Details] ← Inbox only
 *
 * 4 px gutter between every panel (per Shell.md "Shell gutter 4 px").
 * The Banner sits ABOVE the body row inside the workspace column —
 * NOT spanning L1, so the rail stays visible regardless of banner state.
 * HelpBubble is fixed-positioned at the viewport corner.
 */
export function AppShell({
  variant = "standard",
  primaryRail,
  banner,
  helpBubble,
  sidebar,
  folders,
  list,
  details,
  children,
  className,
}: AppShellProps) {
  const isObjectDetail = variant === "objectDetail";

  return (
    <div className={cn("h-screen w-full flex bg-canvas overflow-hidden", className)}>
      {primaryRail}
      <div className="flex-1 flex flex-col min-w-0">
        {banner ? <div className="shrink-0">{banner}</div> : null}
        <div className="flex-1 flex gap-1 p-1 min-h-0">
          {isObjectDetail ? (
            <>
              {folders ? <div className="shrink-0">{folders}</div> : null}
              {list ? <div className="shrink-0">{list}</div> : null}
              <Main>{children}</Main>
              {details ? <div className="shrink-0">{details}</div> : null}
            </>
          ) : (
            <>
              {sidebar ? <div className="shrink-0">{sidebar}</div> : null}
              <Main>{children}</Main>
            </>
          )}
        </div>
      </div>
      {helpBubble}
    </div>
  );
}

/**
 * Main — the white workspace card that holds the module body. Internal —
 * not exported. Consumers control content; AppShell guarantees the surface.
 */
function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={cn(
        "flex-1 flex flex-col min-w-0 min-h-0",
        "rounded-xl border border-border-default bg-surface",
        "overflow-hidden",
      )}
    >
      {children}
    </main>
  );
}

/** Object-detail-only narrower panel — 200 px folders / 280 px list. */
export interface ShellPanelProps {
  /** Panel width. Use `200` for Inbox folders, `280` for conversation list, `320` for details. */
  width: 200 | 280 | 320;
  children: React.ReactNode;
  className?: string;
  /** `aria-label` for the panel landmark. */
  ariaLabel?: string;
}

/**
 * ShellPanel — narrower white-island column for the `objectDetail` variant.
 *
 * Use width=200 for the folders panel, 280 for the conversation list, 320
 * for the details panel — the three locked panel widths from Shell.md.
 * Standard variant doesn't use this; pass a `Sidebar` (240) instead.
 */
export function ShellPanel({
  width,
  children,
  className,
  ariaLabel,
}: ShellPanelProps) {
  const widthClass = {
    200: "w-[200px]",
    280: "w-[280px]",
    320: "w-80",
  }[width];

  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        "flex flex-col h-full",
        widthClass,
        "rounded-xl border border-border-default bg-surface",
        "overflow-hidden",
        className,
      )}
    >
      {children}
    </aside>
  );
}
