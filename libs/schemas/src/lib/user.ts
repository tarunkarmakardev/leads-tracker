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

export const SignupPostPayloadSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
});
export const SigninPostPayloadSchema = UserSchema.pick({
  email: true,
});

export type SignupPostPayload = z.infer<typeof SignupPostPayloadSchema>;
export type SigninPostPayload = z.infer<typeof SigninPostPayloadSchema>;

export type User = z.infer<typeof UserSchema>;
