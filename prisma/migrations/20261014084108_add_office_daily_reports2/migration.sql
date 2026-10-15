-- DropForeignKey
ALTER TABLE "OfficeDailyReportCheck" DROP CONSTRAINT "OfficeDailyReportCheck_reportId_fkey";

-- AddForeignKey
ALTER TABLE "OfficeDailyReportCheck" ADD CONSTRAINT "OfficeDailyReportCheck_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "OfficeDailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
