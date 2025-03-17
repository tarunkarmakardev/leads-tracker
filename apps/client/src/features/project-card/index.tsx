import { ProjectItem } from "@leads-tracker/schemas";
import { Typography } from "@mui/material";
import Listing from "../list-layout";
import EditProject from "../edit-project";
import DeleteProject from "../delete-project";

export default function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Listing.Card
      actions={
        <>
          <EditProject item={project} />
          <DeleteProject item={project} />
        </>
      }
    >
      <Typography>{project.name}</Typography>
    </Listing.Card>
  );
}
