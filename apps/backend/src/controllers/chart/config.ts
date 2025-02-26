import _ from "lodash";

export const chartFromValues = {
  LAST_1_WEEK: {
    value: 1,
    unit: "weeks",
  },
  LAST_3_MONTHS: {
    value: 3,
    unit: "months",
  },
  LAST_6_MONTHS: {
    value: 6,
    unit: "months",
  },
  LAST_1_YEAR: {
    value: 1,
    unit: "years",
  },
} as const;

export type ChartFromValue = keyof typeof chartFromValues;

export function getChartFromObject(from = "") {
  return _.get(chartFromValues, from, chartFromValues.LAST_3_MONTHS);
}
