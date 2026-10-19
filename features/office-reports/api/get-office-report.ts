import { apiFetch } from "@/lib/api-fetch";

import type {
  OfficeReport,
} from "../schemas/office-reports-schema";

export async function getOfficeReport(
  id: string,
): Promise<OfficeReport> {
  const response =
    await apiFetch<OfficeReport>(
      `/api/office-reports/${id}`,
    );

  return response.data;
}