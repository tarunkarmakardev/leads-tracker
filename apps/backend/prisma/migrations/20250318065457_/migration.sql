/*
  Warnings:

  - Added the required column `userId` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
