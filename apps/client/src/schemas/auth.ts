import { SendOtpPostPayloadSchema } from "@leads-tracker/schemas";
import { z } from "zod";

export const SignInFormSchema = SendOtpPostPayloadSchema.extend({
  otp: z.string(),
});
export const SignupFormSchema = SendOtpPostPayloadSchema.extend({
  otp: z.string(),
}).required();
export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export type SignupFormValues = z.infer<typeof SignupFormSchema>;
