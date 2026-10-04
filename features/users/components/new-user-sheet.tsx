"use client";

import { ShieldCheck, Users } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import { useNewUserSheet } from "../store/use-new-user-sheet";
import { useCreateUser } from "../api/use-create-user";
import UserForm from "./UserForm";

export default function NewUserSheet() {
  const { isOpen, onClose } = useNewUserSheet();
  const mutation = useCreateUser();

  async function handleSubmit(
    values: Parameters<typeof mutation.mutateAsync>[0],
  ) {
    await mutation.mutateAsync(values);
    onClose();
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
        className="flex  flex-col gap-0 overflow-hidden border-l border-border/70 bg-background p-0 data-[side=right]:max-w-4xl"
      >
        <SheetHeader className="relative overflow-hidden border-b border-border/70 px-6 pb-6 pt-7 text-left">
          <div className="pointer-events-none absolute -right-12 -top-20 size-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute right-5 top-5 size-24 rounded-full border border-primary/10" />

          <div className="relative flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm">
              <Users className="size-5" />
            </div>

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <SheetTitle className="text-xl font-semibold tracking-tight">
                  Create new user
                </SheetTitle>
                <Badge variant="secondary" className="font-normal">
                  Team
                </Badge>
              </div>

              <SheetDescription className="max-w-sm text-sm leading-relaxed">
                Add a team member and configure their workspace access.
              </SheetDescription>
            </div>
          </div>

          <div className="relative mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Access is controlled by their assigned role.
          </div>
        </SheetHeader>

        <UserForm
          onSubmit={handleSubmit}
          disabled={mutation.isPending}
          error={mutation.error?.message}
        />
      </SheetContent>
    </Sheet>
  );
}