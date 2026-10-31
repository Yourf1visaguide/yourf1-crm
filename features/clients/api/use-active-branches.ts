"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveBranches } from "./get-active-branches";
import { leadKeys } from "./lead-query-keys";

export function useActiveBranches() {
  return useQuery({
    queryKey: leadKeys.branches(),
    queryFn: getActiveBranches,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
