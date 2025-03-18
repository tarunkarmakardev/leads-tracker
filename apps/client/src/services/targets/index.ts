import { endpoints } from "@/config/urls";
import { api } from "@/lib/axios";
import { TargetFormValues } from "@/schemas/targets";
import {
  TargetDetailPayloadSchema,
  TargetGetDataSchema,
  TargetsGetPayload,
} from "@leads-tracker/schemas";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export function getTargetsOptions(payload?: TargetsGetPayload) {
  return queryOptions({
    queryKey: [endpoints.targets.list, payload],
    queryFn: async () => {
      const res = await api.get(endpoints.targets.list, { params: payload });
      const data = TargetGetDataSchema.parse(res.data);
      return data;
    },
  });
}

export const useGetTargets = (payload: TargetsGetPayload) =>
  useQuery(getTargetsOptions(payload));

export const usePostTarget = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (values: TargetFormValues) =>
      api.post(endpoints.targets.post, values),
    onSuccess: () => {
      enqueueSnackbar({ message: "Target added", variant: "success" });
    },
  });
};

export const usePatchTarget = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: TargetFormValues) =>
      api.patch(endpoints.targets.patch(id), values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoints.targets.list] });
      enqueueSnackbar({ message: "Target Updated", variant: "success" });
    },
  });
};

export const useDeleteTarget = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete(endpoints.targets.delete(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoints.targets.list] });
      enqueueSnackbar({ message: "Target Deleted", variant: "success" });
    },
  });
};

export const useDetailTarget = (id: string) => {
  return useQuery({
    queryKey: [endpoints.targets.detail(id)],
    queryFn: async () => {
      const res = await api.get(endpoints.targets.detail(id));
      const data = TargetDetailPayloadSchema.parse(res.data);
      return data;
    },
  });
};
