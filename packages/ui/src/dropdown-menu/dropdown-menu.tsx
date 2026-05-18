import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../lib/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}

/**
 * DropdownMenuContent — the canonical menu surface.
 *
 *   bg-surface-overlay + rounded-lg + shadow-elev-2 + 4 px padding inside,
 *   menu items use rounded-sm (4 px) tightly fit to the menu container.
 *
 * Lives at `--z-popover` (100) — DropdownMenu, ContextMenu, Combobox,
 * Popover, HoverCard all share this tier per Z-Index.md.
 */
export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...rest
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-popover",
          "min-w-[12rem]",
          "p-1",
          "rounded-lg",
          "bg-surface-overlay text-fg-default",
          "shadow-elev-2",
          "outline-none",
          // Enter / exit transitions.
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Inset the label start side to align with checkbox/radio items in a mixed group. */
  inset?: boolean;
  /** Apply destructive styling (red text). Use only for irreversible actions like Delete. */
  destructive?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}

/**
 * DropdownMenuItem — hover/focus highlight matches the selected-row pattern
 * from States.md: bg-accent-bg-subtle + text-accent-text (mouseover and
 * keyboard nav use the same highlight state — Radix uses `data-[highlighted]`).
 */
export function DropdownMenuItem({
  className,
  inset,
  destructive,
  ref,
  ...rest
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex select-none items-center gap-2",
        "px-2 py-1.5",
        "rounded-sm",
        "text-body-sm",
        destructive ? "text-danger-text" : "text-fg-default",
        "cursor-pointer",
        "outline-none",
        // Hover + keyboard highlight (Radix sets data-[highlighted]).
        destructive
          ? "data-[highlighted]:bg-danger-bg-subtle data-[highlighted]:text-danger-text"
          : "data-[highlighted]:bg-accent-bg-subtle data-[highlighted]:text-accent-text",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        inset ? "ps-8" : null,
        className,
      )}
      {...rest}
    />
  );
}

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}

/**
 * DropdownMenuLabel — uppercase eyebrow group label (text-label-xs per
 * Foundation §5). Non-interactive — pure visual separator/header.
 */
export function DropdownMenuLabel({
  className,
  ref,
  ...rest
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5",
        "text-label-xs text-fg-muted",
        className,
      )}
      {...rest}
    />
  );
}

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Separator>>;
}

export function DropdownMenuSeparator({
  className,
  ref,
  ...rest
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(
        "-mx-1 my-1 h-px",
        "bg-border-divider",
        className,
      )}
      {...rest}
    />
  );
}

/**
 * DropdownMenuShortcut — keyboard-shortcut text aligned to the menu-item
 * end side. Plain muted text by default; wrap in `<Kbd>` for the boxed
 * shortcut style.
 */
export function DropdownMenuShortcut({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ms-auto",
        "text-label-xs text-fg-muted",
        className,
      )}
      {...rest}
    />
  );
}
