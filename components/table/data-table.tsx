"use client";
import * as React from "react";
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type RowSelectionState,
  type OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Loader2, Search, SearchX, SlidersHorizontal } from "lucide-react";
import { features, type DataTableFeatures } from "./data-table-features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];

  emptyMessage?: string;

  manualPagination?: boolean;
  rowCount?: number;

  pagination?: {
    pageIndex: number;
    pageSize: number;
  };

  onPaginationChange?: (
    updater:
      | {
          pageIndex: number;
          pageSize: number;
        }
      | ((previous: { pageIndex: number; pageSize: number }) => {
          pageIndex: number;
          pageSize: number;
        }),
  ) => void;

  isFetching?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
  sorting?: SortingState;

  onSortingChange?: (
    updater: SortingState | ((old: SortingState) => SortingState),
  ) => void;
  rowSelection?: RowSelectionState;

  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  getRowId?: (row: TData) => string;

  onDeleteSelected?: (rows: TData[]) => void;

  deleteLabel?: string;
}
export function DataTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  emptyMessage = "No results found.",

  manualPagination = false,
  rowCount,

  pagination,
  onPaginationChange,

  sorting,
  onSortingChange,

  search = "",
  onSearchChange,

  rowSelection,
  onRowSelectionChange,

  getRowId,

  onDeleteSelected,
  deleteLabel = "Delete",

  isFetching = false,
}: DataTableProps<TData, TValue>) {
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  const [localSorting, setLocalSorting] = React.useState<SortingState>([]);

  const resolvedSorting = sorting ?? localSorting;

  const resolvedSortingChange = onSortingChange ?? setLocalSorting;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [localPagination, setLocalPagination] = React.useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    },
  );

  const resolvedPagination = pagination ?? localPagination;

  const resolvedPaginationChange = onPaginationChange ?? setLocalPagination;
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const [localRowSelection, setLocalRowSelection] =
    React.useState<RowSelectionState>({});

  const resolvedRowSelection = rowSelection ?? localRowSelection;

  const resolvedRowSelectionChange =
    onRowSelectionChange ?? setLocalRowSelection;
  const table = useTable({
    features,

    data,
    columns,

    getRowId,

    state: {
      sorting: resolvedSorting,
      columnFilters,
      columnVisibility,

      rowSelection: resolvedRowSelection,

      pagination: resolvedPagination,
    },

    onSortingChange: resolvedSortingChange,

    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: resolvedRowSelectionChange,

    onPaginationChange: resolvedPaginationChange,

    manualPagination,

    ...(manualPagination
      ? {
          rowCount: rowCount ?? 0,
        }
      : {}),
  });

  const rows = table.getRowModel().rows;

  return (
    <>
      {/* ===================================================== */}
      {/* TOOLBAR */}
      {/* ===================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(event) => {
              onSearchChange?.(event.target.value);

              if (manualPagination) {
                table.setPageIndex(0);
              }
            }}
            className="
              h-10
              bg-background
              pl-9
              shadow-sm
              focus-visible:ring-1
            "
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ">
          {/* Updating indicator */}
          {isFetching && (
            <div
              className="
                mr-1
                hidden
                items-center
                gap-1.5
                text-xs
                text-muted-foreground
                sm:flex
              "
              aria-live="polite"
            >
              <Loader2 className="size-3.5 animate-spin" />
              Updating
            </div>
          )}

          {/* Columns */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="default" className="gap-2" />
              }
            >
              <SlidersHorizontal className="size-4" />
              Columns
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Show columns
              </div>

              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Deactivate */}
          <Button
            variant="destructive"
            disabled={table.getSelectedRowModel().rows.length === 0}
            onClick={() => {
              const selectedRows = table
                .getSelectedRowModel()
                .rows.map((row) => row.original);

              onDeleteSelected?.(selectedRows);
            }}
          >
            {deleteLabel}

            {table.getSelectedRowModel().rows.length > 0 &&
              ` (${table.getSelectedRowModel().rows.length})`}
          </Button>
        </div>
      </div>

      {/* //Table */}
      <div className="w-full overflow-hidden  rounded-md border border-border/70 bg-card shadow-sm">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[720px]">
            {/* Table header */}
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-border/70 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 whitespace-nowrap px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* Table body */}
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    className="
                    group
                    border-b border-border/50
                    transition-colors duration-150
                    hover:bg-accent/50
                    data-[state=selected]:bg-primary/5
                    data-[state=selected]:hover:bg-primary/10
                    last:border-b-0
                  "
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-5 py-4 align-middle text-sm text-card-foreground"
                      >
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="h-64 px-6">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-border/70 bg-muted/60 text-muted-foreground">
                        <SearchX className="size-5" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {emptyMessage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filters.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </>
  );
}
