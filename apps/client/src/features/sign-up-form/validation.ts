import * as Yup from "yup";

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: Yup.string()
    .min(7, "Passwords should be minimum 7 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords should match")
    .required("Confirm your password"),
});
