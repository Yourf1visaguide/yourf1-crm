import Container from "@/components/resuable-components/container";
import OfficeReportTable from "@/features/office-reports/components/office-reports-table";
import { ReportsSummaryCard } from "@/features/office-reports/components/reports-summary-card";
import { resolveDateRange } from "@/lib/date-range";

type ReportsPageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

export default async function ReportsPage({
  searchParams,
}: ReportsPageProps) {
  const params = await searchParams;

  const {
    from,
    to,
  } = resolveDateRange(params);

  return (
    <div>
      <ReportsSummaryCard
            from={from}
            to={to}
          />
      <Container>
        <div className="space-y-8">
          

          <OfficeReportTable
            from={from}
            to={to}
          />
        </div>
      </Container>
    </div>
  );
}