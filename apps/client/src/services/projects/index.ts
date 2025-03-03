import { endpoints } from "@/config/urls";
import { api } from "@/lib/axios";
import {
  ProjectsGetDataSchema,
  ProjectsGetPayload,
} from "@leads-tracker/schemas";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function getProjectsOptions(payload: ProjectsGetPayload) {
  return queryOptions({
    queryKey: [endpoints.reports.list, payload],
    queryFn: async () => {
      const res = await api.get(endpoints.projects.list, { params: payload });
      const data = ProjectsGetDataSchema.parse(res.data);
      return data;
    },
  });
}

export const useGetProjects = (payload: ProjectsGetPayload) =>
  useQuery(getProjectsOptions(payload));
