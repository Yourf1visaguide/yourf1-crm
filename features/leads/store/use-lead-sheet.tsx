import {create} from "zustand";

export type LeadSheetType = "view" | "new";

type LeadSheetState = {
type: LeadSheetType | null
isOpen:boolean;
onOpen:(type:LeadSheetType) => void;
onClose:() => void;
}

export const useLeadSheet = create<LeadSheetState>((set) => ({
  isOpen:false,
  type:null,
  onOpen: (type) => set({
    type,
    isOpen:true
  }),
  onClose: () => set({isOpen:false, type:null})
}))