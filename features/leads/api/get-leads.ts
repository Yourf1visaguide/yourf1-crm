import { apiFetch } from "@/lib/api-fetch";

import type {
  LeadListResponse,
} from "../schemas/lead-list-schema";

export type GetLeadsParams = {
  from: string;
  to: string;
  pageIndex: number;
  pageSize: number;
  search?: string;
  status?: string;
  applicationType?: string;
  preferredCountry?: string;
  assignmentScope?: "ALL" | "ASSIGNED" | "UNASSIGNED";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getLeads({
  from,
  to,
  pageIndex,
  pageSize,
  search = "",
  status,
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
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (status) {
    params.set("status", status);
  }

  if (applicationType) {
    params.set("applicationType", applicationType);
  }

  if (preferredCountry) {
    params.set("preferredCountry", preferredCountry);
  }

  if (assignmentScope !== "ALL") {
    params.set("assignmentScope", assignmentScope);
  }

  const response =
    await apiFetch<LeadListResponse>(
      `/api/leads/list?${params.toString()}`,
    );

  return response.data;
}
