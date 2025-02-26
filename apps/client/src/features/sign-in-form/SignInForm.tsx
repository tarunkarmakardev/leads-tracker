import React from "react";
import { Formik } from "formik";
import { Box, Grid, Link, Stack } from "@mui/material";
import { initialValues, SignInFormValues } from "./config";
import { signUpSchema } from "./validation";
import NextLink from "next/link";
import { useAuth } from "../auth-handler/hooks";
import TextInputField from "../text-input-field";
import LoadingButton from "../loading-button";
import { usePostSignIn } from "@/services/auth/hooks/sign-in";
import GoogleSignIn from "../google-sign-in";

export default function SignInForm() {
  const signInPostAPI = usePostSignIn();
  const auth = useAuth();
  const handleSubmit = async (values: SignInFormValues) => {
    signInPostAPI.mutate(values, {
      onSuccess(data, variables, context) {
        auth.signIn(data);
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
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                loading={signInPostAPI.isLoading}
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
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Link component="div" variant="body2">
              Forgot password?
            </Link>
            {/* <NextLink href="/auth/forgot-password">
              </NextLink> */}
            <NextLink href="/auth/sign-up">
              <Link component="div" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </NextLink>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
