import { FormikHelpers } from "formik";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import FormGridSection from "../form-grid-section";
import CallStatForm from "./CallStatForm";
import { CallStatsFormValues } from "./common.types";
import { callStatsToString } from "./utils";
import LoadingButton from "../loading-button";

interface AddCallStatFormProps {
  onSubmit: (
    values: CallStatsFormValues,
    formikHelpers: FormikHelpers<CallStatsFormValues>
  ) => Promise<void>;
  loading?: boolean;
}

export default function AddCallStatForm({
  onSubmit,
  loading,
}: AddCallStatFormProps) {
  const [snippet, setSnippet] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleCopy = async (values: CallStatsFormValues) => {
    const stringifiedValues = callStatsToString(values);
    try {
      await navigator.clipboard.writeText(stringifiedValues);
      setSnippet(stringifiedValues);
      setDialogOpen(true);
    } catch (error) {}
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{"Snippet was copied"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
            {snippet}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <CallStatForm
        onSubmit={onSubmit}
        actionsComponent={(f) => (
          <FormGridSection
            items={[
              {
                id: 1,
                gridItemProps: { xs: 6 },
                component: (
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopy(f.values)}
                  >
                    Copy Snippet
                  </Button>
                ),
              },
              {
                id: 2,
                gridItemProps: { xs: 6 },
                component: (
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<SaveIcon />}
                    loading={loading}
                    disabled={!f.isValid}
                  >
                    Save
                  </LoadingButton>
                ),
              },
            ]}
          />
        )}
      />
    </>
  );
}
