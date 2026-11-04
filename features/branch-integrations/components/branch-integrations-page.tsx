"use client";

import * as React from "react";

import  Container  from "@/components/resuable-components/container";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DataTableSkeleton } from "@/features/users/components/data-table-skelton";

import { useBranchContext } from "@/providers/branch-provider";

import {
  useCreateBranchIntegration,
  useDeleteBranchIntegration,
  useUpdateBranchIntegration,
} from "../api/use-branch-integrations";

import IntegrationsTable from "./integrations-table";
import IntegrationFormSheet from "./integration-form-sheet";

import type {
  BranchIntegrationListItem,
  CreateBranchIntegrationPayload,
  UpdateBranchIntegrationPayload,
} from "../types";

type SheetMode = "create" | "edit" | "view";

export default function BranchIntegrationsPage() {
  const {
    branches,
    selectedBranchId,
    isReady,
    isLoading: isBranchLoading,
  } = useBranchContext();

  const createMutation = useCreateBranchIntegration();
  const updateMutation = useUpdateBranchIntegration();
  const deleteMutation = useDeleteBranchIntegration();

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [sheetMode, setSheetMode] =
    React.useState<SheetMode>("create");

  const [selectedIntegration, setSelectedIntegration] =
    React.useState<BranchIntegrationListItem | null>(null);

  const [deleteTarget, setDeleteTarget] =
    React.useState<BranchIntegrationListItem | null>(null);

  function openCreate() {
    setSelectedIntegration(null);
    setSheetMode("create");
    setSheetOpen(true);
  }

  function openEdit(integration: BranchIntegrationListItem) {
    setSelectedIntegration(integration);
    setSheetMode("edit");
    setSheetOpen(true);
  }

  function openView(integration: BranchIntegrationListItem) {
    setSelectedIntegration(integration);
    setSheetMode("view");
    setSheetOpen(true);
  }

  async function handleSubmit(
    values:
      | CreateBranchIntegrationPayload
      | UpdateBranchIntegrationPayload,
  ) {
    if (
      sheetMode === "edit" &&
      selectedIntegration
    ) {
      await updateMutation.mutateAsync({
        id: selectedIntegration.id,
        data: values as UpdateBranchIntegrationPayload,
      });

      return;
    }

    await createMutation.mutateAsync(
      values as CreateBranchIntegrationPayload,
    );
  }

  function handleToggle(
    integration: BranchIntegrationListItem,
  ) {
    updateMutation.mutate({
      id: integration.id,
      data: {
        isActive: !integration.isActive,
      },
    });
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      // Mutation hook displays the API error.
    }
  }

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending;

  if (!isReady || isBranchLoading) {
    return (
      <Container>
        <DataTableSkeleton columns={6} />
      </Container>
    );
  }

  if (!selectedBranchId) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h2 className="font-semibold">
            Branch context unavailable
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Select a branch before managing integrations.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight">
            Integrations
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage external provider connections for your branches.
            Add, update, activate, or remove integration configurations
            from one place.
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Available providers
            </p>

            <p className="mt-1 text-2xl font-semibold">
              2
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Sukam IVR and Meta WhatsApp
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Selected scope
            </p>

            <p className="mt-1 text-lg font-semibold">
              {selectedBranchId === "all"
                ? "All permitted branches"
                : branches.find(
                    (branch) =>
                      branch.id === selectedBranchId,
                  )?.name ?? "Selected branch"}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Controlled by the global branch selector
            </p>
          </div>
        </div>

        <IntegrationsTable
          branchId={selectedBranchId}
          onAdd={openCreate}
          onView={openView}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          onToggle={handleToggle}
        />
      </Container>

      <IntegrationFormSheet
        open={sheetOpen}
        mode={sheetMode}
        integration={selectedIntegration}
        branches={branches}
        defaultBranchId={selectedBranchId}
        isSubmitting={isSubmitting}
        onOpenChange={setSheetOpen}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setDeleteTarget(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete integration?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete the saved configuration
              for{" "}
              <strong>
                {deleteTarget?.displayName}
              </strong>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleteMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete integration"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}