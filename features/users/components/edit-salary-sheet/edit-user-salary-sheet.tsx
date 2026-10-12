"use client";

import { WalletCards } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useUserSheet } from "@/features/users/store/use-user-sheet";
import { useCreateUser } from "@/features/users/api/use-create-user";
import UserForm from "./UserForm";
import { FormHeading } from "@/components/resuable-components/form-heading";

export default function EditUserSheet() {
  const isOpen = useUserSheet((state) => state.isOpen);
  const onClose = useUserSheet((state) => state.onClose);
  const mutation = useCreateUser();

  async function handleSubmit(
    // values: Parameters<typeof mutation.mutateAsync>[0],
  ) {
    // await mutation.mutate(values, {
    //   onSuccess: () => {
    //     onClose();
    //   },
    // });
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
        className="flex flex-col gap-0 overflow-hidden border-l border-border/70 bg-background p-0 !max-w-xl "
      >
        <FormHeading
          icon={<WalletCards className="size-5" />}
          title="Change User Salary"
          badge="Compensation"
          description="Update the employee's monthly salary by creating a new compensation record."
          footer="The previous salary record will be preserved for payroll and history."
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
