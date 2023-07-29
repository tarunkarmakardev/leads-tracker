import { salesLoggerPrivateBackend } from "@/lib/axios";
import { CallChartGetPayload, CallChartGetResponse } from "./types";

export const GET = async (payload: CallChartGetPayload) => {
  const res = await salesLoggerPrivateBackend({
    url: "/charts/calls",
    params: payload,
  });

  return res.data as CallChartGetResponse;
};
