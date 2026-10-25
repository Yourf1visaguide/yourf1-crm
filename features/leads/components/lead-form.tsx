"use client";

import * as React from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  House,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  ApplicationType,
  ClientEducationLevel,
  ClientGender,
  ClientTestType,
  Country,
  LeadSource,
} from "@/prisma/generated/prisma/enums";

import Field from "@/components/resuable-components/form-field";
import FormSubHeading from "@/components/resuable-components/form-subheading";
import { FormChoiceCards } from "@/components/resuable-components/form-choice-cards";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { todayLocalDate } from "@/lib/utils";

import { useActiveBranches } from "../api/use-active-branches";
import { useLeadAssignees } from "../api/use-lead-assignees";
import {
  createLeadSchema,
  type CreateLeadInput,
} from "../schemas/leads-schema";

type LeadFormProps = {
  onSubmit: (values: CreateLeadInput) => void;
  onCancel?: () => void;
  disabled?: boolean;
  error?: string;
};

const applicationOptions = [
  {
    value: ApplicationType.STUDY,
    label: "Study Abroad",
    description: "Education and study visa pathway.",
    icon: GraduationCap,
  },
  {
    value: ApplicationType.TOURIST,
    label: "Tourist Visa",
    description: "Short-term travel and visitor visa pathway.",
    icon: BriefcaseBusiness,
  },
] as const;

const sourceLabels: Record<LeadSource, string> = {
  IVR: "IVR",
  WALK_IN: "Walk-in",
  WHATSAPP: "WhatsApp",
  REFERRAL: "Referral",
  WEBSITE: "Website",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  PARTNER: "Partner",
  OTHER: "Other",
};

const educationLabels: Record<ClientEducationLevel, string> = {
  TENTH: "10th",
  TWELFTH: "12th",
  DIPLOMA: "Diploma",
  BACHELOR: "Bachelor",
  MASTER: "Master",
  DOCTORATE: "Doctorate",
  OTHER: "Other qualification",
};

const testLabels: Record<ClientTestType, string> = {
  IELTS: "IELTS",
  TOEFL: "TOEFL",
  PTE: "PTE",
  GRE: "GRE",
  GMAT: "GMAT",
  SAT: "SAT",
  DUOLINGO: "Duolingo",
  OTHER: "Other",
};

const countries = Object.values(Country);

const defaultEducation = [
  ClientEducationLevel.TENTH,
  ClientEducationLevel.TWELFTH,
  ClientEducationLevel.BACHELOR,
  ClientEducationLevel.MASTER,
  ClientEducationLevel.OTHER,
].map((level) => ({
  level,
  institutionName: "",
  boardUniversity: "",
  qualification: "",
  stream: "",
  percentage: "",
  cgpa: "",
  medium: "",
  englishMarks: "",
  passingYear: "",
  resultDate: "",
}));

