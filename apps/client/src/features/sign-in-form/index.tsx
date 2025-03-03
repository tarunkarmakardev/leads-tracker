import React from "react";
import { Formik, FormikProps } from "formik";
import { useBoolean } from "ahooks";
import { Box, Grid2 as Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import TextInputField from "../text-input-field";
import LoadingButton from "../loading-button";
import { SigninFormSchema, SigninFormValues } from "@/schemas/auth";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { endpoints } from "@/config/urls";
import { useSnackbar } from "notistack";

export const initialValues: SigninFormValues = {
  email: "",
  otp: "",
};

export default function SignInForm() {
  const [showSendOtp, { setFalse }] = useBoolean(true);
  const { enqueueSnackbar } = useSnackbar();
  const postSendOtp = useMutation({
    mutationFn: (values: SigninFormValues) => {
      return api.post(endpoints.auth.signinSendOtp, values);
    },
  });
  const postVerifyOtp = useMutation({
    mutationFn: (values: SigninFormValues) => {
      return api.post(endpoints.auth.verifyOtp, {
        email: values.email,
        otp: values.otp,
      });
    },
  });
  const handleSendOtp = (values: SigninFormValues) => {
    postSendOtp.mutate(values, {
      onSuccess: () => {
        enqueueSnackbar({
          message: "OTP sent successfully",
          variant: "success",
        });
        setFalse();
      },
    });
  };
  const handleSubmit = (values: SigninFormValues) => {
    postVerifyOtp.mutate(values);
  };

  const renderOtpForm = (f: FormikProps<SigninFormValues>) => {
    if (showSendOtp) {
      return (
        <>
          <Grid size={{ xs: 12 }}>
            <LoadingButton
              type="button"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              loading={postSendOtp.isPending}
              onClick={() => handleSendOtp(f.values)}
              disabled={!!f.errors.email}
            >
              Send OTP
            </LoadingButton>
          </Grid>
        </>
      );
    }
    return (
      <>
        <Grid size={{ xs: 12 }}>
          <TextInputField name="otp" label="OTP" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            loading={postVerifyOtp.isPending}
            disabled={!f.isValid}
          >
            Submit
          </LoadingButton>
        </Grid>
      </>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(SigninFormSchema)}
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
            <Grid size={{ xs: 12 }}>
              <TextInputField name="email" label="Email" type="email" />
            </Grid>
            {renderOtpForm(f)}
          </Grid>
          <Typography component="div" display="flex" gap={1} variant="body2">
            {"Don't have an account?"}
            <NextLink href="/auth/sign-up">
              <Link component="div" variant="body2">
                Sign Up
              </Link>
            </NextLink>
          </Typography>
        </Box>
      )}
    </Formik>
  );
}
