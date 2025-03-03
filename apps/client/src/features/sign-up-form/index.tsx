import React from "react";
import { Formik, FormikProps } from "formik";
import { Box, Grid2 as Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import TextInputField from "../text-input-field";
import LoadingButton from "../loading-button";
import { SignupFormSchema, SignupFormValues } from "@/schemas/auth";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useBoolean } from "ahooks";
import { api } from "@/lib/axios";
import { endpoints } from "@/config/urls";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export const initialValues: SignupFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  otp: "",
};

export default function SignUpForm() {
  const [showSendOtp, { setFalse }] = useBoolean(true);
  const { enqueueSnackbar } = useSnackbar();
  const postSendOtp = useMutation({
    mutationFn: (values: SignupFormValues) => {
      return api.post(endpoints.auth.signupSendOtp, values);
    },
  });
  const postVerifyOtp = useMutation({
    mutationFn: (values: SignupFormValues) => {
      return api.post(endpoints.auth.verifyOtp, {
        email: postSendOtp.variables?.email,
        otp: values.otp,
      });
    },
  });
  const handleSendOtp = (values: SignupFormValues) => {
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
  const handleSubmit = (values: SignupFormValues) => {
    postVerifyOtp.mutate(values);
  };

  const renderOtpForm = (f: FormikProps<SignupFormValues>) => {
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
      validationSchema={toFormikValidationSchema(SignupFormSchema)}
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
            <Grid size={{ xs: 12 }}>
              <TextInputField name="firstName" label="First Name" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextInputField name="lastName" label="Last Name" />
            </Grid>
            {renderOtpForm(f)}
          </Grid>
          <Typography component="div" display="flex" gap={1} variant="body2">
            {"Have an account?"}
            <NextLink href="/auth/sign-in">
              <Link component="div" variant="body2">
                Sign In
              </Link>
            </NextLink>
          </Typography>
        </Box>
      )}
    </Formik>
  );
}
