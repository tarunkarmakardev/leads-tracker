import { Avatar, Box, Stack, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import Spinner from "../spinner";

interface ReportsLayoutProps {
  title: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  loading?: boolean;
}

export default function ReportsLayout({
  title,
  children,
  headerComponent,
  loading,
}: ReportsLayoutProps) {
  return (
    <>
      <Stack direction="row" gap={2} my={1} justifyContent="space-between">
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar
            sx={{
              m: 0.5,
              bgcolor: "secondary.main",
              width: 24,
              height: 24,
            }}
          >
            <ArticleIcon sx={{ width: 16, height: 16 }} />
          </Avatar>
          <Typography component="h1" variant="h6">
            {title}
          </Typography>
        </Stack>
        {headerComponent}
      </Stack>
      <Box>
        <Spinner
          loading={loading}
          loaderProps={{
            sx: { my: 12 },
          }}
        >
          {children}
        </Spinner>
      </Box>
    </>
  );
}
