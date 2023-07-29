import { Stack, StackProps, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

interface ErrorTextProps {
  stackProps?: StackProps;
  text: string;
}

function ErrorText({ text, stackProps }: ErrorTextProps) {
  return (
    <Stack justifyContent="center" alignItems="center" {...stackProps}>
      <ErrorIcon sx={{ fontSize: 50 }} color="error" />
      <Typography variant="h5" color="error">
        {text}
      </Typography>
    </Stack>
  );
}

export default ErrorText;
