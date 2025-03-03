"use client";

import { FormikHelpers } from "formik";
import { usePostCallStat } from "@/services/call-stats/hooks";
import AddCallStatForm from "@/features/call-stat-form/AddCallStatForm";
import { CallStatsFormValues } from "@/features/call-stat-form/common.types";
import { useSnackbar } from "notistack";
import CallStatsLayout from "@/features/reports-layout/CallStatsLayout";
import CallStatsTabs from "@/features/reports-tabs";

export default function CalLStatsCreate() {
  const postAPI = usePostCallStat();
  const notification = useSnackbar();
  const handleSave = async (
    values: CallStatsFormValues,
    formikHelpers: FormikHelpers<CallStatsFormValues>
  ) => {
    postAPI.mutate(values, {
      onSuccess(data, variables, context) {
        formikHelpers.resetForm();
        notification.enqueueSnackbar("Stat Saved", { variant: "success" });
      },
    });
  };

  return (
    <CallStatsLayout
      title="Create Call Stat"
      headerComponent={<CallStatsTabs />}
    >
      <AddCallStatForm onSubmit={handleSave} loading={postAPI.isLoading} />
    </CallStatsLayout>
  );
}
