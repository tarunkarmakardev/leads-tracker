import useRefetchQuery from "@/hooks/useRefetchQuery";
import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { POST, GET, PATCH, DELETE, DETAIL } from "../api";
import {
  CallStatsGetPayload,
  CallStatsGetRes,
  CallStatsDetailPayload,
  CallStatsDetailRes,
} from "../api/types";

const GET_QUERY_KEY = "GetCallStat";
const DETAIL_QUERY_KEY = "DetailCallStat";

export const usePostCallStat = () => useMutation(POST);

export const useGetCallStat = (
  payload: CallStatsGetPayload,
  options?: Omit<
    UseQueryOptions<CallStatsGetPayload, any, CallStatsGetRes, any[]>,
    "queryKey" | "queryFn"
  >
) => useQuery([GET_QUERY_KEY], () => GET(payload), options);

export const useRefetchGetCallStat = () => {
  return useRefetchQuery(GET_QUERY_KEY);
};

export const useDetailCallStat = (
  payload: CallStatsDetailPayload,
  options?: Omit<
    UseQueryOptions<CallStatsDetailPayload, any, CallStatsDetailRes, any[]>,
    "queryKey" | "queryFn"
  >
) => {
  const { _id } = payload;
  return useQuery([DETAIL_QUERY_KEY, _id], () => DETAIL(payload), {
    enabled: Boolean(_id),
    ...options,
  });
};

export const useRefetchDetailCallStat = () => {
  return useRefetchQuery(DETAIL_QUERY_KEY);
};

export const usePatchCallStat = () => useMutation(PATCH);

export const useDeleteCallStat = () => useMutation(DELETE);
