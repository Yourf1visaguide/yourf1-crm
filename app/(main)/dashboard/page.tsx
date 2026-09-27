import React from "react";
import { columns, Payment } from "@/features/dashboard/components/columns";
import { DataTable } from "@/components/table/data-table";
import Container from "@/components/resuable-components/container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/resuable-components/heading";
import { DataShowingCard } from "@/components/resuable-components/data-showing-card";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    

    // ...
  ]
}

async function page() {

   const data = await getData()

   const metrics = [
  {
    title: "Remaining",
    dateRange: "28 Aug – 27 Sep 2026",
    value: "₹0.00",
    change: "0% from last period",
    icon: PiggyBank,
    variant: "primary" as const,
  },
  {
    title: "Income",
    dateRange: "28 Aug – 27 Sep 2026",
    value: "₹0.00",
    change: "0% from last period",
    icon: TrendingUp,
    variant: "success" as const,
  },
  {
    title: "Expenses",
    dateRange: "28 Aug – 27 Sep 2026",
    value: "₹0.00",
    change: "0% from last period",
    icon: TrendingDown,
    variant: "danger" as const,
  },
];
  return (
    <div>
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <DataShowingCard key={metric.title} {...metric} />
      ))}
    </section>
      <Container>
        <Heading text="Dashboard" />
        <div>
          <div className="flex flex-col justify-end items-end mb-8 gap-y-4">
          <Button variant="default" size="lg" >Add New User</Button>
          
        </div>
        </div>
        <DataTable columns={columns} data={data} />
      </Container>
    </div>
  );
}

export default page;
