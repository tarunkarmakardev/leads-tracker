import * as Yup from "yup";

export const signUpSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP should be 6 digit"),
});
