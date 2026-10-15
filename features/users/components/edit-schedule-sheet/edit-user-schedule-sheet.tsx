"use client";

import { Clock3, Users } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useUserSheet } from "@/features/users/store/use-user-sheet";
import UserForm from "./UserForm";
import { FormHeading } from "@/components/resuable-components/form-heading";
import { useChangeSchedule } from "@/features/users/api/use-edit-employee-schedule";

export default function EditUserSheet() {
  const isOpen = useUserSheet((state) => state.isOpen);
  const onClose = useUserSheet((state) => state.onClose);
  const mutation = useChangeSchedule();

  async function handleSubmit(
    values: Parameters<typeof mutation.mutate>[0],
  ) {
    await mutation.mutate(values, {
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
        className="flex  flex-col gap-0 overflow-hidden border-l border-border/70 bg-background p-0 !max-w-xl"
      >
        <FormHeading
          icon={<Clock3 className="size-5" />}
          title="Change Work Schedule"
          badge="Schedule"
          description="Create a new work schedule for the employee with its effective date."
          footer="Previous schedule records are preserved for history."
        />

        <UserForm
          onSubmit={handleSubmit}
          disabled={mutation.isPending}
          error={mutation.error?.message}
        />
      </SheetContent>
    </Sheet>
  );
}
