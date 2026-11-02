"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeadAssignees } from "./get-lead-assignees";
import { leadKeys } from "./lead-query-keys";
import { useBranchContext } from "@/providers/branch-provider";

export function useLeadAssignees(assignmentType: "TELECALLING" | "COUNSELLING" = "COUNSELLING") {
  const { selectedBranchId, isReady } = useBranchContext();

  return useQuery({
    queryKey: leadKeys.assignees(selectedBranchId ?? "__unselected__", assignmentType),
    queryFn: () => getLeadAssignees(assignmentType),
    enabled: isReady && selectedBranchId !== null,
    staleTime: 0,
    refetchOnMount: "always",
  });
}
