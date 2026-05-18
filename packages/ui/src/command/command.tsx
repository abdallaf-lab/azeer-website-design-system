import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";

export interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive>>;
}

/**
 * Command — cmdk wrapper.
 *
 * The reusable foundation under `Combobox`, `MultiSelect`, and (later)
 * `CommandPalette`. cmdk owns the filtering / keyboard / selection state;
 * we provide DS-tokenized chrome.
 *
 * Highlight on focused / hovered item uses cmdk's `data-[selected=true]`
 * (different from Radix's `data-[highlighted]`) — same visual payload:
 * `accent-bg-subtle` + `accent-text` per the menu-row canon in States.md.
 */
export function Command({ className, ref, ...rest }: CommandProps) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex flex-col h-full",
        "rounded-lg",
        "bg-surface-overlay text-fg-default",
        "outline-none",
        className,
      )}
      {...rest}
    />
  );
}

export interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Input>>;
}

export function CommandInput({ className, ref, ...rest }: CommandInputProps) {
  return (
    <div
      className="flex items-center gap-2 border-b border-border-divider px-3"
      cmdk-input-wrapper=""
    >
      <Icon icon={Search} size={14} className="text-fg-muted shrink-0" aria-hidden="true" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-10 w-full bg-transparent outline-none",
          "text-body-md text-fg-default",
          "placeholder:text-fg-subtle",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...rest}
      />
    </div>
  );
}

export interface CommandListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.List>>;
}

export function CommandList({ className, ref, ...rest }: CommandListProps) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto p-1", className)}
      {...rest}
    />
  );
}

export interface CommandEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Empty>>;
}

export function CommandEmpty({ className, ref, ...rest }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn("py-6 text-center text-body-sm text-fg-muted", className)}
      {...rest}
    />
  );
}

export interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Group>>;
}

/**
 * CommandGroup — semantic group with an optional `heading` prop that
 * renders as an uppercase eyebrow (text-label-xs) inside the group.
 * cmdk styles the heading via `[cmdk-group-heading]`.
 */
export function CommandGroup({ className, ref, ...rest }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-fg-default",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:text-label-xs [&_[cmdk-group-heading]]:text-fg-muted",
        className,
      )}
      {...rest}
    />
  );
}

export interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Item>>;
}

/**
 * CommandItem — focused/hovered row uses `data-[selected=true]` (cmdk's
 * own attribute) for the highlight. We map both mouse-hover and keyboard-
 * focus to the same accent-tinted background — same one-state pattern as
 * DropdownMenu.
 */
export function CommandItem({ className, ref, ...rest }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex select-none items-center gap-2",
        "px-2 py-1.5",
        "rounded-sm",
        "text-body-sm text-fg-default",
        "cursor-pointer outline-none",
        "data-[selected=true]:bg-accent-bg-subtle data-[selected=true]:text-accent-text",
        "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
        className,
      )}
      {...rest}
    />
  );
}

export interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Separator>>;
}

export function CommandSeparator({
  className,
  ref,
  ...rest
}: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border-divider", className)}
      {...rest}
    />
  );
}
