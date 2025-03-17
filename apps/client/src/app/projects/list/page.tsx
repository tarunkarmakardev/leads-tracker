"use client";
import Listing from "@/features/list-layout";
import ProjectCard from "@/features/project-card";
import { useGetProjects } from "@/services/projects";
import { ProjectsGetPayload } from "@leads-tracker/schemas";

const payload: ProjectsGetPayload = {
  limit: 100,
  offset: 0,
};
export default function Page() {
  const getQuery = useGetProjects(payload);
  const { results = [] } = getQuery.data || {};
  return (
    <Listing.Body loading={getQuery.isFetching} noData={results.length === 0}>
      {results.map((item) => (
        <ProjectCard key={item.id} project={item} />
      ))}
    </Listing.Body>
  );
}
