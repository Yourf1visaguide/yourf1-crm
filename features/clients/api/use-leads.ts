"use client";

import { useQuery } from "@tanstack/react-query";
import { useBranchContext } from "@/providers/branch-provider";
import { leadKeys } from "./lead-query-keys";
import { getLeads, type GetLeadsParams } from "./get-leads";

export function useLeads(params: GetLeadsParams) {
  const { selectedBranchId, isReady } = useBranchContext();

  return useQuery({
    queryKey: leadKeys.list(selectedBranchId ?? "__unselected__", {
      ...params,
      status: params.status ?? null,
      assignmentType: params.assignmentType ?? null,
      applicationType: params.applicationType ?? null,
      preferredCountry: params.preferredCountry ?? null,
    }),
    queryFn: () => getLeads(params),
    // Do not show rows from the previously selected branch while the new
    // branch request is loading.
    enabled: isReady && selectedBranchId !== null,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  });
}
