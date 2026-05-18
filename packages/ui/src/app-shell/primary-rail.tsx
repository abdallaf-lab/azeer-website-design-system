import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Pin, PinOff } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Badge } from "../badge";

/* ─────── Context ───────────────────────────────────────────────────────
 * PrimaryRail provides its current `collapsed` state to descendants. Items
 * and any footer content (language switcher, avatar, etc.) can call
 * `usePrimaryRail()` to read it without prop-drilling. Items still accept
 * an explicit `collapsed` prop as an override.
 */
interface PrimaryRailContextValue {
  collapsed: boolean;
  /** True when the rail is permanently expanded (user clicked the pin). */
  pinned: boolean;
}

const PrimaryRailContext = React.createContext<PrimaryRailContextValue>({
  collapsed: false,
  pinned: false,
});

export function usePrimaryRail(): PrimaryRailContextValue {
  return React.useContext(PrimaryRailContext);
}

/* ─────── PrimaryRail ────────────────────────────────────────────────── */

export interface PrimaryRailProps {
  /**
   * Force the collapse state. When omitted, the rail manages its own state
   * (hover-to-overlay-expand + pin to lock open). Use only for legacy
   * consumers that need full external control of the collapse state.
   */
  collapsed?: boolean;
  /** Initial pin state when uncontrolled. Default `false` (rail starts collapsed). */
  defaultPinned?: boolean;
  /** Controlled pin state. Pair with `onPinChange`. */
  pinned?: boolean;
  /** Fires when the user clicks the pin button. */
  onPinChange?: (pinned: boolean) => void;
  /** Top slot — typically a workspace logo + workspace switcher. */
  logo?: React.ReactNode;
  /** Main body — module nav items. */
  children?: React.ReactNode;
  /** Bottom cluster — settings / profile / notifications. */
  footer?: React.ReactNode;
  className?: string;
  /** `aria-label` for the `<nav>` landmark. Default `"Primary navigation"`. */
  ariaLabel?: string;
}

/**
 * PrimaryRail — L1 chromeless rail.
 *
 * Locked anatomy (Shell.md):
 *   - 196 px expanded (pinned) / 56 px collapsed
 *   - When hover-expanded (not pinned), the 196 px panel FLOATS as an overlay
 *     above content — the rail's flow width stays at 56 px so the workspace
 *     doesn't shift horizontally on every hover.
 *   - Chromeless when in flow; gains `bg-canvas` + `shadow-elev-2` when
 *     floating so it occludes content cleanly.
 *   - Top: logo (start) + pin button (end, space-between) when expanded
 *   - Body: module list
 *   - Bottom cluster: Settings · Profile · Notifications
 *
 * Default behavior (uncontrolled): the rail starts collapsed; hovering it
 * temporarily expands as an overlay; the pin button at the top toggles
 * persistent expansion (rail becomes 196 px in flow). Pass `collapsed`
 * explicitly to override the behavior entirely.
 */
