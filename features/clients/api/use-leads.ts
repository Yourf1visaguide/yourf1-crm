"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { leadKeys } from "./lead-query-keys";
import { getLeads, type GetLeadsParams } from "./get-leads";

export function useLeads(params: GetLeadsParams) {
  return useQuery({
    queryKey: leadKeys.list({
      ...params,
      status: params.status ?? null,
      assignmentType: params.assignmentType ?? null,
      applicationType: params.applicationType ?? null,
      preferredCountry: params.preferredCountry ?? null,
    }),
    queryFn: () => getLeads(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    retry: false,
  });
}
