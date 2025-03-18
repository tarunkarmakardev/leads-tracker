import { z } from "zod";
import { ProjectCreatePayloadSchema } from "@leads-tracker/schemas";

export const ProjectFormSchema = ProjectCreatePayloadSchema.pick({
  name: true,
  target: true,
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
