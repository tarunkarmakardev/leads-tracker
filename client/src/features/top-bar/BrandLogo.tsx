import { Typography } from "@mui/material";
import Link from "next/link";
import TimelineIcon from "@mui/icons-material/Timeline";

export function BrandLogo() {
  return (
    <Link href="/" style={{ textDecoration: "none", color: "unset" }}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TimelineIcon sx={{ fontSize: 32 }} />
        Leads Tracker
      </Typography>
    </Link>
  );
}
