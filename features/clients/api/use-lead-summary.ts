"use client";

import { useQuery } from "@tanstack/react-query";

import { getLeadSummary } from "./get-lead-summary";
import { leadKeys } from "./lead-query-keys";

type UseLeadSummaryParams = {
  from: string;
  to: string;
};

export function useLeadSummary({
  from,
  to,
}: UseLeadSummaryParams) {
  return useQuery({
    queryKey: leadKeys.summary({
      from,
      to,
    }),

    queryFn: () =>
      getLeadSummary({
        from,
        to,
      }),

    staleTime: 30 * 1000,
    retry: false,
  });
}
