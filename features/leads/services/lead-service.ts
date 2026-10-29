import "server-only";

import crypto from "node:crypto";

import {
  Prisma,
  ROLES,
} from "@/prisma/generated/prisma/client";

import {
  ApplicationType,
  ClientTestType,
  LeadAssignmentType,
  LeadStatus,
} from "@/prisma/generated/prisma/enums";

import { ApiError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { dateOnlyUTC } from "@/lib/utils";

import type { CreateLeadInput } from "../schemas/leads-schema";

type Actor = { id: string };

function code(prefix: string) {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replaceAll("-", "");

  return `${prefix}-${date}-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

function clean(value?: string | null): string | null {
  const v = value?.trim();
  return v ? v : null;
}

/**
 * This canonicalizes punctuation and whitespace only; it intentionally does
 * not infer a country code. Existing records should be normalized by the
 * same rule before relying on the unique database constraint.
 */
function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function decimal(value?: string | null): Prisma.Decimal | null {
  const v = clean(value);
  return v ? new Prisma.Decimal(v) : null;
}

function dateValue(value?: string | null) {
  const v = clean(value);
  return v ? dateOnlyUTC(v) : null;
}

function integerValue(value?: string | null) {
  const v = clean(value);
  return v ? Number(v) : null;
}

function hasEducationData(row: CreateLeadInput["education"][number]) {
  return Boolean(
    clean(row.institutionName) ||
      clean(row.boardUniversity) ||
      clean(row.qualification) ||
      clean(row.stream) ||
      clean(row.percentage) ||
      clean(row.cgpa) ||
      clean(row.medium) ||
      clean(row.englishMarks) ||
      clean(row.passingYear) ||
      clean(row.resultDate),
  );
}

function address(
  type: "CURRENT" | "PERMANENT",
  line1: string | null,
  line2: string | null,
  city: string | null,
  state: string | null,
  postalCode: string | null,
  country: CreateLeadInput["currentCountry"] | undefined,
) {
  if (!line1 && !line2 && !city && !state && !postalCode && !country) {
    return null;
  }

  return {
    type,
    addressLine1: line1,
    addressLine2: line2,
    city,
    state,
    postalCode,
    country: country ?? null,
    countryOther: null,
  };
}

function initialLeadState(assignmentType: LeadAssignmentType): LeadStatus {
  return assignmentType === LeadAssignmentType.TELECALLING
    ? LeadStatus.TELECALLERASSIGNED
    : LeadStatus.COUNSELORASSIGNED;
}

export async function createLead(data: CreateLeadInput, actor: Actor) {
  const [branch, assignee] = await prisma.$transaction([
    prisma.branch.findUnique({
      where: { id: data.branchId },
      select: { id: true, isActive: true },
    }),
    prisma.user.findUnique({
      where: { id: data.assignedToId },
      select: {
        id: true,
        name: true,
        isActive: true,
        roles: true,
        employee: {
          select: {
            employmentStatus: true,
            department: true,
          },
        },
      },
    }),
  ]);

  if (!branch?.isActive) {
    throw new ApiError("NOT_FOUND", "The selected branch is not available.", 404);
  }

  const assignmentType = data.assignmentType;
  const isAdmin = Boolean(assignee?.roles.includes(ROLES.ADMIN));
  const isActiveEmployee = assignee?.employee?.employmentStatus === "ACTIVE";
  const validAssignee =
    assignmentType === LeadAssignmentType.TELECALLING
      ? Boolean(
          assignee?.roles.includes(ROLES.TELECALLER) ||
            (isAdmin && assignee?.isActive),
        ) && (isAdmin || isActiveEmployee)
      : Boolean(
          assignee?.roles.includes(ROLES.COUNSELOR) ||
            (isAdmin && assignee?.isActive),
        ) && (isAdmin || isActiveEmployee);

  if (!assignee?.isActive || !validAssignee) {
    const roleLabel =
      assignmentType === LeadAssignmentType.TELECALLING
        ? "active telecaller or administrator"
        : "active counselor or administrator";

    throw new ApiError(
      "BAD_REQUEST",
      `The selected assignee is not an ${roleLabel}.`,
      400,
    );
  }

  const normalizedPhone = normalizePhone(data.phone);
  if (normalizedPhone.length < 7) {
    throw new ApiError("BAD_REQUEST", "Enter a valid phone number.", 400);
  }

  const currentAddress = address(
    "CURRENT",
    clean(data.currentAddressLine1),
    clean(data.currentAddressLine2),
    clean(data.currentCity),
    clean(data.currentState),
    clean(data.currentPostalCode),
    data.currentCountry,
  );

  const permanentAddress = data.permanentSameAsCurrent
    ? currentAddress
      ? { ...currentAddress, type: "PERMANENT" as const }
      : null
    : address(
        "PERMANENT",
        clean(data.permanentAddressLine1),
        clean(data.permanentAddressLine2),
        clean(data.permanentCity),
        clean(data.permanentState),
        clean(data.permanentPostalCode),
        data.permanentCountry,
      );

  const educationRecords =
    data.applicationType === ApplicationType.STUDY
      ? data.education.filter(hasEducationData).map((row) => ({
          level: row.level,
          institutionName: clean(row.institutionName),
          boardUniversity: clean(row.boardUniversity),
          qualification: clean(row.qualification),
          stream: clean(row.stream),
          percentage: decimal(row.percentage),
          cgpa: decimal(row.cgpa),
          medium: clean(row.medium),
          englishMarks: decimal(row.englishMarks),
          passingYear: integerValue(row.passingYear),
          resultDate: dateValue(row.resultDate),
        }))
      : [];

  const fatherName = clean(data.fatherName);
  const fatherPhone = clean(data.fatherPhone);
  const motherName = clean(data.motherName);
  const motherPhone = clean(data.motherPhone);

  try {
    return await prisma.$transaction(async (tx) => {
      const client = await tx.client.create({
        data: {
          clientCode: code("CLI"),
          branchId: data.branchId,
          givenName: data.givenName.trim(),
          middleName: clean(data.middleName),
          surname: clean(data.surname),
          email: clean(data.email),
          phone: data.phone.trim(),
          normalizedPhone,
          alternatePhone: clean(data.alternatePhone),
          dateOfBirth: dateValue(data.dateOfBirth),
          gender: data.gender ?? null,
          isPreviousVisaRefusal: data.isPreviousVisaRefusal,
          previousVisaRefusalDetails: data.isPreviousVisaRefusal
            ? clean(data.previousVisaRefusalDetails)
            : null,
          addresses: {
            create: [
              ...(currentAddress ? [currentAddress] : []),
              ...(permanentAddress ? [permanentAddress] : []),
            ],
          },
          familyMembers: {
            create: [
              ...(fatherName
                ? [{ relationship: "FATHER" as const, name: fatherName, phone: fatherPhone }]
                : []),
              ...(motherName
                ? [{ relationship: "MOTHER" as const, name: motherName, phone: motherPhone }]
                : []),
            ],
          },
          ...(educationRecords.length > 0
            ? { educationRecords: { create: educationRecords } }
            : {}),
          tests: {
            create: clean(data.languageTest.testType)
              ? [
                  {
                    testType: data.languageTest.testType as ClientTestType,
                    testDate: dateValue(data.languageTest.testDate),
                    overallScore: decimal(data.languageTest.overallScore),
                    listening: decimal(data.languageTest.listening),
                    reading: decimal(data.languageTest.reading),
                    writing: decimal(data.languageTest.writing),
                    speaking: decimal(data.languageTest.speaking),
                  },
                ]
              : [],
          },
        },
        select: { id: true, clientCode: true },
      });

      const leadStatus = initialLeadState(assignmentType);

      const lead = await tx.lead.create({
        data: {
          leadCode: code("LEAD"),
          source: data.source,
          status: leadStatus,
          clientId: client.id,
          branchId: data.branchId,
        },
        select: {
          id: true,
          leadCode: true,
          status: true,
          source: true,
          createdAt: true,
        },
      });

      const application = await tx.application.create({
        data: {
          applicationCode: code("APP"),
          clientId: client.id,
          branchId: data.branchId,
          type: data.applicationType,
          status: "INTAKE",
          preferredCountry: data.preferredCountry ?? null,
          otherCountry: clean(data.otherCountry),
          notes: clean(data.notes),
          originatingLeadId: lead.id,
        },
        select: { id: true, applicationCode: true },
      });

      await tx.leadAssignment.create({
        data: {
          leadId: lead.id,
          assignedToId: data.assignedToId,
          assignedById: actor.id,
          type: assignmentType,
          note: "Initial lead assignment",
        },
      });

      await tx.leadStatusHistory.create({
        data: {
          leadId: lead.id,
          toStatus: leadStatus,
          changedById: actor.id,
          source: "USER",
          reason: `Lead created with ${assignmentType.toLowerCase()} assignment`,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: actor.id,
          action: "LEAD_CREATED",
          entityType: "Lead",
          entityId: lead.id,
          metadata: {
            leadCode: lead.leadCode,
            clientId: client.id,
            applicationId: application.id,
            assignedToId: data.assignedToId,
            assignmentType,
          },
        },
      });

      return {
        ...lead,
        clientId: client.id,
        applicationId: application.id,
        assignedTo: { id: assignee.id, name: assignee.name },
        assignmentType,
      };
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target;
      const targetText = Array.isArray(target)
        ? target.join(",")
        : String(target ?? "");

      if (targetText.includes("normalizedPhone")) {
        throw new ApiError(
          "CONFLICT",
          "A client with this phone number already exists. Check the existing client before creating another lead.",
          409,
        );
      }

      throw new ApiError(
        "CONFLICT",
        "A generated identifier already exists. Please try again.",
        409,
      );
    }
    throw error;
  }
}
