"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";

import {
  type CreateOfficeReportInput,
} from "@/features/office-reports/schemas/office-reports-schema";

import type {
  OfficeReport,
} from "@/features/office-reports/schemas/office-reports-schema";

import { officeReportKeys } from "./office-report-query-keys";

export function useCreateOfficeReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: CreateOfficeReportInput,
    ): Promise<OfficeReport> => {
      const response =
        await apiFetch<OfficeReport>(
          "/api/office-reports",
          {
            method: "POST",
            body: JSON.stringify(values),
          },
        );

      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: officeReportKeys.all,
      });

      toast.add({
        type: "info",
        title: "Report created",
        description:
          "Today's office report has been created successfully.",
      });
    },

    onError: (error) => {
      toast.add({
        title: "Unable to create report",
        description:
          error.message ||
          "Something went wrong. Please try again.",
      });
    },
  });
}