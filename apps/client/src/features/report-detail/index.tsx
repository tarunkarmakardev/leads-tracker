import dayjs from "dayjs";
import { Grid, Paper, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { ReportItem } from "@leads-tracker/schemas";
import EditReport from "../edit-report";
import DeleteReport from "../delete-report";

interface ReportDetailProps {
  item: ReportItem;
}
export default function ReportDetail({ item }: ReportDetailProps) {
  const {
    appointments,
    callbacks,
    totalCalls,
    followups,
    pitchedCalls,
    recordingsSent,
    dateTime,
  } = item;
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} display="flex" gap={1} mb={4}>
              <CalendarMonthIcon color="info" />
              <Typography>
                Call Date: {dayjs(dateTime).format("DD MMM, YYYY ddd")}
              </Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="h5">Basic Details</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <LocalPhoneIcon color="info" />
              <Typography>Calls: {totalCalls}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <PhoneCallbackIcon color="info" />
              <Typography>Call Backs: {callbacks}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <PhoneForwardedIcon color="info" />
              <Typography>Follow Ups: {followups}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <PermPhoneMsgIcon color="info" />
              <Typography>Pitched: {pitchedCalls}</Typography>
            </Grid>
            {/* <Grid item xs={12} display="flex" gap={1}>
              <AccessTimeIcon color="info" />
              <Typography>Non production: {totalHrs} Hrs</Typography>
            </Grid> */}
            <Grid item xs={12} display="flex" gap={1}>
              <PersonAddIcon color="info" />
              <Typography>Appointments: {appointments}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1} mb={2}>
              <RadioButtonCheckedIcon color="info" />
              <Typography>
                Recordings Sent: {recordingsSent ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              sx={{ gap: 2 }}
            >
              <EditReport item={item} />
              <DeleteReport item={item} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
