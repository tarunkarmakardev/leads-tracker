/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Target` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "targetId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Target_projectId_key" ON "Target"("projectId");

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
