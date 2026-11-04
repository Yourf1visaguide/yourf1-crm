"use client";

import * as React from "react";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/features/users/components/data-table-skelton";

import {
  createIntegrationColumns,
} from "./columns";

import type {
  BranchIntegrationListItem,
} from "../types";

import {
  useBranchIntegrations,
} from "../api/use-branch-integrations";

type Props = {
  branchId: string | null;
  onAdd: () => void;
  onView: (integration: BranchIntegrationListItem) => void;
  onEdit: (integration: BranchIntegrationListItem) => void;
  onDelete: (integration: BranchIntegrationListItem) => void;
  onToggle: (integration: BranchIntegrationListItem) => void;
};

export default function IntegrationsTable({
  branchId,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  const [search, setSearch] = React.useState("");

  const {
    data,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useBranchIntegrations(branchId);

  const columns = React.useMemo(
    () =>
      createIntegrationColumns({
        onView,
        onEdit,
        onDelete,
        onToggle,
      }),
    [onView, onEdit, onDelete, onToggle],
  );

  if (isPending) {
    return <DataTableSkeleton columns={6} />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border bg-card">
        <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-5 text-destructive" />
          </div>

          <h3 className="text-sm font-semibold text-foreground">
            Unable to load integrations
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            We couldn't retrieve the integration configurations.
            Check your access and try again.
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={() => refetch()}
          >
            <RefreshCw className="mr-2 size-4" />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const integrations = data ?? [];

  const normalizedSearch = search.trim().toLowerCase();

  const filteredIntegrations = integrations.filter(
    (integration) => {
      if (!normalizedSearch) return true;

      return [
        integration.displayName,
        integration.branch.name,
        integration.phoneNumber,
        integration.providerEndpointId,
        integration.providerAccountId ?? "",
        integration.provider,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    },
  );

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">
            Configured integrations
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {integrations.length} integration
            {integrations.length === 1 ? "" : "s"} configured
          </p>
        </div>

        <Button
          onClick={onAdd}
          className="w-full sm:w-auto"
        >
          Add integration
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredIntegrations}
        emptyMessage={
          normalizedSearch
            ? "No integrations match your search."
            : "No integrations have been configured yet."
        }
        getRowId={(row) => row.id}
        showDeleteAction={false}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search integrations..."
        isFetching={isFetching}
      />
    </div>
  );
}