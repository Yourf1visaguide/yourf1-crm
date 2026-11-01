import React from 'react';

import OfficeReportSheetProvider from "@/features/office-reports/providers/office-report-sheet-provider";
function ReportLayout({children}:{children:React.ReactNode}) {
  return (
    <section>
      {children}
      <OfficeReportSheetProvider />
    </section>
  )
}

export default ReportLayout