"use client";

import { useQuery } from "@tanstack/react-query";
import { useBranchContext } from "@/providers/branch-provider";
import { getLeadSummary } from "./get-lead-summary";
import { leadKeys } from "./lead-query-keys";

type UseLeadSummaryParams = {
  from: string;
  to: string;
};

export function useLeadSummary({ from, to }: UseLeadSummaryParams) {
  const { selectedBranchId, isReady } = useBranchContext();

  return useQuery({
    queryKey: leadKeys.summary(selectedBranchId ?? "__unselected__", { from, to }),
    queryFn: () => getLeadSummary({ from, to }),
    enabled: isReady && selectedBranchId !== null,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  });
}
