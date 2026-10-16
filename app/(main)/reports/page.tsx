import React from 'react'
import OfficeReportsTable from "@/features/office-reports/components/office-reports-table"
import Container from "@/components/resuable-components/container"

function page() {
  return (
    <div>
      <section className="">
        {/* <UserSummaryCards data={data} dateRangeLabel={dateRangeLabel} /> */}
        {/* rest of dashboard */}
      </section>

      <Container>
        {/* <Heading text="Employee" /> */}
        <OfficeReportsTable />
      </Container>
    </div>
  )
}

export default page