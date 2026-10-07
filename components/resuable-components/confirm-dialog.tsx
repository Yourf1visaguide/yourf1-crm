"use client";

import * as React from "react";
import { AlertTriangle, Info } from "lucide-react";

import { Dialog } from "@base-ui/react/dialog";

import { Button } from "@/components/ui/button";

import { useConfirmDialogStore } from "@/store/confirm-dialog-store";

export function ConfirmDialog() {
  const isOpen = useConfirmDialogStore(
    (state) => state.isOpen,
  );

  const options = useConfirmDialogStore(
    (state) => state.options,
  );

  const closeConfirm = useConfirmDialogStore(
    (state) => state.closeConfirm,
  );

  const [isPending, setIsPending] =
    React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setIsPending(false);
    }
  }, [isOpen]);

  if (!options) {
    return null;
  }

  const {
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "default",
    onConfirm,
  } = options;

  const isDestructive =
    variant === "destructive";

  async function handleConfirm() {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      await onConfirm();

      closeConfirm();
    } catch {
      /*
       * Keep the dialog open when the action fails.
       *
       * The mutation/API layer should handle the
       * actual error notification.
       */
      setIsPending(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isPending) {
      closeConfirm();
    }
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            backdrop-blur-[2px]
            transition-opacity
            duration-150
            data-ending-style:opacity-0
            data-starting-style:opacity-0
          "
        />

        <Dialog.Popup
          className="
            fixed
            left-1/2
            top-1/2
            z-50
            w-[calc(100%-2rem)]
            max-w-md
            -translate-x-1/2
            -translate-y-1/2

            rounded-2xl
            border
            border-border/70
            bg-background
            p-6
            shadow-2xl

            outline-none

            transition
            duration-200
            ease-out

            data-ending-style:opacity-0
            data-ending-style:scale-95
            data-starting-style:opacity-0
            data-starting-style:scale-95
          "
        >
          {/* Icon */}
          <div
            className={`
              mb-5
              flex
              size-11
              items-center
              justify-center
              rounded-xl
              border

              ${
                isDestructive
                  ? "border-destructive/20 bg-destructive/10 text-destructive"
                  : "border-primary/20 bg-primary/10 text-primary"
              }
            `}
          >
            {isDestructive ? (
              <AlertTriangle className="size-5" />
            ) : (
              <Info className="size-5" />
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Dialog.Title
              className="
                text-base
                font-semibold
                tracking-tight
                text-foreground
              "
            >
              {title}
            </Dialog.Title>

            {description && (
              <Dialog.Description
                className="
                  text-sm
                  leading-6
                  text-muted-foreground
                "
              >
                {description}
              </Dialog.Description>
            )}
          </div>

          {/* Actions */}
          <div className="mt-7 flex items-center justify-end gap-2">
            <Dialog.Close
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                />
              }
            >
              {cancelLabel}
            </Dialog.Close>

            <Button
              type="button"
              variant={
                isDestructive
                  ? "destructive"
                  : "default"
              }
              disabled={isPending}
              onClick={handleConfirm}
            >
              {isPending
                ? "Please wait..."
                : confirmLabel}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}