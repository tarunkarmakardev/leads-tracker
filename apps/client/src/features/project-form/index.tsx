import { ProjectFormSchema, ProjectFormValues } from "@/schemas/projects";
import { Box } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormGridSection from "../form-grid-section";
import TextInputField from "../text-input-field";

const initialValues: ProjectFormValues = {
  name: "",
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
          {actionsComponent?.(f)}
        </Box>
      )}
    </Formik>
  );
}
