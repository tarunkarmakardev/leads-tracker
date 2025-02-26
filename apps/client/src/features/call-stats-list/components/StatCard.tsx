import dayjs from "dayjs";
import { CallStatObject } from "@/services/call-stats/api/types";
import { Grid, Paper, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GridItemStat from "./StatGridItem";
import ViewStat from "./ViewStat";
import EditStat from "@/features/call-stat-actions/components/EditStat";
import DeleteStat from "@/features/call-stat-actions/components/DeleteStat";
import { getStatTimeTotalHours } from "@/lib/time";

interface StatCardProps {
  stat: CallStatObject;
}

export default function StatCard({ stat }: StatCardProps) {
  const { calls, appointments, callBacks, followUps, pitched } =
    stat.basicDetails;
  const timings = getStatTimeTotalHours(stat.timings);
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} display="flex" gap={1} mb={4}>
              <CalendarMonthIcon color="info" />
              <Typography>
                Call Date: {dayjs(stat.callDate).format("DD MMM, YYYY ddd")}
              </Typography>
            </Grid>
            <GridItemStat>
              <LocalPhoneIcon color="info" />
              <Typography>Calls: {calls}</Typography>
            </GridItemStat>
            <GridItemStat>
              <PhoneCallbackIcon color="info" />
              <Typography>Call Backs: {callBacks}</Typography>
            </GridItemStat>
            <GridItemStat>
              <PhoneForwardedIcon color="info" />
              <Typography>Follow Ups: {followUps}</Typography>
            </GridItemStat>
            <GridItemStat>
              <PermPhoneMsgIcon color="info" />
              <Typography>Pitched: {pitched}</Typography>
            </GridItemStat>
            <GridItemStat>
              <AccessTimeIcon color="info" />
              <Typography>Non production: {timings} Hrs</Typography>
            </GridItemStat>
            <GridItemStat>
              <PersonAddIcon color="info" />
              <Typography>Appointments: {appointments}</Typography>
            </GridItemStat>
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
              <EditStat stat={stat} />
              <DeleteStat stat={stat} />
              <ViewStat stat={stat} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
