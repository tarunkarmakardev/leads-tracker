import { endpoints, navigationUrls } from "@/config/urls";
import { api } from "@/lib/axios";
import { ReportFormValues } from "@/schemas/reports";
import {
  ReportDetailDataSchema,
  ReportsGetDataSchema,
  ReportsGetPayload,
} from "@leads-tracker/schemas";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export function getReportsOptions(payload?: ReportsGetPayload) {
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

export const usePostReport = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (values: ReportFormValues) =>
      api.post(endpoints.reports.post, values),
    onSuccess: () => {
      router.push(navigationUrls.reports.list);
      enqueueSnackbar({ message: "Report added", variant: "success" });
    },
  });
};

export const usePatchReport = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: ReportFormValues) =>
      api.patch(endpoints.reports.patch(id), values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoints.reports.list] });
      enqueueSnackbar({ message: "Report Updated", variant: "success" });
    },
  });
};

export const useDeleteReport = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete(endpoints.reports.delete(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoints.reports.list] });
      enqueueSnackbar({ message: "Report Deleted", variant: "success" });
    },
  });
};

export const useDetailReport = (id: string) => {
  return useQuery({
    queryKey: [endpoints.reports.detail(id)],
    queryFn: async () => {
      const res = await api.get(endpoints.reports.detail(id));
      const data = ReportDetailDataSchema.parse(res.data);
      return data;
    },
  });
};
