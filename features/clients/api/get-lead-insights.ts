import { apiFetch } from "@/lib/api-fetch";

import type {
  LeadInsightsResponse,
} from "../schemas/lead-insights-schema";

export type GetLeadInsightsParams = {
  from: string;
  to: string;
};

export async function getLeadInsights({
  from,
  to,
}: GetLeadInsightsParams): Promise<LeadInsightsResponse> {
  const params = new URLSearchParams({
    from,
    to,
  });

  const response = await apiFetch<LeadInsightsResponse>(
    `/api/leads/insights?${params.toString()}`,
  );

  return response.data;
}
