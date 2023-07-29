import { useQuery, UseQueryOptions } from "react-query";
import { GET } from "../api";
import useRefetchQuery from "@/hooks/useRefetchQuery";
import { CallChartGetPayload, CallChartGetResponse } from "../api/types";

const GET_QUERY_KEY = "GetCallChart";

export const useGetCallChart = (
  payload: CallChartGetPayload,
  options?: Omit<
    UseQueryOptions<CallChartGetResponse, any, CallChartGetResponse, any[]>,
    "queryKey" | "queryFn"
  >
) => {
  const { from } = payload;
  return useQuery([GET_QUERY_KEY, from], () => GET(payload), options);
};

export const useRefetchGetCallChart = () => {
  return useRefetchQuery(GET_QUERY_KEY);
};
