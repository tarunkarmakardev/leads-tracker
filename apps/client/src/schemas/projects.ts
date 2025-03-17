import { z } from "zod";
import { ProjectSchema } from "@leads-tracker/schemas";

export const ProjectFormSchema = ProjectSchema.pick({
  name: true,
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
