"use client";
import { useGetReports } from "@/services/reports";
import {
  ReportItem,
  ReportsGetPayload,
  TargetItem,
} from "@leads-tracker/schemas";
import { alpha, Grid2 as Grid, useTheme } from "@mui/material";
import ChartCard from "../chart-card";
import { Chart, ChartDataset, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { configureLineChart, parseDateLabels } from "@/lib/charts";
import { useGetTargets } from "@/services/targets";

Chart.register(...registerables);

const payload: ReportsGetPayload = {
  limit: 100,
  offset: 0,
  sortBy: "dateTime",
  sortOrder: "desc",
};

export default function CallStatsChart() {
  const getQuery = useGetReports(payload);
  const getTargetsQuery = useGetTargets({ limit: 100, offset: 0 });
  const { results: reports = [] } = getQuery.data || {};
  const target = getTargetsQuery.data?.results?.[0];

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <CallsChart reports={reports} target={target} />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <AppointmentsChart reports={reports} target={target} />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <PitchedChart reports={reports} target={target} />
      </Grid>
    </Grid>
  );
}

type CallsChartProps = {
  reports: ReportItem[];
  target?: TargetItem;
};

function CallsChart({ reports, target }: CallsChartProps) {
  const theme = useTheme();
  const { palette } = theme;
  if (!target) return null;
  const labels = parseDateLabels(reports, "dateTime");
  const totalCallsDataset: ChartDataset<"line", (number | undefined)[]> = {
    data: reports.map((r) => r.totalCalls),
    label: "Calls",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.5),
    tension: 0.4,
  };
  const totalCallsTargetDataset: ChartDataset<"line", (number | undefined)[]> =
    {
      data: reports.map((r) => target?.totalCalls),
      label: "Target",
      fill: false,
      borderColor: palette.error.main,
      backgroundColor: alpha(palette.error.main, 0.5),
      borderDash: [5, 5],
    };
  return (
    <ChartCard title="Calls over time">
      <Line
        options={configureLineChart()}
        data={{
          datasets: [totalCallsDataset, totalCallsTargetDataset],
          labels,
        }}
      />
    </ChartCard>
  );
}

type AppointmentsChartProps = {
  reports: ReportItem[];
  target?: TargetItem;
};

function AppointmentsChart({ reports, target }: AppointmentsChartProps) {
  const theme = useTheme();
  const { palette } = theme;
  if (!target) return null;
  const labels = parseDateLabels(reports, "dateTime");
  const appointmentsDataset: ChartDataset<"line", (number | undefined)[]> = {
    data: reports.map((r) => r.appointments),
    label: "Appointments",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.5),
    tension: 0.4,
  };
  const appointmentsTargetDataset: ChartDataset<
    "line",
    (number | undefined)[]
  > = {
    data: reports.map((r) => target?.appointments),
    label: "Target",
    fill: false,
    borderColor: palette.error.main,
    backgroundColor: alpha(palette.error.main, 0.5),
    borderDash: [5, 5],
  };
  return (
    <ChartCard title="Appointments over time">
      <Line
        options={configureLineChart()}
        data={{
          datasets: [appointmentsDataset, appointmentsTargetDataset],
          labels,
        }}
      />
    </ChartCard>
  );
}

type PitchedChartProps = {
  reports: ReportItem[];
  target?: TargetItem;
};

function PitchedChart({ reports, target }: PitchedChartProps) {
  const theme = useTheme();
  const { palette } = theme;
  if (!target) return null;
  const labels = parseDateLabels(reports, "dateTime");
  const pitchedDataset: ChartDataset<"line", (number | undefined)[]> = {
    data: reports.map((r) => r.pitchedCalls),
    label: "Pitched",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.5),
    tension: 0.4,
  };
  const pitchedTargetDataset: ChartDataset<"line", (number | undefined)[]> = {
    data: reports.map((r) => target?.pitchedCalls),
    label: "Target",
    fill: false,
    borderColor: palette.error.main,
    backgroundColor: alpha(palette.error.main, 0.5),
    borderDash: [5, 5],
  };
  return (
    <ChartCard title="Pitched calls over time">
      <Line
        options={configureLineChart()}
        data={{
          datasets: [pitchedDataset, pitchedTargetDataset],
          labels,
        }}
      />
    </ChartCard>
  );
}
