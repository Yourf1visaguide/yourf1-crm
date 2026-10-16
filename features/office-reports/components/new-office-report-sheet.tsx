"use client";

import { ClipboardCheck } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useOfficeReportSheet } from "../store/use-office-report-sheet";

import { FormHeading } from "@/components/resuable-components/form-heading";

import OfficeReportForm from "./office-report-form";

import { useCreateOfficeReport } from "../api/use-create-office-report";
import { CreateOfficeReportInput } from "../schemas/office-reports-schema";
import { todayLocalDate } from "@/lib/utils";

export default function NewOfficeReportSheet() {
  const isOpen = useOfficeReportSheet((state => state.isOpen));
  const onClose = useOfficeReportSheet((state => state.onClose));

  const mutation = useCreateOfficeReport();

  function handleSubmit(values:CreateOfficeReportInput) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !mutation.isPending) {
          onClose();
        }
      }}
    >
      <SheetContent
        side="right"
        className="
          flex flex-col gap-0 overflow-hidden
          border-l border-border/70
          bg-background p-0
          data-[side=right]:max-w-4xl
        "
      >
        <FormHeading
          icon={<ClipboardCheck className="size-5" />}
          title="Create Today's office report"
          // badge={`Daily operations of ${todayLocalDate()}`}
          badge={`${todayLocalDate()}`}
          description="Record the daily office checklist, report issues, and document follow-up actions."
          footer="Review every checklist item before submitting the report."
        />

        <OfficeReportForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          disabled={mutation.isPending}
          error={mutation.error?.message}
        />
      </SheetContent>
    </Sheet>
  );
}
