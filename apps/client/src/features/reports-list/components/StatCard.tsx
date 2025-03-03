import dayjs from "dayjs";
import { Grid, Paper, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GridItemStat from "./StatGridItem";
import { ReportItem } from "@leads-tracker/schemas";

interface StatCardProps {
  item: ReportItem;
}

export default function StatCard({ item }: StatCardProps) {
  const { totalCalls, appointments, callbacks, followups, pitchedCalls } = item;
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} display="flex" gap={1} mb={4}>
              <CalendarMonthIcon color="info" />
              <Typography>
                Call Date: {dayjs(item.dateTime).format("DD MMM, YYYY ddd")}
              </Typography>
            </Grid>
            <GridItemStat>
              <LocalPhoneIcon color="info" />
              <Typography>Calls: {totalCalls}</Typography>
            </GridItemStat>
            <GridItemStat>
              <PhoneCallbackIcon color="info" />
              <Typography>Call Backs: {callbacks}</Typography>
            </GridItemStat>
            <GridItemStat>
              <PhoneForwardedIcon color="info" />
              <Typography>Follow Ups: {followups}</Typography>
            </GridItemStat>
            <GridItemStat>
              <PermPhoneMsgIcon color="info" />
              <Typography>Pitched: {pitchedCalls}</Typography>
            </GridItemStat>
            {/* <GridItemStat>
              <AccessTimeIcon color="info" />
              <Typography>Non production: {timings} Hrs</Typography>
            </GridItemStat> */}
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
              {/* <EditStat stat={stat} />
              <DeleteStat stat={stat} />
              <ViewStat stat={stat} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
