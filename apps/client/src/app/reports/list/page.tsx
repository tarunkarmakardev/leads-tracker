"use client";
import ReportsLayout from "@/features/reports-layout";
import ReportsList from "@/features/reports-list";
import ReportsTabs from "@/features/reports-tabs";
import { useGetReports } from "@/services/reports";

const payload = {
  limit: "100",
  offset: "0",
};
export default function Page() {
  const getQuery = useGetReports(payload);
  const { results = [] } = getQuery.data || {};
  return (
    <ReportsLayout
      title="Reports"
      headerComponent={<ReportsTabs />}
      loading={getQuery.isFetching}
    >
      <ReportsList items={results} />
    </ReportsLayout>
  );
}
