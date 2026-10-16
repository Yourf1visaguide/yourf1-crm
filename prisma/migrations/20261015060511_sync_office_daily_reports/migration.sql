/*
  Warnings:

  - You are about to drop the column `finalizedAt` on the `OfficeDailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `finalizedById` on the `OfficeDailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `OfficeDailyReport` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OfficeDailyReport" DROP CONSTRAINT "OfficeDailyReport_finalizedById_fkey";

-- DropIndex
DROP INDEX "OfficeDailyReport_reportDate_status_idx";

-- AlterTable
ALTER TABLE "OfficeDailyReport" DROP COLUMN "finalizedAt",
DROP COLUMN "finalizedById",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "OFFICEREPORTSTATUS";

-- CreateIndex
CREATE INDEX "OfficeDailyReport_reportDate_idx" ON "OfficeDailyReport"("reportDate");
