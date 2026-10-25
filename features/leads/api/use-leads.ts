"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getLeads } from "./get-leads";
import { leadKeys } from "./lead-query-keys";

export type UseLeadsParams = {
  from: string;
  to: string;
  pageIndex: number;
  pageSize: number;
  search?: string;
  status?: string;
  applicationType?: string;
  preferredCountry?: string;
  assignmentScope?: "ALL" | "ASSIGNED" | "UNASSIGNED";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export function useLeads({
  from,
  to,
  pageIndex,
  pageSize,
  search = "",
  status,
  applicationType,
  preferredCountry,
  assignmentScope = "ALL",
  sortBy = "createdAt",
  sortOrder = "desc",
}: UseLeadsParams) {
  return useQuery({
    queryKey: leadKeys.list({
      from,
      to,
      pageIndex,
      pageSize,
      search,
      status: status ?? null,
      applicationType: applicationType ?? null,
      preferredCountry: preferredCountry ?? null,
      assignmentScope,
      sortBy,
      sortOrder,
    }),

    queryFn: () =>
      getLeads({
        from,
        to,
        pageIndex,
        pageSize,
        search,
        status,
        applicationType,
        preferredCountry,
        assignmentScope,
        sortBy,
        sortOrder,
      }),

    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    retry: false,
  });
}
