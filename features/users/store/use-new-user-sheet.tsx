import { create } from "zustand";

type NewUserSheetState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewUserSheet = create<NewUserSheetState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));