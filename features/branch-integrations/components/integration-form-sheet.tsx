"use client";

import * as React from "react";

import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type {
  IntegrationProvider,
} from "@/prisma/generated/prisma/enums";

import type {
  BranchIntegrationListItem,
  CreateBranchIntegrationPayload,
  UpdateBranchIntegrationPayload,
} from "../types";

type BranchOption = {
  id: string;
  name: string;
};

type Mode = "create" | "edit" | "view";

type Props = {
  open: boolean;
  mode: Mode;
  integration?: BranchIntegrationListItem | null;
  branches: BranchOption[];
  defaultBranchId: string | null;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    values:
      | CreateBranchIntegrationPayload
      | UpdateBranchIntegrationPayload,
  ) => Promise<void>;
};

function providerName(provider: IntegrationProvider) {
  return provider === "SUKAM_IVR"
    ? "Sukam IVR"
    : "Meta WhatsApp";
}

export default function IntegrationFormSheet({
  open,
  mode,
  integration,
  branches,
  defaultBranchId,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: Props) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [provider, setProvider] =
    React.useState<IntegrationProvider>("SUKAM_IVR");

  const [branchId, setBranchId] =
    React.useState("");

  const [displayName, setDisplayName] =
    React.useState("");

  const [phoneNumber, setPhoneNumber] =
    React.useState("");

  const [providerEndpointId, setProviderEndpointId] =
    React.useState("");

  const [providerAccountId, setProviderAccountId] =
    React.useState("");

  const [credential, setCredential] =
    React.useState("");

  const [showCredential, setShowCredential] =
    React.useState(false);

  const [formError, setFormError] =
    React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;

    setFormError(null);
    setCredential("");
    setShowCredential(false);

    if (integration) {
      setProvider(integration.provider);
      setBranchId(integration.branchId);
      setDisplayName(integration.displayName);
      setPhoneNumber(integration.phoneNumber);
      setProviderEndpointId(
        integration.providerEndpointId,
      );
      setProviderAccountId(
        integration.providerAccountId ?? "",
      );
    } else {
      setProvider("SUKAM_IVR");
      setBranchId(
        defaultBranchId &&
          defaultBranchId !== "all"
          ? defaultBranchId
          : branches[0]?.id ?? "",
      );
      setDisplayName("");
      setPhoneNumber("");
      setProviderEndpointId("");
      setProviderAccountId("");
    }
  }, [
    open,
    integration,
    defaultBranchId,
    branches,
  ]);

  const isSukam = provider === "SUKAM_IVR";

  const endpointLabel = isSukam
    ? "Sukam App GUID"
    : "Meta Phone Number ID";

  const accountLabel = isSukam
    ? "Provider account ID (optional)"
    : "WhatsApp Business Account ID";

  const credentialLabel = isSukam
    ? "Sukam API key"
    : "Meta permanent access token";

  const credentialPlaceholder = isSukam
    ? "Enter your Sukam API key"
    : "Enter your Meta access token";

  const submitLabel = isEdit
    ? "Save changes"
    : "Save integration";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setFormError(null);

    if (!displayName.trim()) {
      setFormError("Enter an integration name.");
      return;
    }

    if (!phoneNumber.trim()) {
      setFormError("Enter the provider phone number.");
      return;
    }

    if (!providerEndpointId.trim()) {
      setFormError(`Enter the ${endpointLabel}.`);
      return;
    }

    if (!isEdit && !branchId) {
      setFormError("Select a branch.");
      return;
    }

    if (!isEdit && !credential.trim()) {
      setFormError(`Enter the ${credentialLabel}.`);
      return;
    }

    if (
      provider === "META_WHATSAPP" &&
      !providerAccountId.trim()
    ) {
      setFormError("Enter the WhatsApp Business Account ID.");
      return;
    }

    try {
      if (isEdit) {
        const values: UpdateBranchIntegrationPayload = {
          displayName: displayName.trim(),
          phoneNumber: phoneNumber.trim(),
          providerEndpointId: providerEndpointId.trim(),
          providerAccountId: providerAccountId.trim() || null,

          // Empty means preserve the existing encrypted credential.
          ...(credential.trim()
            ? {
                credentials: {
                  [isSukam ? "apiKey" : "accessToken"]:
                    credential.trim(),
                },
              }
            : {}),
        };

        await onSubmit(values);
      } else {
        const values: CreateBranchIntegrationPayload = {
          branchId,
          provider,
          displayName: displayName.trim(),
          phoneNumber: phoneNumber.trim(),
          providerEndpointId: providerEndpointId.trim(),
          providerAccountId: providerAccountId.trim() || null,
          credentials: {
            [isSukam ? "apiKey" : "accessToken"]:
              credential.trim(),
          },
        };

        await onSubmit(values);
      }

      onOpenChange(false);
    } catch {
      // Mutation hooks show the actual API error.
      // Keep the sheet open so the user can correct the form.
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-2xl"
      >
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>
            {mode === "create"
              ? "Add integration"
              : mode === "edit"
                ? "Edit integration"
                : "Integration details"}
          </SheetTitle>

          <SheetDescription>
            {isView
              ? "Review the saved integration configuration."
              : "Configure the provider connection for a branch."}
          </SheetDescription>
        </SheetHeader>

        {isView && integration ? (
          <div className="space-y-6 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">
                  {integration.displayName}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {providerName(integration.provider)}
                </p>
              </div>

              <Badge
                variant={
                  integration.isActive
                    ? "success"
                    : "neutral"
                }
              >
                {integration.isActive
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Detail
                label="Branch"
                value={integration.branch.name}
              />

              <Detail
                label="Phone number"
                value={integration.phoneNumber}
              />

              <Detail
                label="Provider endpoint ID"
                value={integration.providerEndpointId}
                mono
              />

              <Detail
                label="Provider account ID"
                value={integration.providerAccountId ?? "—"}
                mono
              />

              <Detail
                label="Credentials"
                value={
                  integration.hasCredentials
                    ? "Configured — encrypted"
                    : "Not configured"
                }
              />

              <Detail
                label="Created"
                value={new Date(
                  integration.createdAt,
                ).toLocaleString()}
              />

              <Detail
                label="Last updated"
                value={new Date(
                  integration.updatedAt,
                ).toLocaleString()}
              />
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <KeyRound className="size-4" />
                Credential security
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Provider credentials are encrypted on the server.
                Their actual values are never returned to this page.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col"
          >
            <div className="space-y-6 px-6 py-5">
              {mode === "create" && (
                <>
                  <Field label="Provider">
                    <Select
                      value={provider}
                      onValueChange={(value) => {
                        if (
                          value === "SUKAM_IVR" ||
                          value === "META_WHATSAPP"
                        ) {
                          setProvider(value);
                          setProviderEndpointId("");
                          setProviderAccountId("");
                          setCredential("");
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="SUKAM_IVR">
                          Sukam IVR
                        </SelectItem>

                        <SelectItem value="META_WHATSAPP">
                          Meta WhatsApp Cloud API
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Branch">
                    <Select
                      value={branchId}
                      onValueChange={(value) =>
                        setBranchId(value ?? "")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>

                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id}
                          >
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}

              {isEdit && integration && (
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-sm font-medium">
                    {providerName(integration.provider)}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Provider type and branch cannot be changed.
                    Create a new configuration if you need a different provider.
                  </p>
                </div>
              )}

              <Field label="Integration name">
                <Input
                  value={displayName}
                  onChange={(event) =>
                    setDisplayName(event.target.value)
                  }
                  placeholder={
                    isSukam
                      ? "Main office IVR"
                      : "Main office WhatsApp"
                  }
                  disabled={isView || isSubmitting}
                />
              </Field>

              <Field
                label={
                  isSukam
                    ? "IVR phone number"
                    : "WhatsApp business number"
                }
              >
                <Input
                  value={phoneNumber}
                  onChange={(event) =>
                    setPhoneNumber(event.target.value)
                  }
                  placeholder="+91 98765 43210"
                  disabled={isView || isSubmitting}
                />
              </Field>

              <Field label={endpointLabel}>
                <Input
                  value={providerEndpointId}
                  onChange={(event) =>
                    setProviderEndpointId(
                      event.target.value,
                    )
                  }
                  placeholder={
                    isSukam
                      ? "Enter the Sukam App GUID"
                      : "Enter the Meta Phone Number ID"
                  }
                  disabled={isView || isSubmitting}
                />
              </Field>

              <Field label={accountLabel}>
                <Input
                  value={providerAccountId}
                  onChange={(event) =>
                    setProviderAccountId(
                      event.target.value,
                    )
                  }
                  placeholder={
                    isSukam
                      ? "Optional"
                      : "Enter the WABA ID"
                  }
                  disabled={isView || isSubmitting}
                />
              </Field>

              <Field
                label={credentialLabel}
                description={
                  isEdit
                    ? "Leave blank to keep the existing credential. Enter a new value only when rotating it."
                    : "This value will be encrypted before it is saved."
                }
              >
                <div className="relative">
                  <Input
                    type={
                      showCredential
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    value={credential}
                    onChange={(event) =>
                      setCredential(event.target.value)
                    }
                    placeholder={
                      isEdit
                        ? "Leave blank to keep existing credential"
                        : credentialPlaceholder
                    }
                    disabled={isSubmitting}
                    className="pr-11"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-0.5"
                    onClick={() =>
                      setShowCredential((value) => !value)
                    }
                    aria-label={
                      showCredential
                        ? "Hide credential"
                        : "Show credential"
                    }
                  >
                    {showCredential ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </Field>

              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <KeyRound className="size-4" />
                  Secure credential storage
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Credentials are encrypted before database storage.
                  They are not displayed again after saving.
                </p>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {formError}
                </p>
              )}
            </div>

            <SheetFooter className="border-t px-6 py-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}

                {submitLabel}
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Field({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<{
              id?: string;
            }>,
            { id },
          )
        : children}

      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p
        className={
          mono
            ? "break-all font-mono text-sm"
            : "break-words text-sm"
        }
      >
        {value}
      </p>
    </div>
  );
}