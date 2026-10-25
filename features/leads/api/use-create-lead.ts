"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { apiFetch } from "@/lib/api-fetch";
import type { CreateLeadInput } from "../schemas/leads-schema";
import type { LeadCreatedResponse } from "../types";
import { leadKeys } from "./lead-query-keys";

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateLeadInput): Promise<LeadCreatedResponse> => {
      const response = await apiFetch<LeadCreatedResponse>("/api/leads", {
        method: "POST",
        body: JSON.stringify(values),
      });
      return response.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: leadKeys.all });
      toast.add({
        type: "info",
        title: "Lead created",
        description: `${data.leadCode} has been created successfully.`,
      });
    },
    onError: (error) => {
      toast.add({
        title: "Unable to create lead",
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
}
