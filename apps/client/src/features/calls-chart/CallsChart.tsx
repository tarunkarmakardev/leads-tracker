import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartLayout from "../chart-layout";
import { lineChartConfig } from "../charts/config";
import { useGetCallChart } from "@/services/call-chart/hooks";
import { parseDateLabels } from "@/lib/charts";
import { alpha, useTheme } from "@mui/material";

Chart.register(...registerables);
export default function CallsChart() {
  const theme = useTheme();
  const { palette } = theme;
  const getAPI = useGetCallChart({
    from: "LAST_3_MONTHS",
  });
  const { results = [] } = getAPI.data || {};
  const labels = parseDateLabels(results, "callDate");
  const agentCallsDataset = {
    data: results.map((r) => r.calls),
    label: "Calls",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.2),
    tension: 0.4,
  };
  const expectedCallsDataset = {
    data: results.map((r) => 100),
    label: "Expected Target",
    borderColor: palette.info.light,
    backgroundColor: palette.info.light,
  };

  return (
    <ChartLayout title="Calls over time">
      <Line
        options={lineChartConfig()}
        data={{
          datasets: [agentCallsDataset, expectedCallsDataset],
          labels,
        }}
      />
    </ChartLayout>
  );
}
