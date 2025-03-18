import { ProtectedRequest } from "@/lib/auth";
import { createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { isDev } from "@/lib/env";
import { faker } from "@faker-js/faker";
import { ReportCreatePayload } from "@leads-tracker/schemas";

const PROJECT_NAMES = ["Demo Project A", "Demo Project B"];

export const POST = createController({
  handler: async (req, res) => {
    if (isDev()) {
      await seedProjects(req);
      await seedReports(req, PROJECT_NAMES[0]);
      await seedTargets(req, PROJECT_NAMES[0]);
      return res.json({ message: "Seed data Successful" });
    }
    return res.json({ message: "Can't seed data" });
  },
});

async function seedProjects(req: ProtectedRequest) {
  const projects = PROJECT_NAMES.map((name) => ({
    name,
    userId: req.user.id,
  }));
  await db().project.deleteMany();
  await db().project.createMany({
    data: projects,
  });
}

function getProject(projectName: string) {
  return db().project.findFirst({
    where: { name: projectName },
  });
}

async function seedReports(req: ProtectedRequest, projectName: string) {
  const project = await getProject(projectName);
  if (!project) return;
  const reports = Array.from({ length: 50 }).map(
    () =>
      ({
        dateTime: faker.date
          .between({ from: "2024-01-01", to: Date.now() })
          .toISOString(),
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

async function seedTargets(req: ProtectedRequest, projectName: string) {
  const project = await getProject(projectName);
  if (!project) return;
  await db().target.deleteMany();
  await db().target.create({
    data: {
      appointments: 10,
      callbacks: 50,
      emails: 10,
      followups: 50,
      pitchedCalls: 100,
      totalCalls: 200,
      projectId: project.id,
      userId: req.user.id,
    },
  });
}
