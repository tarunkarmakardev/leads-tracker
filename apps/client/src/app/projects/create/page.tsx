"use client";
import ProjectForm from "@/features/project-form";
import { usePostProject } from "@/services/projects";
import { Button } from "@mui/material";

export default function Page() {
  const postMutation = usePostProject();
  return (
    <ProjectForm
      onSubmit={(values) => postMutation.mutate(values)}
      actionsComponent={() => (
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          loading={postMutation.isPending}
        >
          Submit
        </Button>
      )}
    />
  );
}
