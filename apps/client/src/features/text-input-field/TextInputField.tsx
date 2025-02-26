import { Field, FieldProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

export default function TextInputField(props: TextFieldProps) {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: FieldProps) => (
        <TextField
          margin="dense"
          required
          fullWidth
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          {...props}
          {...field}
        />
      )}
    </Field>
  );
}
