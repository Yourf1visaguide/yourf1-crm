"use client";

import { Button } from "@/components/ui/button";
import { useOfficeReportSheet } from "../store/use-office-report-sheet";

export default function OfficeReportTable() {
  const onOpen = useOfficeReportSheet((state) => state.onOpen);
  
  return (
    <div className="">
      <div className="flex flex-col gap-4 my-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Office Reports
          </h1>

          <p className="text-sm text-muted-foreground">"Manage employees, roles, schedules and access."</p>
        </div>

        <Button size="default" onClick={() => onOpen()} className="w-full sm:w-auto">
          Add Employee
        </Button>
      </div>
      
    </div>
  );
}
