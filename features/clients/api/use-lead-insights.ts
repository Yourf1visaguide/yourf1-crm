"use client";

import { useQuery } from "@tanstack/react-query";
import { useBranchContext } from "@/providers/branch-provider";
import { getLeadInsights } from "./get-lead-insights";
import { leadKeys } from "./lead-query-keys";

export type UseLeadInsightsParams = {
  from: string;
  to: string;
};

export function useLeadInsights({ from, to }: UseLeadInsightsParams) {
  const { selectedBranchId, isReady } = useBranchContext();

  return useQuery({
    queryKey: leadKeys.insight(selectedBranchId ?? "__unselected__", { from, to }),
    queryFn: () => getLeadInsights({ from, to }),
    enabled: isReady && selectedBranchId !== null,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  });
}
