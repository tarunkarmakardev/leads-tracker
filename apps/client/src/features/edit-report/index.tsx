import ReportsForm from "@/features/reports-form";
import LoadingButton from "@/features/loading-button";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReportItem } from "@leads-tracker/schemas";
import { ReportFormValues } from "@/schemas/reports";
import { useBoolean } from "ahooks";
import { usePatchReport } from "@/services/reports";

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
    <>
      <EditIcon
        color="info"
        onClick={openActions.setTrue}
        sx={{ cursor: "pointer" }}
      />
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={openActions.setFalse}
      >
        <DialogTitle>Edit Call Stat</DialogTitle>
        <DialogContent>
          <ReportsForm
            editValues={item}
            onSubmit={handleSubmit}
            actionsComponent={(f) => (
              <DialogActions>
                <Button onClick={openActions.setFalse}>Cancel</Button>
                <LoadingButton
                  type="submit"
                  loading={patchApi.isPending}
                  disabled={!f.isValid}
                  variant="contained"
                >
                  Update
                </LoadingButton>
              </DialogActions>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