function label(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function errorText(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

export default function LeadForm({
  onSubmit,
  onCancel,
  disabled = false,
  error,
}: LeadFormProps) {
  const {
    data: branches,
    isPending: branchesLoading,
    isError: branchesError,
  } = useActiveBranches();

  const {
    data: assignees,
    isPending: assigneesLoading,
    isError: assigneesError,
  } = useLeadAssignees();

  const form = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),

    defaultValues: {
      branchId: "",
      source: LeadSource.WALK_IN,
      applicationType: ApplicationType.STUDY,
      assignedToId: "",

      givenName: "",
      middleName: "",
      surname: "",

      phone: "",
      alternatePhone: "",
      email: "",

      dateOfBirth: "",
      gender: undefined,

      fatherName: "",
      fatherPhone: "",

      motherName: "",
      motherPhone: "",

      currentAddressLine1: "",
      currentAddressLine2: "",
      currentCity: "",
      currentState: "",
      currentPostalCode: "",
      currentCountry: Country.INDIA,

      permanentSameAsCurrent: true,

      permanentAddressLine1: "",
      permanentAddressLine2: "",
      permanentCity: "",
      permanentState: "",
      permanentPostalCode: "",
      permanentCountry: Country.INDIA,

      education: defaultEducation,

      languageTest: {
        testType: "",
        testDate: "",
        overallScore: "",
        listening: "",
        reading: "",
        writing: "",
        speaking: "",
      },

      preferredCountry: undefined,
      otherCountry: "",

      isPreviousVisaRefusal: false,
      previousVisaRefusalDetails: "",

      notes: "",
    },
  });

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = form;

  const {
    fields: educationFields,
    replace: replaceEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const [
    branchId,
    source,
    applicationType,
    assignedToId,
    givenName,
    phone,
  ] = useWatch({
    control,
    name: [
      "branchId",
      "source",
      "applicationType",
      "assignedToId",
      "givenName",
      "phone",
    ],
  });

  const permanentSameAsCurrent = useWatch({
    control,
    name: "permanentSameAsCurrent",
  });

  const previousVisaRefusal = useWatch({
    control,
    name: "isPreviousVisaRefusal",
  });

  const preferredCountry = useWatch({
    control,
    name: "preferredCountry",
  });

  const testType = useWatch({
    control,
    name: "languageTest.testType",
  });

  const currentAddress = useWatch({
    control,
    name: [
      "currentAddressLine1",
      "currentAddressLine2",
      "currentCity",
      "currentState",
      "currentPostalCode",
      "currentCountry",
    ],
  });

  React.useEffect(() => {
    replaceEducation(
      applicationType === ApplicationType.STUDY
        ? defaultEducation
        : [],
    );
  }, [applicationType, replaceEducation]);

  React.useEffect(() => {
    if (!permanentSameAsCurrent) {
      return;
    }

    const [
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
    ] = currentAddress;

    setValue(
      "permanentAddressLine1",
      line1 ?? "",
    );

    setValue(
      "permanentAddressLine2",
      line2 ?? "",
    );

    setValue(
      "permanentCity",
      city ?? "",
    );

    setValue(
      "permanentState",
      state ?? "",
    );

    setValue(
      "permanentPostalCode",
      postalCode ?? "",
    );

    setValue(
      "permanentCountry",
      country,
    );
  }, [
    currentAddress,
    permanentSameAsCurrent,
    setValue,
  ]);

  const requiredComplete = [
    branchId,
    source,
    applicationType,
    assignedToId,
    givenName,
    phone,
  ].filter(Boolean).length;

  const progress = Math.round(
    (requiredComplete / 6) * 100,
  );

  const isDisabled =
    disabled ||
    isSubmitting ||
    branchesLoading ||
    assigneesLoading;

  const lookupError =
    branchesError || assigneesError;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        <section className="space-y-4">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />

                  <p className="text-sm font-semibold">
                    Essential intake
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Capture the important information now.
                  The same profile can be completed later.
                </p>
              </div>

              <span className="text-sm font-semibold tabular-nums">
                {progress}%
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {requiredComplete}/6 required fields completed
            </p>
          </div>
        </section>

        {(error || lookupError) && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {error ||
              "Branch or assignee options could not be loaded. Please refresh and try again."}
          </div>
        )}

        <section className="space-y-4">
          <FormSubHeading
            title="Lead setup"
            description="Choose the branch, source, workflow type and initial owner."
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Branch *"
                error={errorText(
                  errors.branchId?.message,
                )}
              >
                <Controller
                  control={control}
                  name="branchId"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>

                      <SelectContent>
                        {branches?.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id}
                          >
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field
                label="Lead source *"
                error={errorText(
                  errors.source?.message,
                )}
              >
                <Controller
                  control={control}
                  name="source"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.values(LeadSource).map(
                          (item) => (
                            <SelectItem
                              key={item}
                              value={item}
                            >
                              {sourceLabels[item]}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field
                label="Assigned to *"
                error={errorText(
                  errors.assignedToId?.message,
                )}
              >
                <Controller
                  control={control}
                  name="assignedToId"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select counselor or admin" />
                      </SelectTrigger>

                      <SelectContent>
                        {assignees?.map(
                          (person) => (
                            <SelectItem
                              key={person.id}
                              value={person.id}
                            >
                              {person.name}

                              {person.roles.includes(
                                "ADMIN",
                              )
                                ? " — Admin"
                                : person.employee
                                      ?.designation
                                  ? ` — ${person.employee.designation}`
                                  : " — Counselor"}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Interested in *"
                  error={errorText(
                    errors.applicationType?.message,
                  )}
                >
                  <FormChoiceCards
                    value={applicationType}
                    options={applicationOptions}
                    onChange={(value) =>
                      setValue(
                        "applicationType",
                        value,
                        {
                          shouldDirty: true,
                        },
                      )
                    }
                    disabled={isDisabled}
                  />
                </Field>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FormSubHeading
            title="Personal & contact"
            description="Core identity and communication details."
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Given name *"
                error={errorText(
                  errors.givenName?.message,
                )}
              >
                <Input
                  placeholder="Given name"
                  disabled={isDisabled}
                  {...register("givenName")}
                />
              </Field>

              <Field label="Middle name">
                <Input
                  placeholder="Optional"
                  disabled={isDisabled}
                  {...register("middleName")}
                />
              </Field>

              <Field label="Surname">
                <Input
                  placeholder="Optional"
                  disabled={isDisabled}
                  {...register("surname")}
                />
              </Field>

              <Field label="Date of birth">
                <Input
                  type="date"
                  max={todayLocalDate()}
                  disabled={isDisabled}
                  {...register("dateOfBirth")}
                />
              </Field>

              <Field label="Gender">
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) =>
                        field.onChange(
                          value || undefined,
                        )
                      }
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.values(
                          ClientGender,
                        ).map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                          >
                            {label(item)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field
                label="Mobile number *"
                error={errorText(
                  errors.phone?.message,
                )}
              >
                <Input
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  disabled={isDisabled}
                  {...register("phone")}
                />
              </Field>

              <Field label="Alternate phone">
                <Input
                  inputMode="tel"
                  placeholder="Optional"
                  disabled={isDisabled}
                  {...register("alternatePhone")}
                />
              </Field>

              <Field
                label="Email"
                error={errorText(
                  errors.email?.message,
                )}
              >
                <Input
                  type="email"
                  placeholder="name@example.com"
                  disabled={isDisabled}
                  {...register("email")}
                />
              </Field>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FormSubHeading
            title="Parent / family contact"
            description="Capture the family contacts that are useful to the counselor."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Father",
                icon: UserRound,
                name: "fatherName" as const,
                phone: "fatherPhone" as const,
              },
              {
                title: "Mother",
                icon: HeartHandshake,
                name: "motherName" as const,
                phone: "motherPhone" as const,
              },
            ].map((parent) => {
              const Icon = parent.icon;

              return (
                <div
                  key={parent.title}
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold">
                        {parent.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Optional
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Field label="Name">
                      <Input
                        placeholder={`${parent.title}'s name`}
                        disabled={isDisabled}
                        {...register(parent.name)}
                      />
                    </Field>

                    <Field label="Phone">
                      <Input
                        inputMode="tel"
                        placeholder="Contact number"
                        disabled={isDisabled}
                        {...register(parent.phone)}
                      />
                    </Field>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FormSubHeading
            title="Address"
            description="Keep intake focused on the current residential address."
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <House className="size-4" />
              </span>

              <p className="text-sm font-semibold">
                Current address
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address">
                  <Input
                    placeholder="House / street / locality"
                    disabled={isDisabled}
                    {...register(
                      "currentAddressLine1",
                    )}
                  />
                </Field>
              </div>

              <Field label="Address line 2">
                <Input
                  placeholder="Apartment / area"
                  disabled={isDisabled}
                  {...register(
                    "currentAddressLine2",
                  )}
                />
              </Field>

              <Field label="City">
                <Input
                  placeholder="City"
                  disabled={isDisabled}
                  {...register("currentCity")}
                />
              </Field>

              <Field label="State">
                <Input
                  placeholder="State"
                  disabled={isDisabled}
                  {...register("currentState")}
                />
              </Field>

              <Field label="Postal code">
                <Input
                  inputMode="numeric"
                  placeholder="Postal code"
                  disabled={isDisabled}
                  {...register(
                    "currentPostalCode",
                  )}
                />
              </Field>

              <Field label="Country">
                <Controller
                  control={control}
                  name="currentCountry"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={
                        field.onChange
                      }
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>

                      <SelectContent>
                        {countries.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                          >
                            {label(item)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/20 p-4">
            <Controller
              control={control}
              name="permanentSameAsCurrent"
              render={({ field }) => (
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={
                      field.onChange
                    }
                    disabled={isDisabled}
                  />

                  <span>
                    <span className="block text-sm font-medium">
                      Permanent address is the same
                    </span>

                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      You can complete it later when
                      the lead is registered.
                    </span>
                  </span>
                </label>
              )}
            />
          </div>

          {!permanentSameAsCurrent && (
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-4" />
                </span>

                <p className="text-sm font-semibold">
                  Permanent address
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Address">
                    <Input
                      placeholder="House / street / locality"
                      disabled={isDisabled}
                      {...register(
                        "permanentAddressLine1",
                      )}
                    />
                  </Field>
                </div>

                <Field label="Address line 2">
                  <Input
                    placeholder="Apartment / area"
                    disabled={isDisabled}
                    {...register(
                      "permanentAddressLine2",
                    )}
                  />
                </Field>

                <Field label="City">
                  <Input
                    placeholder="City"
                    disabled={isDisabled}
                    {...register("permanentCity")}
                  />
                </Field>

                <Field label="State">
                  <Input
                    placeholder="State"
                    disabled={isDisabled}
                    {...register("permanentState")}
                  />
                </Field>

                <Field label="Postal code">
                  <Input
                    inputMode="numeric"
                    placeholder="Postal code"
                    disabled={isDisabled}
                    {...register(
                      "permanentPostalCode",
                    )}
                  />
                </Field>

                <Field label="Country">
                  <Controller
                    control={control}
                    name="permanentCountry"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""}
                        onValueChange={
                          field.onChange
                        }
                        disabled={isDisabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>

                        <SelectContent>
                          {countries.map(
                            (item) => (
                              <SelectItem
                                key={item}
                                value={item}
                              >
                                {label(item)}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>
            </div>
          )}
        </section>

        {applicationType === ApplicationType.STUDY && (
          <>
            <Separator />

            <section className="space-y-4">
              <FormSubHeading
                title="Education"
                description="Add the qualifications relevant to the initial counselling."
              />

              <div className="space-y-3">
                {educationFields.map(
                  (field, index) => (
                    <div
                      key={field.id}
                      className="rounded-2xl border bg-card p-5 shadow-sm"
                    >
                      <div className="mb-4 flex items-center gap-2">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <GraduationCap className="size-4" />
                        </span>

                        <div>
                          <p className="text-sm font-semibold">
                            {
                              educationLabels[
                                field.level
                              ]
                            }
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Optional at lead stage
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Institution">
                          <Input
                            placeholder="School / college / university"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.institutionName`,
                            )}
                          />
                        </Field>

                        <Field label="Board / University">
                          <Input
                            placeholder="e.g. CBSE / GNDU"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.boardUniversity`,
                            )}
                          />
                        </Field>

                        <Field label="Qualification">
                          <Input
                            placeholder="Qualification name"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.qualification`,
                            )}
                          />
                        </Field>

                        <Field label="Stream / Specialization">
                          <Input
                            placeholder="e.g. Commerce"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.stream`,
                            )}
                          />
                        </Field>

                        <Field label="Percentage">
                          <Input
                            inputMode="decimal"
                            placeholder="82.5"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.percentage`,
                            )}
                          />
                        </Field>

                        <Field label="CGPA">
                          <Input
                            inputMode="decimal"
                            placeholder="8.2"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.cgpa`,
                            )}
                          />
                        </Field>

                        <Field label="Medium">
                          <Input
                            placeholder="e.g. English"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.medium`,
                            )}
                          />
                        </Field>

                        <Field label="Passing year">
                          <Input
                            inputMode="numeric"
                            placeholder="2025"
                            disabled={isDisabled}
                            {...register(
                              `education.${index}.passingYear`,
                            )}
                          />
                        </Field>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          </>
        )}

        <Separator />

        <section className="space-y-4">
          <FormSubHeading
            title="Language / entrance test"
            description="Capture an existing result without making it mandatory."
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Test">
                <Controller
                  control={control}
                  name="languageTest.testType"
                  render={({ field }) => (
                    <Select
                      value={field.value || ""}
                      onValueChange={
                        field.onChange
                      }
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Not taken / select test" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.values(
                          ClientTestType,
                        ).map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                          >
                            {testLabels[item]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field label="Test date">
                <Input
                  type="date"
                  disabled={isDisabled}
                  {...register(
                    "languageTest.testDate",
                  )}
                />
              </Field>

              <Field label="Overall score">
                <Input
                  inputMode="decimal"
                  placeholder="7.0"
                  disabled={isDisabled}
                  {...register(
                    "languageTest.overallScore",
                  )}
                />
              </Field>
            </div>

            {testType && (
              <>
                <Separator className="my-5" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Listening">
                    <Input
                      inputMode="decimal"
                      disabled={isDisabled}
                      {...register(
                        "languageTest.listening",
                      )}
                    />
                  </Field>

                  <Field label="Reading">
                    <Input
                      inputMode="decimal"
                      disabled={isDisabled}
                      {...register(
                        "languageTest.reading",
                      )}
                    />
                  </Field>

                  <Field label="Writing">
                    <Input
                      inputMode="decimal"
                      disabled={isDisabled}
                      {...register(
                        "languageTest.writing",
                      )}
                    />
                  </Field>

                  <Field label="Speaking">
                    <Input
                      inputMode="decimal"
                      disabled={isDisabled}
                      {...register(
                        "languageTest.speaking",
                      )}
                    />
                  </Field>
                </div>
              </>
            )}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FormSubHeading
            title="Destination & visa history"
            description="Capture the preferred country and any previous refusal."
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred country">
                <Controller
                  control={control}
                  name="preferredCountry"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) =>
                        field.onChange(
                          value || undefined,
                        )
                      }
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select preferred country" />
                      </SelectTrigger>

                      <SelectContent>
                        {countries.map(
                          (item) => (
                            <SelectItem
                              key={item}
                              value={item}
                            >
                              {label(item)}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              {preferredCountry === Country.OTHER && (
                <Field
                  label="Other country"
                  error={errorText(
                    errors.otherCountry?.message,
                  )}
                >
                  <Input
                    placeholder="Enter country name"
                    disabled={isDisabled}
                    {...register(
                      "otherCountry",
                    )}
                  />
                </Field>
              )}

              <div className="sm:col-span-2 rounded-xl border bg-muted/20 p-4">
                <Controller
                  control={control}
                  name="isPreviousVisaRefusal"
                  render={({ field }) => (
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={
                          field.onChange
                        }
                        disabled={isDisabled}
                      />

                      <span>
                        <span className="block text-sm font-medium">
                          Previous visa refusal
                        </span>

                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          Mark this when the applicant has
                          been refused before.
                        </span>
                      </span>
                    </label>
                  )}
                />
              </div>

              {previousVisaRefusal && (
                <div className="sm:col-span-2">
                  <Field
                    label="Refusal details"
                    error={errorText(
                      errors
                        .previousVisaRefusalDetails
                        ?.message,
                    )}
                  >
                    <Textarea
                      rows={4}
                      maxLength={1000}
                      placeholder="Country, year and brief reason if known"
                      disabled={isDisabled}
                      {...register(
                        "previousVisaRefusalDetails",
                      )}
                    />
                  </Field>
                </div>
              )}
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <FormSubHeading
            title="Additional notes"
            description="Optional context from the walk-in conversation."
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <Field label="Notes">
              <Textarea
                rows={5}
                maxLength={2000}
                placeholder="Add any useful context for the counselor..."
                disabled={isDisabled}
                {...register("notes")}
              />
            </Field>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between gap-3 border-t bg-background px-6 py-4">
        <p className="hidden max-w-sm text-xs leading-5 text-muted-foreground sm:block">
          Only essential intake information is required.
          The same client profile can be completed later.
        </p>

        <div className="ml-auto flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isDisabled}
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isDisabled}
          >
            {isDisabled
              ? "Creating lead..."
              : "Create lead"}
          </Button>
        </div>
      </div>
    </form>
  );
}