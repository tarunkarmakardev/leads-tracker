import {
  CircularProgress,
  CircularProgressProps,
  Stack,
  StackProps,
} from "@mui/material";

interface SpinnerProps {
  loading?: boolean;
  loaderProps?: CircularProgressProps;
  stackProps?: StackProps;
  children?: React.ReactNode;
  loaderChildren?: React.ReactNode;
}

export default function Spinner({
  loading,
  children,
  loaderProps,
  stackProps,
  loaderChildren,
}: SpinnerProps) {
  if (!loading) return <>{children}</>;
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={2}
      {...stackProps}
    >
      {loading && <CircularProgress size={50} {...loaderProps} />}
      {loaderChildren}
    </Stack>
  );
}
