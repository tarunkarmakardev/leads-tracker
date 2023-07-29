import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartLayout from "../chart-layout";
import { lineChartConfig } from "../charts/config";
import { parseDateLabels } from "@/lib/charts";
import { useTheme, alpha } from "@mui/material";
import { useGetNonProductionChart } from "@/services/non-production-chart/hooks";

Chart.register(...registerables);

export default function NonProductionChart() {
  const theme = useTheme();
  const { palette } = theme;
  const getAPI = useGetNonProductionChart({
    from: "LAST_3_MONTHS",
  });
  const { results = [] } = getAPI.data || {};
  const labels = parseDateLabels(results, "callDate");
  const nonProductionDataset = {
    data: results.map((r) => r.nonProductionHours),
    label: "Non Production",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.2),
    tension: 0.4,
  };
  const breakDataset = {
    data: results.map((r) => r.breakHours),
    label: "Break",
    borderColor: palette.info.light,
    backgroundColor: palette.info.light,
  };
  return (
    <ChartLayout title="Non Production Hours">
      <Line
        options={lineChartConfig()}
        data={{
          datasets: [nonProductionDataset, breakDataset],
          labels,
        }}
      />
    </ChartLayout>
  );
}
