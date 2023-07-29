import { useQuery, UseQueryOptions } from "react-query";
import { GET } from "../api";
import useRefetchQuery from "@/hooks/useRefetchQuery";
import {
  NonProductionChartGetPayload,
  NonProductionChartGetResponse,
} from "../api/types";

const GET_QUERY_KEY = "GetNonProductionChart";

export const useGetNonProductionChart = (
  payload: NonProductionChartGetPayload,
  options?: Omit<
    UseQueryOptions<
      NonProductionChartGetResponse,
      any,
      NonProductionChartGetResponse,
      any[]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { from } = payload;
  return useQuery([GET_QUERY_KEY, from], () => GET(payload), options);
};

export const useRefetchGetNonProductionChart = () => {
  return useRefetchQuery(GET_QUERY_KEY);
};