export function PrimaryRail({
  collapsed: controlledCollapsed,
  defaultPinned = false,
  pinned: controlledPinned,
  onPinChange,
  logo,
  children,
  footer,
  className,
  ariaLabel = "Primary navigation",
}: PrimaryRailProps) {
  const [internalPinned, setInternalPinned] = React.useState(defaultPinned);
  const pinned = controlledPinned !== undefined ? controlledPinned : internalPinned;
  const setPinned = (next: boolean) => {
    if (controlledPinned === undefined) setInternalPinned(next);
    onPinChange?.(next);
  };

  const [hovered, setHovered] = React.useState(false);

  const isExternallyControlled = controlledCollapsed !== undefined;
  const collapsed = isExternallyControlled
    ? Boolean(controlledCollapsed)
    : !(pinned || hovered);

  /**
   * `floats` — when the rail manages its own state AND isn't pinned, the
   * panel stays `position: absolute` throughout. That means there's no
   * absolute↔relative snap on hover-out: the panel just animates its width
   * back to 56 px while staying anchored at the rail's start edge. Without
   * this, the floating chrome (`bg-canvas` + `shadow` + `rounded-e-xl`)
   * would drop off mid-animation and the active-row background would
   * appear to lag behind the collapse.
   */
  const floats = !isExternallyControlled && !pinned;
  /** `overlaying` — panel is wider than nav's flow width. Triggers depth chrome. */
  const overlaying = floats && hovered;

  /**
   * `inFlowExpanded` — whether the rail occupies its expanded footprint in
   * the AppShell flex layout. Uncontrolled: only `pinned` counts (hover
   * floats, never takes flow space). Controlled (legacy): the consumer's
   * `collapsed` prop drives flow width directly — otherwise the nav stayed
   * at 56 px even when consumers passed `collapsed={false}`, leaving the
   * panel to overflow onto sibling panels (L2 sidebar / Folders).
   */
  const inFlowExpanded = isExternallyControlled ? !collapsed : pinned;

  return (
    <PrimaryRailContext.Provider value={{ collapsed, pinned }}>
      <nav
        aria-label={ariaLabel}
        data-collapsed={collapsed}
        data-pinned={pinned}
        data-floating={overlaying}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          // Position context for the floating inner panel.
          "relative shrink-0 z-nav",
          // Flow width — `inFlowExpanded` accounts for both modes:
          //  - uncontrolled: only `pinned` takes flow space; hover floats
          //  - controlled: the consumer's `collapsed` prop drives the
          //    rail's footprint directly
          inFlowExpanded ? "w-[196px]" : "w-14",
          "transition-[width] duration-base ease-standard",
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-col py-3 gap-3 h-full",
            "transition-[width,box-shadow] duration-base ease-standard",
            collapsed ? "w-14" : "w-[196px]",
            // Panel stays absolute the whole time when unpinned. bg-canvas
            // matches the page bg so the collapsed state looks identical to
            // an in-flow rail; only the shadow + rounded chrome reveal the
            // overlay during hover-expand.
            floats ? "absolute start-0 top-0 bottom-0 bg-canvas" : "",
            overlaying ? "shadow-elev-2 rounded-e-xl" : "",
          )}
        >
          {/* Logo + pin header.
           *
           * Logo sits inside a fixed `w-ctrl-md` container at the start of
           * the row — identical pattern to PrimaryRailItem's icon container,
           * so the logo's horizontal position is byte-for-byte the same as
           * every icon below it AND doesn't shift during the width
           * transition. Pin button takes the remaining flex space at the
           * end via `justify-between`, only when expanded. */}
          {logo || !isExternallyControlled ? (
            <div className="px-2 flex items-center justify-between h-ctrl-md">
              <span className="w-ctrl-md h-ctrl-md flex items-center justify-center shrink-0">
                {logo}
              </span>
              {!isExternallyControlled && !collapsed ? (
                <button
                  type="button"
                  onClick={() => setPinned(!pinned)}
                  aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
                  aria-pressed={pinned}
                  title={pinned ? "Unpin sidebar" : "Pin sidebar"}
                  className={cn(
                    "inline-flex items-center justify-center shrink-0",
                    "size-7 rounded-md cursor-pointer",
                    "text-fg-muted hover:bg-state-hover hover:text-fg-default",
                    "transition-colors duration-fast ease-standard",
                    pinned && "text-accent-text bg-accent-bg-subtle hover:bg-accent-bg-subtle",
                  )}
                >
                  <Icon icon={pinned ? PinOff : Pin} size={14} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          ) : null}

          <div className="flex-1 px-2 flex flex-col gap-1 min-h-0 overflow-y-auto">
            {children}
          </div>
          {footer ? (
            <div className="px-2 flex flex-col gap-1">{footer}</div>
          ) : null}
        </div>
      </nav>
    </PrimaryRailContext.Provider>
  );
}

