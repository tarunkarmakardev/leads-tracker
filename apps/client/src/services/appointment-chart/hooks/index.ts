/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GET } from "../api";
import useRefetchQuery from "@/hooks/useRefetchQuery";
import {
  AppointmentChartGetPayload,
  AppointmentChartGetResponse,
} from "../api/types";

const GET_QUERY_KEY = "GetAppointmentChart";

export const useGetAppointmentChart = (
  payload: AppointmentChartGetPayload,
  options?: Omit<
    UseQueryOptions<
      AppointmentChartGetResponse,
      any,
      AppointmentChartGetResponse,
      any[]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { from } = payload;
  return useQuery({
    queryKey: [GET_QUERY_KEY, from],
    queryFn: () => GET(payload),
    ...options,
  });
};

export const useRefetchGetAppointmentChart = () => {
  return useRefetchQuery(GET_QUERY_KEY);
};
