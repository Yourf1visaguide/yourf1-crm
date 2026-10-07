"use client";

import {
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";

import {
  type DataTableFeatures,
} from "@/components/table/data-table-features";

import type {
  EmployeeListItem,
} from "@/features/users/types";

import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const columnHelper =
  createColumnHelper<DataTableFeatures, EmployeeListItem>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("employeeCode", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Employee ID
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("department", {
    header: "Department",
  }),

  columnHelper.accessor("designation", {
    header: "Designation",
    cell: ({ row }) =>
      row.original.designation ?? "—",
  }),

  columnHelper.accessor("user.email", {
    id: "email",
    header: "Email",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.user.email,
  }),

  columnHelper.accessor("employmentStatus", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Status
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Action",

    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="size-8 p-0"
              />
            }
          >
            <span className="sr-only">
              Open menu
            </span>

            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Actions
              </DropdownMenuLabel>

              <DropdownMenuItem>
                View profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                Edit employee
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                Copy employee ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);