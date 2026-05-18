import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpDown } from "lucide-react";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Badge,
  Button,
  Checkbox,
  DataTable,
  Icon,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@azeer/ui";

const meta: Meta = {
  title: "Primitives/Table",
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "Semantic table primitives + DataTable wrapper for TanStack Table",
    },
  },
};

export default meta;

type Story = StoryObj;

/* ─── 1. Static Table — primitives only ─────────────────────────────── */

export const Static: Story = {
  name: "Static — primitives only",
  render: () => (
    <Table>
      <TableCaption>Recent conversations</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Name</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-end">Last reply</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Sara Khan</TableCell>
          <TableCell>WhatsApp</TableCell>
          <TableCell><Badge variant="success">Active</Badge></TableCell>
          <TableCell className="text-end text-fg-muted">2 min ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ali Hassan</TableCell>
          <TableCell>Voice</TableCell>
          <TableCell><Badge variant="warning">Pending</Badge></TableCell>
          <TableCell className="text-end text-fg-muted">12 min ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maria Lopez</TableCell>
          <TableCell>Email</TableCell>
          <TableCell><Badge variant="neutral">Closed</Badge></TableCell>
          <TableCell className="text-end text-fg-muted">Yesterday</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/* ─── 2. DataTable — TanStack composition ───────────────────────────── */

type Conversation = {
  id: string;
  name: string;
  channel: "WhatsApp" | "Voice" | "SMS" | "Email";
  status: "open" | "snoozed" | "closed";
  unread: number;
};

const conversations: Conversation[] = [
  { id: "c1", name: "Sara Khan", channel: "WhatsApp", status: "open", unread: 2 },
  { id: "c2", name: "Ali Hassan", channel: "Voice", status: "open", unread: 0 },
  { id: "c3", name: "Maria Lopez", channel: "Email", status: "closed", unread: 0 },
  { id: "c4", name: "John Smith", channel: "WhatsApp", status: "snoozed", unread: 1 },
  { id: "c5", name: "Emma Stone", channel: "SMS", status: "open", unread: 5 },
  { id: "c6", name: "Liam Brown", channel: "Email", status: "closed", unread: 0 },
  { id: "c7", name: "Olivia Davis", channel: "WhatsApp", status: "open", unread: 3 },
  { id: "c8", name: "Noah Wilson", channel: "Voice", status: "snoozed", unread: 0 },
  { id: "c9", name: "Ava Miller", channel: "SMS", status: "open", unread: 1 },
  { id: "c10", name: "Mia Anderson", channel: "Email", status: "closed", unread: 0 },
  { id: "c11", name: "Sophia Thomas", channel: "WhatsApp", status: "open", unread: 4 },
  { id: "c12", name: "Isabella Jackson", channel: "Voice", status: "open", unread: 0 },
];

const statusBadge = {
  open: <Badge variant="success">Active</Badge>,
  snoozed: <Badge variant="warning">Snoozed</Badge>,
  closed: <Badge variant="neutral">Closed</Badge>,
};

const columns: ColumnDef<Conversation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <Icon icon={ArrowUpDown} size={14} aria-hidden="true" />
      </Button>
    ),
  },
  { accessorKey: "channel", header: "Channel" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => statusBadge[row.original.status],
  },
  {
    accessorKey: "unread",
    header: () => <div className="text-end">Unread</div>,
    cell: ({ row }) => (
      <div className="text-end tabular-nums">
        {row.original.unread > 0 ? row.original.unread : "—"}
      </div>
    ),
  },
];

export const WithTanStack: Story = {
  name: "DataTable — sortable + paginated",
  parameters: { layout: "padded", controls: { disable: true } },
  render: function DataTableStory() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
      data: conversations,
      columns,
      state: { sorting, globalFilter },
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: { pagination: { pageSize: 5 } },
    });

    return (
      <div className="flex flex-col gap-3" style={{ width: 720 }}>
        <Input
          placeholder="Filter by name…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          size="sm"
        />
        <div className="rounded-xl border border-border-default overflow-hidden">
          <DataTable table={table} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body-sm text-fg-muted">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            {" · "}
            {table.getSelectedRowModel().rows.length} selected
          </span>
          <Pagination
            page={table.getState().pagination.pageIndex + 1}
            pageCount={Math.max(1, table.getPageCount())}
            onPageChange={(p) => table.setPageIndex(p - 1)}
          />
        </div>
      </div>
    );
  },
};
