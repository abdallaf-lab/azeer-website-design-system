import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Table primitives — semantic `<table>` HTML with DS chrome.
 *
 * Use these standalone for static tables, or pass them through `DataTable`
 * with a `@tanstack/react-table` instance.
 *
 * Locked anatomy (Spacing.md per-surface defaults):
 *   - Row height 56 px via `h-row` (44 px under `data-density="compact"`)
 *   - Cell padding: `px-3` (12 px); vertical centering via `align-middle`
 *   - Header bg: surface-sunken; row border-bottom: border-divider
 *   - Header text: text-label-xs uppercase (eyebrow tier)
 *   - Cell text: text-body-md
 */

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  ref?: React.Ref<HTMLTableElement>;
}

export function Table({ className, ref, ...rest }: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-body-md", className)}
        {...rest}
      />
    </div>
  );
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

export function TableHeader({ className, ref, ...rest }: TableHeaderProps) {
  return (
    <thead
      ref={ref}
      className={cn(
        "border-b border-border-default bg-surface-sunken",
        className,
      )}
      {...rest}
    />
  );
}

export function TableBody({ className, ref, ...rest }: TableHeaderProps) {
  return <tbody ref={ref} className={cn("", className)} {...rest} />;
}

export function TableFooter({ className, ref, ...rest }: TableHeaderProps) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-border-default bg-surface-sunken",
        "text-label-md text-fg-default",
        className,
      )}
      {...rest}
    />
  );
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: React.Ref<HTMLTableRowElement>;
}

export function TableRow({ className, ref, ...rest }: TableRowProps) {
  return (
    <tr
      ref={ref}
      className={cn(
        "h-row border-b border-border-divider",
        "transition-colors duration-fast ease-standard",
        "hover:bg-state-hover",
        "data-[state=selected]:bg-accent-bg-subtle",
        className,
      )}
      {...rest}
    />
  );
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  ref?: React.Ref<HTMLTableCellElement>;
}

export function TableHead({ className, ref, ...rest }: TableHeadProps) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-ctrl-md px-3 text-start align-middle",
        "text-label-xs text-fg-muted",
        "uppercase font-semibold tracking-wider",
        "[&:has([role=checkbox])]:pe-0",
        className,
      )}
      {...rest}
    />
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  ref?: React.Ref<HTMLTableCellElement>;
}

export function TableCell({ className, ref, ...rest }: TableCellProps) {
  return (
    <td
      ref={ref}
      className={cn(
        "px-3 align-middle",
        "text-body-md text-fg-default tabular-nums",
        "[&:has([role=checkbox])]:pe-0",
        className,
      )}
      {...rest}
    />
  );
}

export function TableCaption({
  className,
  ref,
  ...rest
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.Ref<HTMLTableCaptionElement>;
}) {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-body-sm text-fg-muted", className)}
      {...rest}
    />
  );
}
