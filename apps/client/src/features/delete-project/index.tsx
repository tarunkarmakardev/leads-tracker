import { ProjectItem } from "@leads-tracker/schemas";
import { useBoolean } from "ahooks";
import { useDeleteProject } from "@/services/projects";
import Listing from "../list-layout";

interface DeleteProjectProps {
  item: ProjectItem;
  onSuccess?: () => void;
}

export default function DeleteProject({ item, onSuccess }: DeleteProjectProps) {
  const [open, openActions] = useBoolean();
  const deleteApi = useDeleteProject(item.id);
  const handleConfirm = () => deleteApi.mutate(undefined, { onSuccess });

  return (
    <Listing.DeleteButton
      open={open}
      onClose={openActions.setFalse}
      onConfirm={handleConfirm}
      loading={deleteApi.isPending}
      onOpen={openActions.setTrue}
      itemName={item.name}
    />
  );
}
