import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
} from "@mui/material";
import { Field, FieldProps } from "formik";

interface SwitchFieldProps extends SwitchProps {
  formControlLabelProps: Omit<FormControlLabelProps, "control">;
}

export default function SwitchField({
  formControlLabelProps,
  ...props
}: SwitchFieldProps) {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: FieldProps) => (
        <FormControlLabel
          required
          control={<Switch {...field} {...props} />}
          {...formControlLabelProps}
        />
      )}
    </Field>
  );
}
