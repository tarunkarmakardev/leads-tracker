import { salesLoggerPrivateBackend } from "@/lib/axios";
import {
  AppointmentChartGetPayload,
  AppointmentChartGetResponse,
} from "./types";

export const GET = async (payload: AppointmentChartGetPayload) => {
  const res = await salesLoggerPrivateBackend({
    url: "/charts/appointments",
    params: payload,
  });

  return res.data as AppointmentChartGetResponse;
};
