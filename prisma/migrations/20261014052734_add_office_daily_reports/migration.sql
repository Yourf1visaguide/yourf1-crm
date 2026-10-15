-- CreateEnum
CREATE TYPE "OFFICEREPORTSTATUS" AS ENUM ('DRAFT', 'FINAL');

-- CreateEnum
CREATE TYPE "OFFICEREPORTCHECKSTATUS" AS ENUM ('NA', 'ISSUE', 'OK', 'NOT_CHECKED');

-- CreateTable
CREATE TABLE "OfficeDailyReport" (
    "id" TEXT NOT NULL,
    "reportDate" DATE NOT NULL,
    "status" "OFFICEREPORTSTATUS" NOT NULL DEFAULT 'DRAFT',
    "generalNotes" TEXT,
    "createdById" TEXT NOT NULL,
    "finalizedAt" TIMESTAMP(3),
    "finalizedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfficeDailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeDailyReportCheck" (
    "id" TEXT NOT NULL,
    "itemKey" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" "OFFICEREPORTCHECKSTATUS" NOT NULL DEFAULT 'NOT_CHECKED',
    "issueNote" TEXT,
    "actionTaken" TEXT,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "OfficeDailyReportCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OfficeDailyReport_reportDate_status_idx" ON "OfficeDailyReport"("reportDate", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OfficeDailyReport_reportDate_key" ON "OfficeDailyReport"("reportDate");

-- CreateIndex
CREATE INDEX "OfficeDailyReportCheck_reportId_status_idx" ON "OfficeDailyReportCheck"("reportId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OfficeDailyReportCheck_reportId_itemKey_key" ON "OfficeDailyReportCheck"("reportId", "itemKey");

-- AddForeignKey
ALTER TABLE "OfficeDailyReport" ADD CONSTRAINT "OfficeDailyReport_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfficeDailyReport" ADD CONSTRAINT "OfficeDailyReport_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfficeDailyReportCheck" ADD CONSTRAINT "OfficeDailyReportCheck_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "OfficeDailyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
