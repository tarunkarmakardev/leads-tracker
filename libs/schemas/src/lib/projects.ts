import { z } from "zod";
import { RestControllerPaginationSchema } from "./rest-controller";
import { TargetCreatePayloadSchema } from "./targets";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  target: TargetCreatePayloadSchema,
});
export const ProjectListItemSchema = ProjectSchema.omit({ target: true });
export const ProjectCreatePayloadSchema = ProjectSchema.pick({
  name: true,
  target: true,
});
export const ProjectCreateDataSchema = ProjectSchema;
export const ProjectUpdatePayloadSchema = ProjectSchema.pick({
  id: true,
  name: true,
  target: true,
});
export const ProjectUpdateDataSchema = ProjectSchema;
export const ProjectDeletePayloadSchema = ProjectSchema.pick({
  id: true,
});
export const ProjectDeleteDataSchema = ProjectSchema;
export const ProjectDetailPayloadSchema = ProjectSchema.pick({
  id: true,
});
export const ProjectDetailDataSchema = ProjectSchema;
export const ProjectsGetPayloadSchema = RestControllerPaginationSchema;
export const ProjectsGetDataSchema = z.object({
  results: z.array(ProjectListItemSchema),
});

export type ProjectItem = z.infer<typeof ProjectListItemSchema>;
export type ProjectsGetPayload = z.infer<typeof ProjectsGetPayloadSchema>;
export type ProjectsGetData = z.infer<typeof ProjectsGetDataSchema>;
export type ProjectDetailPayload = z.infer<typeof ProjectDetailPayloadSchema>;
export type ProjectDetailData = z.infer<typeof ProjectDetailDataSchema>;
export type ProjectCreatePayload = z.infer<typeof ProjectCreatePayloadSchema>;
export type ProjectCreateData = z.infer<typeof ProjectCreateDataSchema>;
export type ProjectUpdatePayload = z.infer<typeof ProjectUpdatePayloadSchema>;
export type ProjectUpdateData = z.infer<typeof ProjectUpdateDataSchema>;
export type ProjectDeletePayload = z.infer<typeof ProjectDeletePayloadSchema>;
export type ProjectDeleteData = z.infer<typeof ProjectDeleteDataSchema>;
