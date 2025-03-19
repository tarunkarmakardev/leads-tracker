import { createRestControllers } from "@/lib/controller";
import { db } from "@/lib/db";
import {
  ProjectCreatePayloadSchema,
  ProjectUpdatePayloadSchema,
} from "@leads-tracker/schemas";

export const { GET, DELETE, DETAIL, PATCH, POST } = createRestControllers({
  get: {
    searchFields: ["name"],
    query: (payload) => db().project.findMany(payload),
  },
  detail: {
    query: (payload) =>
      db().project.findUnique({ ...payload, include: { target: true } }),
  },
  post: {
    parsePayload: (rawPayload) => ProjectCreatePayloadSchema.parse(rawPayload),
    mutation: async (payload) => {
      const { name, userId, target } = payload.data;
      const project = await db().project.create({ data: { name, userId } });
      await db().target.create({
        data: { ...target, userId, projectId: project.id },
      });
    },
  },
  patch: {
    parsePayload: (rawPayload) => ProjectUpdatePayloadSchema.parse(rawPayload),
    mutation: async (payload) => {
      const { id } = payload.where;
      const { name, target } = payload.data;
      await db().project.update({ where: { id }, data: { name } });
      await db().target.update({
        where: { projectId: id },
        data: { ...target },
      });
    },
  },
  delete: {
    mutation: (payload) => db().project.delete(payload),
  },
});
