import { Grid } from "@mui/material";
import TextInputField from "../text-input-field";

type TimeInputProps = {
  disabled?: boolean;
  fieldNames: {
    title: string;
    hours: string;
    minutes: string;
  };
};

export default function TimeInput({ disabled, fieldNames }: TimeInputProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextInputField
          label="Title"
          name={fieldNames.title}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextInputField
          label="Hrs"
          name={fieldNames.hours}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextInputField
          label="Minutes"
          name={fieldNames.minutes}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}
