"use client";

import { useQuery } from "@tanstack/react-query";

import { getLeadInsights } from "./get-lead-insights";
import { leadKeys } from "./lead-query-keys";

export type UseLeadInsightsParams = {
  from: string;
  to: string;
};

export function useLeadInsights({
  from,
  to,
}: UseLeadInsightsParams) {
  return useQuery({
    queryKey: leadKeys.insight({
      from,
      to,
    }),

    queryFn: () =>
      getLeadInsights({
        from,
        to,
      }),

    staleTime: 30 * 1000,
    retry: false,
  });
}
