"use client";

import * as React from "react";

import { DataTable } from "@/components/table/data-table";

import { columns } from "./columns";

import { useEmployees } from "../api/use-employees";
import { SortingState } from "@tanstack/react-table";
import type { RowSelectionState } from "@tanstack/react-table";

import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useDeactivateUsers } from "../api/use-deactivate-users";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableSkeleton } from "./data-table-skelton";
import { useNewUserSheet } from "../store/use-new-user-sheet";

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

  const { data, isPending, isFetching, isError, refetch } = useEmployees({
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
  const { onOpen } = useNewUserSheet();

  if (isPending) {
    return <DataTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border bg-card ">
        <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-5 text-destructive" />
          </div>

          <h3 className="text-sm font-semibold text-foreground">
            Unable to load employees
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            We couldn't retrieve the employee list. Please try again.
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

  return (
    <div className="">
      <div className="flex flex-col gap-4 my-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Employees
          </h1>

          <p className="text-sm text-muted-foreground">"Manage employees, roles, schedules and access."</p>
        </div>

        <Button size="default" onClick={onOpen} className="w-full sm:w-auto">
          Add Employee
        </Button>
      </div>
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
    </div>
  );
}
