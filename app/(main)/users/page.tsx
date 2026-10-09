import Container from "@/components/resuable-components/container";
import Heading from "@/components/resuable-components/heading";
import { UsersTable } from "@/features/users/components/users-table";

import { format, subDays } from "date-fns";

import { getUserDashboard } from "@/features/dashboard/queries/user-dashboard-queries";
import { UserSummaryCards } from "@/features/dashboard/components/user-summary-cards";

type DashboardPageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

async function UserPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const from = params.from
    ? new Date(`${params.from}T00:00:00.000Z`)
    : new Date(`${format(defaultFrom, "yyyy-MM-dd")}T00:00:00.000Z`);

  const selectedTo = params.to
    ? new Date(`${params.to}T00:00:00.000Z`)
    : new Date(`${format(defaultTo, "yyyy-MM-dd")}T00:00:00.000Z`);

  const toExclusive = new Date(selectedTo.getTime() + 24 * 60 * 60 * 1000);

  const data = await getUserDashboard({
    from,
    toExclusive,
  });

  const dateRangeLabel = `${format(from, "dd MMM")} – ${format(
    new Date(toExclusive.getTime() - 1),
    "dd MMM yyyy",
  )}`;
  return (
    <div>
      <section className="">
        {/* <UserSummaryCards data={data} dateRangeLabel={dateRangeLabel} /> */}

        {/* rest of dashboard */}
      </section>

      <Container>
        {/* <Heading text="Employee" /> */}

        <UsersTable />
      </Container>
    </div>
  );
}

export default UserPage;
