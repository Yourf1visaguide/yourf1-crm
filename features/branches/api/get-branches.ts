import { apiFetch } from "@/lib/api-fetch";

export type BranchOption = {
  id: string;
  branchCode: string;
  name: string;
  city: string | null;
  state: string | null;
};

export async function getBranches(): Promise<BranchOption[]> {
  const response = await apiFetch<BranchOption[]>(
    "/api/branches?active=true",
  );

  return response.data;
}