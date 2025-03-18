import { z } from "zod";
import { RestControllerPaginationSchema } from "./rest-controller";

export const TargetSchema = z.object({
  id: z.string().uuid(),
  totalCalls: z.number(),
  pitchedCalls: z.number(),
  callbacks: z.number(),
  appointments: z.number(),
  followups: z.number(),
  emails: z.number(),
});
export const TargetGetPayloadSchema = RestControllerPaginationSchema;
export const TargetGetDataSchema = z.object({
  results: z.array(TargetSchema),
});
export const TargetCreatePayloadSchema = TargetSchema.pick({
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
});
export const TargetCreateDataSchema = TargetSchema;
export const TargetUpdatePayloadSchema = TargetSchema.pick({
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
  id: true,
}).partial({
  totalCalls: true,
  pitchedCalls: true,
  callbacks: true,
  appointments: true,
  followups: true,
  emails: true,
});
export const TargetUpdateDataSchema = TargetSchema;
export const TargetDeletePayloadSchema = TargetSchema.pick({
  id: true,
});
export const TargetDeleteDataSchema = TargetSchema;
export const TargetDetailPayloadSchema = TargetSchema.pick({
  id: true,
});
export const TargetDetailDataSchema = TargetSchema;

export type TargetItem = z.infer<typeof TargetSchema>;
export type TargetsGetPayload = z.infer<typeof TargetGetPayloadSchema>;
export type TargetsGetData = z.infer<typeof TargetGetDataSchema>;
export type TargetCreatePayload = z.infer<typeof TargetCreatePayloadSchema>;
export type TargetCreateData = z.infer<typeof TargetCreateDataSchema>;
export type TargetUpdatePayload = z.infer<typeof TargetUpdatePayloadSchema>;
export type TargetUpdateData = z.infer<typeof TargetUpdateDataSchema>;
export type TargetDeletePayload = z.infer<typeof TargetDeletePayloadSchema>;
export type TargetDeleteData = z.infer<typeof TargetDeleteDataSchema>;
export type TargetDetailPayload = z.infer<typeof TargetDetailPayloadSchema>;
export type TargetDetailData = z.infer<typeof TargetDetailDataSchema>;
