import { ChartProps } from "react-chartjs-2";
import dayjs from "dayjs";

export function parseDateLabels<T>(list: T[], key: keyof T) {
  return list.map((r) => dayjs(r[key] as string).format("DD-MM-YYYY"));
}
export const configureLineChart = (): ChartProps<"line">["options"] => {
  return {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        animation: false,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        padding: 10,
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          color: "#000",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 3,
      },
      line: {
        borderWidth: 1,
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