export interface PrimaryRailItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  icon: LucideIcon;
  /** Visible label. Hidden when the parent rail is collapsed. */
  label: string;
  /** Active route indicator — applies `aria-current="page"` + visual state. */
  active?: boolean;
  /**
   * Numeric / short-string notification count. Renders inline as an accent
   * Badge when the rail is expanded, AND as a small corner overlay on the
   * icon when the rail is collapsed (so counts stay visible even in
   * icon-only mode). Use this rather than `trailing` for notification
   * counts so both modes render correctly.
   */
  badge?: number | string;
  /**
   * Override collapse — when omitted, reads from the parent `PrimaryRail`
   * via context. Pass explicitly only when an item lives outside the rail.
   */
  collapsed?: boolean;
  /**
   * Optional trailing slot for non-badge content (custom JSX). Hidden when
   * the rail is collapsed. For notification counts, prefer `badge`.
   */
  trailing?: React.ReactNode;
  /** Mirror the icon under RTL (use for directional icons like arrows). */
  flipIconOnRtl?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * PrimaryRailItem — single nav row inside the rail.
 *
 * Anatomy: the icon lives in a fixed 40 × 40 container at the start of the
 * row. That container's position is identical in both collapsed and
 * expanded states, so the icon never moves horizontally as the rail
 * width animates. The label + trailing slot fill the remaining width when
 * expanded, and are simply not rendered when collapsed (no opacity
 * fade — keeps the rail's chrome calm under hover).
 *
 * Active state per States.md §nav-item row:
 *   - `accent-bg-subtle` background
 *   - 2 px start-edge bar in `accent-fill` (via positioned `<span>`)
 *   - `accent-text` label color
 *
 * Three signals together for selection (WCAG 1.4.1).
 */
export function PrimaryRailItem({
  icon,
  label,
  active,
  badge,
  collapsed: collapsedProp,
  trailing,
  flipIconOnRtl,
  className,
  ref,
  ...rest
}: PrimaryRailItemProps) {
  const ctx = usePrimaryRail();
  const collapsed = collapsedProp !== undefined ? collapsedProp : ctx.collapsed;
  return (
    <button
      ref={ref}
      type="button"
      data-active={active}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        "relative",
        "inline-flex items-center h-ctrl-md w-full rounded-md",
        "text-body-md text-fg-default",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        "hover:bg-state-hover",
        "data-[active=true]:bg-accent-bg-subtle data-[active=true]:text-accent-text",
        className,
      )}
      {...rest}
    >
      {active ? (
        <span
          aria-hidden="true"
          className="absolute start-0 top-2 bottom-2 w-0.5 rounded-e-full bg-accent-fill"
        />
      ) : null}

      {/* Fixed 40 × 40 icon container — anchored to the start of the row
       *  in both states so the icon never shifts horizontally. */}
      <span className="relative w-ctrl-md h-ctrl-md flex items-center justify-center shrink-0">
        <Icon icon={icon} size={20} flipOnRtl={flipIconOnRtl} aria-hidden="true" />
        {/* Corner-overlay badge for the collapsed state. */}
        {collapsed && badge != null && badge !== "" ? (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -top-0.5 -end-0.5",
              "inline-flex items-center justify-center",
              "h-4 min-w-4 px-1 rounded-full",
              "bg-accent-fill text-fg-on-accent",
              "text-label-xs tabular-nums leading-none",
            )}
          >
            {badge}
          </span>
        ) : null}
      </span>

      {!collapsed ? (
        <>
          <span className="flex-1 text-start truncate pe-2">{label}</span>
          {badge != null && badge !== "" ? (
            <span className="shrink-0 me-3">
              <Badge size="sm" variant="accent">{badge}</Badge>
            </span>
          ) : trailing ? (
            <span className="shrink-0 me-3 text-fg-muted text-body-xs">{trailing}</span>
          ) : null}
        </>
      ) : null}
    </button>
  );
}
