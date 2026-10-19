"use client"

import dynamic from "next/dynamic";
import { FullScreenLoader, LineLoader } from "@/components/resuable-components/loader";
import { useOfficeReportSheet } from "../store/use-office-report-sheet";

const NewOfficeReportSheet = dynamic(() => import("@/features/office-reports/components/new-office-report-sheet"),{
  loading:() => (
    <FullScreenLoader loader={<LineLoader />} text="Loading office report form" />
  )
})

const OfficeReportViewSheet = dynamic(() => import("@/features/office-reports/components/office-report-view-sheet"), {
  loading:() => (<FullScreenLoader loader={<LineLoader />} text="Loading full report." />)
})


function OfficeReportSheetProvider() {
  const isOpen = useOfficeReportSheet((state) => state.isOpen)
  const type = useOfficeReportSheet((state) => state.type)
  return (
    <>
    {isOpen && type === "new" && <NewOfficeReportSheet />}
    {isOpen && type === "view" &&  <OfficeReportViewSheet />}
    </>
  )
}

export default OfficeReportSheetProvider