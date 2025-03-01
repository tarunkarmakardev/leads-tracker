-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
