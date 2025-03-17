import { endpoints, navigationUrls } from "@/config/urls";
import { api } from "@/lib/axios";
import { ProjectFormValues } from "@/schemas/projects";
import {
  ProjectDetailDataSchema,
  ProjectsGetDataSchema,
  ProjectsGetPayload,
} from "@leads-tracker/schemas";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export function getProjectsOptions(payload: ProjectsGetPayload) {
  return queryOptions({
    queryKey: [endpoints.projects.list, payload],
    queryFn: async () => {
      const res = await api.get(endpoints.projects.list, { params: payload });
      const data = ProjectsGetDataSchema.parse(res.data);
      return data;
    },
  });
}

export const useGetProjects = (payload: ProjectsGetPayload) =>
  useQuery(getProjectsOptions(payload));

export const usePostProject = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (values: ProjectFormValues) =>
      api.post(endpoints.projects.post, values),
    onSuccess: () => {
      router.push(navigationUrls.projects.list);
      enqueueSnackbar({ message: "Project added", variant: "success" });
    },
  });
};

export const usePatchProject = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: ProjectFormValues) =>
      api.patch(endpoints.projects.patch(id), values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoints.projects.list] });
      enqueueSnackbar({ message: "Project Updated", variant: "success" });
    },
  });
};

export const useDeleteProject = (id: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete(endpoints.projects.delete(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoints.projects.list] });
      enqueueSnackbar({ message: "Project Deleted", variant: "success" });
    },
  });
};

export const useDetailProject = (id: string) => {
  return useQuery({
    queryKey: [endpoints.projects.detail(id)],
    queryFn: async () => {
      const res = await api.get(endpoints.projects.detail(id));
      const data = ProjectDetailDataSchema.parse(res.data);
      return data;
    },
  });
};
