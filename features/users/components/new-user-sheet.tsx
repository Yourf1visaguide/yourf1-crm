"use client";

import { ShieldCheck, Users } from "lucide-react";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import { useUserSheet } from "../store/use-user-sheet";
import { useCreateUser } from "../api/use-create-user";
import UserForm from "./UserForm";
import { FormHeading } from "@/components/resuable-components/form-heading";

export default function NewUserSheet() {
  const { isOpen, onClose } = useUserSheet();
  const mutation = useCreateUser();

  async function handleSubmit(
    values: Parameters<typeof mutation.mutateAsync>[0],
  ) {
    await mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }
  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
        if (!open && !mutation.isPending) {
          onClose();
        }
      }}
    >
      <SheetContent side="right"
        className="flex  flex-col gap-0 overflow-hidden border-l border-border/70 bg-background p-0 data-[side=right]:max-w-4xl"
      >
        
          <FormHeading
            icon={<Users className="size-5" />}
            title="Create new user"
            badge="Team"
            description="Add a team member and configure their workspace access."
            footer="Access is controlled by their assigned role."
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
