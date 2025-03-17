import { ChartProps } from "react-chartjs-2";
import dayjs from "dayjs";

export function parseDateLabels<T>(list: T[], key: keyof T) {
  return list.map((r) => dayjs(r[key] as string).format("DD-MM-YYYY"));
}
export const configureLineChart = (): ChartProps<"line">["options"] => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
};
