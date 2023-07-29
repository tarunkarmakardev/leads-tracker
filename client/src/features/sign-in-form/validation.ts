import * as Yup from "yup";

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
