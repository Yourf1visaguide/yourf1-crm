"use client";

import { ArrowUpDown, MoreVertical } from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "@/components/table/data-table-features";

import type { EmployeeListItem } from "@/features/users/types";

import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarClock,
  Copy,
  Pencil,
  UserRound,
  UserX,
  WalletCards,
} from "lucide-react";

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

const columnHelper = createColumnHelper<DataTableFeatures, EmployeeListItem>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",

    header: ({ table }) => (
      <div className=" w-8 ">
        <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className=""
      />
      </div>
    ),

    cell: ({ row }) => (
      <div className="w-8 ">
          <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      </div>
    ),

    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("employeeCode", {
    header: ({ column }) => (
      <div className="w-36 ">
        <Button
        variant="ghost"
        className="pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employee ID
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-36 text-wrap">
        {row.getValue("employeeCode")} 
      </div>
    )
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => (
      <div className="w-40">

      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-40 text-wrap">
        {row.getValue("name")} 
      </div>
    )
  }),

  columnHelper.accessor("department", {
    header: "Department",
  }),

  columnHelper.accessor("designation", {
    header: "Designation",
    cell: ({ row }) => row.original.designation ?? "—",
  }),

  columnHelper.accessor("user.email", {
    id: "email",
    header: "Email",
    enableSorting: false,
    cell: ({ row }) => row.original.user.email,
  }),

  columnHelper.accessor("employmentStatus", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
            render={<Button variant="ghost" className="size-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>

            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-56 rounded-xl border border-border/60 bg-popover p-1.5 shadow-lg shadow-black/5"
          >
            {/* Primary */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm">
                <UserRound className="size-4 text-muted-foreground" />
                <span>View profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Employee management */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2.5 pb-1.5 pt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                Manage
              </DropdownMenuLabel>

              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
                <Pencil className="size-4 text-muted-foreground" />
                <span>Edit employee</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
                <WalletCards className="size-4 text-muted-foreground" />
                <span>Change salary</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
                <CalendarClock className="size-4 text-muted-foreground" />
                <span>Change schedule</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Utility */}
            <DropdownMenuItem className="gap-2.5 rounded-lg px-2.5 py-2">
              <Copy className="size-4 text-muted-foreground" />
              <span>Copy employee ID</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Destructive */}
            <DropdownMenuItem
              className="
                gap-2.5 rounded-lg px-2.5 py-2
                text-destructive
                focus:bg-destructive/10
                focus:text-destructive
              "
            >
              <UserX className="size-4" />
              <span>Deactivate employee</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
