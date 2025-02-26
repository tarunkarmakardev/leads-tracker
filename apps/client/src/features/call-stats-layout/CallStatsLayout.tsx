import { Avatar, Box, Typography } from "@mui/material";
import ProtectedOnly from "../protected-only";
import ArticleIcon from "@mui/icons-material/Article";
import PageHeader from "../page-header";
import Spinner from "../spinner";

interface CallStatsLayoutProps {
  title: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  loading?: boolean;
}

export default function CallStatsLayout({
  title,
  children,
  headerComponent,
  loading,
}: CallStatsLayoutProps) {
  return (
    <ProtectedOnly>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ArticleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Box>
      <PageHeader>{headerComponent}</PageHeader>
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
    </ProtectedOnly>
  );
}
