-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalCalls" INTEGER NOT NULL,
    "pitchedCalls" INTEGER NOT NULL,
    "callbacks" INTEGER NOT NULL,
    "appointments" INTEGER NOT NULL,
    "followups" INTEGER NOT NULL,
    "recordingsSent" BOOLEAN NOT NULL,
    "emails" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
