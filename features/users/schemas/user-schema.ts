import { z } from "zod";
import { DEPARTMENT, ROLES, EmploymentStatus } from "@/prisma/generated/prisma/enums";


export const userAccountSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  roles: z.array(z.enum(ROLES)),

});

export type UserAccountInput = z.infer<typeof userAccountSchema>;



export const employeeSchema = z.object({
  employeeCode: z
    .string()
    .trim()
    .min(1, "Employee code is required"),

  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  department: z.enum(DEPARTMENT),


  designation: z.string().trim(),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

  employmentStatus: z.enum(EmploymentStatus),
});
export type EmployeeInput = z.infer<typeof employeeSchema>;


export const compensationSchema = z.object({
  monthlySalary: z
    .string()
    .trim()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Enter a valid salary",
    )
    .refine(
      (value) => Number(value) > 0,
      "Salary must be greater than 0",
    ),
  salaryEffectiveFrom: z.string().min(1, "Salary start date is required"),
  
});

export type CompensationInput = z.infer<
  typeof compensationSchema
>;


export const workScheduleSchema = z.object({
  startTime: z
    .string()
    .min(1, "Start time is required"),

  endTime: z
    .string()
    .min(1, "End time is required"),

  scheduleEffectiveFrom: z
    .string()
    .min(1, "Schedule start date is required"),
});

export type WorkScheduleInput = z.infer<
  typeof workScheduleSchema
>;

export const employeeFormSchema = z.object({
  ...userAccountSchema.shape,
  ...employeeSchema.shape,
  ...compensationSchema.shape,
  ...workScheduleSchema.shape,
});

export type CreateEmployeeFormValues = z.infer<
  typeof employeeFormSchema
>;



