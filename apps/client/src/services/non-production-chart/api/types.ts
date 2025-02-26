import { ChartFromValue } from "@/config/common.types";

export type NonProductionChartObj = {
  callDate: Date;
  nonProductionHours: number;
  breakHours: number;
};

export type NonProductionChartGetPayload = {
  from?: ChartFromValue;
};

export type NonProductionChartGetResponse = {
  results: NonProductionChartObj[];
};
