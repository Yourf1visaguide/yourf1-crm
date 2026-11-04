"use client";

import { createColumnHelper } from "@tanstack/react-table";

import {
  ArrowUpDown,
} from "lucide-react";

import {
  type DataTableFeatures,
} from "@/components/table/data-table-features";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type {
  BranchIntegrationListItem,
} from "../types";

import IntegrationActions from "./integration-actions";

const columnHelper =
  createColumnHelper<
    DataTableFeatures,
    BranchIntegrationListItem
  >();

type ColumnHandlers = {
  onView: (integration: BranchIntegrationListItem) => void;
  onEdit: (integration: BranchIntegrationListItem) => void;
  onDelete: (integration: BranchIntegrationListItem) => void;
  onToggle: (integration: BranchIntegrationListItem) => void;
};

function providerLabel(provider: string) {
  switch (provider) {
    case "SUKAM_IVR":
      return "Sukam IVR";

    case "META_WHATSAPP":
      return "Meta WhatsApp";

    default:
      return provider;
  }
}

export function createIntegrationColumns(
  handlers: ColumnHandlers,
) {
  return columnHelper.columns([
    columnHelper.accessor("displayName", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
        >
          Integration
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <div className="min-w-36">
          <p className="font-medium text-foreground">
            {row.original.displayName}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {providerLabel(row.original.provider)}
          </p>
        </div>
      ),
    }),

    columnHelper.accessor("branch.name", {
      id: "branch",
      header: "Branch",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.branch.name}
        </span>
      ),
    }),

    columnHelper.accessor("phoneNumber", {
      header: "Phone number",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {row.original.phoneNumber}
        </span>
      ),
    }),

    columnHelper.accessor("providerEndpointId", {
      header: "Provider endpoint ID",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="block max-w-44 truncate font-mono text-xs text-muted-foreground">
          {row.original.providerEndpointId}
        </span>
      ),
    }),

    columnHelper.accessor("hasCredentials", {
      header: "Credentials",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.hasCredentials ? (
          <Badge variant="success">
            Configured
          </Badge>
        ) : (
          <Badge variant="warning">
            Missing
          </Badge>
        ),
    }),

    columnHelper.accessor("isActive", {
      header: "Status",
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge variant="success">
            Active
          </Badge>
        ) : (
          <Badge variant="neutral">
            Inactive
          </Badge>
        ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Action",

      cell: ({ row }) => (
        <IntegrationActions
          integration={row.original}
          {...handlers}
        />
      ),
    }),
  ]);
}