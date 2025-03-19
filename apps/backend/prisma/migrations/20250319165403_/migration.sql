-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
