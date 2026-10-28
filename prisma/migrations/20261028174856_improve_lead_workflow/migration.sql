/*
  Warnings:

  - A unique constraint covering the columns `[originatingLeadId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[normalizedPhone]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedPhone` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `LeadAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeadAssignmentType" AS ENUM ('TELECALLING', 'COUNSELLING');

-- CreateEnum
CREATE TYPE "LeadCallOutcome" AS ENUM ('NOT_PICKED', 'ANSWERED', 'CALLBACK_REQUESTED', 'INTERESTED', 'NOT_INTERESTED', 'JUST_INFO', 'WRONG_NUMBER', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadVisitStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'NOT_CONFIRMED', 'COMPLETED', 'MISSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LeadVisitEventType" AS ENUM ('CREATED', 'RESCHEDULED', 'CONFIRMED', 'NOT_CONFIRMED', 'COMPLETED', 'MISSED', 'CANCELLED', 'NOTE_ADDED');

-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'DENIED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LeadStatus" ADD VALUE 'TELECALLERASSIGNED';
ALTER TYPE "LeadStatus" ADD VALUE 'INTERESTED';
ALTER TYPE "LeadStatus" ADD VALUE 'COUNSELORASSIGNED';
ALTER TYPE "LeadStatus" ADD VALUE 'COUNSELLING';
ALTER TYPE "LeadStatus" ADD VALUE 'COLD';
ALTER TYPE "LeadStatus" ADD VALUE 'REJECTED';

-- AlterEnum
ALTER TYPE "NotificationSurface" ADD VALUE 'DEPARTMENTPAGE';

-- DropIndex
DROP INDEX "LeadAssignment_assignedToId_idx";

-- DropIndex
DROP INDEX "LeadAssignment_leadId_idx";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "originatingLeadId" TEXT;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "normalizedPhone" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "LeadAssignment" ADD COLUMN     "type" "LeadAssignmentType" NOT NULL;

-- CreateTable
CREATE TABLE "LeadCallAttempt" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "attemptedById" TEXT NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outcome" "LeadCallOutcome" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadCallAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadVisit" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "promisedAt" TIMESTAMP(3) NOT NULL,
    "status" "LeadVisitStatus" NOT NULL DEFAULT 'SCHEDULED',
    "confirmationAt" TIMESTAMP(3),
    "actualVisitAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadVisitEvent" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "eventType" "LeadVisitEventType" NOT NULL,
    "previousPromisedAt" TIMESTAMP(3),
    "newPromisedAt" TIMESTAMP(3),
    "previousStatus" "LeadVisitStatus",
    "newStatus" "LeadVisitStatus",
    "note" TEXT,
    "changedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadVisitEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadCallAttempt_leadId_attemptedAt_idx" ON "LeadCallAttempt"("leadId", "attemptedAt");

-- CreateIndex
CREATE INDEX "LeadCallAttempt_attemptedById_attemptedAt_idx" ON "LeadCallAttempt"("attemptedById", "attemptedAt");

-- CreateIndex
CREATE INDEX "LeadCallAttempt_outcome_attemptedAt_idx" ON "LeadCallAttempt"("outcome", "attemptedAt");

-- CreateIndex
CREATE INDEX "LeadVisit_leadId_promisedAt_idx" ON "LeadVisit"("leadId", "promisedAt");

-- CreateIndex
CREATE INDEX "LeadVisit_status_promisedAt_idx" ON "LeadVisit"("status", "promisedAt");

-- CreateIndex
CREATE INDEX "LeadVisitEvent_visitId_createdAt_idx" ON "LeadVisitEvent"("visitId", "createdAt");

-- CreateIndex
CREATE INDEX "LeadVisitEvent_changedById_createdAt_idx" ON "LeadVisitEvent"("changedById", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Application_originatingLeadId_key" ON "Application"("originatingLeadId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_normalizedPhone_key" ON "Client"("normalizedPhone");

-- CreateIndex
CREATE INDEX "LeadAssignment_leadId_type_idx" ON "LeadAssignment"("leadId", "type");

-- CreateIndex
CREATE INDEX "LeadAssignment_assignedToId_type_idx" ON "LeadAssignment"("assignedToId", "type");

-- AddForeignKey
ALTER TABLE "LeadCallAttempt" ADD CONSTRAINT "LeadCallAttempt_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadCallAttempt" ADD CONSTRAINT "LeadCallAttempt_attemptedById_fkey" FOREIGN KEY ("attemptedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadVisit" ADD CONSTRAINT "LeadVisit_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadVisit" ADD CONSTRAINT "LeadVisit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadVisitEvent" ADD CONSTRAINT "LeadVisitEvent_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "LeadVisit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadVisitEvent" ADD CONSTRAINT "LeadVisitEvent_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_originatingLeadId_fkey" FOREIGN KEY ("originatingLeadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
