import { useDeleteReport } from "@/services/reports";
import { ReportItem } from "@leads-tracker/schemas";
import { useBoolean } from "ahooks";
import ListLayout from "../list-layout";

interface DeleteReportProps {
  item: ReportItem;
  onSuccess?: () => void;
}

export default function DeleteReport({ item, onSuccess }: DeleteReportProps) {
  const [open, openActions] = useBoolean();
  const deleteApi = useDeleteReport(item.id);
  const handleConfirm = () => deleteApi.mutate(undefined, { onSuccess });
  return (
    <ListLayout.DeleteButton
      open={open}
      onClose={openActions.setFalse}
      onConfirm={handleConfirm}
      loading={deleteApi.isPending}
      onOpen={openActions.setTrue}
      itemName={"Report"}
    />
  );
}
