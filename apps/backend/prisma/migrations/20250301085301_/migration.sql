/*
  Warnings:

  - A unique constraint covering the columns `[dateTime]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Report_dateTime_key" ON "Report"("dateTime");
