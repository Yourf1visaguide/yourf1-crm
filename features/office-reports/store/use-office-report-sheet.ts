import { create } from "zustand";

import type {
  OfficeReportListItem,
} from "../schemas/office-reports-schema";

export type OfficeReportSheet = "view" | "new";

type OfficeReportSheetState = {
  type: OfficeReportSheet | null;
  report: OfficeReportListItem | null;
  isOpen: boolean;

  onOpen: (
    type: OfficeReportSheet,
    report?: OfficeReportListItem,
  ) => void;

  onClose: () => void;
};

export const useOfficeReportSheet =
  create<OfficeReportSheetState>((set) => ({
    type: null,
    report: null,
    isOpen: false,

    onOpen: (type, report) =>
      set({
        type,
        report: report ?? null,
        isOpen: true,
      }),

    onClose: () =>
      set({
        type: null,
        report: null,
        isOpen: false,
      }),
  }));