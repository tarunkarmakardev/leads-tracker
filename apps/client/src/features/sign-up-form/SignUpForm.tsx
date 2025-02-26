import React from "react";
import { Formik } from "formik";
import { Box, Grid, Link, Stack } from "@mui/material";
import { initialValues, SignUpFormValues } from "./config";
import { signUpSchema } from "./validation";
import { usePostSignUp } from "@/services/auth/hooks/sign-up";
import NextLink from "next/link";
import TextInputField from "../text-input-field";
import { useAuth } from "../auth-handler/hooks";
import LoadingButton from "../loading-button";
import GoogleSignIn from "../google-sign-in";

export default function SignUpForm() {
  const auth = useAuth();
  const signUpPostAPI = usePostSignUp();
  const handleSubmit = async (values: SignUpFormValues) => {
    signUpPostAPI.mutate(values, {
      onSuccess(data, variables, context) {
        auth.signUp(data);
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}
    >
      {(f) => (
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={f.handleSubmit}
          width="100%"
        >
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <TextInputField name="email" label="Email" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextInputField
                name="password"
                label="Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                loading={signUpPostAPI.isLoading}
                disabled={!f.isValid}
              >
                Submit
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <GoogleSignIn />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            columnGap={4}
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            <NextLink href="/auth/sign-in">
              <Link component="div" variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </NextLink>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
