import { z } from "zod";

import {
  ApplicationType,
  ClientEducationLevel,
  ClientGender,
  ClientTestType,
  Country,
  LeadAssignmentType,
  LeadSource,
} from "@/prisma/generated/prisma/enums";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Enter a valid calendar date");

const optionalDate = dateOnly.optional().or(z.literal(""));

const optionalNumber = (message: string) =>
  z
    .string()
    .trim()
    .refine(
      (value) => value === "" || Number.isFinite(Number(value)),
      message,
    )
    .optional()
    .or(z.literal(""));

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Phone number is too long")
  .regex(/^[+0-9()\-\s]+$/, "Enter a valid phone number")
  .refine((value) => value.replace(/\D/g, "").length >= 7, {
    message: "Enter a valid phone number",
  });

const education = z
  .object({
    level: z.enum(ClientEducationLevel),
    institutionName: optionalText(200),
    boardUniversity: optionalText(200),
    qualification: optionalText(200),
    stream: optionalText(120),
    percentage: optionalNumber("Enter a valid percentage"),
    cgpa: optionalNumber("Enter a valid CGPA"),
    medium: optionalText(100),
    englishMarks: optionalNumber("Enter valid English marks"),
    passingYear: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "" ||
          (/^\d{4}$/.test(value) &&
            Number(value) >= 1900 &&
            Number(value) <= 2100),
        "Enter a valid passing year",
      )
      .optional()
      .or(z.literal("")),
    resultDate: optionalDate,
  })
  .strict();

const languageTest = z
  .object({
    testType: z.union([z.literal(""), z.enum(ClientTestType)]),
    testDate: optionalDate,
    overallScore: optionalNumber("Enter a valid overall score"),
    listening: optionalNumber("Enter a valid listening score"),
    reading: optionalNumber("Enter a valid reading score"),
    writing: optionalNumber("Enter a valid writing score"),
    speaking: optionalNumber("Enter a valid speaking score"),
  })
  .strict();

export const createLeadSchema = z
  .object({
    branchId: z.string().trim().min(1, "Branch is required"),
    source: z.enum(LeadSource),
    applicationType: z.enum(ApplicationType),
    assignmentType: z.enum(LeadAssignmentType),
    assignedToId: z.string().trim().min(1, "Assignee is required"),

    givenName: z.string().trim().min(1, "Given name is required").max(100),
    middleName: optionalText(100),
    surname: optionalText(100),
    phone,
    alternatePhone: optionalText(20),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address")
      .max(200)
      .optional()
      .or(z.literal("")),
    dateOfBirth: optionalDate,
    gender: z.enum(ClientGender).optional(),

    fatherName: optionalText(120),
    fatherPhone: optionalText(20),
    motherName: optionalText(120),
    motherPhone: optionalText(20),

    currentAddressLine1: optionalText(250),
    currentAddressLine2: optionalText(250),
    currentCity: optionalText(100),
    currentState: optionalText(100),
    currentPostalCode: optionalText(20),
    currentCountry: z.enum(Country).optional(),

    permanentSameAsCurrent: z.boolean(),
    permanentAddressLine1: optionalText(250),
    permanentAddressLine2: optionalText(250),
    permanentCity: optionalText(100),
    permanentState: optionalText(100),
    permanentPostalCode: optionalText(20),
    permanentCountry: z.enum(Country).optional(),

    education: z.array(education).max(10),
    languageTest,

    preferredCountry: z.enum(Country).optional(),
    otherCountry: optionalText(100),
    isPreviousVisaRefusal: z.boolean(),
    previousVisaRefusalDetails: optionalText(1000),
    notes: optionalText(2000),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.preferredCountry === Country.OTHER && !data.otherCountry) {
      ctx.addIssue({
        code: "custom",
        path: ["otherCountry"],
        message: "Please enter the country name.",
      });
    }

    if (
      data.isPreviousVisaRefusal &&
      !data.previousVisaRefusalDetails
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["previousVisaRefusalDetails"],
        message: "Please add a brief refusal detail.",
      });
    }

    if (
      data.assignmentType === "TELECALLING" &&
      !data.assignedToId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["assignedToId"],
        message: "Telecaller is required for a telecalling assignment.",
      });
    }
  });

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
