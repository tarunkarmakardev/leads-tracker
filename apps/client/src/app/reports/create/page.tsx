"use client";
import ReportsForm from "@/features/reports-form";
import { usePostReport } from "@/services/reports";
import { Button } from "@mui/material";

export default function Page() {
  const postApi = usePostReport();
  return (
    <ReportsForm
      onSubmit={(values) => postApi.mutate(values)}
      actionsComponent={(f) => (
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          loading={postApi.isPending}
        >
          Submit
        </Button>
      )}
    />
  );
}
