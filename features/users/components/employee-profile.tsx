import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import type { EmployeeProfileData } from "../queries/employee-profile-queries";

type EmployeeProfileProps = {
  employee: EmployeeProfileData;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
};

export function EmployeeProfile({
  employee,
  backHref = "/users",
  backLabel = "Employees",
  actions,
}: EmployeeProfileProps) {
  const initials = getInitials(employee.name);

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {backLabel}
      </Link>

      {/* Profile header */}
      <section
        className="
          relative overflow-hidden
          rounded-2xl
          border border-border/70
          bg-card
          shadow-sm
        "
      >
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {/* Avatar */}
              <div
                className="
                  flex size-16 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-primary/20
                  bg-primary/10
                  text-lg font-semibold
                  tracking-wide
                  text-primary
                  shadow-sm
                "
              >
                {initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-2xl font-semibold tracking-tight">
                    {employee.name}
                  </h1>

                  <StatusBadge
                    status={employee.employmentStatus}
                  />
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {employee.employeeCode}
                  {" · "}
                  {formatLabel(employee.department)}

                  {employee.designation && (
                    <>
                      {" · "}
                      {employee.designation}
                    </>
                  )}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    {employee.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    Joined{" "}
                    {formatProfileDate(employee.joiningDate)}
                  </span>
                </div>
              </div>
            </div>

            {actions}
          </div>
        </div>
      </section>

      {/* Main information */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Overview */}
        <ProfileSection
          icon={UserRound}
          title="Employee information"
          description="Basic employment details."
        >
          <InfoGrid>
            <InfoItem
              label="Full name"
              value={employee.name}
            />

            <InfoItem
              label="Employee code"
              value={employee.employeeCode}
            />

            <InfoItem
              label="Department"
              value={formatLabel(employee.department)}
            />

            <InfoItem
              label="Designation"
              value={employee.designation ?? "—"}
            />

            <InfoItem
              label="Joining date"
              value={formatProfileDate(employee.joiningDate)}
            />

            <InfoItem
              label="Employment status"
              value={formatLabel(
                employee.employmentStatus,
              )}
            />
          </InfoGrid>
        </ProfileSection>

        {/* Account */}
        <ProfileSection
          icon={ShieldCheck}
          title="Account & access"
          description="Authentication and workspace access."
        >
          <div className="space-y-5">
            <InfoItem
              label="Email"
              value={employee.email}
            />

            <InfoItem
              label="Username"
              value={employee.username ?? "—"}
            />

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Account status
              </p>

              <div className="mt-1.5">
                <AccountStatusBadge
                  active={employee.accountActive}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Assigned roles
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {employee.roles.length > 0 ? (
                  employee.roles.map((role) => (
                    <Badge
                      key={role}
                      variant="secondary"
                      className="font-medium"
                    >
                      {formatLabel(role)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No roles assigned
                  </span>
                )}
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>

      {/* Future modules */}
      <section
        className="
          rounded-2xl
          border border-border/70
          bg-card
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              Employee records
            </h2>

            <p className="text-xs text-muted-foreground">
              Additional employment records will appear here.
            </p>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid gap-3 sm:grid-cols-3">
          <FutureRecord title="Compensation" />
          <FutureRecord title="Work schedule" />
          <FutureRecord title="Commission" />
        </div>
      </section>
    </div>
  );
}

function ProfileSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            {title}
          </h2>

          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Separator className="my-5" />

      {children}
    </section>
  );
}

function InfoGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {children}
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

function FutureRecord({
  title,
}: {
  title: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/50 p-4">
      <p className="text-sm font-medium">
        {title}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        History and records will appear here.
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const active = status === "ACTIVE";

  return (
    <Badge
      variant="outline"
      className={
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-border bg-muted text-muted-foreground"
      }
    >
      {formatLabel(status)}
    </Badge>
  );
}

function AccountStatusBadge({
  active,
}: {
  active: boolean;
}) {
  return (
    <Badge
      variant="outline"
      className={
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
      }
    >
      {active ? "Active" : "Disabled"}
    </Badge>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
function formatProfileDate(value: Date | string) {
  const date = value instanceof Date
    ? value
    : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return format(date, "dd MMM yyyy");
}