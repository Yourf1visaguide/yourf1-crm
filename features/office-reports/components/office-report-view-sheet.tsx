"use client";

import {
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  MinusCircle,
  RotateCcw,
} from "lucide-react";
import { format } from "date-fns";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  useOfficeReportSheet,
} from "../store/use-office-report-sheet";

import {
  useOfficeReport,
} from "../api/use-office-report";

import {
  dateStringToLocalDate,
} from "@/lib/date-range";

import {
  OFFICEREPORTCHECKSTATUS,
} from "@/prisma/generated/prisma/enums";

import type {
  OfficeReportCheck,
} from "../schemas/office-reports-schema";

import {
  OFFICE_REPORT_CHECKLIST,
} from "../constants/office-report-checklist";

const CATEGORY_ORDER = [
  "FACILITIES",
  "CLEANLINESS",
  "EQUIPMENT",
] as const;

const CATEGORY_LABELS: Record<
  string,
  string
> = {
  CLEANLINESS: "Cleanliness",
  FACILITIES: "Facilities",
  EQUIPMENT: "Equipment",
};

function StatusBadge({
  status,
}: {
  status: OfficeReportCheck["status"];
}) {
  switch (status) {
    case OFFICEREPORTCHECKSTATUS.OK:
      return (
        <Badge
          variant="success"
          className="px-2.5 py-1"
        >
          <CheckCircle2 />
          OK
        </Badge>
      );

    case OFFICEREPORTCHECKSTATUS.ISSUE:
      return (
        <Badge
          variant="danger"
          className="px-2.5 py-1"
        >
          <AlertTriangle />
          Issue
        </Badge>
      );

    case OFFICEREPORTCHECKSTATUS.NA:
      return (
        <Badge
          variant="neutral"
          className="px-2.5 py-1"
        >
          <MinusCircle />
          N/A
        </Badge>
      );

    default:
      return (
        <Badge variant="neutral">
          <CircleHelp />
          Not checked
        </Badge>
      );
  }
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-2">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

export default function OfficeReportViewSheet() {
  const {
    isOpen,
    type,
    report,
    onClose,
  } = useOfficeReportSheet();

  const {
    data,
    isPending,
    isError,
  } = useOfficeReport(
    report?.id ?? null,
  );

  const officeReport = data;

  return (
    <Sheet
      open={isOpen && type === "view"}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <SheetContent
        side="right"
        className="
          flex
          w-full
          flex-col
          gap-0
          overflow-hidden
          border-l
          border-border/70
          bg-background
          p-0
          sm:max-w-2xl
          lg:max-w-3xl
        "
      >
        <SheetHeader className="border-b bg-background px-6 py-5">
          <div className="flex items-start gap-3 pr-8">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardCheck className="size-5" />
            </div>

            <div className="min-w-0">
              <SheetTitle className="text-lg">
                Office Report
              </SheetTitle>

              <SheetDescription className="mt-1">
                {officeReport
                  ? format(
                      dateStringToLocalDate(
                        officeReport.reportDate,
                      ),
                      "EEEE, dd MMMM yyyy",
                    )
                  : "Viewing report details"}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {isPending && (
            <div className="space-y-4 px-6 py-6">
              <div className="h-28 animate-pulse rounded-xl bg-muted" />
              <div className="h-40 animate-pulse rounded-xl bg-muted" />
              <div className="h-64 animate-pulse rounded-xl bg-muted" />
            </div>
          )}

          {isError && (
            <div className="flex min-h-[320px] items-center justify-center px-6 text-center">
              <div className="max-w-sm">
                <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="size-5" />
                </div>

                <h3 className="text-sm font-semibold">
                  Unable to load report
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  We couldn't retrieve this office report.
                  Please close the panel and try again.
                </p>
              </div>
            </div>
          )}

          {officeReport && (
            <div className="space-y-6 px-6 py-6">
              {/* Overview */}
              <section className="grid gap-3 sm:grid-cols-3">
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-xs text-muted-foreground">
                      Report Date
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="font-medium">
                      {format(
                        dateStringToLocalDate(
                          officeReport.reportDate,
                        ),
                        "dd MMM yyyy",
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-xs text-muted-foreground">
                      Reported By
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="font-medium">
                      {officeReport.createdBy.name}
                    </p>
                  </CardContent>
                </Card>

                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-xs text-muted-foreground">
                      Created
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="font-medium">
                      {format(
                        new Date(
                          officeReport.createdAt,
                        ),
                        "dd MMM yyyy",
                      )}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {format(
                        new Date(
                          officeReport.createdAt,
                        ),
                        "hh:mm a",
                      )}
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Summary */}
              <section className="grid grid-cols-3 gap-3">
                <Card size="sm">
                  <CardContent className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                      <CheckCircle2 className="size-4" />
                    </div>

                    <div>
                      <p className="text-xl font-semibold tabular-nums">
                        {
                          officeReport.checks.filter(
                            (check) =>
                              check.status ===
                              OFFICEREPORTCHECKSTATUS.OK,
                          ).length
                        }
                      </p>

                      <p className="text-xs text-muted-foreground">
                        OK
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card size="sm">
                  <CardContent className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                      <AlertTriangle className="size-4" />
                    </div>

                    <div>
                      <p className="text-xl font-semibold tabular-nums">
                        {
                          officeReport.checks.filter(
                            (check) =>
                              check.status ===
                              OFFICEREPORTCHECKSTATUS.ISSUE,
                          ).length
                        }
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Issues
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card size="sm">
                  <CardContent className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <MinusCircle className="size-4" />
                    </div>

                    <div>
                      <p className="text-xl font-semibold tabular-nums">
                        {
                          officeReport.checks.filter(
                            (check) =>
                              check.status ===
                              OFFICEREPORTCHECKSTATUS.NA,
                          ).length
                        }
                      </p>

                      <p className="text-xs text-muted-foreground">
                        N/A
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Checklist */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold">
                    Checklist
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Results recorded for each office inspection item.
                  </p>
                </div>

                {CATEGORY_ORDER.map(
                  (category) => {
                    const items =
                      officeReport.checks.filter(
                        (check) =>
                          check.category ===
                          category,
                      );

                    if (!items.length) {
                      return null;
                    }

                    return (
                      <div
                        key={category}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {
                              CATEGORY_LABELS[
                                category
                              ]
                            }
                          </h4>

                          <Separator className="flex-1" />
                        </div>

                        <div className="overflow-hidden rounded-xl border bg-card">
                          {items.map(
                            (
                              check,
                              index,
                            ) => (
                              <div
                                key={
                                  check.id
                                }
                                className="
                                  border-b
                                  p-4
                                  last:border-b-0
                                "
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium">
                                      {
                                        check.label
                                      }
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                      Item{" "}
                                      {index +
                                        1}
                                    </p>
                                  </div>

                                  <StatusBadge
                                    status={
                                      check.status
                                    }
                                  />
                                </div>

                                {check.status ===
                                  OFFICEREPORTCHECKSTATUS.ISSUE && (
                                  <div className="mt-4 space-y-3">
                                    {check.issueNote && (
                                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
                                          Issue
                                        </p>

                                        <p className="mt-1.5 text-sm leading-6">
                                          {
                                            check.issueNote
                                          }
                                        </p>
                                      </div>
                                    )}

                                    {check.actionTaken && (
                                      <div className="rounded-lg border bg-muted/30 p-3">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                          Action Taken
                                        </p>

                                        <p className="mt-1.5 text-sm leading-6">
                                          {
                                            check.actionTaken
                                          }
                                        </p>
                                      </div>
                                    )}

                                    {check.followUpRequired && (
                                      <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                                        <RotateCcw className="size-4" />
                                        Follow-up required
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </section>

              {/* General notes */}
              {officeReport.generalNotes && (
                <section>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        General Notes
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                        {
                          officeReport.generalNotes
                        }
                      </p>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>
          )}
        </div>

        <SheetFooter className="border-t bg-muted/20 px-6 py-3">
          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              This report is recorded as final.
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}