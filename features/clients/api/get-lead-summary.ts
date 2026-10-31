import { apiFetch } from "@/lib/api-fetch";

import type { LeadSummary } from "../schemas/lead-summary-schema";

export type GetLeadSummaryParams = {
  from: string;
  to: string;
};

export async function getLeadSummary({
  from,
  to,
}: GetLeadSummaryParams): Promise<LeadSummary> {
  const params = new URLSearchParams({
    from,
    to,
  });

  const response = await apiFetch<LeadSummary>(
    `/api/leads/summary?${params.toString()}`,
  );

  return response.data;
}
