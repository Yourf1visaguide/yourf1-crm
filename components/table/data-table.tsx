"use client";
import * as React from "react";
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
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

import { SearchX } from "lucide-react";
import { features, type DataTableFeatures } from "./data-table-features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./pagination";
import { useNewUserSheet } from "@/features/users/store/use-new-user-sheet";

interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  emptyMessage?: string;
}

export function DataTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  emptyMessage = "No results found.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const rows = table.getRowModel().rows;
  const { onOpen } = useNewUserSheet();

  return (
    <>
    <div>
          <div className="flex flex-col justify-end items-end mb-8 gap-y-4">
          <Button variant="default" size="lg" onClick={onOpen}  >Add New User</Button>
          
        </div>
        </div>
      <div className=" md:flex justify-between items-center pb-4">
        {/* Filter box and Delete button */}
        
        <Input
          type="text"
          placeholder="Search By Name"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm shadow-sm"
        />

        {/* columns and delete button */}
        <div className="flex gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" className="ml-auto" />}
            >
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete Button */}
          
          <Button>
            Delete {table.getFilteredSelectedRowModel().rows.length}{" "}
            {table.getFilteredSelectedRowModel().rows.length > 1
              ? "rows"
              : "row"}{" "}
          </Button>
        </div>
      </div>

      {/* //Table */}
      <div className="w-full overflow-hidden rounded-md border border-border/70 bg-card shadow-sm">
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
