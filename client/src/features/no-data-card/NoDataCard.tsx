import { Paper, Stack, Typography } from "@mui/material";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

export default function NoDataCard() {
  return (
    <Paper elevation={2} sx={{ p: 8 }}>
      <Stack spacing={2} alignItems="center">
        <DoNotDisturbIcon sx={{ fontSize: 40 }} color="error" />
        <Typography textAlign="center" variant="h5" color="error">
          No Data found
        </Typography>
      </Stack>
    </Paper>
  );
}
