import { ProtectedRequest } from "@/lib/auth";
import { createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { isDev } from "@/lib/env";
import { faker } from "@faker-js/faker";
import { ReportCreatePayload } from "@leads-tracker/schemas";

export const POST = createController({
  handler: async (req, res) => {
    if (isDev()) {
      await seedProjects(req);
      await seedReports(req);
      return res.json({ message: "Seed data Successful" });
    }
    return res.json({ message: "Can't seed data" });
  },
});

async function seedProjects(req: ProtectedRequest) {
  const projects = Array.from({ length: 2 }).map(() => ({
    name: faker.company.name(),
    userId: req.user.id,
  }));
  await db().project.deleteMany();
  await db().project.createMany({
    data: projects,
  });
}

async function seedReports(req: ProtectedRequest) {
  const project = await db().project.findFirst();
  if (!project) return;
  const reports = Array.from({ length: 10 }).map(
    () =>
      ({
        dateTime: faker.date.recent().toISOString(),
        totalCalls: faker.number.int({ min: 1, max: 100 }),
        appointments: faker.number.int({ min: 1, max: 100 }),
        callbacks: faker.number.int({ min: 1, max: 100 }),
        emails: faker.number.int({ min: 1, max: 100 }),
        recordingsSent: faker.datatype.boolean(),
        followups: faker.number.int({ min: 1, max: 100 }),
        pitchedCalls: faker.number.int({ min: 1, max: 100 }),
        projectId: project.id,
        userId: req.user.id,
      } satisfies ReportCreatePayload & { userId: string; projectId: string })
  );
  await db().report.deleteMany();
  await db().report.createMany({
    data: reports,
  });
}
