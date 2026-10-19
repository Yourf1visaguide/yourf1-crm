import { apiFetch } from "@/lib/api-fetch";

import type {
  OfficeReportListResponse,
} from "../schemas/office-reports-schema";

export type GetOfficeReportsParams = {
  from: string;
  to: string;
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getOfficeReports({
  from,
  to,
  pageIndex,
  pageSize,
  sortBy = "reportDate",
  sortOrder = "desc",
}: GetOfficeReportsParams): Promise<OfficeReportListResponse> {
  const params = new URLSearchParams({
    from,
    to,

    page: String(pageIndex + 1),

    limit: String(pageSize),

    sortBy,

    sortOrder,
  });

  const response =
    await apiFetch<OfficeReportListResponse>(
      `/api/office-reports?${params.toString()}`,
    );

  return response.data;
}