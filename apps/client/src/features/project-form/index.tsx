import { ProjectFormSchema, ProjectFormValues } from "@/schemas/projects";
import { Box } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormGridSection from "../form-grid-section";
import TextInputField from "../text-input-field";

const initialValues: ProjectFormValues = {
  name: "",
  target: {
    appointments: 20,
    callbacks: 100,
    emails: 20,
    followups: 20,
    pitchedCalls: 190,
    totalCalls: 200,
  },
};

type ProjectFormProps = {
  editValues?: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => void;
  actionsComponent?: (
    formik: FormikProps<ProjectFormValues>
  ) => React.ReactNode;
};

export default function ProjectForm({
  editValues,
  onSubmit,
  actionsComponent,
}: ProjectFormProps) {
  return (
    <Formik
      enableReinitialize
      validationSchema={toFormikValidationSchema(ProjectFormSchema)}
      initialValues={editValues || initialValues}
      onSubmit={onSubmit}
    >
      {(f) => (
        <Box component="form" noValidate onSubmit={f.handleSubmit}>
          <FormGridSection
            items={[
              {
                id: 1,
                gridItemProps: { xs: 6 },
                component: <TextInputField name="name" label="Name" />,
              },
            ]}
          />
          <FormGridSection
            title="Targets"
            items={[
              {
                id: 1,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="target.totalCalls"
                    label="Total Calls"
                    type="number"
                  />
                ),
              },
              {
                id: 2,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="target.pitchedCalls"
                    label="Pitched Calls"
                    type="number"
                  />
                ),
              },
              {
                id: 3,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="target.callbacks"
                    label="Callbacks"
                    type="number"
                  />
                ),
              },
              {
                id: 4,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="target.followups"
                    label="Followups"
                    type="number"
                  />
                ),
              },
              {
                id: 5,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="target.appointments"
                    label="Appointments"
                    type="number"
                  />
                ),
              },
              {
                id: 6,
                gridItemProps: { xs: 6 },
                component: (
                  <TextInputField
                    name="target.emails"
                    label="Emails"
                    type="number"
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
