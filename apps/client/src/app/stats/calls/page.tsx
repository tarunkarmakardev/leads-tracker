"use client";
import CallStatsLayout from "@/features/call-stats-layout/CallStatsLayout";
import CallStatsList from "@/features/call-stats-list";
import { useGetCallStat } from "@/services/call-stats/hooks";
import CallStatsTabs from "@/features/call-stats-tabs";

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
