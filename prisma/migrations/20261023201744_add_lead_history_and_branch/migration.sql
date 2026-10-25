/*
  Warnings:

  - Added the required column `branchId` to the `PayrollEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeAttendanceStatus" AS ENUM ('PRESENT', 'ABSENT');

-- CreateEnum
CREATE TYPE "EmployeeAttendanceSource" AS ENUM ('BIOMETRIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "SalaryAdvanceStatus" AS ENUM ('OPEN', 'DEDUCTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('IVR', 'WALK_IN', 'WHATSAPP', 'REFERRAL', 'WEBSITE', 'INSTAGRAM', 'FACEBOOK', 'PARTNER', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'NOT_PICKED', 'NOT_INTERESTED', 'JUST_INFO', 'CONVERTED');

-- CreateEnum
CREATE TYPE "LeadRejectionReason" AS ENUM ('FAKE', 'DUPLICATE', 'WRONG_NUMBER', 'OUT_OF_SCOPE', 'NOT_ELIGIBLE', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadStatusChangeSource" AS ENUM ('USER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ClientGender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('INDIA', 'UNITED_STATES', 'CANADA', 'UNITED_KINGDOM', 'AUSTRALIA', 'NEW_ZEALAND', 'IRELAND', 'GERMANY', 'FRANCE', 'ITALY', 'SPAIN', 'PORTUGAL', 'POLAND', 'NETHERLANDS', 'BELGIUM', 'SWITZERLAND', 'SWEDEN', 'NORWAY', 'DENMARK', 'FINLAND', 'AUSTRIA', 'CZECH_REPUBLIC', 'HUNGARY', 'ROMANIA', 'JAPAN', 'SOUTH_KOREA', 'CHINA', 'SINGAPORE', 'MALAYSIA', 'THAILAND', 'UAE', 'SAUDI_ARABIA', 'QATAR', 'OMAN', 'KUWAIT', 'BAHRAIN', 'PAKISTAN', 'BANGLADESH', 'NEPAL', 'SRI_LANKA', 'AFGHANISTAN', 'SOUTH_AFRICA', 'NIGERIA', 'KENYA', 'GHANA', 'EGYPT', 'BRAZIL', 'MEXICO', 'ARGENTINA', 'CHILE', 'OTHER');

-- CreateEnum
CREATE TYPE "ClientAddressType" AS ENUM ('PERMANENT', 'CURRENT');

-- CreateEnum
CREATE TYPE "ClientFamilyRelationship" AS ENUM ('FATHER', 'MOTHER', 'SPOUSE', 'CHILD', 'SIBLING');

-- CreateEnum
CREATE TYPE "ClientEducationLevel" AS ENUM ('TENTH', 'TWELFTH', 'DIPLOMA', 'BACHELOR', 'MASTER', 'DOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "ClientTestType" AS ENUM ('IELTS', 'TOEFL', 'PTE', 'GRE', 'GMAT', 'SAT', 'DUOLINGO', 'OTHER');

-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('STUDY', 'TOURIST');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('INTAKE', 'IN_PROGRESS', 'READY_FOR_SUBMISSION', 'SUBMITTED', 'VISA_STAMPED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApplicationCredentialType" AS ENUM ('STUDENT_EMAIL', 'STUDENT_EMAIL_PASSWORD', 'VFS_PASSWORD', 'VISA_FORM_PASSWORD', 'CGI_USERNAME', 'CGI_PASSWORD', 'DS160_USERNAME', 'DS160_PASSWORD', 'EMAIL_2', 'EMAIL_3', 'OTHER');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('ACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('COUNSELOR_REGISTRATION', 'TELECALLER_REGISTRATION');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('EARNED', 'REVERSED', 'PAID');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('LEAD_FOLLOW_UP', 'DOCUMENT_FOLLOW_UP', 'TEACHING_URGENT_PREP', 'PAYMENT_COLLECTION', 'TEACHING_PARENT_CONTACT', 'OTHER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "NotificationSurface" AS ENUM ('BELL', 'DASHBOARD', 'SIDEBAR');

-- CreateEnum
CREATE TYPE "ApplicationDocumentStatus" AS ENUM ('PENDING', 'MISSING', 'RECEIVED', 'VERIFIED', 'NOT_REQUIRED');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('REGISTRATION', 'POST_VISA_SERVICE');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('ISSUED', 'PARTIALLY_PAID', 'PAID', 'PARTIALLY_REFUNDED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'UPI', 'BANK_TRANSFER', 'CARD', 'CHEQUE', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CONFIRMED', 'VOIDED');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('META_ADS', 'SUBSCRIPTION', 'CLIENT_MEAL', 'OFFICE_REPAIR', 'OFFICE_EXPENSE', 'TRAVEL', 'OTHER');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('RECORDED', 'VOIDED');

-- CreateEnum
CREATE TYPE "ExpenseSource" AS ENUM ('MANUAL', 'CREDIT_CARD', 'BANK_STATEMENT');

-- CreateEnum
CREATE TYPE "FinancialEntryKind" AS ENUM ('REVENUE', 'PASS_THROUGH');

-- CreateEnum
CREATE TYPE "FinancialEntryType" AS ENUM ('UNIVERSITY_COMMISSION', 'FLIGHT_TICKET_MARGIN', 'BLOCKED_ACCOUNT', 'EMBASSY_FEE', 'BIOMETRIC_FEE', 'TRAVEL_INSURANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "FinancialEntryStatus" AS ENUM ('EXPECTED', 'COMPLETED', 'VOIDED');

-- CreateEnum
CREATE TYPE "PostVisaTaskType" AS ENUM ('FLIGHTS', 'FOREX', 'ACCOMMODATION');

-- CreateEnum
CREATE TYPE "PostVisaTaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'NOT_REQUIRED');

-- CreateEnum
CREATE TYPE "WhatsAppConversationStatus" AS ENUM ('OPEN', 'PENDING', 'CLOSED');

-- CreateEnum
CREATE TYPE "WhatsAppMessageDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "WhatsAppMessageType" AS ENUM ('TEXT', 'IMAGE', 'DOCUMENT', 'AUDIO', 'VIDEO', 'LOCATION', 'INTERACTIVE', 'TEMPLATE', 'OTHER');

-- CreateEnum
CREATE TYPE "WhatsAppMessageStatus" AS ENUM ('RECEIVED', 'PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED');

-- CreateEnum
CREATE TYPE "LanguageCourseType" AS ENUM ('IELTS', 'PTE');

-- CreateEnum
CREATE TYPE "TeachingEnrollmentStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TeachingAttendanceStatus" AS ENUM ('PRESENT', 'ABSENT');

-- CreateEnum
CREATE TYPE "TeachingDeliveryMode" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "TeachingStudyMode" AS ENUM ('GROUP', 'SPECIAL_ATTENTION');

-- CreateEnum
CREATE TYPE "TouristPrepStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "PayrollEntry" ADD COLUMN     "advanceDeduction" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "lateFine" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeAttendance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "attendanceDate" DATE NOT NULL,
    "status" "EmployeeAttendanceStatus" NOT NULL,
    "source" "EmployeeAttendanceSource" NOT NULL DEFAULT 'BIOMETRIC',
    "externalRecordId" TEXT,
    "firstCheckInAt" TIMESTAMP(3),
    "lastCheckOutAt" TIMESTAMP(3),
    "lateMinutes" INTEGER NOT NULL DEFAULT 0,
    "lateFine" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "recordedById" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "EmployeeAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeSalaryAdvance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "advanceDate" DATE NOT NULL,
    "deductionPayrollMonth" DATE,
    "status" "SalaryAdvanceStatus" NOT NULL DEFAULT 'OPEN',
    "notes" TEXT,
    "recordedById" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deductedAt" TIMESTAMP(3),
    "deductedPayrollId" TEXT,

    CONSTRAINT "EmployeeSalaryAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "leadCode" TEXT NOT NULL,
    "source" "LeadSource" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "rejectionReason" "LeadRejectionReason",
    "branchId" TEXT,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadStatusHistory" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "fromStatus" "LeadStatus",
    "toStatus" "LeadStatus" NOT NULL,
    "changedById" TEXT,
    "source" "LeadStatusChangeSource" NOT NULL DEFAULT 'USER',
    "reason" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadAssignment" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "assignedToId" TEXT NOT NULL,
    "assignedById" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "note" TEXT,

    CONSTRAINT "LeadAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "clientCode" TEXT NOT NULL,
    "givenName" TEXT,
    "middleName" TEXT,
    "surname" TEXT,
    "email" TEXT,
    "communicationEmail" TEXT,
    "phone" TEXT,
    "alternatePhone" TEXT,
    "dateOfBirth" DATE,
    "gender" "ClientGender",
    "maritalStatus" "MaritalStatus",
    "nationality" "Country",
    "nationalId" TEXT,
    "isPreviousVisaRefusal" BOOLEAN NOT NULL DEFAULT false,
    "previousVisaRefusalDetails" TEXT,
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAddress" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" "ClientAddressType" NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" "Country",
    "countryOther" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientFamilyMember" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "relationship" "ClientFamilyRelationship" NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "dateOfBirth" DATE,
    "occupation" TEXT,
    "aadhaarUid" TEXT,
    "address" TEXT,
    "otherDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientFamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientEducation" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "level" "ClientEducationLevel" NOT NULL,
    "institutionName" TEXT,
    "boardUniversity" TEXT,
    "qualification" TEXT,
    "stream" TEXT,
    "percentage" DECIMAL(5,2),
    "cgpa" DECIMAL(5,2),
    "medium" TEXT,
    "englishMarks" DECIMAL(5,2),
    "passingYear" INTEGER,
    "resultDate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientTest" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "testType" "ClientTestType" NOT NULL,
    "testDate" DATE,
    "overallScore" DECIMAL(6,2),
    "listening" DECIMAL(6,2),
    "reading" DECIMAL(6,2),
    "writing" DECIMAL(6,2),
    "speaking" DECIMAL(6,2),
    "verbal" DECIMAL(6,2),
    "quantitative" DECIMAL(6,2),
    "analyticalWriting" DECIMAL(6,2),
    "math" DECIMAL(6,2),
    "evidenceBasedReadingWriting" DECIMAL(6,2),
    "otherScore" DECIMAL(6,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientWorkExperience" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "currentlyWorking" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "salaryDescription" TEXT,
    "otherDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientWorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientPassport" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "passportNumber" TEXT,
    "nationality" "Country",
    "issueDate" DATE,
    "issuePlace" TEXT,
    "expiryDate" DATE,
    "birthPlace" TEXT,
    "previousPassportNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientPassport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "applicationCode" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "registrationId" TEXT,
    "type" "ApplicationType" NOT NULL,
    "preferredCountry" "Country",
    "preferredCourseType" TEXT,
    "otherCountry" TEXT,
    "preferredCourseName" TEXT,
    "targetUniversity" TEXT,
    "accommodation" TEXT,
    "notes" TEXT,
    "preferredQualification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'INTAKE',
    "submittedAt" TIMESTAMP(3),
    "visaStampedAt" TIMESTAMP(3),
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationCredential" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" "ApplicationCredentialType" NOT NULL,
    "valueEncrypted" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "registrationCode" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'ACTIVE',
    "registeredById" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMP(3),
    "cancelledById" TEXT,
    "cancellationReason" TEXT,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionEntry" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "employeeId" TEXT,
    "type" "CommissionType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "CommissionStatus" NOT NULL DEFAULT 'EARNED',
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reversedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "CommissionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "TaskPriority" NOT NULL DEFAULT 'NORMAL',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assigneeId" TEXT NOT NULL,
    "createdById" TEXT,
    "dueAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "entityType" TEXT,
    "entityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "surfaces" "NotificationSurface"[] DEFAULT ARRAY['BELL']::"NotificationSurface"[],
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "taskId" TEXT,
    "readAt" TIMESTAMP(3),
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "purpose" TEXT,
    "applicationType" "ApplicationType",
    "country" "Country",
    "reminderEveryDays" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationDocument" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "requirementId" TEXT,
    "documentKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "purpose" TEXT,
    "status" "ApplicationDocumentStatus" NOT NULL DEFAULT 'PENDING',
    "reminderEveryDays" INTEGER NOT NULL,
    "trackingStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReminderAt" TIMESTAMP(3),
    "nextReminderAt" TIMESTAMP(3),
    "otherDetails" TEXT,
    "storageKey" TEXT,
    "fileName" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "checksum" TEXT,
    "uploadedById" TEXT,
    "uploadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "registrationId" TEXT,
    "applicationId" TEXT,
    "type" "InvoiceType" NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'ISSUED',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "baseAmount" DECIMAL(12,2) NOT NULL,
    "gstRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "gstAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'CONFIRMED',
    "reference" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receivedById" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "reason" TEXT,
    "refundedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refundedById" TEXT NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "category" "ExpenseCategory" NOT NULL,
    "status" "ExpenseStatus" NOT NULL DEFAULT 'RECORDED',
    "source" "ExpenseSource" NOT NULL DEFAULT 'MANUAL',
    "amount" DECIMAL(12,2) NOT NULL,
    "expenseDate" DATE NOT NULL,
    "description" TEXT,
    "merchant" TEXT,
    "reference" TEXT,
    "paymentMethod" "PaymentMethod",
    "recordedById" TEXT NOT NULL,
    "voidedById" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voidedAt" TIMESTAMP(3),
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialEntry" (
    "id" TEXT NOT NULL,
    "kind" "FinancialEntryKind" NOT NULL,
    "type" "FinancialEntryType" NOT NULL,
    "status" "FinancialEntryStatus" NOT NULL DEFAULT 'EXPECTED',
    "amount" DECIMAL(12,2) NOT NULL,
    "entryDate" DATE NOT NULL,
    "description" TEXT,
    "reference" TEXT,
    "clientId" TEXT,
    "applicationId" TEXT,
    "recordedById" TEXT NOT NULL,
    "voidedById" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voidedAt" TIMESTAMP(3),
    "branchId" TEXT NOT NULL,

    CONSTRAINT "FinancialEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostVisaTask" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" "PostVisaTaskType" NOT NULL,
    "status" "PostVisaTaskStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "completedAt" TIMESTAMP(3),
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostVisaTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsAppConversation" (
    "id" TEXT NOT NULL,
    "contactWaId" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactName" TEXT,
    "status" "WhatsAppConversationStatus" NOT NULL DEFAULT 'OPEN',
    "clientId" TEXT,
    "leadId" TEXT,
    "assignedDepartment" "DEPARTMENT",
    "assignedToId" TEXT,
    "assignedAt" TIMESTAMP(3),
    "slaDueAt" TIMESTAMP(3),
    "firstResponseAt" TIMESTAMP(3),
    "slaBreachedAt" TIMESTAMP(3),
    "lastMessageAt" TIMESTAMP(3),
    "lastInboundAt" TIMESTAMP(3),
    "lastOutboundAt" TIMESTAMP(3),
    "lastMessagePreview" TEXT,
    "closedAt" TIMESTAMP(3),
    "closedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "WhatsAppConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsAppMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "externalMessageId" TEXT,
    "direction" "WhatsAppMessageDirection" NOT NULL,
    "type" "WhatsAppMessageType" NOT NULL,
    "status" "WhatsAppMessageStatus" NOT NULL DEFAULT 'PENDING',
    "body" TEXT,
    "storageKey" TEXT,
    "fileName" TEXT,
    "mimeType" TEXT,
    "templateName" TEXT,
    "providerCampaignName" TEXT,
    "entityType" TEXT,
    "entityId" TEXT,
    "idempotencyKey" TEXT,
    "sentById" TEXT,
    "messageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhatsAppMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingEnrollment" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "courseType" "LanguageCourseType" NOT NULL,
    "status" "TeachingEnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "finalExamType" "LanguageCourseType",
    "finalExamDate" DATE,
    "examBookedAt" TIMESTAMP(3),
    "examBookedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "TeachingEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingDailyRecord" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "recordDate" DATE NOT NULL,
    "attendance" "TeachingAttendanceStatus" NOT NULL,
    "deliveryMode" "TeachingDeliveryMode" NOT NULL,
    "studyMode" "TeachingStudyMode" NOT NULL,
    "disciplineFlaggedAt" TIMESTAMP(3),
    "disciplineNote" TEXT,
    "recordedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeachingDailyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherDailyProgress" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "recordDate" DATE NOT NULL,
    "strategyNotes" TEXT,
    "strongAreas" TEXT,
    "weakAreas" TEXT,
    "estimatedDaysToTest" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherDailyProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TouristPrep" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "status" "TouristPrepStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "itinerary" JSONB,
    "interviewQa" TEXT,
    "finalItineraryStorageKey" TEXT,
    "finalItineraryFileName" TEXT,
    "finalItineraryMimeType" TEXT,
    "completedAt" TIMESTAMP(3),
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TouristPrep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchCode_key" ON "Branch"("branchCode");

-- CreateIndex
CREATE INDEX "Branch_isActive_idx" ON "Branch"("isActive");

-- CreateIndex
CREATE INDEX "EmployeeAttendance_attendanceDate_idx" ON "EmployeeAttendance"("attendanceDate");

-- CreateIndex
CREATE INDEX "EmployeeAttendance_employeeId_attendanceDate_idx" ON "EmployeeAttendance"("employeeId", "attendanceDate");

-- CreateIndex
CREATE INDEX "EmployeeAttendance_status_attendanceDate_idx" ON "EmployeeAttendance"("status", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeAttendance_employeeId_attendanceDate_key" ON "EmployeeAttendance"("employeeId", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeAttendance_externalRecordId_key" ON "EmployeeAttendance"("externalRecordId");

-- CreateIndex
CREATE INDEX "EmployeeSalaryAdvance_employeeId_status_idx" ON "EmployeeSalaryAdvance"("employeeId", "status");

-- CreateIndex
CREATE INDEX "EmployeeSalaryAdvance_deductionPayrollMonth_idx" ON "EmployeeSalaryAdvance"("deductionPayrollMonth");

-- CreateIndex
CREATE INDEX "EmployeeSalaryAdvance_advanceDate_idx" ON "EmployeeSalaryAdvance"("advanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_leadCode_key" ON "Lead"("leadCode");

-- CreateIndex
CREATE INDEX "Lead_source_idx" ON "Lead"("source");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_clientId_idx" ON "Lead"("clientId");

-- CreateIndex
CREATE INDEX "Lead_branchId_idx" ON "Lead"("branchId");

-- CreateIndex
CREATE INDEX "LeadStatusHistory_leadId_changedAt_idx" ON "LeadStatusHistory"("leadId", "changedAt");

-- CreateIndex
CREATE INDEX "LeadStatusHistory_changedById_idx" ON "LeadStatusHistory"("changedById");

-- CreateIndex
CREATE INDEX "LeadStatusHistory_toStatus_idx" ON "LeadStatusHistory"("toStatus");

-- CreateIndex
CREATE INDEX "LeadAssignment_leadId_idx" ON "LeadAssignment"("leadId");

-- CreateIndex
CREATE INDEX "LeadAssignment_assignedToId_idx" ON "LeadAssignment"("assignedToId");

-- CreateIndex
CREATE INDEX "LeadAssignment_leadId_endedAt_idx" ON "LeadAssignment"("leadId", "endedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientCode_key" ON "Client"("clientCode");

-- CreateIndex
CREATE INDEX "ClientAddress_clientId_idx" ON "ClientAddress"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAddress_clientId_type_key" ON "ClientAddress"("clientId", "type");

-- CreateIndex
CREATE INDEX "ClientFamilyMember_clientId_idx" ON "ClientFamilyMember"("clientId");

-- CreateIndex
CREATE INDEX "ClientFamilyMember_clientId_relationship_idx" ON "ClientFamilyMember"("clientId", "relationship");

-- CreateIndex
CREATE INDEX "ClientEducation_clientId_idx" ON "ClientEducation"("clientId");

-- CreateIndex
CREATE INDEX "ClientEducation_clientId_level_idx" ON "ClientEducation"("clientId", "level");

-- CreateIndex
CREATE INDEX "ClientTest_clientId_idx" ON "ClientTest"("clientId");

-- CreateIndex
CREATE INDEX "ClientTest_clientId_testType_idx" ON "ClientTest"("clientId", "testType");

-- CreateIndex
CREATE INDEX "ClientWorkExperience_clientId_idx" ON "ClientWorkExperience"("clientId");

-- CreateIndex
CREATE INDEX "ClientWorkExperience_clientId_startDate_idx" ON "ClientWorkExperience"("clientId", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "ClientPassport_clientId_key" ON "ClientPassport"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_applicationCode_key" ON "Application"("applicationCode");

-- CreateIndex
CREATE INDEX "Application_clientId_idx" ON "Application"("clientId");

-- CreateIndex
CREATE INDEX "Application_registrationId_idx" ON "Application"("registrationId");

-- CreateIndex
CREATE INDEX "Application_clientId_type_idx" ON "Application"("clientId", "type");

-- CreateIndex
CREATE INDEX "ApplicationCredential_applicationId_idx" ON "ApplicationCredential"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationCredential_applicationId_type_key" ON "ApplicationCredential"("applicationId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_registrationCode_key" ON "Registration"("registrationCode");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_leadId_key" ON "Registration"("leadId");

-- CreateIndex
CREATE INDEX "Registration_clientId_idx" ON "Registration"("clientId");

-- CreateIndex
CREATE INDEX "Registration_registeredAt_idx" ON "Registration"("registeredAt");

-- CreateIndex
CREATE INDEX "CommissionEntry_registrationId_idx" ON "CommissionEntry"("registrationId");

-- CreateIndex
CREATE INDEX "CommissionEntry_employeeId_idx" ON "CommissionEntry"("employeeId");

-- CreateIndex
CREATE INDEX "CommissionEntry_employeeId_status_idx" ON "CommissionEntry"("employeeId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionEntry_registrationId_type_key" ON "CommissionEntry"("registrationId", "type");

-- CreateIndex
CREATE INDEX "Task_assigneeId_status_idx" ON "Task"("assigneeId", "status");

-- CreateIndex
CREATE INDEX "Task_assigneeId_dueAt_idx" ON "Task"("assigneeId", "dueAt");

-- CreateIndex
CREATE INDEX "Task_entityType_entityId_idx" ON "Task"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- CreateIndex
CREATE INDEX "Notification_userId_resolvedAt_idx" ON "Notification"("userId", "resolvedAt");

-- CreateIndex
CREATE INDEX "Notification_userId_priority_idx" ON "Notification"("userId", "priority");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_createdAt_idx" ON "AuditLog"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRequirement_key_key" ON "DocumentRequirement"("key");

-- CreateIndex
CREATE INDEX "ApplicationDocument_applicationId_idx" ON "ApplicationDocument"("applicationId");

-- CreateIndex
CREATE INDEX "ApplicationDocument_applicationId_status_idx" ON "ApplicationDocument"("applicationId", "status");

-- CreateIndex
CREATE INDEX "ApplicationDocument_nextReminderAt_idx" ON "ApplicationDocument"("nextReminderAt");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Invoice_clientId_idx" ON "Invoice"("clientId");

-- CreateIndex
CREATE INDEX "Invoice_registrationId_idx" ON "Invoice"("registrationId");

-- CreateIndex
CREATE INDEX "Invoice_applicationId_idx" ON "Invoice"("applicationId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_idx" ON "Payment"("invoiceId");

-- CreateIndex
CREATE INDEX "Payment_receivedAt_idx" ON "Payment"("receivedAt");

-- CreateIndex
CREATE INDEX "Refund_invoiceId_idx" ON "Refund"("invoiceId");

-- CreateIndex
CREATE INDEX "Refund_refundedById_idx" ON "Refund"("refundedById");

-- CreateIndex
CREATE INDEX "Refund_refundedAt_idx" ON "Refund"("refundedAt");

-- CreateIndex
CREATE INDEX "Expense_category_idx" ON "Expense"("category");

-- CreateIndex
CREATE INDEX "Expense_expenseDate_idx" ON "Expense"("expenseDate");

-- CreateIndex
CREATE INDEX "Expense_status_idx" ON "Expense"("status");

-- CreateIndex
CREATE INDEX "Expense_recordedById_idx" ON "Expense"("recordedById");

-- CreateIndex
CREATE INDEX "FinancialEntry_kind_idx" ON "FinancialEntry"("kind");

-- CreateIndex
CREATE INDEX "FinancialEntry_type_idx" ON "FinancialEntry"("type");

-- CreateIndex
CREATE INDEX "FinancialEntry_status_idx" ON "FinancialEntry"("status");

-- CreateIndex
CREATE INDEX "FinancialEntry_entryDate_idx" ON "FinancialEntry"("entryDate");

-- CreateIndex
CREATE INDEX "FinancialEntry_clientId_idx" ON "FinancialEntry"("clientId");

-- CreateIndex
CREATE INDEX "FinancialEntry_applicationId_idx" ON "FinancialEntry"("applicationId");

-- CreateIndex
CREATE INDEX "FinancialEntry_recordedById_idx" ON "FinancialEntry"("recordedById");

-- CreateIndex
CREATE INDEX "PostVisaTask_applicationId_idx" ON "PostVisaTask"("applicationId");

-- CreateIndex
CREATE INDEX "PostVisaTask_status_idx" ON "PostVisaTask"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PostVisaTask_applicationId_type_key" ON "PostVisaTask"("applicationId", "type");

-- CreateIndex
CREATE INDEX "WhatsAppConversation_status_lastMessageAt_idx" ON "WhatsAppConversation"("status", "lastMessageAt");

-- CreateIndex
CREATE INDEX "WhatsAppConversation_assignedToId_status_idx" ON "WhatsAppConversation"("assignedToId", "status");

-- CreateIndex
CREATE INDEX "WhatsAppConversation_assignedDepartment_status_idx" ON "WhatsAppConversation"("assignedDepartment", "status");

-- CreateIndex
CREATE INDEX "WhatsAppConversation_clientId_idx" ON "WhatsAppConversation"("clientId");

-- CreateIndex
CREATE INDEX "WhatsAppConversation_leadId_idx" ON "WhatsAppConversation"("leadId");

-- CreateIndex
CREATE INDEX "WhatsAppConversation_slaDueAt_idx" ON "WhatsAppConversation"("slaDueAt");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppConversation_contactWaId_key" ON "WhatsAppConversation"("contactWaId");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppMessage_idempotencyKey_key" ON "WhatsAppMessage"("idempotencyKey");

-- CreateIndex
CREATE INDEX "WhatsAppMessage_conversationId_messageAt_idx" ON "WhatsAppMessage"("conversationId", "messageAt");

-- CreateIndex
CREATE INDEX "WhatsAppMessage_conversationId_direction_idx" ON "WhatsAppMessage"("conversationId", "direction");

-- CreateIndex
CREATE INDEX "WhatsAppMessage_status_idx" ON "WhatsAppMessage"("status");

-- CreateIndex
CREATE INDEX "WhatsAppMessage_sentById_idx" ON "WhatsAppMessage"("sentById");

-- CreateIndex
CREATE INDEX "WhatsAppMessage_entityType_entityId_idx" ON "WhatsAppMessage"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppMessage_externalMessageId_key" ON "WhatsAppMessage"("externalMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingEnrollment_applicationId_key" ON "TeachingEnrollment"("applicationId");

-- CreateIndex
CREATE INDEX "TeachingEnrollment_teacherId_status_idx" ON "TeachingEnrollment"("teacherId", "status");

-- CreateIndex
CREATE INDEX "TeachingEnrollment_startDate_endDate_idx" ON "TeachingEnrollment"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "TeachingEnrollment_finalExamDate_idx" ON "TeachingEnrollment"("finalExamDate");

-- CreateIndex
CREATE INDEX "TeachingDailyRecord_enrollmentId_recordDate_idx" ON "TeachingDailyRecord"("enrollmentId", "recordDate");

-- CreateIndex
CREATE INDEX "TeachingDailyRecord_attendance_recordDate_idx" ON "TeachingDailyRecord"("attendance", "recordDate");

-- CreateIndex
CREATE INDEX "TeachingDailyRecord_recordedById_idx" ON "TeachingDailyRecord"("recordedById");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingDailyRecord_enrollmentId_recordDate_key" ON "TeachingDailyRecord"("enrollmentId", "recordDate");

-- CreateIndex
CREATE INDEX "TeacherDailyProgress_teacherId_recordDate_idx" ON "TeacherDailyProgress"("teacherId", "recordDate");

-- CreateIndex
CREATE INDEX "TeacherDailyProgress_enrollmentId_recordDate_idx" ON "TeacherDailyProgress"("enrollmentId", "recordDate");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherDailyProgress_enrollmentId_recordDate_key" ON "TeacherDailyProgress"("enrollmentId", "recordDate");

-- CreateIndex
CREATE UNIQUE INDEX "TouristPrep_applicationId_key" ON "TouristPrep"("applicationId");

-- CreateIndex
CREATE INDEX "TouristPrep_teacherId_status_idx" ON "TouristPrep"("teacherId", "status");

-- CreateIndex
CREATE INDEX "TouristPrep_status_idx" ON "TouristPrep"("status");

-- AddForeignKey
ALTER TABLE "PayrollEntry" ADD CONSTRAINT "PayrollEntry_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAttendance" ADD CONSTRAINT "EmployeeAttendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAttendance" ADD CONSTRAINT "EmployeeAttendance_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAttendance" ADD CONSTRAINT "EmployeeAttendance_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryAdvance" ADD CONSTRAINT "EmployeeSalaryAdvance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryAdvance" ADD CONSTRAINT "EmployeeSalaryAdvance_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryAdvance" ADD CONSTRAINT "EmployeeSalaryAdvance_deductedPayrollId_fkey" FOREIGN KEY ("deductedPayrollId") REFERENCES "PayrollEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadStatusHistory" ADD CONSTRAINT "LeadStatusHistory_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadStatusHistory" ADD CONSTRAINT "LeadStatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAssignment" ADD CONSTRAINT "LeadAssignment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAssignment" ADD CONSTRAINT "LeadAssignment_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAssignment" ADD CONSTRAINT "LeadAssignment_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientFamilyMember" ADD CONSTRAINT "ClientFamilyMember_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientEducation" ADD CONSTRAINT "ClientEducation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientTest" ADD CONSTRAINT "ClientTest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientWorkExperience" ADD CONSTRAINT "ClientWorkExperience_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPassport" ADD CONSTRAINT "ClientPassport_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCredential" ADD CONSTRAINT "ApplicationCredential_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_registeredById_fkey" FOREIGN KEY ("registeredById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionEntry" ADD CONSTRAINT "CommissionEntry_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionEntry" ADD CONSTRAINT "CommissionEntry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDocument" ADD CONSTRAINT "ApplicationDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDocument" ADD CONSTRAINT "ApplicationDocument_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "DocumentRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDocument" ADD CONSTRAINT "ApplicationDocument_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_refundedById_fkey" FOREIGN KEY ("refundedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_voidedById_fkey" FOREIGN KEY ("voidedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialEntry" ADD CONSTRAINT "FinancialEntry_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialEntry" ADD CONSTRAINT "FinancialEntry_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialEntry" ADD CONSTRAINT "FinancialEntry_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialEntry" ADD CONSTRAINT "FinancialEntry_voidedById_fkey" FOREIGN KEY ("voidedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialEntry" ADD CONSTRAINT "FinancialEntry_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVisaTask" ADD CONSTRAINT "PostVisaTask_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVisaTask" ADD CONSTRAINT "PostVisaTask_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppConversation" ADD CONSTRAINT "WhatsAppConversation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppConversation" ADD CONSTRAINT "WhatsAppConversation_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppConversation" ADD CONSTRAINT "WhatsAppConversation_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppConversation" ADD CONSTRAINT "WhatsAppConversation_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppConversation" ADD CONSTRAINT "WhatsAppConversation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppMessage" ADD CONSTRAINT "WhatsAppMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "WhatsAppConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatsAppMessage" ADD CONSTRAINT "WhatsAppMessage_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingEnrollment" ADD CONSTRAINT "TeachingEnrollment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingEnrollment" ADD CONSTRAINT "TeachingEnrollment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingEnrollment" ADD CONSTRAINT "TeachingEnrollment_examBookedById_fkey" FOREIGN KEY ("examBookedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingEnrollment" ADD CONSTRAINT "TeachingEnrollment_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingDailyRecord" ADD CONSTRAINT "TeachingDailyRecord_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "TeachingEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingDailyRecord" ADD CONSTRAINT "TeachingDailyRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDailyProgress" ADD CONSTRAINT "TeacherDailyProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "TeachingEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDailyProgress" ADD CONSTRAINT "TeacherDailyProgress_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouristPrep" ADD CONSTRAINT "TouristPrep_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouristPrep" ADD CONSTRAINT "TouristPrep_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouristPrep" ADD CONSTRAINT "TouristPrep_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
