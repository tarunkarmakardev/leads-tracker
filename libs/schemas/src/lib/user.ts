import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  otp: z.string(),
  isVerified: z.boolean(),
});

export const SendOtpPostPayloadSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
}).partial({ firstName: true, lastName: true });

export type SendOtpPostPayload = z.infer<typeof SendOtpPostPayloadSchema>;

export type User = z.infer<typeof UserSchema>;
