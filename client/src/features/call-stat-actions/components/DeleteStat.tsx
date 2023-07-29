import Spinner from "@/features/spinner";
import { CallStatObject } from "@/services/call-stats/api/types";
import {
  useDeleteCallStat,
  useRefetchGetCallStat,
} from "@/services/call-stats/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";

interface DeleteStatProps {
  stat: CallStatObject;
}

export default function DeleteStat({ stat }: DeleteStatProps) {
  const deleteCallStat = useDeleteCallStat();
  const refetchCallStats = useRefetchGetCallStat();
  const snackBar = useSnackbar();
  const handleClick = () => {
    deleteCallStat.mutate(
      { _id: stat._id },
      {
        onSuccess(data, variables, context) {
          refetchCallStats();
          snackBar.enqueueSnackbar("Item Deleted", {
            variant: "info",
          });
        },
      }
    );
  };
  return (
    <Spinner
      loading={deleteCallStat.isLoading}
      loaderProps={{
        size: 24,
      }}
    >
      <DeleteIcon
        sx={{ cursor: "pointer" }}
        color="info"
        onClick={handleClick}
      />
    </Spinner>
  );
}
