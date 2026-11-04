"use client";

import {
  Eye,
  MoreVertical,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  BranchIntegrationListItem,
} from "../types";

type Props = {
  integration: BranchIntegrationListItem;
  onView: (integration: BranchIntegrationListItem) => void;
  onEdit: (integration: BranchIntegrationListItem) => void;
  onDelete: (integration: BranchIntegrationListItem) => void;
  onToggle: (integration: BranchIntegrationListItem) => void;
};

export default function IntegrationActions({
  integration,
  onView,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
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
          Open integration actions
        </span>

        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-52 rounded-xl border border-border/60 bg-popover p-1.5 shadow-lg shadow-black/5"
      >
        <DropdownMenuItem
          onClick={() => onView(integration)}
          className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm"
        >
          <Eye className="size-4 text-muted-foreground" />
          View details
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onEdit(integration)}
          className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm"
        >
          <Pencil className="size-4 text-muted-foreground" />
          Edit configuration
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onToggle(integration)}
          className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm"
        >
          <Power className="size-4 text-muted-foreground" />

          {integration.isActive
            ? "Deactivate"
            : "Activate"}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(integration)}
          className="gap-2.5 rounded-lg px-2.5 py-2.5 text-sm"
        >
          <Trash2 className="size-4" />
          Delete integration
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}