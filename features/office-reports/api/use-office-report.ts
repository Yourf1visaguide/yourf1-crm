"use client";

import { useQuery } from "@tanstack/react-query";

import { getOfficeReport } from "./get-office-report";
import { officeReportKeys } from "./office-report-query-keys";

export function useOfficeReport(
  id: string | null,
) {
  return useQuery({
    queryKey: id
      ? officeReportKeys.detail(id)
      : [...officeReportKeys.details(), "empty"],

    queryFn: () => {
      if (!id) {
        throw new Error(
          "Office report ID is required.",
        );
      }

      return getOfficeReport(id);
    },

    enabled: Boolean(id),

    staleTime: 30 * 1000,

    retry: false,
  });
}