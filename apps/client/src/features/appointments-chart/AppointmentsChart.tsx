import React from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartLayout from "../chart-layout";
import { lineChartConfig } from "../charts/config";
import { useGetAppointmentChart } from "@/services/appointment-chart/hooks";
import { parseDateLabels } from "@/lib/charts";
import { useTheme, alpha } from "@mui/material";

Chart.register(...registerables);

export default function AppointmentsChart() {
  const theme = useTheme();
  const { palette } = theme;
  const getAPI = useGetAppointmentChart({
    from: "LAST_3_MONTHS",
  });
  const { results = [] } = getAPI.data || {};
  const labels = parseDateLabels(results, "callDate");
  const appointmentsDataset = {
    data: results.map((r) => r.appointments),
    label: "Appointments",
    fill: true,
    borderColor: palette.info.main,
    backgroundColor: alpha(palette.info.main, 0.2),
    tension: 0.4,
  };
  const expectedAppointmentsDataset = {
    data: results.map((r) => 2),
    label: "Expected Target",
    borderColor: palette.info.light,
    backgroundColor: palette.info.light,
  };
  return (
    <ChartLayout title="Appointments over time">
      <Line
        options={lineChartConfig()}
        data={{
          datasets: [appointmentsDataset, expectedAppointmentsDataset],
          labels,
        }}
      />
    </ChartLayout>
  );
}
