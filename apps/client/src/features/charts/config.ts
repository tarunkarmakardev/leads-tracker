import { ChartProps } from "react-chartjs-2";

export const lineChartConfig = (): ChartProps<"line">["options"] => {
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
