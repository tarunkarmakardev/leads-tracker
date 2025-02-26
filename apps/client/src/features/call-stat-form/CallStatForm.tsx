import { produce } from "immer";
import { Formik, FormikConfig, FormikProps } from "formik";
import { Box, Button } from "@mui/material";
import TimeInput from "@/features/time-input";
import FormGridSection from "@/features/form-grid-section";
import { initialValues } from "./config";
import { CallStatsFormValues } from "./common.types";
import TextInputField from "../text-input-field";
import { generateTimingObject } from "./utils";
import DateInputField from "../date-input-field";
import SwitchField from "../switch-field";
import { callStatFormSchema } from "./validations";

interface CallStatFormProps {
  editValues?: CallStatsFormValues;
  onSubmit: FormikConfig<CallStatsFormValues>["onSubmit"];
  actionsComponent?: (
    formik: FormikProps<CallStatsFormValues>
  ) => React.ReactNode;
}

export default function CallStatForm({
  editValues,
  onSubmit,
  actionsComponent,
}: CallStatFormProps) {
  const handleAddTiming = (f: FormikProps<CallStatsFormValues>) => {
    f.setValues(
      produce(({ timings }) => {
        timings.push(generateTimingObject());
      })
    );
  };
  const handleRemoveTiming = (f: FormikProps<CallStatsFormValues>) => {
    f.setValues(
      produce(({ timings }) => {
        if (timings.length > 1) {
          timings.pop();
        }
      })
    );
  };
  return (
    <Formik
      enableReinitialize
      validationSchema={callStatFormSchema}
      initialValues={editValues || initialValues}
      onSubmit={onSubmit}
    >
      {(f) => (
        <Box component="form" noValidate onSubmit={f.handleSubmit}>
          <FormGridSection
            title="Basic Details"
            items={[
              {
                id: 1,
                gridItemProps: { xs: 4 },
                component: (
                  <TextInputField
                    name="basicDetails.calls"
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
                    name="basicDetails.pitched"
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
                    name="basicDetails.callBacks"
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
                    name="basicDetails.appointments"
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
                    name="basicDetails.followUps"
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
                    name="callDate"
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
                    name="basicDetails.recordingsSent"
                    formControlLabelProps={{
                      label: "Recordings Sent",
                    }}
                  />
                ),
              },
            ]}
          />
          <FormGridSection
            title="Requests"
            items={[
              {
                id: 1,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="requests.linkedin"
                    label="Linkedin Requests"
                    type="number"
                  />
                ),
              },
              {
                id: 2,
                gridItemProps: { xs: 3 },
                component: (
                  <TextInputField
                    name="requests.email"
                    label="Email Requests"
                    type="number"
                  />
                ),
              },
              {
                id: 2,
                gridItemProps: { xs: 3 },
                component: (
                  <TextInputField
                    name="requests.whatsApp"
                    label="Whatsapp Requests"
                    type="number"
                  />
                ),
              },
            ]}
          />
          <FormGridSection
            title="Timings (optional)"
            items={f.values.timings.map((t, id) => ({
              id,
              component: (
                <TimeInput
                  disabled={id === 0}
                  fieldNames={{
                    title: `timings[${id}].title`,
                    hours: `timings[${id}].hours`,
                    minutes: `timings[${id}].minutes`,
                  }}
                />
              ),
              gridItemProps: {
                xs: 12,
              },
            }))}
          />
          <FormGridSection
            items={[
              {
                id: 1,
                component: (
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={() => handleAddTiming(f)}
                  >
                    Add Timing
                  </Button>
                ),
                gridItemProps: {
                  xs: 6,
                },
              },
              {
                id: 2,
                component: (
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveTiming(f)}
                  >
                    Remove Timing
                  </Button>
                ),
                gridItemProps: {
                  xs: 6,
                },
              },
            ]}
          />

          {actionsComponent?.(f)}
        </Box>
      )}
    </Formik>
  );
}
