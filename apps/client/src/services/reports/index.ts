import { endpoints } from "@/config/urls";
import { api } from "@/lib/axios";
import {
  ReportsGetDataSchema,
  ReportsGetPayload,
} from "@leads-tracker/schemas";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function getReportsOptions(payload: ReportsGetPayload) {
  return queryOptions({
    queryKey: [endpoints.reports.list, payload],
    queryFn: async () => {
      const res = await api.get(endpoints.reports.list, { params: payload });
      const data = ReportsGetDataSchema.parse(res.data);
      return data;
    },
  });
}

export const useGetReports = (payload: ReportsGetPayload) =>
  useQuery(getReportsOptions(payload));
