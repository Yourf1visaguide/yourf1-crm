import { resolveDateRange } from "@/lib/date-range";
import Container from "@/components/resuable-components/container";
import LeadsTable from "@/features/leads/components/leads-table";
import { LeadsSummaryCard } from "@/features/leads/components/leads-summary-card";
import LeadInsights from "@/features/leads/components/lead-insights";

type ReportsPageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams;

  const { from, to } = resolveDateRange(params);

  return (
    <div>
      <LeadsSummaryCard from={from} to={to} />
      <Container>
        <div className="space-y-8">
          <LeadsTable from={from} to={to} />
        </div>
      </Container>
      <Container>
        <LeadInsights from={from} to={to} />
      </Container>
    </div>
  );
}
