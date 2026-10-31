"use client"
import React from 'react';

import dynamic from "next/dynamic";
import { useLeadSheet } from "../store/use-lead-sheet";
import { FullScreenLoader, LineLoader } from "@/components/resuable-components/loader";


const NewLeadSheet = dynamic(() => import("@/features/clients/components/new-lead-sheet"), {
  loading:() => (
    <FullScreenLoader loader={<LineLoader />} text="Loading lead form" />
  )
})

function LeadSheetProvider() {
  const type = useLeadSheet((state) => state.type);
  const isOpen = useLeadSheet((state) => state.isOpen)
  return (
    <>
    {type === "new" && isOpen && <NewLeadSheet />}
    </>
  )
}

export default LeadSheetProvider



