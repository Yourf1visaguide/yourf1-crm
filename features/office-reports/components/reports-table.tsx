"use client";

import {
  ClipboardCheck,
  Eye,
  SearchX,
} from "lucide-react";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ReportRow = {
  id: string;
  reportDate: Date;
  checks: number;
  issues: number;
  followUps: number;
  createdBy: string;
  createdAt: Date;
};

type ReportsTableProps = {
  from: Date;
  toExclusive: Date;
};

const demoReports: ReportRow[] = [];

export function ReportsTable({
  from,
  toExclusive,
}: ReportsTableProps) {
  void from;
  void toExclusive;

  const reports = demoReports;

  return (
    <div className="space-y-6">
      {/* ================================================================ */}
      {/* HEADER                                                           */}
      {/* ================================================================ */}

      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Office Reports
          </h1>

          <p className="text-sm text-muted-foreground">
            Review daily office reports and their checklist results.
          </p>
        </div>

        {reports.length > 0 && (
          <p className="hidden text-sm text-muted-foreground sm:block">
            {reports.length}{" "}
            {reports.length === 1 ? "report" : "reports"}
          </p>
        )}
      </div>

      {/* ================================================================ */}
      {/* TABLE                                                            */}
      {/* ================================================================ */}

      <div className="w-full overflow-hidden rounded-md border border-border/70 bg-card shadow-sm">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[850px]">
            <TableHeader className="bg-muted">
              <TableRow className="border-b border-border/70 hover:bg-transparent">
                <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Date
                </TableHead>

                <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Checks
                </TableHead>

                <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Issues
                </TableHead>

                <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Follow-ups
                </TableHead>

                <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Reported By
                </TableHead>

                <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Created
                </TableHead>

                <TableHead className="h-12 px-5 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="
                      group
                      border-b border-border/50
                      transition-colors
                      hover:bg-accent/50
                      last:border-b-0
                    "
                  >
                    <TableCell className="px-5 py-4">
                      <div className="space-y-0.5">
                        <p className="font-medium text-foreground">
                          {format(report.reportDate, "dd MMM yyyy")}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {format(report.reportDate, "EEEE")}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="size-4 text-muted-foreground" />

                        <span className="text-sm font-medium">
                          {report.checks}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      {report.issues > 0 ? (
                        <Badge variant="danger">
                          {report.issues}{" "}
                          {report.issues === 1
                            ? "issue"
                            : "issues"}
                        </Badge>
                      ) : (
                        <Badge variant="success">
                          No issues
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      {report.followUps > 0 ? (
                        <span className="text-sm font-medium">
                          {report.followUps}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <span className="text-sm">
                        {report.createdBy}
                      </span>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm">
                          {format(
                            report.createdAt,
                            "dd MMM yyyy",
                          )}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {format(
                            report.createdAt,
                            "hh:mm a",
                          )}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="px-5 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={7}
                    className="h-64 px-6"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-border/70 bg-muted/60 text-muted-foreground">
                        <SearchX className="size-5" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          No reports found
                        </p>

                        <p className="text-sm text-muted-foreground">
                          There are no office reports for the selected period.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}