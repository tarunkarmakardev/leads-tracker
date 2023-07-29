import { Button, ButtonProps, CircularProgress } from "@mui/material";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export default function LoadingButton({
  loading,
  startIcon,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      startIcon={(loading && <CircularProgress size={20} />) || startIcon}
      {...props}
    />
  );
}
