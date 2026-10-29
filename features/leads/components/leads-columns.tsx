"use client";

import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

import { type DataTableFeatures } from "@/components/table/data-table-features";
import { Badge } from "@/components/ui/badge";
import type { LeadListItem } from "../schemas/lead-list-schema";

const columnHelper = createColumnHelper<DataTableFeatures, LeadListItem>();

function enumLabel(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
}

function statusVariant(status: LeadListItem["status"]) {
  switch (status) {
    case "NEW":
      return "info" as const;
    case "TELECALLERASSIGNED":
    case "COUNSELORASSIGNED":
      return "secondary" as const;
    case "INTERESTED":
    case "COUNSELLING":
      return "info" as const;
    case "CONVERTED":
      return "success" as const;
    case "NOT_INTERESTED":
    case "REJECTED":
      return "neutral" as const;
    case "JUST_INFO":
    case "COLD":
      return "warning" as const;
    case "NOT_PICKED":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
}

export const leadsColumns = columnHelper.columns([
  columnHelper.accessor("clientName", {
    id: "clientName",
    header: ({ column }) => (
      <button type="button" className="inline-flex items-center font-medium" onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
        Lead <ArrowUpDown className="ml-2 size-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="min-w-[170px] max-w-[220px]">
        <p className="truncate font-medium text-foreground">{row.original.clientName}</p>
        <p className="truncate font-mono text-[11px] text-muted-foreground" title={row.original.leadCode}>{row.original.leadCode}</p>
      </div>
    ),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    enableSorting: false,
    cell: ({ row }) => <span className="whitespace-nowrap text-sm">{row.original.phone || "—"}</span>,
  }),
  columnHelper.accessor("applicationType", {
    header: "Interest",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge variant="default">
        {row.original.applicationType === null ? "—" : row.original.applicationType === "STUDY" ? "Study Abroad" : "Tourist Visa"}
      </Badge>
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <button type="button" className="inline-flex items-center font-medium" onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
        Status <ArrowUpDown className="ml-2 size-4" />
      </button>
    ),
    cell: ({ row }) => <Badge variant={statusVariant(row.original.status)}>{enumLabel(row.original.status)}</Badge>,
  }),
  columnHelper.accessor("assignmentType", {
    header: "Queue",
    enableSorting: false,
    cell: ({ row }) => <span className="whitespace-nowrap text-sm">{row.original.assignmentType ? enumLabel(row.original.assignmentType) : "Unassigned"}</span>,
  }),
  columnHelper.accessor((row) => row.assignedTo?.name ?? "", {
    id: "assignedTo",
    header: "Assigned To",
    enableSorting: false,
    cell: ({ row }) => (
      <span className={row.original.assignedTo ? "text-sm text-foreground" : "text-sm text-muted-foreground"}>
        {row.original.assignedTo?.name ?? "Unassigned"}
      </span>
    ),
  }),
  columnHelper.accessor("source", {
    header: ({ column }) => (
      <button type="button" className="inline-flex items-center font-medium" onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
        Source <ArrowUpDown className="ml-2 size-4" />
      </button>
    ),
    cell: ({ row }) => <span className="whitespace-nowrap text-sm">{enumLabel(row.original.source)}</span>,
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <button type="button" className="inline-flex items-center font-medium" onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
        Created <ArrowUpDown className="ml-2 size-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="space-y-0.5 whitespace-nowrap">
        <p className="text-sm">{format(new Date(row.original.createdAt), "dd MMM yyyy")}</p>
        <p className="text-xs text-muted-foreground">{format(new Date(row.original.createdAt), "hh:mm a")}</p>
      </div>
    ),
  }),
]);
