"use client";
import CallStatsLayout from "@/features/reports-layout/CallStatsLayout";
import CallStatsList from "@/features/reports-list";
import { useGetCallStat } from "@/services/call-stats/hooks";
import CallStatsTabs from "@/features/reports-tabs";

export default function CalLStatsList() {
  const getAPI = useGetCallStat({});
  return (
    <CallStatsLayout
      title="Call Stats List"
      headerComponent={<CallStatsTabs />}
      loading={getAPI.isFetching}
    >
      <CallStatsList getAPI={getAPI} />
    </CallStatsLayout>
  );
}
