import { ChartFromValue } from "@/config/common.types";

export type CallChartObject = {
  callDate: string;
  calls: number;
};

export type CallChartGetPayload = {
  from?: ChartFromValue;
};

export type CallChartGetResponse = {
  results: CallChartObject[];
};
