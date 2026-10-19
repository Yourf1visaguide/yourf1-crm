"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getOfficeReportSummary,
} from "./get-office-report-summary";

import {
  officeReportKeys,
} from "./office-report-query-keys";

type UseOfficeReportSummaryParams = {
  from: string;
  to: string;
};

export function useOfficeReportSummary({
  from,
  to,
}: UseOfficeReportSummaryParams) {
  return useQuery({
    queryKey:
      officeReportKeys.summary({
        from,
        to,
      }),

    queryFn: () =>
      getOfficeReportSummary({
        from,
        to,
      }),

    staleTime: 30 * 1000,

    retry: false,
  });
}