"use client";

import * as React from "react";

import type {
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/features/users/components/data-table-skelton";

// import { useLeads } from "../api/use-leads";
import { useLeadSheet } from "../store/use-lead-sheet";
// import { leadsColumns } from "./leads-columns";

type LeadsTableProps = {
  from: string;
  to: string;
};

export default function LeadsTable({
  from,
  to,
}: LeadsTableProps) {
  const onOpen = useLeadSheet(
    (state) => state.onOpen,
  );

  const [pagination, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  React.useEffect(() => {
    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }, [from, to]);

  const sort = sorting[0];

  const sortBy = sort?.id ?? "createdAt";
  const sortOrder = sort?.desc ? "desc" : "asc";

  // const {
  //   data,
  //   isPending,
  //   isFetching,
  //   isError,
  //   refetch,
  // } = useLeads({
  //   from,
  //   to,
  //   pageIndex: pagination.pageIndex,
  //   pageSize: pagination.pageSize,
  //   sortBy,
  //   sortOrder,
  // });

  // if (isPending) {
  //   return <DataTableSkeleton />;
  // }

  // if (isError) {
  //   return (
  //     <div className="flex min-h-[320px] items-center justify-center rounded-xl border bg-card">
  //       <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
  //         <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
  //           <AlertCircle className="size-5 text-destructive" />
  //         </div>

  //         <h3 className="text-sm font-semibold text-foreground">
  //           Unable to load leads
  //         </h3>

  //         <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
  //           We couldn't retrieve the leads. Please try again.
  //         </p>

  //         <Button
  //           variant="outline"
  //           size="sm"
  //           className="mt-5"
  //           onClick={() => refetch()}
  //         >
  //           <RefreshCw className="mr-2 size-4" />
  //           Try again
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="my-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Leads
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage leads, assignments, and follow-ups.
          </p>
        </div>

        <Button
          size="default"
          onClick={() => onOpen("new")}
          className="w-full sm:w-auto"
        >
          Add Lead
        </Button>
      </div>

      {/* <DataTable
        columns={leadsColumns}
        data={data?.leads ?? []}
        emptyMessage="No leads found for the selected period."
        manualPagination
        rowCount={data?.pagination.total ?? 0}
        pagination={pagination}
        onPaginationChange={(updater) => {
          setPagination((previous) =>
            updater instanceof Function
              ? updater(previous)
              : updater,
          );
        }}
        sorting={sorting}
        onSortingChange={(updater) => {
          setSorting((previous) =>
            updater instanceof Function
              ? updater(previous)
              : updater,
          );

          setPagination((previous) => ({
            ...previous,
            pageIndex: 0,
          }));
        }}
        isFetching={isFetching}
        showSearch={false}
        showDeleteAction={false}
      /> */}
    </div>
  );
}