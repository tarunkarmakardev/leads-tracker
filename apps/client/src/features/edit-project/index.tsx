import { ProjectItem } from "@leads-tracker/schemas";
import { useBoolean } from "ahooks";
import { usePatchProject } from "@/services/projects";
import ProjectForm from "../project-form";
import { ProjectFormValues } from "@/schemas/projects";
import Listing from "../list-layout";

interface EditProjectProps {
  item: ProjectItem;
}

export default function EditProject({ item }: EditProjectProps) {
  const [open, openActions] = useBoolean(false);
  const patchApi = usePatchProject(item.id);
  const handleSubmit = (values: ProjectFormValues) => {
    patchApi.mutate(values, {
      onSuccess: () => {
        openActions.setFalse();
      },
    });
  };
  return (
    <Listing.EditButton
      title="Edit Project"
      open={open}
      onOpen={openActions.setTrue}
      onClose={openActions.setFalse}
    >
      <ProjectForm
        editValues={item}
        onSubmit={handleSubmit}
        actionsComponent={(f) => (
          <Listing.EditDialogActions
            onCancel={openActions.setFalse}
            loading={patchApi.isPending}
            disabled={!f.isValid}
          />
        )}
      />
    </Listing.EditButton>
  );
}
