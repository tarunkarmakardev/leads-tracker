import React from "react";
import { Formik } from "formik";
import { Box, Grid } from "@mui/material";
import { initialValues, OTPFormValues } from "./config";
import { signUpSchema } from "./validation";
import TextInputField from "../text-input-field";
import LoadingButton from "../loading-button";

type OTPFormProps = {
  onSubmit: (values: OTPFormValues) => void;
  isLoading?: boolean;
};

export default function OTPForm({ onSubmit, isLoading }: OTPFormProps) {
  const handleSubmit = (values: OTPFormValues) => {
    onSubmit(values);
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
              <TextInputField name="otp" label="OTP" type="number" />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            disabled={!f.isValid}
          >
            Submit
          </LoadingButton>
        </Box>
      )}
    </Formik>
  );
}
