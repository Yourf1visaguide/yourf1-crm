"use client";

import {
  Eye,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  OfficeReportListItem,
} from "../schemas/office-reports-schema";

import {
  useOfficeReportSheet,
} from "../store/use-office-report-sheet";

type OfficeReportActionsProps = {
  report: OfficeReportListItem;
};

export default function OfficeReportActions({
  report,
}: OfficeReportActionsProps) {
  const onOpen = useOfficeReportSheet(
    (state) => state.onOpen,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="size-8 p-0"
          />
        }
      >
        <span className="sr-only">
          Open report actions
        </span>

        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-52 rounded-xl border border-border/60 bg-popover p-1.5 shadow-lg shadow-black/5"
      >
        <DropdownMenuItem
          onClick={() =>
            onOpen("view", report)
          }
          className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm"
        >
          <Eye className="size-4 text-muted-foreground" />

          <span>View report</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}