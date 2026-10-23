import Container from "@/components/resuable-components/container";
import LeadsTable from "@/features/leads/components/leads-table";
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
      {/* <ReportsSummaryCard
            from={from}
            to={to}
          /> */}
      <Container>
        <div className="space-y-8">
          

          <LeadsTable
            from={from}
            to={to}
          />
        </div>
      </Container>
    </div>
  );
}