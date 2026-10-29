import { apiFetch } from "@/lib/api-fetch";
import type { LeadAssigneeOption } from "../types";

export async function getLeadAssignees(
  assignmentType: "TELECALLING" | "COUNSELLING" = "COUNSELLING",
): Promise<LeadAssigneeOption[]> {
  const response = await apiFetch<LeadAssigneeOption[]>(
    `/api/leads/assignees?type=${assignmentType}`,
  );
  return response.data;
}
