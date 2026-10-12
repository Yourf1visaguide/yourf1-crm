import { create } from "zustand";

export type UserSheet =
  | "edit"
  | "new"
  | "salary"
  | "schedule";

type UserSheetState = {
  type: UserSheet | null;
  isOpen: boolean;
  onOpen: (type: UserSheet) => void;
  onClose: () => void;
};

export const useUserSheet = create<UserSheetState>((set) => ({
  type: null,
  isOpen: false,

  onOpen: (type) =>
    set({
      type,
      isOpen: true,
    }),

  onClose: () =>
    set({
      isOpen: false,
      type: null,
    }),
}));