"use client";
import { useGetReports } from "@/services/reports";
import { ReportsGetPayload } from "@leads-tracker/schemas";
import { alpha, Grid2 as Grid, useTheme } from "@mui/material";
import ChartCard from "../chart-card";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { configureLineChart, parseDateLabels } from "@/lib/charts";

Chart.register(...registerables);

const payload: ReportsGetPayload = {
  limit: 100,
  offset: 0,
  sortBy: "dateTime",
  sortOrder: "desc",
};

export default function CallStatsChart() {
  const theme = useTheme();
  const { palette } = theme;
  const getQuery = useGetReports(payload);
  const { results = [] } = getQuery.data || {};
  const labels = parseDateLabels(results, "dateTime");
  const callsDataset = {
    data: results.map((r) => r.totalCalls),
    label: "Calls",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.2),
    tension: 0.4,
  };
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <ChartCard title="Calls over time">
          <Line
            options={configureLineChart()}
            data={{
              datasets: [callsDataset],
              labels,
            }}
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
}
