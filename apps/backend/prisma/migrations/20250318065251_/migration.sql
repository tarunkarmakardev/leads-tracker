-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "totalCalls" INTEGER NOT NULL,
    "pitchedCalls" INTEGER NOT NULL,
    "callbacks" INTEGER NOT NULL,
    "appointments" INTEGER NOT NULL,
    "followups" INTEGER NOT NULL,
    "emails" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
