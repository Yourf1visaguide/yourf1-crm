import { apiFetch } from "@/lib/api-fetch";

import type {
  OfficeReportSummary,
} from "../schemas/office-reports-schema";

export type GetOfficeReportSummaryParams = {
  from: string;
  to: string;
};

export async function getOfficeReportSummary({
  from,
  to,
}: GetOfficeReportSummaryParams): Promise<OfficeReportSummary> {
  const params =
    new URLSearchParams({
      from,
      to,
    });

  const response =
    await apiFetch<OfficeReportSummary>(
      `/api/office-reports/summary?${params.toString()}`,
    );

  return response.data;
}