import { ProtectedRequest } from "@/lib/auth";
import { createController } from "@/lib/controller";
import { db } from "@/lib/db";
import { isDev } from "@/lib/env";
import { faker } from "@faker-js/faker";

export const POST = createController({
  handler: async (req, res) => {
    if (isDev()) {
      await seedProjects(req);
      return res.json({ message: "Seed data Successful" });
    }
    return res.json({ message: "Can't seed data" });
  },
});

async function seedProjects(req: ProtectedRequest) {
  const projects = Array.from({ length: 10 }).map(() => ({
    name: faker.company.name(),
    userId: req.user.id,
  }));
  await db().project.deleteMany();
  await db().project.createMany({
    data: projects,
  });
}
