import { create } from "zustand";

import type { EmployeeListItem } from "../types";

export type UserSheet = | "new" | "edit" | "salary" | "schedule"; 

type UserSheetState = {
  type: UserSheet | null;
  employee: EmployeeListItem | null;
  isOpen: boolean;

  onOpen: (
    type: UserSheet,
    employee?: EmployeeListItem,
  ) => void;

  onClose: () => void;
};

export const useUserSheet = create<UserSheetState>((set) => ({
  type: null,
  employee: null,
  isOpen: false,

  onOpen: (type, employee) =>
    set({
      type,
      employee: employee ?? null,
      isOpen: true,
    }),

  onClose: () =>
    set({
      type: null,
      employee: null,
      isOpen: false,
    }),
}));