import {
  SigninPostPayloadSchema,
  SignupPostPayloadSchema,
} from "@leads-tracker/schemas";
import { z } from "zod";

export const SigninFormSchema = SigninPostPayloadSchema.extend({
  otp: z.string(),
});
export const SignupFormSchema = SignupPostPayloadSchema.extend({
  otp: z.string(),
});

export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type SignupFormValues = z.infer<typeof SignupFormSchema>;
