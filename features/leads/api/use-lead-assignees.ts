"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeadAssignees } from "./get-lead-assignees";
import { leadKeys } from "./lead-query-keys";

export function useLeadAssignees(assignmentType: "TELECALLING" | "COUNSELLING" = "COUNSELLING") {
  return useQuery({
    queryKey: leadKeys.assignees(assignmentType),
    queryFn: () => getLeadAssignees(assignmentType),
  });
}
