"use client";

import {  getOfficeReports } from "./get-office-reports";
import {   officeReportKeys } from "./office-report-query-keys";
import { keepPreviousData, useQuery, } from "@tanstack/react-query";

type UseOfficeReportsParams = {
  from: string;
  to: string;
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export function useOfficeReports({
  from,
  to,
  pageIndex,
  pageSize,
  sortBy = "reportDate",
  sortOrder = "desc",
}: UseOfficeReportsParams) {
  return useQuery({
    queryKey: officeReportKeys.list({
      from,
      to,
      pageIndex,
      pageSize,
      sortBy,
      sortOrder,
    }),

    queryFn: () =>
      getOfficeReports({
        from,
        to,
        pageIndex,
        pageSize,
        sortBy,
        sortOrder,
      }),

    placeholderData: keepPreviousData,

    staleTime: 30 * 1000,

    retry: false,
  });
}