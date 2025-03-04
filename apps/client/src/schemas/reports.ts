import { z } from "zod";
import { ReportSchema } from "@leads-tracker/schemas";

export const ReportFormSchema = ReportSchema.pick({
  dateTime: true,
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
  recordingsSent: true,
});

export type ReportFormValues = z.infer<typeof ReportFormSchema>;
