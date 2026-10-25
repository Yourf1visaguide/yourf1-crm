"use client";

import { UserPlus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FormHeading } from "@/components/resuable-components/form-heading";
import { useLeadSheet } from "../store/use-lead-sheet";
import { useCreateLead } from "../api/use-create-lead";
import type { CreateLeadInput } from "../schemas/leads-schema";
import LeadForm from "./lead-form";

export default function NewLeadSheet() {
  const isOpen = useLeadSheet((state) => state.isOpen);
  const onClose = useLeadSheet((state) => state.onClose);
  const mutation = useCreateLead();

  function handleSubmit(values: CreateLeadInput) {
    mutation.mutate(values, { onSuccess: onClose });
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !mutation.isPending) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="flex flex-col gap-0 overflow-hidden border-l border-border/70 bg-background p-0 data-[side=right]:max-w-5xl"
      >
        <FormHeading
          icon={<UserPlus className="size-5" />}
          title="Create new lead"
          badge="Walk-in intake"
          description="Capture the essential profile now. The same client record can be completed later."
          footer="Branch, assignee, name and mobile are required."
        />
        <LeadForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          disabled={mutation.isPending}
          error={mutation.error?.message}
        />
      </SheetContent>
    </Sheet>
  );
}
