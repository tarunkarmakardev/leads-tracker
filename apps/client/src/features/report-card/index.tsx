import dayjs from "dayjs";
import { Grid2 as Grid, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ReportItem } from "@leads-tracker/schemas";

interface StatCardProps {
  item: ReportItem;
}

export default function ReportCard({ item }: StatCardProps) {
  const { totalCalls, appointments, callbacks, followups, pitchedCalls } = item;
  return (
    <Grid container spacing={1}>
      <Grid size={12} display="flex" gap={1} mb={4}>
        <CalendarMonthIcon color="info" />
        <Typography>
          Call Date: {dayjs(item.dateTime).format("DD MMM, YYYY ddd")}
        </Typography>
      </Grid>
      <StatGrid>
        <LocalPhoneIcon color="info" />
        <Typography>Calls: {totalCalls}</Typography>
      </StatGrid>
      <StatGrid>
        <PhoneCallbackIcon color="info" />
        <Typography>Call Backs: {callbacks}</Typography>
      </StatGrid>
      <StatGrid>
        <PhoneForwardedIcon color="info" />
        <Typography>Follow Ups: {followups}</Typography>
      </StatGrid>
      <StatGrid>
        <PermPhoneMsgIcon color="info" />
        <Typography>Pitched: {pitchedCalls}</Typography>
      </StatGrid>
      <StatGrid>
        <PersonAddIcon color="info" />
        <Typography>Appointments: {appointments}</Typography>
      </StatGrid>
    </Grid>
  );
}

interface StatGridProps {
  children?: React.ReactNode;
}

function StatGrid({ children }: StatGridProps) {
  return (
    <Grid display="flex" gap={1} size={{ xs: 12, md: 4 }}>
      {children}
    </Grid>
  );
}
