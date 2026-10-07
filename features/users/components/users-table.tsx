"use client";

import * as React from "react";

import { DataTable } from "@/components/table/data-table";

import { columns } from "./columns";

import { useEmployees } from "../api/use-employees";
import { SortingState } from "@tanstack/react-table";
import type { RowSelectionState } from "@tanstack/react-table";

import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useDeactivateUsers } from "../api/use-deactivate-users";

export function UsersTable() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const { openConfirm } = useConfirmDialog();

  const deactivateUsers = useDeactivateUsers();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [search, setSearch] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const sort = sorting[0];

  const sortBy = sort?.id ?? "name";

  const sortOrder = sort?.desc ? "desc" : "asc";

  const { data, isPending, isFetching, isError } = useEmployees({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search,

    sortBy,
    sortOrder,
  });

  function handleDeactivateSelected() {
    const employeeIds = Object.keys(rowSelection);

    if (employeeIds.length === 0) {
      return;
    }

    openConfirm({
      title: `Deactivate ${employeeIds.length} employee${
        employeeIds.length === 1 ? "" : "s"
      }?`,

      description:
        "These employees will lose access to the CRM. Their historical HR, payroll, and other records will be preserved.",

      confirmLabel: "Deactivate",
      cancelLabel: "Cancel",

      variant: "destructive",

      onConfirm: async () => {
        await deactivateUsers.mutateAsync(employeeIds);

        setRowSelection({});
      },
    });
  }

  if (isPending) {
    return (
      <div className="rounded-md border p-10 text-center text-sm text-muted-foreground">
        Loading employees...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border p-10 text-center text-sm text-destructive">
        Failed to load employees.
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data?.employees ?? []}

      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}

      getRowId={(row) => row.id}

      onDeleteSelected={handleDeactivateSelected}
      deleteLabel="Deactivate"

      manualPagination
      rowCount={data?.pagination.total ?? 0}

      pagination={pagination}

      onPaginationChange={(updater) => {
        setPagination((previous) =>
          updater instanceof Function ? updater(previous) : updater,
        );

        // Selection is page-local.
        setRowSelection({});
      }}

      sorting={sorting}

      onSortingChange={(updater) => {
        setSorting((previous) =>
          updater instanceof Function ? updater(previous) : updater,
        );

        setPagination((previous) => ({
          ...previous,
          pageIndex: 0,
        }));

        setRowSelection({});
      }}

      search={search}

      onSearchChange={(value) => {
        setSearch(value);

        setPagination((previous) => ({
          ...previous,
          pageIndex: 0,
        }));

        setRowSelection({});
      }}

      isFetching={isFetching}
    />
  );
}
