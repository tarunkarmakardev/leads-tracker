import { Formik, FormikConfig, FormikProps } from "formik";
import { Box } from "@mui/material";
import FormGridSection from "@/features/form-grid-section";
import TextInputField from "../text-input-field";
import DateInputField from "../date-input-field";
import SwitchField from "../switch-field";
import { ReportFormSchema, ReportFormValues } from "@/schemas/reports";
import dayjs from "dayjs";
import { toFormikValidationSchema } from "zod-formik-adapter";

const initialValues: ReportFormValues = {
  dateTime: dayjs().toISOString(),
  appointments: 0,
  callbacks: 0,
  totalCalls: 0,
  followups: 0,
  emails: 0,
  pitchedCalls: 0,
  recordingsSent: false,
};

type ReportsFormProps = {
  editValues?: ReportFormValues;
  onSubmit: FormikConfig<ReportFormValues>["onSubmit"];
  actionsComponent?: (formik: FormikProps<ReportFormValues>) => React.ReactNode;
};

export default function ReportsForm({
  editValues,
  onSubmit,
  actionsComponent,
}: ReportsFormProps) {
  return (
    <Formik
      enableReinitialize
      validationSchema={toFormikValidationSchema(ReportFormSchema)}
      initialValues={editValues || initialValues}
      onSubmit={onSubmit}
    >
      {(f) => (
        <Box component="form" noValidate onSubmit={f.handleSubmit}>
          <FormGridSection
            items={[
              {
                id: 1,
                gridItemProps: { xs: 4 },
                component: (
                  <TextInputField
                    name="totalCalls"
                    label="Calls"
                    type="number"
                  />
                ),
              },
              {
                id: 2,
                gridItemProps: { xs: 4 },
                component: (
                  <TextInputField
                    name="pitchedCalls"
                    label="Pitched"
                    type="number"
                  />
                ),
              },
              {
                id: 3,
                gridItemProps: { xs: 4 },
                component: (
                  <TextInputField
                    name="callbacks"
                    label="Call Backs"
                    type="number"
                  />
                ),
              },
              {
                id: 4,
                gridItemProps: { xs: 4 },
                component: (
                  <TextInputField
                    name="appointments"
                    label="Appointments"
                    type="number"
                  />
                ),
              },
              {
                id: 5,
                gridItemProps: { xs: 4 },
                component: (
                  <TextInputField
                    name="followups"
                    label="Follow Ups"
                    type="number"
                  />
                ),
              },
              {
                id: 6,
                gridItemProps: { xs: 4 },
                component: (
                  <DateInputField
                    name="dateTime"
                    label="Call Date"
                    disableFuture
                  />
                ),
              },
              {
                id: 7,
                gridItemProps: { xs: 12 },
                component: (
                  <SwitchField
                    name="recordingsSent"
                    formControlLabelProps={{
                      label: "Recordings Sent",
                    }}
                  />
                ),
              },
            ]}
          />
          {actionsComponent?.(f)}
        </Box>
      )}
    </Formik>
  );
}
