"use client";

import * as React from "react";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { AlertCircle, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/features/users/components/data-table-skelton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationType, Country, LeadAssignmentType, LeadStatus } from "@/prisma/generated/prisma/enums";

import { useLeadSheet } from "../store/use-lead-sheet";
import { useLeads } from "../api/use-leads";
import { leadsColumns } from "./leads-columns";
import CountTab from "./count-tab";

type AssignmentScope = "ALL" | "ASSIGNED" | "UNASSIGNED";
type StatusFilter = "ALL" | LeadStatus;
type LeadSortBy =
  | "status"
  | "clientName"
  | "phone"
  | "source"
  | "createdAt";

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: LeadStatus.NEW, label: "New" },
  { value: LeadStatus.TELECALLERASSIGNED, label: "Telecaller Assigned" },
  // { value: LeadStatus.NOT_PICKED, label: "Not Picked" },
  // { value: LeadStatus.NOT_INTERESTED, label: "Not Interested" },
  // { value: LeadStatus.INTERESTED, label: "Interested" },
  // { value: LeadStatus.JUST_INFO, label: "Just Info" },
  { value: LeadStatus.COUNSELORASSIGNED, label: "Counselor Assigned" },
  // { value: LeadStatus.COUNSELLING, label: "Counselling" },
  { value: LeadStatus.COLD, label: "Cold" },
  { value: LeadStatus.CONVERTED, label: "Converted" },
  { value: LeadStatus.REJECTED, label: "Rejected" },
];

function enumLabel(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function LeadsTable({ from, to }: { from: string; to: string }) {
  const router = useRouter();
  const onOpen = useLeadSheet((state) => state.onOpen);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [status, setStatus] = React.useState<StatusFilter>("ALL");
  const [assignmentScope, setAssignmentScope] = React.useState<AssignmentScope>("ALL");
  const [assignmentType, setAssignmentType] = React.useState<"ALL" | LeadAssignmentType>("ALL");
  const [applicationType, setApplicationType] = React.useState<"ALL" | ApplicationType>("ALL");
  const [preferredCountry, setPreferredCountry] = React.useState<"ALL" | Country>("ALL");

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    setPagination((previous) => ({ ...previous, pageIndex: 0 }));
  }, [from, to, status, assignmentScope, assignmentType, applicationType, preferredCountry, debouncedSearch]);

const sort = sorting[0];

const allowedSortFields = [
  "status",
  "clientName",
  "phone",
  "source",
  "createdAt",
] as const satisfies readonly LeadSortBy[];

const sortBy: LeadSortBy = allowedSortFields.includes(
  sort?.id as LeadSortBy,
)
  ? (sort!.id as LeadSortBy)
  : "createdAt";

const sortOrder = sort?.desc ? "desc" : "asc";
  const { data, isPending, isFetching, isError, refetch } = useLeads({
    from,
    to,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: debouncedSearch,
    status: status === "ALL" ? undefined : status,
    assignmentType: assignmentType === "ALL" ? undefined : assignmentType,
    applicationType: applicationType === "ALL" ? undefined : applicationType,
    preferredCountry: preferredCountry === "ALL" ? undefined : preferredCountry,
    assignmentScope,
    sortBy,
    sortOrder,
  });

  const hasFilters = assignmentType !== "ALL" || applicationType !== "ALL" || preferredCountry !== "ALL";
  function clearFilters() {
    setAssignmentType("ALL");
    setApplicationType("ALL");
    setPreferredCountry("ALL");
  }

  if (isPending) return <DataTableSkeleton columns={8} />;

  if (isError) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border bg-card">
        <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-5 text-destructive" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Unable to load leads</h3>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">We couldn't retrieve the leads. Please try again.</p>
          <Button variant="outline" size="sm" className="mt-5" onClick={() => refetch()}>
            <RefreshCw className="mr-2 size-4" /> Try again
          </Button>
        </div>
      </div>
    );
  }

  const counts = data?.counts;

  return (
    <div>
      <div className="my-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">Manage leads, assignments, and follow-ups.</p>
        </div>
        <Button size="default" onClick={() => onOpen("new")} className="w-full sm:w-auto">Add Lead</Button>
      </div>

      <div className="mb-5 space-y-2">
        <div className="hidden overflow-x-auto lg:block">
          <div className="inline-flex min-w-full items-center gap-1 rounded-xl p-1">
            <CountTab active={status === "ALL"} label="All" count={counts?.all ?? 0} onClick={() => setStatus("ALL")} />
            {statusOptions.map((option) => (
              <CountTab
                key={option.value}
                active={status === option.value}
                label={option.label}
                count={counts?.status[option.value] ?? 0}
                onClick={() => setStatus(option.value)}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-2 lg:hidden">
          <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Lead status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses · {counts?.all ?? 0}</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} · {counts?.status[option.value] ?? 0}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-5 flex flex-col justify-end gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {hasFilters && (
          <Button type="button" variant="ghost" onClick={clearFilters} className="w-full sm:w-auto">
            <X className="mr-2 size-4" /> Clear filters
          </Button>
        )}
        <Select value={assignmentType} onValueChange={(value) => setAssignmentType(value as "ALL" | LeadAssignmentType)}>
          <SelectTrigger className="w-full sm:w-[190px]"><SelectValue placeholder="Assignment type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All assignment types</SelectItem>
            <SelectItem value={LeadAssignmentType.TELECALLING}>Telecalling</SelectItem>
            <SelectItem value={LeadAssignmentType.COUNSELLING}>Counselling</SelectItem>
          </SelectContent>
        </Select>

        <Select value={applicationType} onValueChange={(value) => setApplicationType(value as "ALL" | ApplicationType)}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Application" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All applications</SelectItem>
            <SelectItem value={ApplicationType.STUDY}>Study Abroad</SelectItem>
            <SelectItem value={ApplicationType.TOURIST}>Tourist Visa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={preferredCountry} onValueChange={(value) => setPreferredCountry(value as "ALL" | Country)}>
          <SelectTrigger className="w-full sm:w-[220px]"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All countries</SelectItem>
            {Object.values(Country).map((country) => (
              <SelectItem key={country} value={country}>{enumLabel(country)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        
      </div>

      <DataTable
        columns={leadsColumns}
        data={data?.leads ?? []}
        emptyMessage="No leads found for the selected period."
        manualPagination
        rowCount={data?.pagination.total ?? 0}
        pagination={pagination}
        onPaginationChange={(updater) => setPagination((previous) => updater instanceof Function ? updater(previous) : updater)}
        sorting={sorting}
        onSortingChange={(updater) => {
          setSorting((previous) => updater instanceof Function ? updater(previous) : updater);
          setPagination((previous) => ({ ...previous, pageIndex: 0 }));
        }}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search name, phone, email or country..."
        isFetching={isFetching}
        showSearch
        showDeleteAction={false}
        onRowClick={(lead) => router.push(`/leads/${lead.id}`)}
      />
    </div>
  );
}
