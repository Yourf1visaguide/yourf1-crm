import { apiFetch } from "@/lib/api-fetch";

import type {
  BranchIntegrationListResponse,
} from "../types";

export async function getBranchIntegrations(
  branchId: string,
): Promise<BranchIntegrationListResponse> {
  const params = new URLSearchParams({
    branchId,
  });

  const response =
    await apiFetch<BranchIntegrationListResponse>(
      `/api/branch-integrations?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

  return response.data;
}