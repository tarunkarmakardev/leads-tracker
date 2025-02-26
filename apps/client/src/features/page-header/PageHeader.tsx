import { Stack } from "@mui/material";

interface PageHeaderProps {
  children?: React.ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <Stack direction="row" gap={2} py={2}>
      {children}
    </Stack>
  );
}
