export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  meta: {
    project: string;
  };
};

export const initialValues: SignUpFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  meta: {
    project: "BLACKBUCKS",
  },
};
