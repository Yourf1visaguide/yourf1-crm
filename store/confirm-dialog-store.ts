import { create } from "zustand";

type ConfirmDialogVariant = "default" | "destructive";

type ConfirmDialogOptions = {
  title: string;
  description?: string;

  confirmLabel?: string;
  cancelLabel?: string;

  variant?: ConfirmDialogVariant;

  onConfirm: () => void | Promise<void>;
};

type ConfirmDialogState = {
  isOpen: boolean;
  options: ConfirmDialogOptions | null;

  openConfirm: (options: ConfirmDialogOptions) => void;
  closeConfirm: () => void;
};

export const useConfirmDialogStore =
  create<ConfirmDialogState>((set) => ({
    isOpen: false,
    options: null,

    openConfirm: (options) => {
      set({
        isOpen: true,
        options,
      });
    },

    closeConfirm: () => {
      set({
        isOpen: false,
        options: null,
      });
    },
  }));