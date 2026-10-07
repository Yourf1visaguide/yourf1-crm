import { apiFetch } from "@/lib/api-fetch";

import type {
  EmployeeListResponse,
} from "@/features/users/types";

export type GetEmployeesParams = {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getEmployees({
  pageIndex,
  pageSize,
  search,
  sortBy = "name",
  sortOrder = "asc",
}: GetEmployeesParams): Promise<EmployeeListResponse> {
  const params = new URLSearchParams({
    page: String(pageIndex + 1),
    limit: String(pageSize),
    sortBy,
    sortOrder,
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const response = await apiFetch<EmployeeListResponse>(
    `/api/users?${params.toString()}`,
  );

  return response.data;
}