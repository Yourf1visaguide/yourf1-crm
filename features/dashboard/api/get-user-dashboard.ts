"use client";

import { apiFetch } from "@/lib/api-fetch";
import type { UserDashboardData } from "../types";

type GetUserDashboardParams = {
  from?: string;
  to?: string;
};

export async function getUserDashboard(
  params: GetUserDashboardParams,
): Promise<UserDashboardData> {
  const searchParams = new URLSearchParams();

  if (params.from) {
    searchParams.set("from", params.from);
  }

  if (params.to) {
    searchParams.set("to", params.to);
  }

  const query = searchParams.toString();

  const response = await apiFetch<UserDashboardData>(
    `/api/dashboard/users${query ? `?${query}` : ""}`,
  );

  return response.data;
}