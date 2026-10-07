"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserDashboard } from "./get-user-dashboard";

export const userDashboardKeys = {
  all: ["dashboard", "users"] as const,

  summary: (from?: string, to?: string) =>
    [...userDashboardKeys.all, { from, to }] as const,
};

export function useUserDashboard(
  from?: string,
  to?: string,
) {
  return useQuery({
    queryKey: userDashboardKeys.summary(from, to),

    queryFn: () =>
      getUserDashboard({
        from,
        to,
      }),

    staleTime: 30 * 1000,

    retry: false,
  });
}