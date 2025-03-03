import { Avatar, Box, Stack, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

interface ReportsLayoutProps {
  title: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
}

export default function ReportsLayout({
  title,
  children,
  headerComponent,
}: ReportsLayoutProps) {
  return (
    <>
      <Stack
        sx={{ borderBottom: 1, borderColor: "divider" }}
        direction="row"
        gap={2}
        my={1}
        justifyContent="space-between"
        alignItems="center"
      >
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
      <Box>{children}</Box>
    </>
  );
}
