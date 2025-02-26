"use client";
import AppointmentsChart from "@/features/appointments-chart";
import CallsChart from "@/features/calls-chart";
import NonProductionChart from "@/features/non-production-chart";
import ProtectedOnly from "@/features/protected-only";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <ProtectedOnly>
      <Grid container height="100%" p={4} spacing={2}>
        <Grid item xs={12} md={6}>
          <CallsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppointmentsChart />
        </Grid>
        <Grid item xs={12} md={12}>
          <NonProductionChart />
        </Grid>
      </Grid>
    </ProtectedOnly>
  );
}
