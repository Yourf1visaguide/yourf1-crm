import { apiFetch } from "@/lib/api-fetch";
import type { LeadAssigneeOption } from "../types";

export async function getLeadAssignees(): Promise<LeadAssigneeOption[]> {
  const response = await apiFetch<LeadAssigneeOption[]>("/api/leads/assignees");
  return response.data;
}
