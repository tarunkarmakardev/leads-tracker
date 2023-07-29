import dayjs from "dayjs";
import { CallStatsDetailQueryResult } from "@/services/call-stats/api/types";
import { Box, Grid, Paper, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditStat from "@/features/call-stat-actions/components/EditStat";
import DeleteStat from "@/features/call-stat-actions/components/DeleteStat";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { getStatTimeTotalHours } from "@/lib/time";

interface CallStatDetailProps {
  detailAPI: CallStatsDetailQueryResult;
}
export default function CallStatDetail({ detailAPI }: CallStatDetailProps) {
  const { data } = detailAPI;
  const { basicDetails, callDate, requests, timings = [] } = data || {};
  const { appointments, callBacks, calls, followUps, pitched, recordingsSent } =
    basicDetails || {};
  const totalHrs = getStatTimeTotalHours(timings);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} display="flex" gap={1} mb={4}>
              <CalendarMonthIcon color="info" />
              <Typography>
                Call Date: {dayjs(callDate).format("DD MMM, YYYY ddd")}
              </Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="h5">Basic Details</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <LocalPhoneIcon color="info" />
              <Typography>Calls: {calls}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <PhoneCallbackIcon color="info" />
              <Typography>Call Backs: {callBacks}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <PhoneForwardedIcon color="info" />
              <Typography>Follow Ups: {followUps}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <PermPhoneMsgIcon color="info" />
              <Typography>Pitched: {pitched}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <AccessTimeIcon color="info" />
              <Typography>Non production: {totalHrs} Hrs</Typography>
            </Grid>
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
            <Grid item xs={12} mb={2}>
              <Typography variant="h5">Requests</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <LinkedInIcon color="info" />
              <Typography>Linkedin: {requests?.linkedin}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1}>
              <EmailIcon color="info" />
              <Typography>Emails: {requests?.email}</Typography>
            </Grid>
            <Grid item xs={12} display="flex" gap={1} mb={2}>
              <WhatsAppIcon color="info" />
              <Typography>WhatsApp: {requests?.whatsApp}</Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="h5">Timings</Typography>
            </Grid>

            {timings.map((t, key) => (
              <Grid item xs={12} key={key} mb={2}>
                <Paper
                  elevation={2}
                  sx={{ display: "flex", gap: 1, alignItems: "baseline", p: 2 }}
                >
                  <Typography variant="h6">{t.title} - </Typography>
                  <Typography>
                    {t.hours} Hours {t.minutes} Minutes
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1}>
            {data && (
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="flex-end"
                sx={{ gap: 2 }}
              >
                <EditStat stat={data} />
                <DeleteStat stat={data} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
