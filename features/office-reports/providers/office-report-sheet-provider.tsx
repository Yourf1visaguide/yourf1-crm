"use client"

import dynamic from "next/dynamic";
import { FullScreenLoader, LineLoader } from "@/components/resuable-components/loader";
import { useOfficeReportSheet } from "../store/use-office-report-sheet";

const NewOfficeReportSheet = dynamic(() => import("@/features/office-reports/components/new-office-report-sheet"),{
  loading:() => (
    <FullScreenLoader loader={<LineLoader />} text="Loading office report form" />
  )
})

function OfficeReportSheetProvider() {
  const isOpen = useOfficeReportSheet((state) => state.isOpen)
  return (
    <>
    {isOpen && <NewOfficeReportSheet />}
    </>
  )
}

export default OfficeReportSheetProvider