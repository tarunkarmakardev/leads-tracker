import CallStatForm from "@/features/call-stat-form";
import { CallStatsFormValues } from "@/features/call-stat-form/common.types";
import LoadingButton from "@/features/loading-button";
import { CallStatObject } from "@/services/call-stats/api/types";
import {
  usePatchCallStat,
  useRefetchGetCallStat,
} from "@/services/call-stats/hooks";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface EditStatProps {
  stat: CallStatObject;
}

export default function EditStat({ stat }: EditStatProps) {
  const [open, setOpen] = useState(false);
  const patchAPI = usePatchCallStat();
  const refetchCallStats = useRefetchGetCallStat();
  const snackBar = useSnackbar();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values: CallStatsFormValues) => {
    patchAPI.mutate(
      {
        ...values,
        _id: stat._id,
      },
      {
        onSuccess(data, variables, context) {
          handleClose();
          refetchCallStats();
          snackBar.enqueueSnackbar("Item updated", {
            variant: "success",
          });
        },
      }
    );
  };
  return (
    <>
      <EditIcon color="info" onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Edit Call Stat</DialogTitle>
        <DialogContent>
          <CallStatForm
            editValues={stat}
            onSubmit={handleSubmit}
            actionsComponent={(f) => (
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  type="submit"
                  loading={patchAPI.isLoading}
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
