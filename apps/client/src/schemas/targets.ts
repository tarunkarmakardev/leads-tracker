import { z } from "zod";
import { TargetSchema } from "@leads-tracker/schemas";

export const TargetFormSchema = TargetSchema.pick({
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
});

export type TargetFormValues = z.infer<typeof TargetFormSchema>;
