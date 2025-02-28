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
    query: (payload) => db().project.findUnique(payload),
  },
  post: {
    parsePayload: (rawPayload) => ProjectCreatePayloadSchema.parse(rawPayload),
    mutation: (payload) => db().project.create(payload),
  },
  patch: {
    parsePayload: (rawPayload) => ProjectUpdatePayloadSchema.parse(rawPayload),
    mutation: (payload) => db().project.update(payload),
  },
  delete: {
    mutation: (payload) => db().project.delete(payload),
  },
});

// export const GET = createController({
//   handler: async (req, res) => {
//     const searchFields = ["name"];
//     const { q, limit, offset, sortBy, sortOrder } = ProjectGetSchema.parse(
//       req.query
//     );
//     let where: any;
//     let orderBy: any;
//     if (q) {
//       where = {};
//       where.OR = searchFields.map((field) => ({
//         [field]: {
//           contains: q,
//         },
//       }));
//     }
//     if (sortBy && sortOrder) {
//       orderBy = {};
//       orderBy[sortBy] = sortOrder;
//     }

//     const projects = await db().project.findMany({
//       where,
//       orderBy,
//       take: limit,
//       skip: offset,
//     });

//     return res.json({ results: projects });
//   },
// });
// export const DETAIL = createController({
//   handler: async (req, res) => {
//     const { id } = ProjectDetailSchema.parse(req.params);
//     const project = await db().project.findUnique({
//       where: {
//         id,
//       },
//     });
//     return res.json(project);
//   },
// });

// export const POST = createController({
//   handler: async (req, res) => {
//     const { name } = ProjectCreateSchema.parse(req.body);
//     const project = await db().project.create({
//       data: {
//         name,
//         userId: req.user.id,
//       },
//     });
//     return res.json(project);
//   },
// });
// export const DELETE = createController({
//   handler: async (req, res) => {
//     const { id } = ProjectDeleteSchema.parse(req.params);
//     const project = await db().project.delete({
//       where: {
//         id,
//       },
//     });
//     return res.json(project);
//   },
// });
// export const PATCH = createController({
//   handler: async (req, res) => {
//     const { id, name } = ProjectUpdateSchema.parse({
//       id: req.params.id,
//       ...req.body,
//     });
//     const project = await db().project.update({
//       where: {
//         id,
//       },
//       data: {
//         name,
//       },
//     });
//     return res.json(project);
//   },
// });
