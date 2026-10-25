import { apiFetch } from "@/lib/api-fetch";
import type { BranchOption } from "../types";

export async function getActiveBranches(): Promise<BranchOption[]> {
  const response = await apiFetch<BranchOption[]>("/api/branches?active=true");
  return response.data;
}
