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
import { StatusBadge } from "@/components/resuable-components/status-badge";
import EmployeeActions from "./actions";

const columnHelper = createColumnHelper<DataTableFeatures, EmployeeListItem>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",

    header: ({ table }) => (
      <div className=" w-8 ">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
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
      <div className=" w-36 text-wrap">{row.getValue("employeeCode")}</div>
    ),
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
      <div className=" w-40 text-wrap">{row.getValue("name")}</div>
    ),
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

    cell: ({ row }) => <StatusBadge status={row.original.employmentStatus} />,
  }),

  columnHelper.display({
    id: "actions",
    header: "Action",

    cell: ({ row }) => <EmployeeActions employeeId={row.original.id} />,
  }),
]);
