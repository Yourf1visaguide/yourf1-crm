import { apiFetch } from "@/lib/api-fetch";
import type { LeadListQuery, LeadListResponse } from "../schemas/lead-list-schema";

export type GetLeadsParams = {
  from: string;
  to: string;
  pageIndex: number;
  pageSize: number;
  search?: string;
  status?: LeadListQuery["status"];
  assignmentType?: LeadListQuery["assignmentType"];
  applicationType?: LeadListQuery["applicationType"];
  preferredCountry?: LeadListQuery["preferredCountry"];
  assignmentScope?: LeadListQuery["assignmentScope"];
  sortBy?: LeadListQuery["sortBy"];
  sortOrder?: LeadListQuery["sortOrder"];
};

export async function getLeads({
  from,
  to,
  pageIndex,
  pageSize,
  search = "",
  status,
  assignmentType,
  applicationType,
  preferredCountry,
  assignmentScope = "ALL",
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetLeadsParams): Promise<LeadListResponse> {
  const params = new URLSearchParams({
    from,
    to,
    page: String(pageIndex + 1),
    limit: String(pageSize),
    sortBy,
    sortOrder,
    assignmentScope,
  });

  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);
  if (assignmentType) params.set("assignmentType", assignmentType);
  if (applicationType) params.set("applicationType", applicationType);
  if (preferredCountry) params.set("preferredCountry", preferredCountry);

  const response = await apiFetch<LeadListResponse>(`/api/leads/list?${params.toString()}`);
  return response.data;
}
