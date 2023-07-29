import { salesLoggerPrivateBackend } from "@/lib/axios";
import {
  NonProductionChartGetPayload,
  NonProductionChartGetResponse,
} from "./types";

export const GET = async (payload: NonProductionChartGetPayload) => {
  const res = await salesLoggerPrivateBackend({
    url: "/charts/non-production",
    params: payload,
  });

  return res.data as NonProductionChartGetResponse;
};
