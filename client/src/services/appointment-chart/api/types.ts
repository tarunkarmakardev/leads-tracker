import { ChartFromValue } from "@/config/common.types";

export type AppointmentChartObject = {
  callDate: string;
  calls: number;
  appointments: number;
};

export type AppointmentChartGetPayload = {
  from?: ChartFromValue;
};

export type AppointmentChartGetResponse = {
  results: AppointmentChartObject[];
};
