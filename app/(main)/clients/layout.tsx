import LeadSheetProvider from "@/features/leads/providers/lead-sheet-provider"
import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div>
      {children}
      <LeadSheetProvider />
    </div>
  )
}

export default layout