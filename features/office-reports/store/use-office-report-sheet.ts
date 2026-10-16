import { create } from "zustand";

type OfficeReportSheetType = {
  isOpen:boolean;
  onOpen:() => void;
  onClose:() => void;
}


export const useOfficeReportSheet = create<OfficeReportSheetType>((set) => ({
isOpen:false,
onOpen: () => set({isOpen:true}),
onClose: () => set({isOpen:false}),
}))