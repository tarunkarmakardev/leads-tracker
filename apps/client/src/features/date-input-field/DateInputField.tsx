import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Field, FieldProps } from "formik";

interface DateInputFieldProps extends DatePickerProps<Dayjs> {
  name: string;
}

export default function DateInputField({
  name,
  slotProps,
  ...props
}: DateInputFieldProps) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <DatePicker
          value={dayjs(field.value)}
          onChange={(value) =>
            value && form.setFieldValue(name, value.toISOString())
          }
          slotProps={{
            textField: {
              error: meta.touched && !!meta.error,
              helperText: meta.touched && meta.error,
              fullWidth: true,
              name,
              required: true,
              margin: "dense",
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...props}
        />
      )}
    </Field>
  );
}
