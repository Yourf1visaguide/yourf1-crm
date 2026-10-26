/**
 * UI-facing profile view model.
 * Keep the visual components dependent on this stable shape rather than Prisma's
 * generated types. A server-side mapper can translate Client/Lead/Application
 * records into this view model when the page becomes dynamic.
 */
export type LeadProfileField = {
  label: string;
  value: string | null;
  sensitive?: boolean;
};

export type LeadProfileSection = {
  id: string;
  title: string;
  description?: string;
  fields: LeadProfileField[];
  initiallyCollapsed?: boolean;
};

export type LeadProfileStatus =
  | "NEW"
  | "NOT_PICKED"
  | "JUST_INFO"
  | "NOT_INTERESTED"
  | "CONVERTED";

export type LeadProfileAssignment = {
  assigneeName: string | null;
  assignedByName: string | null;
  assignedAt: string | null;
  branchName: string | null;
};

export type LeadProfileViewModel = {
  id: string;
  leadCode: string;
  clientCode: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  source: string;
  status: LeadProfileStatus;
  applicationType: "STUDY" | "TOURIST" | null;
  preferredCountry: string | null;
  createdAtLabel: string;
  updatedAtLabel: string;
  assignment: LeadProfileAssignment;
  sections: {
    personal: LeadProfileSection;
    address: LeadProfileSection;
    education: LeadProfileSection;
    tests: LeadProfileSection;
    family: LeadProfileSection;
    work: LeadProfileSection;
    passport: LeadProfileSection;
  };
};

export type LeadProfileTabId =
  | "overview"
  | "applications"
  | "documents"
  | "notes"
  | "follow-ups"
  | "tasks"
  | "payments"
  | "timeline";
