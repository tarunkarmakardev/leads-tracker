import ReportsForm from "@/features/reports-form";
import { ReportItem } from "@leads-tracker/schemas";
import { ReportFormValues } from "@/schemas/reports";
import { useBoolean } from "ahooks";
import { usePatchReport } from "@/services/reports";
import Listing from "../list-layout";

interface EditReportProps {
  item: ReportItem;
}

export default function EditReport({ item }: EditReportProps) {
  const [open, openActions] = useBoolean(false);
  const patchApi = usePatchReport(item.id);
  const handleSubmit = (values: ReportFormValues) => {
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
      <ReportsForm
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
