/** Presentation model deliberately decoupled from generated Prisma types. */
export type LeadProfileStatus =
  | "NEW"
  | "NOT_PICKED"
  | "JUST_INFO"
  | "NOT_INTERESTED"
  | "CONVERTED";

export type LeadProfileSection =
  | "overview"
  | "applications"
  | "documents"
  | "notes"
  | "follow-ups"
  | "tasks"
  | "payments"
  | "timeline";

export type ProfileField = {
  label: string;
  value?: string | number | null;
  /** Optional display hint for later interactive versions. */
  copyable?: boolean;
};

export type ProfileFieldGroup = {
  id: string;
  title: string;
  description?: string;
  fields: ProfileField[];
  icon?: "personal" | "education" | "address" | "tests" | "family" | "work" | "passport";
  initiallyExpanded?: boolean;
};

export type LeadProfileViewModel = {
  lead: {
    id: string;
    code: string;
    status: LeadProfileStatus;
    source?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    preferredVisaType?: string | null;
    preferredCountry?: string | null;
  };
  client: {
    id: string;
    code?: string | null;
    givenName: string;
    middleName?: string | null;
    surname?: string | null;
    phone?: string | null;
    email?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    nationality?: string | null;
    alternatePhone?: string | null;
  };
  assignment?: {
    ownerName?: string | null;
    ownerDepartment?: string | null;
    assignedAt?: string | null;
    branchName?: string | null;
    branchUpdatedAt?: string | null;
  } | null;
  summary: {
    nextFollowUp?: string | null;
    applicationCount: number;
    openTaskCount: number;
    documentReadiness?: "NOT_ASSESSED" | "IN_PROGRESS" | "READY";
  };
  groups: {
    personal: ProfileFieldGroup;
    education: ProfileFieldGroup;
    addresses: ProfileFieldGroup;
    tests: ProfileFieldGroup;
    family: ProfileFieldGroup;
    workExperience: ProfileFieldGroup;
    passport: ProfileFieldGroup;
  };
};

export type LeadProfileWorkspaceProps = {
  profile: LeadProfileViewModel;
  /** Keep actions inert until connected to authorized server mutations. */
  onEditSection?: (sectionId: string) => void;
  onEditProfile?: () => void;
  onAssignLead?: () => void;
  onSectionChange?: (section: LeadProfileSection) => void;
};
