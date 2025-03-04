import { useDeleteReport } from "@/services/reports";
import { ReportItem } from "@leads-tracker/schemas";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useBoolean } from "ahooks";
import LoadingButton from "../loading-button";

interface DeleteReportProps {
  item: ReportItem;
  onSuccess?: () => void;
}

export default function DeleteReport({ item, onSuccess }: DeleteReportProps) {
  const [open, openActions] = useBoolean();
  const deleteApi = useDeleteReport(item.id);
  const handleClick = () => deleteApi.mutate(undefined, { onSuccess });
  return (
    <>
      <DeleteIcon
        sx={{ cursor: "pointer" }}
        color="info"
        onClick={openActions.setTrue}
      />
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={openActions.setFalse}
      >
        <DialogTitle>Edit Call Stat</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete? </Typography>
          <DialogActions>
            <Button onClick={openActions.setFalse}>Cancel</Button>
            <LoadingButton
              loading={deleteApi.isPending}
              variant="contained"
              color="error"
              onClick={handleClick}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
