"use client";

import { ArrowUpDown } from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

import { type DataTableFeatures } from "@/components/table/data-table-features";

import type { OfficeReportListItem } from "../schemas/office-reports-schema";

import { dateStringToLocalDate } from "@/lib/date-range";
import { Badge } from "@/components/ui/badge";
import OfficeReportActions from "./office-report-actions";

const columnHelper = createColumnHelper<
  DataTableFeatures,
  OfficeReportListItem
>();

export const reportsColumns = columnHelper.columns([
  columnHelper.accessor("reportDate", {
    header: ({ column }) => (
      <div className="w-36">
        <button
          type="button"
          className="inline-flex items-center font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Report Date
          <ArrowUpDown className="ml-2 size-4" />
        </button>
      </div>
    ),

    cell: ({ row }) => {
      const date = dateStringToLocalDate(row.original.reportDate);

      return (
        <div className="space-y-0.5">
          <p className="font-medium text-foreground">
            {format(date, "dd MMM yyyy")}
          </p>

          <p className="text-xs text-muted-foreground">
            {format(date, "EEEE")}
          </p>
        </div>
      );
    },
  }),
  columnHelper.accessor("okChecks", {
    header: "OK",
    cell: ({ row }) => (
      <Badge variant="success">
        <span className="font-medium">{row.original.okChecks}</span>
      </Badge>
      
    ),
  }),

  columnHelper.accessor("issueChecks", {
    header: "Issues",
    cell: ({ row }) =>
      row.original.issueChecks > 0 ? (
        <Badge variant="danger">
          {row.original.issueChecks}
        </Badge>
      ) : (
       <Badge variant="info">
          {row.original.issueChecks}          
        </Badge>
      ),
  }),

  columnHelper.accessor("naChecks", {
    header: "N/A",
    cell: ({ row }) => (
      <Badge variant="info">{row.original.naChecks}</Badge>
    ),
  }),

  columnHelper.accessor("followUpRequired", {
    header: "Follow Ups",
    cell: ({ row }) => (row.original.followUpRequired 
      ?  <Badge variant="warning">{row.original.followUpRequired}</Badge>
      :  <Badge variant="info">{row.original.followUpRequired}</Badge>
    ),
  }),
  // columnHelper.accessor("generalNotes", {
  //   header: "Notes",

  //   enableSorting: false,
  //   cell: ({ row }) => {
  //     const notes = row.original.generalNotes;

  //     return <div className="w-40">
  //       {notes ? (
  //       <div className="max-w-sm truncate text-sm">{notes}</div>
  //     ) : (
  //       <Badge variant="outline" >—</Badge>
  //     )}
  //     </div>
  //   },
  // }),

  columnHelper.accessor((row) => row.createdBy.name, {
    id: "createdBy",

    header: ({ column }) => (
      <button
        type="button"
        className="inline-flex items-center font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Reported By
        <ArrowUpDown className="ml-2 size-4" />
      </button>
    ),

    cell: ({ row }) => (
      <span className="text-sm">{row.original.createdBy.name}</span>
    ),
  }),

  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <button
        type="button"
        className="inline-flex items-center font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created
        <ArrowUpDown className="ml-2 size-4" />
      </button>
    ),

    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="text-sm">
          {format(new Date(row.original.createdAt), "dd MMM yyyy")}
        </p>

        <p className="text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "hh:mm a")}
        </p>
      </div>
    ),
  }),
  columnHelper.display({
  id: "actions",
  header: "Action",

  cell: ({ row }) => (
    <OfficeReportActions
      report={row.original}
    />
  ),
}),
]);
