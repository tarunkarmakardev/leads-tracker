import { z } from "zod";

export const ReportSchema = z.object({
  id: z.string().uuid(),
  dateTime: z.string(),
  totalCalls: z.number(),
  pitchedCalls: z.number(),
  callbacks: z.number(),
  appointments: z.number(),
  followups: z.number(),
  recordingsSent: z.boolean(),
  emails: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const ReportsGetPayloadSchema = z.object({
  projectId: z.string(),
});
export const ReportsGetDataSchema = z.object({
  total: z.number(),
  results: z.array(ReportSchema),
});
export const ReportCreatePayloadSchema = ReportSchema.pick({
  dateTime: true,
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
  recordingsSent: true,
});
export const ReportCreateDataSchema = ReportSchema;
export const ReportUpdatePayloadSchema = ReportSchema.pick({
  dateTime: true,
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
  recordingsSent: true,
  id: true,
}).partial({
  dateTime: true,
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
  recordingsSent: true,
});
export const ReportUpdateDataSchema = ReportSchema;
export const ReportDeletePayloadSchema = ReportSchema.pick({
  id: true,
});
export const ReportDeleteDataSchema = ReportSchema;
export const ReportDetailPayloadSchema = ReportSchema.pick({
  id: true,
});
export const ReportDetailDataSchema = ReportSchema;

export type Report = z.infer<typeof ReportSchema>;
export type ReportsGetPayload = z.infer<typeof ReportsGetPayloadSchema>;
export type ReportsGetData = z.infer<typeof ReportsGetDataSchema>;
export type ReportCreatePayload = z.infer<typeof ReportCreatePayloadSchema>;
export type ReportCreateData = z.infer<typeof ReportCreateDataSchema>;
export type ReportUpdatePayload = z.infer<typeof ReportUpdatePayloadSchema>;
export type ReportUpdateData = z.infer<typeof ReportUpdateDataSchema>;
export type ReportDeletePayload = z.infer<typeof ReportDeletePayloadSchema>;
export type ReportDeleteData = z.infer<typeof ReportDeleteDataSchema>;
export type ReportDetailPayload = z.infer<typeof ReportDetailPayloadSchema>;
export type ReportDetailData = z.infer<typeof ReportDetailDataSchema>;
