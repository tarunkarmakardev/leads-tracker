import { salesLoggerPrivateBackend } from "@/lib/axios";
import {
  CallStatsDeletePayload,
  CallStatsDeleteResponse,
  CallStatsDetailPayload,
  CallStatsDetailRes,
  CallStatsGetPayload,
  CallStatsGetRes,
  CallStatsPatchPayload,
  CallStatsPatchResponse,
  CallStatsPOSTPayload,
  CallStatsPOSTResponse,
} from "./types";

export const GET = async (payload: CallStatsGetPayload) => {
  const res = await salesLoggerPrivateBackend({
    url: "/stats/calls",
    params: payload,
  });

  return res.data as CallStatsGetRes;
};

export const POST = async (payload: CallStatsPOSTPayload) => {
  const res = await salesLoggerPrivateBackend({
    method: "POST",
    url: `/stats/calls`,
    data: payload,
  });

  return res.data as CallStatsPOSTResponse;
};

export const PATCH = async (payload: CallStatsPatchPayload) => {
  const res = await salesLoggerPrivateBackend({
    method: "PATCH",
    url: `/stats/calls/${payload._id}`,
    data: payload,
  });

  return res.data as CallStatsPatchResponse;
};

export const DELETE = async (payload: CallStatsDeletePayload) => {
  const res = await salesLoggerPrivateBackend({
    method: "DELETE",
    url: `/stats/calls/${payload._id}`,
  });

  return res.data as CallStatsDeleteResponse;
};

export const DETAIL = async (payload: CallStatsDetailPayload) => {
  const res = await salesLoggerPrivateBackend({
    method: "GET",
    url: `/stats/calls/${payload._id}`,
  });

  return res.data as CallStatsDetailRes;
};
