import * as React from "react";
import {
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { cn } from "../lib/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export interface DataTableProps<TData> {
  /**
   * A `@tanstack/react-table` instance. Consumer creates it via
   * `useReactTable({ data, columns, getCoreRowModel, getSortedRowModel, … })`
   * and passes the result here. All sorting / filtering / pagination /
   * row-selection logic lives at the consumer; DataTable is the renderer.
   */
  table: TanstackTable<TData>;
  /** Body shown when `table.getRowModel().rows` is empty. Default `"No results."`. */
  emptyMessage?: React.ReactNode;
  className?: string;
}

/**
 * DataTable — TanStack Table renderer.
 *
 * Thin composition over the `Table` primitives. Wires up:
 *   - Header groups → `<TableHeader>` rows
 *   - Body rows → `<TableRow>`s with `data-state="selected"` synced from `row.getIsSelected()`
 *   - Empty state when no rows match the current filter / pagination
 *
 * For sorting affordances in headers, your `columnDef.header` should render
 * a button that calls `column.toggleSorting()`. See the stories for the
 * canonical recipe.
 */
export function DataTable<TData>({
  table,
  emptyMessage = "No results.",
  className,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const columnCount = table.getAllColumns().length;

  return (
    <Table className={cn(className)}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="hover:bg-transparent data-[state=selected]:bg-transparent"
          >
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() ? "selected" : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={columnCount}
              className="h-24 text-center text-fg-muted"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
