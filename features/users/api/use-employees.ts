"use client";

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { getEmployees } from "./get-employees";
import { usersKeys } from "./users-keys";

type UseEmployeesParams = {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export function useEmployees({
  pageIndex,
  pageSize,
  search,
  sortBy = "name",
  sortOrder = "asc",
}: UseEmployeesParams) {
  return useQuery({
    queryKey: usersKeys.list({
      pageIndex,
      pageSize,
      search: search ?? "",
      sortBy,
      sortOrder,
    }),

    queryFn: () =>
      getEmployees({
        pageIndex,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),

    placeholderData: keepPreviousData,

    staleTime: 30 * 1000,

    retry: false,
  });
}