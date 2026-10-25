"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeadAssignees } from "./get-lead-assignees";
import { leadKeys } from "./lead-query-keys";

export function useLeadAssignees() {
  return useQuery({
    queryKey: leadKeys.assignees(),
    queryFn: getLeadAssignees,
    staleTime: 60 * 1000,
    retry: false,
  });
}
